import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { TokenDtoModel } from '../models/TokenDtoModel';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService,private route:Router,private toast:NgToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken=this.auth.getToken();
    if(myToken)
    {
      request=request.clone({
        setHeaders: {Authorization:`bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
            return this.handleUnAuthorizedError(request,next)
          }
        }
        return throwError(()=>new Error("Some other error occured"))
      })
  );
  }
  handleUnAuthorizedError(req:HttpRequest<any>,next:HttpHandler){
    let tokenDtoModel=new TokenDtoModel();
    tokenDtoModel.accessToken=this.auth.getToken()!;
    tokenDtoModel.refreshToken=this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenDtoModel)
    .pipe(
      switchMap((data:TokenDtoModel)=>{
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req=req.clone({
          setHeaders: {Authorization:`bearer ${data.accessToken}`}
        })
        return next.handle(req)
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.error({detail:"ERROR",summary:"Token is Expired,Login again",duration:5000})
          this.route.navigate(['login'])
        })
      })
    )
  }
}

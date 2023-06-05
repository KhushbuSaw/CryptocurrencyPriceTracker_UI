import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import{JwtHelperService} from '@auth0/angular-jwt'
import { TokenDtoModel } from '../models/TokenDtoModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private unique_name$=new BehaviorSubject<string>("");
  private role$=new BehaviorSubject<string>("");

  private baseUrl:string="http://localhost:5235/api/UserDetails/";
  private userPayload:any;

  constructor(private http:HttpClient,private router:Router) { 
    this.userPayload=this.decodedToken();
  }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }
  login(loginObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }
  getUsers()
  {
    return this.http.get<any>(this.baseUrl);
  }
  signOut()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  storeToken(tokenValue:string)
  {
    localStorage.setItem('accessToken',tokenValue);
  }
  getToken()
  {
    return localStorage.getItem('accessToken');
  }
  isLoggedIn():boolean{
    return !!this.getToken();
  }
  decodedToken()
  {
    const jwtHelper=new JwtHelperService();
    return jwtHelper.decodeToken(this.getToken()!);
  }
  public getRoleFromStore()
  {
    return this.role$.asObservable();
  }
  public setRoleForStore(role:string)
  {
    this.role$.next(role);
  }
  public getFullNameFromStore()
  {
    return this.unique_name$.asObservable();
  }
  public setFullNameForStore(fullName:string)
  {
    this.unique_name$.next(fullName);
  }
  public getFullNameFromToken()
  {
    if(this.userPayload)
    return this.userPayload.unique_name;
  }
  public getRoleFromToken()
  {
    if(this.userPayload)
    return this.userPayload.role;
  }
  renewToken(tokenDto:TokenDtoModel)
  {
    return this.http.post<any>(`${this.baseUrl}refreshToken`,tokenDto);
  }
  storeRefreshToken(tokenValue:string)
  {
    localStorage.setItem('refreshToken',tokenValue);
  }
  getRefreshToken()
  {
    return localStorage.getItem('refreshToken');
  }
}

import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/Helpers/validateForm';
import { AuthService } from 'src/app/Services/auth.service';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  type:string='password'
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthService,
    private route:Router,
    private toast:NgToastService,
    private resetService:ResetPasswordService) { }

  ngOnInit(): void {
  this.loginForm=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required],
  })
  }
  hideShowPass(){
   this.isText=!this.isText;
   this.isText?this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
   this.isText?this.type="text":this.type="password";
  }
  onLogin()
  {
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000})
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload=this.auth.decodedToken();
          this.auth.setFullNameForStore(tokenPayload.unique_name);
          this.auth.setRoleForStore(tokenPayload.role)
          this.route.navigate(['dashboard'])
        },
        error:(err)=>{
          this.toast.error({detail:"ERROR",summary:err.message,duration:5000})
        }
      })

    }
    else{
      ValidateForm.validateAllFormFileds(this.loginForm);
      this.toast.error({detail:"ERROR",summary:"Form is Invalid",duration:5000})
    }
  }
 checkValidEmail(event:string)
 {
  const value=event;
  const pattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  this.isValidEmail=pattern.test(value);
  return this.isValidEmail;
 }
 confirmToSend(){
  if(this.checkValidEmail(this.resetPasswordEmail))
  console.log(this.resetPasswordEmail);
  const buttonRef=document.getElementById("closeBtn");
  buttonRef?.click();
  
  this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
  .subscribe({
    next:(res)=>{
    this.toast.success({detail:"SUCCESS",summary:'Reset Sucess!',duration:5000})
    this.resetPasswordEmail="";
    const buttonRef=document.getElementById("closeBtn");
    buttonRef?.click();
  },
  error:(err)=>{
    this.toast.error({detail:"ERROR",summary:err.message,duration:3000})
  }
  })
 }

}

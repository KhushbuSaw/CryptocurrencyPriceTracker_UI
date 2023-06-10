import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/Helpers/validateForm';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type:string='password'
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  signUpForm!:FormGroup;
  public userEmail!:string;
  public userPhoneNo!:string;
  public isValidEmail!:boolean;
  public isValidPhoneNo!:boolean;
  public isTenDigitPhoneNo!:boolean;
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,private toast:NgToastService) { }

  ngOnInit(): void {
    this.signUpForm=this.fb.group({
      firstname:['',Validators.required],
      lastname:[''],
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
      role:['',Validators.required],
      phonenumber:['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })
  }
  hideShowPass(){
   this.isText=!this.isText;
   this.isText?this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
   this.isText?this.type="text":this.type="password";
  }
  onSignup()
  {
    if(this.signUpForm.valid){
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000})
          this.signUpForm.reset();
          this.router.navigate(['login']);
        }),
        error:(err=>{
          this.toast.error({detail:"ERROR",summary:err.message,duration:5000})
        })
      })
      console.log(this.signUpForm.value);
    }
    else{
      ValidateForm.validateAllFormFileds(this.signUpForm);
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
 checkValidPhoneNo(event:string)
 {
  const value=event;
  const pattern=/^((\\+91-?)|0)?[0-9]{10}$/;
  const patternNumber=/^[0-9]*$/;
  this.isValidPhoneNo=pattern.test(value);
  this.isTenDigitPhoneNo=patternNumber.test(value);
 }

}





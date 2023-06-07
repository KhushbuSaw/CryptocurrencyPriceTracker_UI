import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmPasswordValidator } from 'src/app/Helpers/confirm-password.validator';
import ValidateForm from 'src/app/Helpers/validateForm';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';
import { ResetPassword } from 'src/app/models/reset-password.model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent  implements OnInit{

  resetPasswordForm!:FormGroup;
  emailToReset!:string;
  emailToken!:string;
  resetPasswordObj=new ResetPassword();

  constructor(private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private resetService:ResetPasswordService,
    private toast:NgToastService,
    private router:Router) {
  }

  ngOnInit(): void {
    this.resetPasswordForm=this.fb.group({
      password:[null,Validators.required],
      confirmPassword:[null,Validators.required]
    },{
      validator:ConfirmPasswordValidator("password","confirmPassword")
    });

    this.activatedRoute.queryParams.subscribe(val=>{
    this.emailToReset=val['email'];
    let uriToken=val['code'];
    this.emailToken=uriToken.replace(/ /g,'+');
  })
  }
  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email=this.emailToReset;
      this.resetPasswordObj.newPassword=this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword=this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken=this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:"SUCCESS",summary:'Password Reset Sucessfully!',duration:5000});
          this.router.navigate(['login']);
        },
        error:(err)=>{
          this.toast.error({detail:"ERROR",summary:err.message,duration:3000})
        }
        
      })
    }
    else{
      ValidateForm.validateAllFormFileds(this.resetPasswordForm);
    }
  }
}

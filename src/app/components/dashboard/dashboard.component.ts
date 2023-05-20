import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users:any=[];
  public role:string="";
  public fullName:string="";
  constructor(private auth:AuthService)
  {

  }
  ngOnInit() {
    this.auth.getUsers()
    .subscribe(res=>
      {
        this.users=res;
      });
      this.auth.getFullNameFromStore()
      .subscribe(val=>{
        let fullNameFromToken=this.auth.getFullNameFromToken();
        this.fullName=val||fullNameFromToken
      });
      this.auth.getRoleFromStore()
      .subscribe(val=>{
        const roleFromToken=this.auth.getRoleFromToken();
        this.role=val||roleFromToken;
      })
  }
  logOut()
  {
    this.auth.signOut();
  }

}


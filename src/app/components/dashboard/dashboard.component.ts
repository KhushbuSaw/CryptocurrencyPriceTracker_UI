import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users:any=[];
  constructor(private auth:AuthService)
  {

  }
  ngOnInit() {
    this.auth.getUsers()
    .subscribe(res=>
      {
        this.users=res;
      })
  }
  logOut()
  {
    this.auth.signOut();
  }

}


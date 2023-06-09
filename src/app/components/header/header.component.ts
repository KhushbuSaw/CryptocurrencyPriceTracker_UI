import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CurrencyService } from 'src/app/Services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedCurrency:string="INR";
  public fullName:string="";
  public users:any=[];
  constructor(private currencyService:CurrencyService,private auth:AuthService)
  {}
  ngOnInit() {
    //  this.auth.getUsers()
    //  .subscribe(res=>
    //   {
    //     this.users=res;
    //   });
       this.auth.getFullNameFromStore()
      .subscribe(val=>{
        let fullNameFromToken=this.auth.getFullNameFromToken();
        this.fullName=val||fullNameFromToken
      });
    //   this.auth.getRoleFromStore()
    //   .subscribe(val=>{
    //     const roleFromToken=this.auth.getRoleFromToken();
    //     this.role=val||roleFromToken;
    //   })
  }
  sendCurrency(event:string){
    this.currencyService.setCurrency(event);
    this.selectedCurrency=event;
  }
  logOut()
  {
    this.auth.signOut();
  }
}

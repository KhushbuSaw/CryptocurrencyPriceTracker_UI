import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CurrencyService } from 'src/app/Services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  selectedCurrency:string="INR";
  constructor(private currencyService:CurrencyService,private auth:AuthService)
  {}

  sendCurrency(event:string){
    this.currencyService.setCurrency(event);
    this.selectedCurrency=event;
  }
  logOut()
  {
    this.auth.signOut();
  }
}

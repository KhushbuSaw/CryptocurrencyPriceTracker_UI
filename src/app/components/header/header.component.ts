import { Component } from '@angular/core';
import { CurrencyService } from 'src/app/Services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  selectedCurrency:string="INR";
  constructor(private currencyService:CurrencyService)
  {}

  sendCurrency(event:string){
    this.currencyService.setCurrency(event);
    this.selectedCurrency=event;
  }
}

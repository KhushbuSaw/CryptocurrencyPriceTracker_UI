import { Component, OnInit } from '@angular/core';
import { CryptoAPIService } from 'src/app/Services/crypto-api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  bannerData:any=[];
  currency : string = "INR"

  constructor(private cryptoApi:CryptoAPIService) {

  }
  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
  }

  getBannerData() {
    this.cryptoApi.getTrendingCurrency(this.currency)
      .subscribe(res => {
        console.log(res);
        this.bannerData = res;
      })
  }
  getAllData(){
    this.cryptoApi.getCurrency("INR")
    .subscribe(res=>{
     // console.log(res);
    })
  }

}

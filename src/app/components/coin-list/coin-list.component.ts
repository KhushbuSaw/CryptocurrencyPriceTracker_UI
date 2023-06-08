import { CryptoAPIService } from 'src/app/Services/crypto-api.service';
import {AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  bannerData:any=[];
  currency : string = "INR";
  dataSource!: MatTableDataSource<any>;
  displayedColumns:string[]=['symbol','current_price','price_change_percentage_24h','market_cap'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private cryptoApi:CryptoAPIService,private router:Router) {

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
      this.dataSource = new MatTableDataSource(res);this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  gotoDetails(row:any){
    this.router.navigate(['coin-detail',row.id])
  }
}

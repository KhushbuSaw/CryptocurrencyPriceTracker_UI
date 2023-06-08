import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetComponent } from './components/reset/reset.component';
import { CoinDetailComponent } from './components/coin-detail/coin-detail.component';
import { CoinListComponent } from './components/coin-list/coin-list.component';

const routes: Routes = [
  {path:'',redirectTo:'signup',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent},
 // {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'reset',component:ResetComponent},
  {path:'coin-list',component:CoinListComponent},
  {path:'coin-detail',component:CoinDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BankHomePageComponent } from './pages/bank-home-page/bank-home-page.component';
import { DistrictHomePageComponent } from './pages/district-home-page/district-home-page.component';
import { StateHomePageComponent } from './pages/state-home-page/state-home-page.component';
import { AdminApprovalPageComponent } from './pages/admin-approval-page/admin-approval-page.component';

const routes: Routes = [
  { path: 'adminHomePage', component: AdminHomePageComponent },
  { path: 'stateHomePage', component: StateHomePageComponent },
  { path: 'districtHomePage', component: DistrictHomePageComponent },
  { path: 'bankHomePage', component: BankHomePageComponent },
  { path: 'adminApprovalPage', component: AdminApprovalPageComponent },
  { path: 'loginPage', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}

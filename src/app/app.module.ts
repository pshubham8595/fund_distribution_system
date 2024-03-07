import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FirebaseConfigService } from './services/firebase-config.service';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { SchemeFormComponent } from './components/scheme-form/scheme-form.component';
import { SchemeListComponent } from './components/scheme-list/scheme-list.component';
import { StateHomePageComponent } from './pages/state-home-page/state-home-page.component';
import { DistrictHomePageComponent } from './pages/district-home-page/district-home-page.component';
import { BankHomePageComponent } from './pages/bank-home-page/bank-home-page.component';
import { AdminApprovalPageComponent } from './pages/admin-approval-page/admin-approval-page.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

const config = {
  apiKey: "AIzaSyC4afmMRGFppgt6oh4YaHkvniPMHCIHugQ",
  authDomain: "funddistribution-f26a7.firebaseapp.com",
  projectId: "funddistribution-f26a7",
  storageBucket: "funddistribution-f26a7.appspot.com",
  messagingSenderId: "732714041942",
  appId: "1:732714041942:web:7d133bd0ac795e0064b1f7"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdminHomePageComponent,
    SchemeFormComponent,
    SchemeListComponent,
    StateHomePageComponent,
    DistrictHomePageComponent,
    BankHomePageComponent,
    AdminApprovalPageComponent,
    ConfirmationDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    FormsModule,
    RouterModule,
    
  ],
  providers: [
    FirebaseConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

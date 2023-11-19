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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    FormsModule,
    RouterModule
  ],
  providers: [
    FirebaseConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

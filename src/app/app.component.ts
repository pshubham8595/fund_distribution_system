import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseConfigService } from './services/firebase-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fund_distribution_system';

  email: string = "";
  password: string = "";
  phone: string = "";
  name: string = "";

  constructor(private route: ActivatedRoute,private router: Router,public firebaseConfigService:FirebaseConfigService){
    this.router.navigate(['/stateHomePage'], { relativeTo: this.route });

  }

}


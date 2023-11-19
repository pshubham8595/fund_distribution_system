import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private readonly router: Router,private route: ActivatedRoute){

  }
  email:string = "";
  password:string = "";


  async login() {
    console.log("E:"+this.email)
    console.log("P:"+this.password)
    sessionStorage.clear();
    if(this.email == "admin@fds" && this.password == "admin"){
      window.alert("Admin Logged in Successfully!");
      sessionStorage.setItem('user', "admin@fds");
      this.router.navigate(['/adminHomePage'],{relativeTo: this.route});
    }
    else{
      window.alert("Invalid Admin credentials");
    }  
  }
}

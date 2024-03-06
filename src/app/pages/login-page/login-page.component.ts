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
  selectedRole:string = "admin";

  async login() {
    console.log("E:"+this.email)
    console.log("P:"+this.password)
    sessionStorage.clear();

    if(this.selectedRole == "admin"){
      if(this.email == "admin@fds" && this.password == "admin"){
        window.alert("Admin Logged in Successfully!");
        sessionStorage.setItem('user', "admin@fds");
        this.router.navigate(['/adminHomePage'],{relativeTo: this.route});
      }
      else{
        window.alert("Invalid Admin credentials");
      }  
    }
    else if(this.selectedRole == "state"){
      if(this.email == "state@fds" && this.password == "state"){
        window.alert("State Logged in Successfully!");
        sessionStorage.setItem('user', "state@fds");
        this.router.navigate(['/stateHomePage'],{relativeTo: this.route});
      }
      else{
        window.alert("Invalid State credentials");
      }  
    }
    else if(this.selectedRole == "district"){
      if(this.email == "district@fds" && this.password == "district"){
        window.alert("District Logged in Successfully!");
        sessionStorage.setItem('user', "district@fds");
        this.router.navigate(['/districtHomePage'],{relativeTo: this.route});
      }
      else{
        window.alert("Invalid District credentials");
      }  
    }
    else if(this.selectedRole == "bank"){
      if(this.email == "bank@fds" && this.password == "bank"){
        window.alert("Bank Logged in Successfully!");
        sessionStorage.setItem('user', "bank@fds");
        this.router.navigate(['/bankHomePage'],{relativeTo: this.route});
      }
      else{
        window.alert("Invalid Bank credentials");
      }  
    }
    else{
      console.log("Unknown Role Selected.");
    }

    
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../login';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Login = { userid: "Rajamaheswari", password: "mahi123" };
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  submitted:boolean;

  constructor(private formBuilder: FormBuilder,private router: Router,public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/home';
    this.authService.logout();
  }
  get f() { 
    return this.loginForm.controls; 
  }
  login() {
    if (this.loginForm.invalid) {
        return;
    }
    else{
      if(this.f.userid.value == this.model.userid && this.f.password.value == this.model.password){
        alert("You are Successfully LoggedIn!!");
        console.log("Login successful");
        //this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.f.userid.value);
        this.router.navigate([this.returnUrl]);
      }
      else{
        this.message = "Please! check your userid and password";
      }
    }    
  }
 
}



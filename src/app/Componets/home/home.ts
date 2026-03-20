import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../service/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  /**
   * invalidCrendential - the entered crendentials is valid or not
   * invalidCredentialMsg - message from the backend
   * isLogin - user logged in or not
   */
  invalidCrentials = false;
  invalidCrentialsMsg = "";
  isLogIn = false;
  
  constructor(private router : Router,private userService : User , private cd : ChangeDetectorRef,private toastr: ToastrService){}

  /**
   * onSubmit - submit the login
   * 
   * send the data to the userservice login funtino with the login credentials email and password
   * 
   * @param {event} e - event  
   * @param {NgForm} loginForm - container ngform with the validation and value contains email and password
   * 
   * @returns doen't return anything
   */
  onSubmit(e : Event , loginForm : NgForm) {

    if(loginForm.invalid) return; 
    this.isLogIn = true;
    this.userService.logIn(loginForm.value).subscribe({
      next : (data)=> {
        this.toastr.success('Login Successfully');
        this.router.navigate(["/dashboard"]);
      },
      error : (error) => {
        this.invalidCrentials = true;
        this.invalidCrentialsMsg = error.error.message;
        this.isLogIn = false;
        this.cd.detectChanges();
      }
    }
    );

    // if(loginForm.value.email !== "demo@gmail.com" || loginForm.value.password !== "12345")  {
    //   this.invalidCrentials = true;
    //   return;
    // }
    // this.router.navigate(["/dashboard"]);

    // if(loginForm.controls['email'].untouched || loginForm.controls['password'].untouched) {
    //   this.loginStatus.isEmail = loginForm.controls['email'].untouched;
    //   this.loginStatus.isPassword = loginForm.controls['password'].untouched;
    //   return;
    // }
    // if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.value.email)) {
    //   this.loginStatus.isEmail = loginForm.controls['email'].untouched;
    //   this.loginStatus.isPassword = loginForm.controls['password'].untouched;
    //   this.loginStatus.invalidEmail = true;
    //   return;
    // }
    // if(loginForm.value.email !== "demo@gmail.com" || loginForm.value.password !== "12345") {
    //   this.loginStatus.isEmail = loginForm.controls['email'].untouched;
    //   this.loginStatus.isPassword = loginForm.controls['password'].untouched;
    //   this.loginStatus.invalidEmail = false;
    //   this.loginStatus.invalidCrentials = true;
    //   return;
    // }
  }
}

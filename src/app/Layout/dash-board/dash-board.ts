import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../service/user';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dash-board',
  standalone: false,
  templateUrl: './dash-board.html',
  styleUrls: ['./dash-board.css'],
})
export class DashBoard {
  /** 
   * store current user data
   * @type {any}
  */
  public User:any;

  public isSideBar = false;

  constructor(private userService : User , private authService : Auth , private router: Router,private cd : ChangeDetectorRef,private toastr: ToastrService) {}

  /**
   * get the current user from the auth service and update the User
   */
  ngOnInit() {
    this.authService.currentUser$.subscribe(user=> {
      this.User = user;
    });
  }

  /**
   * logout - logout the user and navigates to the login page
   * 
   * @returns doen't return anything
   */
  logout() {
  this.userService.logout().subscribe(() => {
    localStorage.clear();
    this.toastr.success('Logout Successfully');
    this.router.navigate(['/']);
  });
}
} 

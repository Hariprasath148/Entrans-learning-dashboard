import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../service/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  standalone: false,
  templateUrl: './view-user.html',
  styleUrl: './view-user.css',
})
export class ViewUser {

  /**
   * user - user data based on the Id in the route
   * 
   * @type {any}
   */
  user : any;

  /**
   * error message from the backend
   */
  errorMsg:string = "";

  constructor ( private userService : User,private route : ActivatedRoute,private cd : ChangeDetectorRef ){}

  /** 
   * get the user on the on intit
   */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      /**
       * get the id from the route
       */
      let id:number = Number(params.get('id'));
      this.userService.getUserById(id).subscribe({
        next : (data)=> {
          this.user = data;
          this.cd.detectChanges();
        },
        error : (error) => {
          this.errorMsg = error.error.message;
          this.cd.detectChanges();
        }
      })
    })
  }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../service/user';
import { Auth } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-user',
  standalone: false,
  templateUrl: './list-user.html',
  styleUrl: './list-user.css',
})
export class ListUser {

  /** users - all user details updates based on the users in the userSubject allUser behaviour subject */
  users:any[] = [];

  /** current user details */
  public User:any;
  
  /** Search input text used for filtering users */
  public searchText = "";

  /** Page Number */
  public pageNumber:number = 0;

  /** Number of records currently displayed on the page */
  public currentPageSize:number = 0;

  /** Total number of records available in the database withou the current user (DB count -1) */
  public totalCount:number = 0;

  /** Number of records per page */
  public pageSize:number = 0;

  /** Indicates whether search button is clicked or not */
  public isSearch:boolean = false;
  
  /** Indicates whether the search text is empty or not */
  public isSearchEmpty:boolean = false;

  /** Disables the "Previous" button when on the first page */
  public isPreDisable:boolean = true;

  /** Disables the "Next" button when on the last page */
  public isNextDisable:boolean = true;

  constructor(private userService:User,private authService : Auth,private cd : ChangeDetectorRef,private toastr: ToastrService){}

  /** Initialize all the fields on ngOnInit */
  ngOnInit() {
    this.authService.currentUser$.subscribe(user=> {
      this.User = user;
    });
    this.userService.allUser$.subscribe(data => this.users = data);
    this.userService.pageNumber.subscribe(number=>{this.pageNumber = number ; this.updateBtnStatus()});
    this.userService.currentPageSize.subscribe(number=>{this.currentPageSize = number; this.updateBtnStatus()});
    this.userService.totalCount.subscribe(number=>this.totalCount = number);
    this.userService.pageSize.subscribe(number=>{this.pageSize = number; this.updateBtnStatus()});
    /** get the current Page record */
    this.getUserByPage(4);
  }

  /** getUserDetails - get all the details from the backed */
  getUserDetails() {
    this.userService.getAllUsers().subscribe({
      next : () => { this.cd.detectChanges(); },
      error : (error)=> {console.log(error);}
    });
  }

  /**
   * delteUserById - delete the user based on the id
   * 
   * call the method in the user service "deleteUserById" with the id want to delete,
   * then update the all user by getting the current user records
   * 
   * @param {number} id - unique id for the user for the deletion
   * @returns doen't return anything
   */
  deleteUserByID(id:number) {
    if (confirm('Are you sure you want to delete this user?')){
      this.userService.deleteUserById(id).subscribe({
        next : (data) => {
          this.toastr.success('Deleted');
          this.getUserByPage(4);
        },
      })
    }
  }

  /**
   * search - search the record
   * 
   * update the isSearch local variable,
   * then call the userService "search" method with the state,
   * then refetch the data if deletion is happened and current page is empty and still there are some record in the backend
   * 
   * @param{number} state - defined which page to state
   *                        0 - previous
   *                        1 - next
   *                        3 - 1st Page
   *                        4 - current Page used after deletion
   * @returns doesn't return anything
   */
  search(state:number) {
    if(this.searchText.length == 0) { this.isSearchEmpty=true; return; }
    this.isSearch = true;
    this.isSearchEmpty=false;
    this.userService.search(this.searchText,state).subscribe({
      next : (data)=> {   
        if(state == 4 && data.users.length == 0 && data.totalCount > 1) this.getUserByPage(0);
        this.cd.detectChanges();
      }
    });
  }

  /**
   * reset - reset the record after search
   * 
   * check if serach Text empty "if(this.searchText.length == 0)",
   *      then check if user is already searched "if(this.isSearch)" then go to the first page
   *           else get the current page
   *      and set isSeach to false and return
   * 
   * set the search text to empty
   * 
   * check if used is searched "if(this.isSearch)" then set the isSearch to false and get the first page
   * else set the isSearch to false and get the current page
   *  
   * @returns doen't return anything
   */
  reset() {
    this.isSearchEmpty=false;
    if(this.searchText.length == 0) {
      if(this.isSearch) {
        this.isSearch = false; 
        this.getUserByPage(3)
      }
      else this.getUserByPage(4);
      this.isSearch = false;
      return;
    }
    this.searchText = "";
    if(this.isSearch) {
      this.isSearch = false;
      this.getUserByPage(3);
    }
    else {
      this.isSearch = false;
      this.getUserByPage(4);
    }
  }

  /**
   * getUserByPage - get users record
   * 
   * check if user is Searched "if(this.isSearch)" then got to the search method and return
   * 
   * call the userService "getUserByPage" method with the state,
   * then refetch the data if deletion is happened and current page is empty and still there are some record in the backend
   * 
   * @param{number} state - defined which page to state
   *                        0 - previous
   *                        1 - next
   *                        3 - 1st Page
   *                        4 - current Page used after deletion
   * @returns doesn't return anything
   */
  getUserByPage(state:number) {
    if(this.isSearch){ 
      this.search(state);
      return
    };
    this.userService.getUserByPage(state).subscribe({
      next : (data) => {
        if(state == 4 && data.users.length == 0 && data.totalCount > 1) this.getUserByPage(0);
        this.cd.detectChanges();
      }
    });
  }

  /**
   * updateBtnStatus - update button status
   * 
   * update the button status when the user click the previous or next button then update the button status
   * before the fetched to prevent the error or empty fetch of records
   * 
   * @returns doen't return anything
   */
  updateBtnStatus() {
    this.isPreDisable = this.pageNumber === 1;
    this.isNextDisable = this.pageNumber*this.pageSize >= this.totalCount;
  }
}

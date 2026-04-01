import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';
import { Auth } from './auth';
import { BaseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class User {
  
  /** Backend URl */
  private baseUrl = `${BaseUrl}/user`

  /** All Users Details Behaviour Subject */
  private allUserSubject = new BehaviorSubject<any[]>([]);
  public  allUser$ = this.allUserSubject.asObservable();

  /** Pagination Details Behaviour Subject */
  public pageNumber = new BehaviorSubject<number>(1);
  public currentPageSize = new BehaviorSubject<number>(0);
  public totalCount = new BehaviorSubject<number>(0);
  public pageSize = new BehaviorSubject<number>(10);
  
  constructor(private http: HttpClient,private autUser:Auth) {}

  /** 
   * addUser - Adds the new user in Backend and Updates the local State
   * 
   * send the Post backend API request to creat user,
   * then update the "allUserSubject" with new Added data
   * 
   * @param{any} user - The User Object contains the new User Details
   * @returns{Observable<any>} Observable emmitting the new user 
   */
  addUser(user:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/addUser`,user).pipe(
      tap(user =>{
        const users = this.allUserSubject.value;
        this.allUserSubject.next([...users, user]);
      })
    );
  }

  /** 
   * Login - Authenticate the User with email and password
   * 
   * send the creadentials to the backend API and returns
   * an Observable contains the Cookie
   * 
   * @param{any} user - The User Object contains credential details
   * @returns{Observable<any>} Observable emitting the authentication details 
   */
  logIn(user:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/logIn`,user);
  }

  /** 
   * Logout - Clear the current user Authentication data
   * 
   * send the request to backend API,
   * then session is cleared with the help of Asp.net
   * 
   * @returns doen't return anything
   */
  logout() {
    return this.http.post(`${this.baseUrl}/logout`,{});
  }

  /** 
   * getAllUser - get all the data without the pagination
   * 
   * send the request to backend API,
   * then update the "allUserSubject" in response
   * 
   * @returns{Observable<any>} - Observable emitting the All user details from the backend
   */
  getAllUsers():Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllUser`).pipe(
      tap(users=> {this.allUserSubject.next(users)})
    );
  }

  /** 
   * getUserByPage - get the User details with the pagination
   * 
   * send the request to backend API with the page number and page size,
   * then update the "allUserSubject" in response
   * 
   * @param{number} state - defined which page to state
   *                        0 - previous
   *                        1 - next
   *                        3 - 1st Page
   *                        4 - current Page used after deletion
   * @returns{Observable<any>} - Observable emitting the All user details from the backend
   */
  getUserByPage(state:number):Observable<any> {
    let pageNumber;
    if(state==3) pageNumber=1;
    else if(state==4) pageNumber=this.pageNumber.value;
    else pageNumber = (state==1) ? this.pageNumber.value+1 : this.pageNumber.value-1;
    this.pageNumber.next(pageNumber);
    return this.http.get<any>(`${this.baseUrl}/getUserByPage?pageNumber=${pageNumber}&pageSize=${this.pageSize.value}`).pipe(
      tap(data => {
        this.allUserSubject.next(data.users);
        this.totalCount.next(data.totalCount);
        this.currentPageSize.next(data.currentCount);
      })
    );
  }
  
  /**
   * getUserById - get the particular user based on the ID
   * 
   * send the data if already in "allUserDetails"
   *    or
   * send the backend API request with the id of user or admin,
   * then return the user or admin
   * 
   * @param{number} id - user or admin id want to get
   * @returns{Observable<any>} obserable emitting the user
   */
  getUserById(id:number):Observable<any> {
    if(id == this.autUser.getUser().id) return of(structuredClone(this.autUser.getUser()));

    const checkUser = this.allUserSubject.value.filter(user => user.id == id);

    if(checkUser.length != 0) return of(checkUser[0]);

    return this.http.get<any>(`${this.baseUrl}/getUserById/${id}`);
  }

  /**
   * updateUser - update the userDetails by admin or user by itself
   * 
   * update the currentUser in Auth Service if current user is update there details
   * and
   * send the backend API request with the updateUser Record,
   * then return the updated the record
   * 
   * @param{any} updateUser - user or admin updated record 
   * @returns{Observable<any>} observable emmitting the updated record
   */
  updateUser(updateUser:any):Observable<any> {
    if(updateUser.id == this.autUser.getUser().id) this.autUser.setUser(updateUser);
    return this.http.put<any>(`${this.baseUrl}/updateUser/${updateUser.id}`,updateUser);
  }

  /**
   * deleteUserById - Delete the User or Admin only by the Admin
   * 
   * send the Backend API with the ID,
   * then return the status of deletion
   * 
   * @param{number} id - user or admin id want to delete
   * @returns{Observable<any>} observable emitting the deletion status
   */
  deleteUserById(id:number):Observable<any> {
    this.allUserSubject.next(this.allUserSubject.value.filter(user => user.id != id));
    return this.http.delete<any>(`${this.baseUrl}/deleteUserById/${id}`);
  }

  /** 
   * search - get the User details with the search text and pagination
   * 
   * send the request to backend API with the search text , page number and page size,
   * then update the "allUserSubject" in response
   * 
   * @param{number} state - defined which page to state
   *                        0 - previous
   *                        1 - next
   *                        3 - 1st Page
   *                        4 - current Page used after deletion
   * @returns{Observable<any>} - Observable emitting the finded user details from the backend
   */
  search(searchText:string,state:number):Observable<any> {
    let pageNumber;
    if(state==3) pageNumber=1;
    else if(state==4) pageNumber=this.pageNumber.value;
    else pageNumber = (state==1) ? this.pageNumber.value+1 : this.pageNumber.value-1;
    this.pageNumber.next(pageNumber);
    return this.http.get<any>(`${this.baseUrl}/search/${searchText}?pageNumber=${pageNumber}&pageSize=${this.pageSize.value}`).pipe(
      tap(data => {
        this.allUserSubject.next(data.users);
        this.totalCount.next(data.totalCount);
        this.currentPageSize.next(data.currentCount);
      })
    )
  }
}

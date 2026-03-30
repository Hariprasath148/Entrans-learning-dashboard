import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  /** Backend URl */
  private baseUrl = "https://entrans-leraning-backend.onrender.com/user";
  //private baseUrl = "http://localhost:5058/user";
  
  /** current user Behaviour Subject */
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * validate - validate the user is present or not
   * 
   * send the backend API with the credential,
   * then return the staus with the current user data
   * 
   * @returns{Observable<any>} observable emitting the current user
   */
  validate(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/validate`,{withCredentials : true});
  }

  /**
   * setUser - set the current user
   * 
   * get the user,
   * then set the current user in the behaviour subject "currentUserSUbject" using next
   * 
   * @returns doen't return anything
   */
  setUser(user:any) {
    this.currentUserSubject.next(user);
  }

   /**
   * getUser - return the current user
   * 
   * return the current user value fom the behaviour subject
   * 
   * @returns current user value
   */
  getUser() {
    return this.currentUserSubject.value;
  }
}

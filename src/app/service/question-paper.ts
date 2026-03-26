import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable  , of, Subject} from 'rxjs';
import { Question } from '../Componets/question/question';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class QuestionPaper {

  /** Backend URl */
  private baseUrl = "https://entrans-leraning-backend.onrender.com/questionPaper";
  //private baseUrl = "http://localhost:5058/questionPaper";

  constructor(private http:HttpClient) {}

  /**
   * getALLQuestion - get al the question form the backend
   * 
   * send the request to the Backend API,
   * then return the questions
   * 
   * @returns{Obsevable<any>} Observable emitting allQuestion in array of objects fom backend
   */
  getAllQuestion():Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllQuestions`);
  }   

  /**
   * setAnswer - update the answer
   * 
   * send the request to the Backend API with the answer,
   * then return the status
   * 
   * @returns{Obsevable<any>} Observable emitting answer updated status
   */
  setAnswer(answer:any):Observable<any> {
    console.log(answer);
    return this.http.post<any>(`${this.baseUrl}/editQuestion`,answer);
  }
  
  /**
   * check - check the all the answer
   * 
   * send the request to the Backend API,
   * then return the status
   * 
   * @returns{Obsevable<any>} Observable emitting answer submitted status
   */
  checkAnswer():Observable<any>  {
    return this.http.post<any>(`${this.baseUrl}/submitQuestions`,null);
  }
}
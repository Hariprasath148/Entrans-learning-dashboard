import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable  , of, Subject, tap} from 'rxjs';
import { Question } from '../Componets/question/question';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class QuestionPaper {

  /** Backend URl */
  //private baseUrl = "https://entrans-leraning-backend.onrender.com/questionPaper";
  private baseUrl = "http://localhost:5058/questionPaper";

  private questionPaperSubject = new BehaviorSubject<any>({});
  public questionPaper$ = this.questionPaperSubject.asObservable();

  constructor(private http:HttpClient) {}

  /**
   * getALLQuestion - get al the question form the backend
   * 
   * send the request to the Backend API,
   * then return the questions
   * 
   * @returns{Obsevable<any>} Observable emitting allQuestion in array of objects fom backend
   */
  getAllQuestion(id:number):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllQuestions/${id}`).pipe(
      tap(data => this.questionPaperSubject.next(data))
    );
  }   

  getAllQuestionPaper():Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllQuestionPaper`);
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
    const anwserObject = {
      questionPaperId : this.questionPaperSubject.value.id,
      questionsId : answer.id,
      ...(answer.answerList
        ? { answerList: answer.answerList }
        : { answer : answer.answerText })
    }
    console.log(anwserObject);
    return this.http.post<any>(`${this.baseUrl}/setQuestionPaperAnswer`,anwserObject);
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
    return this.http.post<any>(`${this.baseUrl}/submitQuestions/${this.questionPaperSubject.value.id}`,null);
  }
}
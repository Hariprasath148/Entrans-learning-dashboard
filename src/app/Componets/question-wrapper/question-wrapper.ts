import { ChangeDetectorRef, Component } from '@angular/core';
import { QuestionPaper } from '../../service/question-paper';

@Component({
  selector: 'app-question-wrapper',
  standalone: false,
  templateUrl: './question-wrapper.html',
  styleUrl: './question-wrapper.css',
})
export class QuestionWrapper {

  /**
   * defines the question is fetch or not
   * true - fetch 
   * false - not fetched
   */
  questionStatus = false;

  /**
   * contains the question from the backend
   */
  questions:any = {}; 

  constructor(private questionPaperServie : QuestionPaper , private cd : ChangeDetectorRef) {}

  /**
   * get the question when the component is mounted
   */
  ngOnInit() {
   this.getQuestion();
  }
  
  /**
   * getQuestions - fetch the question
   * 
   * get the question from the backend,
   * then update the question and questionStatus
   * 
   * @returns doen't return anything
   */
  getQuestion() {
    this.questionPaperServie.getAllQuestion().subscribe({
      next : (data) => {
        this.questions = data;
        this.questionStatus = true;
        console.log("This is the fetched Quesitons =",this.questions);
        this.cd.detectChanges();
      },
      error : (error) => {
        this.questionStatus = true;
        console.log("Something Went Wrong",error);
      }
    });
  }

  /**
   * setAnswer - update the answer
   * 
   * send the request to the Backend API with the answer,
   * then again get the question in subcribtion
   * 
   * @returns doen't return anything
   */
  setAnswer(e : any) {
    this.questionPaperServie.setAnswer(e).subscribe(()=> {this.getQuestion()});
  }

   /**
   * check - check the all the answer,
   * then again get the question in subcribtion
   * 
   * @returns doen't return anything
   */
  sumitAnswer() {
    this.questionPaperServie.checkAnswer().subscribe(()=> {this.getQuestion()});
  }

}

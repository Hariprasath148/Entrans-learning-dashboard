import { ChangeDetectorRef, Component } from '@angular/core';
import { QuestionPaper } from '../../service/question-paper';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

   /**
   * error message from the backend
   */
  errorMsg:string = "";

  constructor(private toastr: ToastrService,private questionPaperServie : QuestionPaper , private cd : ChangeDetectorRef,private route : ActivatedRoute) {}

  /**
   * get the question when the component is mounted
   */
  ngOnInit() {
   this.questionPaperServie.questionPaper$.subscribe(data => this.questions = data);
   setTimeout(()=> {this.getQuestion();},1);
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
    this.route.paramMap.subscribe(params => {
      /**
       * get the id from the route
       */
      let id:number = Number(params.get('id'));

      this.questionPaperServie.getAllQuestion(id).subscribe({
        next : (data) => {
          this.questionStatus = true;
          console.log("This is the fetched Quesitons =",this.questions);
          //this.cd.detectChanges();
        },
        error : (error) => {
          this.errorMsg = error.error.message;
          console.log("Something Went Wrong",error);
        }
      });
    })
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
    this.questionPaperServie.checkAnswer().subscribe({
      next :()=> {this.getQuestion()},
      error : (error) => {
        this.toastr.error("First Attend any Question");
      }
    });
  }

}

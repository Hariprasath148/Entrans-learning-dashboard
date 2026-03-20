import { ChangeDetectorRef, Component } from '@angular/core';
import { QuestionPaper } from '../../service/question-paper';

@Component({
  selector: 'app-dash-board',
  standalone: false,
  templateUrl: './question-paper-layout.html',
  styleUrls: ['./question-paper-layout.css'],
})
export class QuestionPaperLayout {

  /**
   * Indicates question is fetch form the backend or not
   * true - fetch 
   * false - not fetched
   * @type {boolean}
   */
  questionStatus: boolean = false;
  /**
   * stores the list of question fetched from the backend
   * @type {any}
   */
  questions:any = {}; 

  constructor(private questionPaperServie : QuestionPaper , private cd : ChangeDetectorRef) {}

  // ngOnInit() {
  //  this.questionPaperServie.getAllQuestion().subscribe({
  //     next : (data) => {
  //       this.questions = data;
  //       this.questionStatus = true;
  //       console.log("This is the fetched Quesitons =",this.questions);
  //     },
  //     error : (error) => {
  //       this.questionStatus = true;
  //       console.log("Something Went Wrong",error);
  //     }
  //   })
  // }
  
  /**
   * getQuestion 
   * 
   * get the question from the backend and update the record in the questions and update the question status
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
   * setAnswer - update the answer in the backend
   * 
   * get the value that is emitted from the child and set the answer in the backend record
   * 
   * @param{any} e - contains the quesiton update record
   */
  setAnswer(e : any) {
    this.questionPaperServie.setAnswer(e).subscribe(()=> {this.getQuestion()});
  }

  /**
   * sumitAnswer - submit the answer in the backend
   * 
   * submit the answer in the backend
   */
  sumitAnswer() {
    this.questionPaperServie.checkAnswer().subscribe(()=> {this.getQuestion()});
  }

} 

import { ChangeDetectorRef, Component } from '@angular/core';
import { QuestionPaper } from '../../service/question-paper';

@Component({
  selector: 'app-question-paper-component',
  standalone: false,
  templateUrl: './question-paper-component.html',
  styleUrl: './question-paper-component.css',
})
export class QuestionPaperComponent {
  public questionPaper:any[] = [];

  public progress:number = 0;

  public loading = true;

  constructor(private questionPaperService:QuestionPaper,private cd : ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(()=> {
        this.questionPaperService.getAllQuestionPaper().subscribe((data)=> {
          this.questionPaper = data.questionPaper;
          this.progress = data.userProgress;
          this.loading = false;
          this.cd.detectChanges();
        });
    },1);
  }

}

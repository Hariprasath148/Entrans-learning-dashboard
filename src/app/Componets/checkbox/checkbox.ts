import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: false,
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {
  /**
   * isSubmitted status of question is sumitted or not
   */
  isSubmitted = input<boolean>(false);
  /**
   * send the output to the parent
   */
  question = input<any>();
  /**
   * question from the parent
   */
  answerChange = output<any>();

  /**
   * answer list
   */
  answer:string[] = [];
  
  /**
   * set the answer if already saved
   */
  ngOnInit() {
    this.answer = this.question().answerList;
  }
  
  /**
   * handleInput - handle the input
   * 
   * get the event e after the chage is happend in the input,
   * then send the data to parent using the output "answerChange"
   * 
   * @param {event} e - event from the input 
   * @returns doen't return anything
   */
  handleInput(e : Event):any {

    if((e.target as HTMLInputElement).checked) {
      this.answer.push((e.target as HTMLInputElement).value);
    }else {
      this.answer=this.answer.filter(a => a !== (e.target as HTMLInputElement).value);
    }

    this.answerChange.emit({
      id : this.question().id,
      answerList : this.answer,
      isAttended : this.answer.length !== 0
    });
  }
}

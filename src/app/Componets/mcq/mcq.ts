import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-mcq',
  standalone: false,
  templateUrl: './mcq.html',
  styleUrl: './mcq.css',
})
export class Mcq {
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
   * handleInput - handle the input
   * 
   * get the event e after the chage is happend in the input,
   * then send the data to parent using the output "answerChange"
   * 
   * @param {event} e - event from the input 
   * @returns doen't return anything
   */
  handleInput(e : Event):any {
    this.answerChange.emit({
      id : this.question().id,
      answerList :  [(e.target as HTMLInputElement).value],
      isAttended : true
    });
  }

}

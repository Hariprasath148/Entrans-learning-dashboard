import { Component , input, output } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  standalone: false,
  templateUrl: './paragraph.html',
  styleUrl: './paragraph.css',
})
export class Paragraph {
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
   * Hide the error when user enter the input without the hite space
   * 
   * @returns doen't return anything
   */
  changeError(e :Event) {
    if((e.target as HTMLInputElement).value.length == 0) this.question().isAttended=false;
    else this.question().isAttended=true;
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
    if((e.target as HTMLInputElement).value.length == 0) {
      return;
    }
    this.answerChange.emit({
      id : this.question().id,
      answerText : (e.target as HTMLInputElement).value,
      isAttended : (((e.target as HTMLInputElement).value).trim()).length !== 0
    });
  }
}

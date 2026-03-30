import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-question',
  standalone: false,
  templateUrl: './question.html',
  styleUrl: './question.css',
})
export class Question {
  /**
   * isSubmitted status of question is sumitted or not
   */
  isSubmitted = input<boolean>(false);
  /**
   * send the output to the parent
   */
  getChildAnswer = output();
  /**
   * question from the parent
   */
  question = input<any>();

  questionNumber = input<number>();

  /**
   * send the answer to parent container
   * 
   * @param {any} e - send the child to the parrent
   * 
   * @returns doen't return anything
   */
  sendToParentAnswer(e : any) {
    this.getChildAnswer.emit(e);
  }
}

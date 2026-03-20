import { TestBed } from '@angular/core/testing';

import { QuestionPaper } from './question-paper';

describe('QuestionPaper', () => {
  let service: QuestionPaper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionPaper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

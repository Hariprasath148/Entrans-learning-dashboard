import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionWrapper } from './question-wrapper';

describe('QuestionWrapper', () => {
  let component: QuestionWrapper;
  let fixture: ComponentFixture<QuestionWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

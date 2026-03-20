import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPaperLayout } from './question-paper-layout';

describe('QuestionPaperLayout', () => {
  let component: QuestionPaperLayout;
  let fixture: ComponentFixture<QuestionPaperLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionPaperLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionPaperLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

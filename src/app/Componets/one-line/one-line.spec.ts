import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneLine } from './one-line';

describe('OneLine', () => {
  let component: OneLine;
  let fixture: ComponentFixture<OneLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneLine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneLine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleProgressComponent } from './circle-progress';

describe('CircleProgressComponent', () => {
  let component: CircleProgressComponent;
  let fixture: ComponentFixture<CircleProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update dashOffset when progress changes', () => {
    component.progress = 75;
    component.ngOnChanges();
    expect(component.dashOffset).toBeLessThan(component.circumference);
  });

  it('should set progress to 0 by default', () => {
    expect(component.progress).toBe(0);
  });
});

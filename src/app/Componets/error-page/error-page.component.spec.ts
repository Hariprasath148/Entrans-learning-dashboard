import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorPageComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard on goBackToDashboard', () => {
    component.goBackToDashboard();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should reload page on retry', () => {
    spyOn(window.location, 'reload');
    component.retry();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should start countdown and auto-redirect', (done) => {
    component.countdownSeconds = 2;
    spyOn(component, 'goBackToDashboard');
    component.startCountdown();

    expect(component.showCountdown).toBe(true);

    setTimeout(() => {
      expect(component.goBackToDashboard).toHaveBeenCalled();
      done();
    }, 2100);
  });

  it('should initialize with countdown disabled', () => {
    expect(component.showCountdown).toBe(false);
  });
});

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: false,
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export class ErrorPageComponent implements OnInit {
  countdownSeconds: number = 10;
  showCountdown: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Optional: Auto-redirect after 10 seconds
    // Uncomment below to enable auto-redirect
    // this.startCountdown();
  }

  /**
   * goBackToDashboard - Navigate back to dashboard
   */
  goBackToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  /**
   * retry - Reload the current page
   */
  retry() {
    window.location.reload();
  }

  /**
   * startCountdown - Start auto-redirect countdown
   */
  startCountdown() {
    this.showCountdown = true;
    const interval = setInterval(() => {
      this.countdownSeconds--;
      if (this.countdownSeconds <= 0) {
        clearInterval(interval);
        this.goBackToDashboard();
      }
    }, 1000);
  }
}

import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  standalone: false,
  templateUrl: './circle-progress.html',
  styleUrl: './circle-progress.css'
})
export class CircleProgressComponent implements OnChanges {
  @Input() progress: number = 0;

  radius = 30;
  circumference = 2 * Math.PI * this.radius;
  dashOffset = this.circumference;
  
  constructor(private cd:ChangeDetectorRef) {}

  ngOnChanges() {
    setTimeout(() => {this.setProgress(this.progress);},1);
  }

  setProgress(value: number) {
    const percent = value / 100;
    this.progress = 1;
    this.dashOffset = this.circumference * (1 - percent);
    const Interval = setInterval(()=> {
        if(this.progress >= value) {
            clearInterval(Interval);
            return;
        }
        this.progress++;
        this.cd.detectChanges(); 
    },40);
  }
}

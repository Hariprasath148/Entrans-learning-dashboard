import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { Loader } from './service/loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {

  // public isLoading:boolean = false;

  constructor(public loadingService : Loader , private cd : ChangeDetectorRef){}

}

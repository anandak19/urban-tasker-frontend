import { Component, ViewChild } from '@angular/core';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { ChooseTaskerComponent } from '../components/choose-tasker/choose-tasker.component';
import { AboutTaskComponent } from '../components/about-task/about-task.component';

@Component({
  selector: 'app-book-tasker-layout',
  imports: [
    MatStep,
    MatStepperModule,
    ChooseTaskerComponent,
    AboutTaskComponent,
  ],
  templateUrl: './book-tasker-layout.component.html',
  styleUrl: './book-tasker-layout.component.scss',
})
export class BookTaskerLayoutComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  onNextPage() {
    window.scroll(0, 0);
    this.stepper.next();
  }

  onPrevPage() {
    window.scroll(0, 0);
    this.stepper.previous();
  }
}

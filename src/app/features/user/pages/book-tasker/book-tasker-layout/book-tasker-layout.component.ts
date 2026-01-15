import { Component, OnDestroy } from '@angular/core';
import { MatStep } from '@angular/material/stepper';
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
export class BookTaskerLayoutComponent implements OnDestroy {
  ngOnDestroy(): void {
    //
    console.log('Distroy ');
  }
}

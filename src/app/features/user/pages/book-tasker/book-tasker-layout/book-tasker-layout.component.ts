import { Component } from '@angular/core';
import { MatStep } from '@angular/material/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { AboutTaskComponent } from '../components/about-task/about-task.component';
import { WhenAndWhereComponent } from '../components/when-and-where/when-and-where.component';

@Component({
  selector: 'app-book-tasker-layout',
  imports: [
    MatStep,
    MatStepperModule,
    AboutTaskComponent,
    WhenAndWhereComponent,
  ],
  templateUrl: './book-tasker-layout.component.html',
  styleUrl: './book-tasker-layout.component.scss',
})
export class BookTaskerLayoutComponent {}

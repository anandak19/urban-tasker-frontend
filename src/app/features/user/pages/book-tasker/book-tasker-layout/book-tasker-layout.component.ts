import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { ChooseTaskerComponent } from '../components/choose-tasker/choose-tasker.component';
import { IOptionData } from '@shared/models/form-inputs.model';
import { BookingStateService } from '@features/user/services/book-tasker/book-tasker/booking-state.service';
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
export class BookTaskerLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;

  selectedCategory!: IOptionData;
  selectedSubCategory!: IOptionData;

  private _bookingStateService = inject(BookingStateService);

  onNextPage() {
    window.scroll(0, 0);
    this.stepper.next();
  }

  onPrevPage() {
    window.scroll(0, 0);
    this.stepper.previous();
  }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  ngOnDestroy(): void {
    this._bookingStateService.reset();
  }
}

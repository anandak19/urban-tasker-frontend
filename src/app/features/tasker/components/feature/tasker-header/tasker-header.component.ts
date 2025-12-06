import { Component } from '@angular/core';
import { BrandComponent } from '@shared/components/brand/brand.component';

@Component({
  selector: 'app-tasker-header',
  imports: [BrandComponent],
  templateUrl: './tasker-header.component.html',
  styleUrl: './tasker-header.component.scss',
})
export class TaskerHeaderComponent {}

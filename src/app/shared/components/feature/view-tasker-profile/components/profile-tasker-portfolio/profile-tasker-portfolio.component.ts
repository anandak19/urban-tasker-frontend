import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-tasker-portfolio',
  imports: [],
  templateUrl: './profile-tasker-portfolio.component.html',
  styleUrl: './profile-tasker-portfolio.component.scss',
})
export class ProfileTaskerPortfolioComponent implements OnInit {
  ngOnInit(): void {
    console.log('Portfolio');
  }
}

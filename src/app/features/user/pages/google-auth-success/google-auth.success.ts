import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '@core/services/token/token.service';

@Component({
  templateUrl: './google-auth.success.html',
})
export class GoogleAuthSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _tokenService = inject(TokenService);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['accessToken'];
      if (accessToken) {
        this._tokenService.setAccessToken(accessToken);
        this._router.navigate(['/']);
      }
    });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { SignalingService } from '@core/services/signaling/signaling.service';
import { SocketManagerService } from '@core/services/socket-manager/socket-manager.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  private _socektService = inject(SocketManagerService);
  private _authGuardService = inject(AuthGuardService);
  private _signalingService = inject(SignalingService);

  connectToSocket() {
    this._authGuardService.fetchLoginUser().subscribe({
      next: () => {
        this._socektService.connect();
        this._signalingService.listenToEvents();
      },
    });
  }

  ngOnInit(): void {
    this.connectToSocket();
  }
}

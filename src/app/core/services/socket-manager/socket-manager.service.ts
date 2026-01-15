import { inject, Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

export interface ISocketExeption {
  code: string;
  message: string;
}

export interface SocketAck<T = unknown> {
  success: boolean;
  data?: T;
  code?: 'TOKEN_EXPIRED' | 'FORBIDDEN';
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketManagerService implements OnDestroy {
  private socket!: Socket;
  private readonly SOCKET_URL = 'http://localhost:3000';

  private refreshInProgress = false;
  private refreshPromise?: Promise<void>;

  private _authService = inject(AuthService);

  /* -------------------- CONNECTION -------------------- */
  // call on login or anywhere
  connect(): void {
    if (this.socket?.connected) return;

    this.socket = io(this.SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.registerCoreListeners();
  }

  onConnect(cb: () => void) {
    this.socket?.on('connect', cb);
  }

  /** Disconnect socket */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  /* -------------------- EVENTS -------------------- */

  /** Non auth events */
  emit<T = unknown>(event: string, payload?: T): void {
    if (!this.socket) return;
    this.socket.emit(event, payload);
  }

  // for Auth events
  // whenever the socket action depends on authentication
  async safeEmit<TPayload = unknown, TAckData = unknown>(
    event: string,
    payload: TPayload,
  ): Promise<TAckData> {
    try {
      return await this.emitWithAck<TPayload, TAckData>(event, payload);
    } catch (err: unknown) {
      const error = err as ISocketExeption;
      if (error.code === 'TOKEN_EXPIRED') {
        return this.refreshWithRetry<TPayload, TAckData>(event, payload);
      }
      throw err;
    }
  }

  private emitWithAck<TPayload = unknown, TData = unknown>(
    event: string,
    payload?: TPayload,
  ): Promise<TData> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        return reject(new Error('Socket not connected'));
      }

      this.socket.emit(event, payload, (ack: SocketAck<TData>) => {
        if (!ack || ack.success === false) {
          return reject(ack);
        }

        resolve(ack.data as TData);
      });
    });
  }

  /* -------------------- LISTNER -------------------- */

  /** Listen to event as Observable */
  listen<T = unknown>(event: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      if (!this.socket) return;

      const handler = (data: T) => subscriber.next(data);
      this.socket.on(event, handler);

      return () => {
        this.socket.off(event, handler);
      };
    });
  }

  /* -------------------- ERROR HANDLER -------------------- */
  private async refreshWithRetry<TPayload = unknown, TAck = unknown>(
    event: string,
    data?: TPayload,
  ): Promise<TAck> {
    if (!this.refreshInProgress) {
      this.refreshInProgress = true;

      this.refreshPromise = new Promise<void>((resolve, reject) => {
        this._authService.refreshToken().subscribe({
          next: () => {
            this.refreshInProgress = false;
            resolve();
          },
          error: (err) => {
            this.refreshInProgress = false;
            this._authService.logout();
            reject(err);
          },
        });
      });
    }

    await this.refreshPromise;

    return this.emitWithAck<TPayload, TAck>(event, data);
  }

  /* -------------------- CORE LISTENERS -------------------- */

  private registerCoreListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('[Socket] Connected:', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.warn('[Socket] Disconnected:', reason);

      if (reason === 'io server disconnect') {
        console.log('Server disconnected the socket');
      }
    });

    this.socket.on('authError', (err: { code: string }) => {
      console.error('[Socket] Auth error:', err.code);

      if (err.code === 'NO_ACCESS_TOKEN' || err.code === 'INVALID_TOKEN') {
        this._authService.refreshToken().subscribe({
          next: () => {
            this.connect();
          },
        });
        this.disconnect();
      }
    });
  }
}

export interface ISocketExeption {
  code: string;
  message: string;
}

export interface ISocketEvent {
  event: string;
  payload: unknown;
}

export interface SocketAck<T = unknown> {
  success: boolean;
  data?: T;
  code?: 'TOKEN_EXPIRED' | 'FORBIDDEN';
  message?: string;
}

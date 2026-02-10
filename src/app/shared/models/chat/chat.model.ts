import { MessageType } from '@shared/constants/enums/message-type.enum';

export interface ISendMessage {
  roomId: string;
  type: MessageType;
  message?: string;
  publicKey?: string;
}

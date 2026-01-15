import { MessageType } from '@shared/constants/enums/message-type.enum';

export interface IChatUsers {
  id: string;
  unReadMessageCount?: number;
  partner: {
    name: string;
    id: string;
    image?: string;
  };
}

export interface IMessage {
  senderId: string;
  roomId: string;
  text: string;
  isRead: boolean;
  time: string;
  id: string;
  type: MessageType;
  imageUrl?: string;
}

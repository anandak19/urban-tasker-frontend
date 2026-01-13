export interface IChatUsers {
  id: string;
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
  id: string;
}

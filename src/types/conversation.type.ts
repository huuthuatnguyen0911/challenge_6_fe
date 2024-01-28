export interface Conversation {
  _id: string;
  channel_name: string;
  description: string;
  roomId: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}
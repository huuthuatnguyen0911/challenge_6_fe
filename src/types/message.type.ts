export interface Message {
  result: IMessage[]
  limit: number,
  page: number,
  total_page: number,
}

export interface IMessage {
  _id: string,
  conversation: string,
  sender: string,
  content: string,
  username: string,
  time: string,
  avatar: string,
  created_at: Date,
  updatedAt: string,
}
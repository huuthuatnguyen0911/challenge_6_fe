import { Message } from 'src/types/message.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/https'

const messageApi = {
  getMessageByRoomId(roomId: string, limit: string, page: string) {
    return http.get<SuccessResponse<Message>>(`/messages/get-message/${roomId}`, {
      params: {
        limit,
        page,
      }
    })
  }
}

export default messageApi
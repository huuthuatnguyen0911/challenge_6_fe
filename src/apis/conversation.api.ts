import { Conversation } from 'src/types/conversation.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/https'

const conversationApi = {
  createChannel(body: { channel_name: string; description: string }) {
    return http.post<SuccessResponse<Conversation>>('/conversation/create-group', body)
  },
  getAllChannel() {
    return http.get<SuccessResponse<any>>('/conversation/get-all-group')
  }
}

export default conversationApi

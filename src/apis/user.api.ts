import { User } from 'src/types/user.type';
import { SuccessResponse } from './../types/utils.type';
import http from "src/utils/https"

interface BodyUpdateProfile extends Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'email'> {
  newPassword?: string
}

const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('users/me')
  },
  getProfileById(id: string) {
    return http.get<SuccessResponse<User>>(`users/search/${id}`)
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.patch<SuccessResponse<User>>('users/me', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>('medias/upload-image', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  updatePassword(body: { newPassword: string }) {
    return http.put<SuccessResponse<string>>('users/change-password', body)
  }
}

export default userApi

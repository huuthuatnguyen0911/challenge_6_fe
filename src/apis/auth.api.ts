import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/https'

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('/users/register', body),
  login: (body: { email: string; password: string }) => http.post<AuthResponse>('/users/login', body),
  logout: () => http.post('/users/logout')
}

export default authApi

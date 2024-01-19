/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { AuthResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokentoLS, setProfileToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'http://localhost:4000/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        const data = response.data as AuthResponse
        if (url === '/users/login' || url === '/users/register') {
          this.accessToken = (response.data as AuthResponse).data.access_token
          setAccessTokentoLS(this.accessToken)
          setProfileToLS(data.data.user)

        } else if (url === '/users/logout') {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | unknown = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        console.log(error)
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http

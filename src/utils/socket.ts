import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_API_URL as string)

export default socket
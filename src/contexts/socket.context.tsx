import { createContext, useContext, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { EVENTS } from 'src/config/events'

interface SocketContextProps {
  username?: string
  setUsername: Function
  socket: Socket
  roomId?: string
  currentroomId?: string
  rooms: any
  messages: { message: string; username: string; time: string; avatar: string }[]
  setMessages: Function
  setAvatar: Function
  currentRoom: string
  setCurrentRoom: Function
  setCurrentRoomId: Function
  setRooms: Function
  showChannelList: boolean
  setShowChannelList: Function
}

const socket = io(import.meta.env.VITE_API_URL_SOCKET as string)

const SocketContext = createContext<SocketContextProps>({
  socket,
  rooms: {},
  messages: [],
  setMessages: () => {},
  setUsername: () => {},
  setAvatar: () => {},
  currentRoom: '',
  setCurrentRoom: () => {},
  setCurrentRoomId: () => {},
  setRooms: () => {},
  showChannelList: false,
  setShowChannelList: () => {}
})

function SocketProvider(props: any) {
  const [avatar, setAvatar] = useState('')
  const [username, setUsername] = useState('')
  const [roomId, setRoomId] = useState<string>('')
  const [rooms, setRooms] = useState({})
  const [messages, setMessages] = useState<any>([])
  const [currentRoom, setCurrentRoom] = useState('')
  const [currentroomId, setCurrentRoomId] = useState('')
  const [showChannelList, setShowChannelList] = useState(false)

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value)
  })

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value)
    setMessages([])
  })

  socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ roomId, message, username, time, avatar }) => {
    if (currentroomId !== roomId) return
    if (currentroomId === roomId) {
      setMessages([
        ...messages,
        {
          message,
          username,
          time,
          avatar
        }
      ])
    }
  })

  return (
    <SocketContext.Provider
      value={{
        socket,
        rooms,
        roomId,
        messages,
        setMessages,
        username,
        setUsername,
        avatar,
        setAvatar,
        currentRoom,
        setCurrentRoom,
        setCurrentRoomId,
        currentroomId,
        setRooms,
        showChannelList,
        setShowChannelList
      }}
      {...props}
    />
  )
}

export const useSockets = () => useContext(SocketContext)

export default SocketProvider

import React, { useContext, useRef, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useSockets } from 'src/contexts/socket.context'
import { EVENTS } from 'src/config/events'
import { formatDate } from 'src/utils/utils'

export default function InputTypeChat() {
  const { socket, messages, setMessages, currentroomId } = useSockets()
  const newMessageRef = useRef(null)
  const [value, setValue] = useState('')
  const { profile } = useContext(AppContext)
  const { name: username, avatar, _id } = profile || {}
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = (newMessageRef.current as any).value
    if (!String(message).trim()) {
      return
    }

    const currentDate = formatDate(new Date())

    if (!currentroomId) return
    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
      content: message,
      roomId: currentroomId,
      username,
      avatar,
      userId: _id,
      time: currentDate
    })

    setMessages([
      ...messages,
      {
        currentroomId,
        content: message,
        username: 'You',
        avatar,
        time: currentDate
      }
    ])

    setValue('')
  }
  return (
    <>
      <div className='container mx-auto px-4 lg:px-10 mb-6 mt-4'>
        <form onSubmit={handleSendMessage}>
          <div className='flex items-center bg-mGray3 rounded h-12 p-2'>
            <input
              style={{ minWidth: 0 }}
              className='bg-transparent text-mBlue text-sm font-bold h-full w-full px-2 mr-4'
              type='text'
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder='Type a message here...'
              ref={newMessageRef}
            />
            <button type='submit' className='flex items-center justify-center bg-mBlue px-2 py-2 rounded'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='18px' height='18px'>
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

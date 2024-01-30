import { useContext, useEffect, useRef, useState } from 'react'
import SidebarChannels from 'src/components/ChatComponent/SidebarChannels/SidebarChannels'
import default_user from '../../assets/default_user.png'
import Helmet from 'src/components/Helmet/Helmet'
import SidebarUsers from 'src/components/ChatComponent/SidebarUsers/SidebarUsers'
import { useSockets } from 'src/contexts/socket.context'
import ProfileUserChat from 'src/components/ProfileUserChat/ProfileUserChat'
import InputTypeChat from 'src/components/ChatComponent/InputTypeChat/InputTypeChat'
import { useMutation } from '@tanstack/react-query'
import messageApi from 'src/apis/message.api'
import { AppContext } from 'src/contexts/app.context'
import { IMessage } from 'src/types/message.type'
import InfiniteScroll from 'react-infinite-scroll-component'

const LIMIT = 10
const PAGE = 1
export default function ChatPage() {
  const { messages, currentRoom, showChannelList, setMessages, currentroomId } = useSockets()
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [pagination, setPagination] = useState({ total_page: 0, page: PAGE })
  const { profile } = useContext(AppContext)
  useEffect(() => {
    messagesContainerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const { mutate: getMessages } = useMutation({
    mutationFn: ({ roomId, limit, page }: { roomId: string; limit: string; page: string }) =>
      messageApi.getMessageByRoomId(roomId, limit, page),
    onSuccess: (data) => {
      const result = data?.data?.data?.result
      if (data && result !== null) {
        result.map((item: IMessage) => {
          if (item.sender === profile?._id) {
            item.username = 'You'
          }
        })
        setMessages(result)
      }
    }
  })

  useEffect(() => {
    if (currentroomId) {
      getMessages({ roomId: currentroomId, limit: (10).toString(), page: (1).toString() })
    }
  }, [currentroomId])

  const fetchMoreConversations = () => {
    console.log('fetchMoreConversations')
  }

  return (
    <div className='h-screen w-full flex'>
      <Helmet children='Chat group' />
      <div className='sidebar fixed inset-0 lg:block bg-transparent lg:w-mSidebar lg:relative bg-[#120f13]'>
        <div
          // onClick={closeSidebar}
          className='w-8 h-8 flex justify-center items-center fixed lg:hidden font-bold text-xl bg-mBlue rounded text-white z-50'
          style={{ top: '0', left: '325px' }}
        >
          X
        </div>
        <div className='flex flex-col w-mSidebar h-full overflow-hidden bg-darkBg'>
          {!showChannelList && <SidebarChannels></SidebarChannels>}
          {showChannelList && <SidebarUsers></SidebarUsers>}

          <ProfileUserChat />
        </div>
      </div>

      {/* Chat Content */}
      <div className='flex flex-col bg-chatBg w-full overflow-hidden'>
        {/* Tên channel */}

        <header className='h-16 flex flex-none items-center shadow-lg w-full mb-2'>
          <div className='container mx-auto flex items-center px-4 lg:px-10'>
            <div className='lg:hidden mr-4'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='24px' height='24px'>
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
              </svg>
            </div>
            <h2 className='font-bold text-white uppercase'>{currentRoom || 'WELCOME CHAT'}</h2>
          </div>
        </header>

        {currentRoom && (
          <>
            {/* Hiển thị tin nhắn ở đây */}
            <div
              id='scrollableDiv'
              style={{
                height: 'h-full',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse'
              }}
            >
              {/*Put the scroll bar always on the bottom*/}
              <InfiniteScroll
                dataLength={messages.length}
                next={fetchMoreConversations}
                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget='scrollableDiv'
              >
                <div className='container mx-auto px-4 lg:px-10 h-auto flex-auto overflow-y-auto'>
                  <div className='h-full'>
                    {messages.map(({ content, username, avatar, time }, index) => (
                      <ul key={index} className='h-auto'>
                        <h3
                          style={{
                            lineHeight: '0.1em',
                            margin: '10px 0 20px',
                            borderColor: '#ffffff1f'
                          }}
                          className='w-full border-b text-center border-opacity-25'
                        >
                          <span style={{ padding: '0 10px' }} className='bg-chatBg'>
                            {/* {date} */}
                          </span>
                        </h3>
                        <div className={`flex mb-6 `}>
                          <img className='w-10 h-10 rounded' src={avatar || default_user} />
                          <div className='ml-6'>
                            <div className='text-mGray font-bold mb-2'>
                              {username}
                              <span className='font-normal text-xs ml-6'>{time}</span>
                            </div>
                            <div className='text-mWhite font-normal text-sm break-all'>{content}</div>
                          </div>
                        </div>
                      </ul>
                    ))}
                    <div ref={messagesContainerRef} />
                  </div>
                </div>
              </InfiniteScroll>
            </div>

            {/* Input nhập tin nhắn chat */}
            <InputTypeChat />
          </>
        )}
      </div>
    </div>
  )
}

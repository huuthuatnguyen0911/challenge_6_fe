import { useContext } from 'react'
import ConnectedUsers from '../ConnectedUsers/ConnectedUsers'
import { useSockets } from 'src/contexts/socket.context'
import { AppContext } from 'src/contexts/app.context'

export default function SidebarUsers() {
  const { channel, setChannel } = useContext(AppContext)
  const { setShowChannelList, showChannelList, setCurrentRoom } = useSockets()
  return (
    <>
      {' '}
      <header className='h-16 flex items-center shadow-lg w-full mb-2 px-4'>
        <div
          className='cursor-pointer text-mWhite'
          onClick={() => setShowChannelList(!showChannelList, setChannel === null, setCurrentRoom(''))}
        >
          <span className='font-bold mr-4'>{'<'}</span>
          <span className='font-bold'>All channels</span>
        </div>
      </header>
      <div className='px-4 h-full overflow-y-auto text-white'>
        <div className='mt-6'>
          <h3 className='uppercase font-bold text-xl mb-3'>{channel?.channel_name}</h3>
          <p>{channel?.description}</p>
        </div>
        <ConnectedUsers />
      </div>
    </>
  )
}

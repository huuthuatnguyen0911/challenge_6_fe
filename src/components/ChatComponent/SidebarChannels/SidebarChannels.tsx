import { Dialog } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import conversationApi from 'src/apis/conversation.api'
import { EVENTS } from 'src/config/events'
import { AppContext } from 'src/contexts/app.context'
import { useSockets } from 'src/contexts/socket.context'
import { ConversationSchema, conversationSchema } from 'src/utils/rule'
import search from '../../../assets/search.svg'
import Button from '../../Button/Button'
import { set } from 'lodash'
import { transformName } from 'src/utils/utils'

type FormData = ConversationSchema

export default function SidebarChannels() {
  const { profile } = useContext(AppContext)
  let [isOpen, setIsOpen] = useState(false)
  const { socket, roomId, rooms, setCurrentRoom, setRooms, setCurrentRoomId, setMessages } = useSockets()
  const newRoomRef = useRef<HTMLInputElement>(null)
  const [roomsData, setRoomsData] = useState<any[]>([])

  const { data: allRooms } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => conversationApi.getAllChannel()
  })

  // console.log('rooms', rooms['O5nFTrgXdZHQqk8QCM0ek'].name)
  // const allRoomsData = allRooms?.data.data
  // Object.keys(allRoomsData).map((key) => {
  //   return (rooms[key] = allRoomsData[key])
  // })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(conversationSchema)
  })

  const { mutate: createChannelMutation } = useMutation({
    mutationFn: (body: FormData) => conversationApi.createChannel(body)
  })

  const { mutate: getAllRooms } = useMutation({
    mutationFn: () => conversationApi.getAllChannel(),
    onSuccess: (rs) => {
      console.log(rs)
      if (rs && rs.data) {
        setRoomsData(rs.data.data ?? [])
      }
    }
  })
  const onSubmit = handleSubmit((data) => {
    // createChannelMutation(data, {
    //   onSuccess: (data) => {
    setIsOpen(false)
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { ...data, userId: profile?._id })
    getAllRooms()
    //   }
    // })
  })

  function handleJoinRoom(room: any) {
    if (room.roomId === roomId) return
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, room.roomId)
    setCurrentRoomId(room.roomId)
    setCurrentRoom(room.channel_name)
    setMessages([])
  }

  useEffect(() => {
    getAllRooms()
  }, [])

  return (
    <>
      <header className='h-16 flex flex-none items-center shadow-lg w-full mb-2 px-4'>
        <div className='flex justify-between items-center cursor-pointer w-full'>
          <span className='font-bold mr-4 text-white'>Channels</span>
          <span
            onClick={() => setIsOpen(true)}
            className='font-bold text-xl h-8 w-8 rounded text-white bg-mBg flex justify-center items-center hover:bg-mBlue hover:text-white transition-all duration-300'
          >
            {' '}
            +{' '}
          </span>
        </div>
      </header>

      {/* Search Input */}
      <div className='px-4 mb-6'>
        <div className='mb-4'>
          <div className='flex bg-[#3C393F] items-center border px-2 py-1 border-mGray-2 rounded-md  '>
            <img className='w-6 h-6' src={search} />

            <input
              style={{ minWidth: 0 }}
              className='bg-[#3C393F] ml-2 w-full h-full p-2 text-white rounded-md outline-none'
              type='text'
              name='search'
              placeholder='Search...'
            />
          </div>
        </div>
      </div>

      {/* List of channels */}
      <div className='h-full px-4 overflow-y-auto'>
        <div className='h-auto'>
          {/* <h3 className="font-bold text-xl uppercase my-8">Members</h3> */}
          <ul>
            {
              roomsData.map((room, index) => (
                <li
                  key={index}
                  onClick={() => handleJoinRoom(room)}
                  className='group p-2 flex items-center mb-8 cursor-pointer rounded hover:bg-chatBg transition-colors duration-300'
                >
                  <span className='flex items-center justify-center uppercase h-8 min-w-8 rounded bg-mBlue text-white font-bold mr-4 '>
                    {transformName(room.channel_name)}
                    {/* {room.channel_name} */}
                  </span>
                  <span className='uppercase font-bold text-white transition-colors duration-300'>
                    {room.channel_name}
                  </span>
                </li>
              ))
              // Object.keys(rooms).map((key) => {
              //   return (
              //     <li
              //       key={key}
              //       onClick={() => handleJoinRoom(key)}
              //       className='group p-2 flex items-center mb-8 cursor-pointer rounded hover:bg-chatBg transition-colors duration-300'
              //     >
              //       <span className='flex items-center justify-center uppercase h-8 min-w-8 rounded bg-mBlue text-white font-bold mr-4 '>
              //         {/* {transformName(rooms[key].name)} */}
              //         {rooms[key].name}
              //       </span>
              //       <span className='uppercase font-bold text-white transition-colors duration-300'>
              //         {rooms[key].name}
              //       </span>
              //     </li>
              //   )
              // })
            }
          </ul>
        </div>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          <Dialog.Panel className='mx-auto max-w-screen-md rounded bg-[#120F13]'>
            <Dialog.Title>
              <div className='flex-auto'>
                <div className='rounded-lg sm:shadow-sm mx-auto mb-3 py-2 sm:pt-[34px] sm:pb-[22px]'>
                  <div className='pt-0 sm:px-[34px] container'>
                    <form className='space-y-2' noValidate onSubmit={onSubmit}>
                      <p className='uppercase text-[#F2F2F2] font-bold text-[18px] mb-6'>New channel</p>
                      <div className='relative'>
                        <input
                          className='w-[512px] py-3 px-4 rounded-lg text-white bg-mGray3 mb-6'
                          type='text'
                          placeholder='Channel name'
                          {...register('channel_name')}
                          name='channel_name'
                          // ref={newRoomRef}
                        />
                        <p className='text-sm mt-2 font-medium text-destructive text-red-600'>
                          {errors.channel_name?.message}
                        </p>
                      </div>
                      <div className='relative'>
                        <textarea
                          className='w-[512px] py-3 px-4 rounded-lg text-white bg-mGray3 mb-4'
                          placeholder='Channel Description'
                          rows={3}
                          {...register('description')}
                          name='description'
                        />
                        <p className='text-sm mt-2 font-medium text-destructive text-red-600'>
                          {errors.description?.message}
                        </p>
                      </div>
                      <Button
                        type='submit'
                        // onClick={handleSubmitt}
                        className='bg-blue-600 px-[30px] py-[7px] text-white rounded-md flex items-start justify-items-end ml-auto'
                      >
                        Save
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </Dialog.Title>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

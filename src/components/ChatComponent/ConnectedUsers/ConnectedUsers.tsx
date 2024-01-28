import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import userApi from 'src/apis/user.api'
import { AppContext } from 'src/contexts/app.context'
import { User } from 'src/types/user.type'
import default_user from '../../../assets/default_user.png'

export default function ConnectedUsers() {
  const { channel } = useContext(AppContext)
  const [members, setMembers] = useState<User[]>([])

  const { mutate: getUserInChannel } = useMutation({
    mutationFn: (id: string) => userApi.getProfileById(id),
    onSuccess: (data) => {
      if (data && data.data) {
        setMembers((prevMembers) => [...prevMembers, data.data.data])
      }
    }
  })

  useEffect(() => {
    channel?.members.map((member) => {
      getUserInChannel(member)
    })
  }, [channel])

  return (
    <div className='h-auto'>
      <h3 className='font-bold text-xl uppercase my-8'>Members</h3>
      <ul>
        {members.map((member, index) => (
          <li key={index} className='flex items-center mb-8'>
            <img className='w-10 h-10 rounded mr-6' src={member?.avatar || default_user} />
            {member?.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

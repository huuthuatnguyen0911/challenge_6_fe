import React from 'react'
import FooterModal from 'src/components/FooterModel/FooterModal'
import Header from 'src/components/Header/Header'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <FooterModal className='max-w-[1248px] w-[73%] py-8' />
    </div>
  )
}

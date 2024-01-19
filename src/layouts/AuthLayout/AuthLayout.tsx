import React from 'react'
import FooterModal from 'src/components/FooterModel/FooterModal'

interface Props {
  children?: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div>
      {children}
      <FooterModal />
    </div>
  )
}

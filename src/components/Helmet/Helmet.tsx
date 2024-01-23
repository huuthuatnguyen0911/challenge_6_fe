import React from 'react'
import HelmetExport from 'react-helmet'

type Props = {
  children: React.ReactNode
}

export default function Helmet({ children }: Props) {
  return (
    <>
      <HelmetExport>
        <link rel='icon' type='image/svg+xml' href='/vite.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='Helmet application' />
        <title>{children}</title>
      </HelmetExport>
    </>
  )
}

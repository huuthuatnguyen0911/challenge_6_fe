import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange?: (file: File) => void
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dung lượng upload tối đa 1MB. Định dạng ảnh phải là jpg, jpeg, png', { position: 'top-center' })
    } else {
      onChange && onChange(fileFromLocal as File)
    }
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        type='file'
        className='hidden'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(e) => {
          ;(e.target as any).value = null
        }}
      />
      <button type='button' className='sr-only text-sm uppercase text-secondary sm:not-sr-only' onClick={handleUpload}>
        Change photo
      </button>
    </>
  )
}

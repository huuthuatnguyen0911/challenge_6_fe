import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessages?: string
  className?: string
  classNameInput?: string
}
export default function InputNumber({ errorMessages, className, classNameInput, onChange, ...rest }: Props) {
  const hanleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e)
    }
  }
  const classInput = classNameInput
    ? classNameInput
    : 'flex h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-primary ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-12'
  return (
    <div className={className}>
      <input {...rest} className={classInput} onChange={hanleChange} />
      <p className='text-sm mt-2 font-medium text-destructive text-red-600'>{errorMessages}</p>
    </div>
  )
}

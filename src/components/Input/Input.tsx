import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessages?: string
  className?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: string
}
export default function Input({ errorMessages, className, name, register, rules, classNameInput, ...rest }: Props) {
  const registerResult = register && name ? register(name, rules) : null
  const classInput = classNameInput
    ? classNameInput
    : 'flex h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-primary ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-12'
  return (
    <div className={className}>
      {' '}
      <input {...registerResult} {...rest} className={classInput} />
      <p className='text-sm mt-2 font-medium text-destructive text-red-600'>{errorMessages}</p>
    </div>
  )
}

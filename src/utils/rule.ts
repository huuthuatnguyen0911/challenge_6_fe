/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password']?: RegisterOptions }
export const getRules = (): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Email có độ dài từ 5-160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Email có độ dài từ 5-160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Password có độ dài từ 6-160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Password có độ dài từ 6-160 ký tự'
    },
    pattern: {
      value: /^(?=.*[A-Z])/,
      message: 'Password phải có ít nhất 1 ký tự viết hoa'
    },
  },
})

export const schema = yup.object({
  email: yup
    .string()
    .email('Email không đúng định dạng')
    .required('Email là bắt buộc')
    .min(5, 'Email có độ dài từ 5-160 ký tự')
    .max(160, 'Email có độ dài từ 5-160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Password tối thiểu 6 ký tự')
    .max(160, 'Password có độ dài từ 6-160 ký tự')
    .matches(/\d/, 'Password phải có ít nhất 1 ký tự số')
    .matches(/^(?=.*[A-Z])/, "Password phải có ít nhất 1 ký tự viết hoa")
    .matches(/^(?=.*[a-z])/, "Password phải có ít nhất 1 ký tự viết thường")
})

export const userSchema = yup.object({
  name: yup.string().min(1, 'Tên tối thiểu chứa 1 kí tự').max(160, 'Tên có độ dài từ 160 ký tự'),
  phone: yup.string().max(20, 'Số điện thoại có độ dài tối đa 20 ký tự'),
  bio: yup.string().min(1, 'Bio tối thiểu chứa 1 kí tự').max(160, 'Bio có độ dài 150 ký tự'),
  newPassword: yup
    .string()
    .min(6, 'Password tối thiểu 6 ký tự')
    .max(160, 'Password có độ dài từ 6-160 ký tự')
    .matches(/\d/, 'Password phải có ít nhất 1 ký tự số')
    .matches(/^(?=.*[A-Z])/, "Password phải có ít nhất 1 ký tự viết hoa")
    .matches(/^(?=.*[a-z])/, "Password phải có ít nhất 1 ký tự viết thường"),
  avatar: yup.string().max(1000, 'Avatar có độ dài tối đa 1000 ký tự')
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>

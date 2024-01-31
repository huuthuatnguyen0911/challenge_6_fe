import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import moment from 'moment'

export function isAxiosError(error: unknown): error is AxiosError {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const transformName = (name: string) => {
  const splitted = name.split(" ");
  let final = "";
  splitted.forEach((word) => {
    final += word.charAt(0);
  });
  return final.slice(0, 2);
}

export const formatDate = (date: Date) => {
  const now = moment();
  const targetDate = moment(date);

  if (now.diff(targetDate, 'days') === 0) {
    return `today at ${targetDate.format('h:mm A')}`;
  } else if (now.diff(targetDate, 'days') === 1) {
    return `yesterday at ${targetDate.format('h:mm A')}`;
  } else {
    return targetDate.format('MMMM D [at] h:mm A');
  }
}

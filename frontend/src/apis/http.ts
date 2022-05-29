import axios from 'axios'
import { IError } from './errors.type'

const BASE_URL = 'localhost:8000/api'

export type Res<T> = T | IError

function _getHeaders(token: string | null) {
  if (!token) {
    return {}
  }
  return {
    headers: {
      Authorization: `Token ${token}`
    }
  }
}

export async function httpGet<T>(
  url: string,
  token: string | null
): Promise<Res<T>> {
  const config = _getHeaders(token)
  const res = axios
    .get<T>(BASE_URL + url, config)
    .then((res) => res.data)
    .catch((e) => ({
      code: 200,
      status: 'ERR',
      message: '123'
    }))
  return res
}

export async function httpPost<T>(
  url: string,
  body: { [key: string]: any },
  token: string | null
): Promise<Res<T>> {
  const config = _getHeaders(token)
  const res = axios
    .post<T>(BASE_URL + url, body, config)
    .then((res) => res.data)
    .catch((e) => ({
      code: 200,
      status: 'ERR',
      message: '123'
    }))
  return res
}

export async function httpPut<T>(
  url: string,
  body: { [key: string]: any },
  token: string | null
): Promise<Res<T>> {
  const config = _getHeaders(token)
  const res = axios
    .put<T>(BASE_URL + url, body, config)
    .then((res) => res.data)
    .catch((e) => ({
      code: 200,
      status: 'ERR',
      message: '123'
    }))
  return res
}

export async function httpDelete<T>(
  url: string,
  token: string | null
): Promise<Res<T>> {
  const config = _getHeaders(token)
  const res = axios
    .put<T>(BASE_URL + url, config)
    .then((res) => res.data)
    .catch((e) => ({
      code: 200,
      status: 'ERR',
      message: '123'
    }))
  return res
}

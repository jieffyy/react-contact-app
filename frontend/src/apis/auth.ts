import { httpPost, Res } from './http'

export interface LoginRes {
  token: string
  expiry: never
}
export async function login(
  username: string,
  password: string
): Promise<Res<LoginRes>> {
  return httpPost(
    '/api/login/',
    {
      username,
      password
    },
    null
  )
}

export async function logout(token: string): Promise<Res<never>> {
  return httpPost('/api/logout/', {}, token)
}

export interface RegisterRes {
  user: {
    id: string
    username: string
    email: string
    groups: never
    contacts: never // fetch again from /contacts
  }
  token: string
}
export async function register(
  username: string,
  email: string,
  password: string
): Promise<Res<RegisterRes>> {
  return httpPost(
    '/api/register/',
    {
      username,
      email,
      password
    },
    null
  )
}

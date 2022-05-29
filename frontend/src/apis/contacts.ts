import { httpDelete, httpGet, httpPost, httpPut, Res } from './http'

export interface ContactModel {
  id: number
  contact_name: string
  user: string
  contact_number: string
  contact_email: string
  created_at: string // date
  updated_at: string //date
}

export async function createContact(
  newContact: Pick<
    ContactModel,
    'contact_email' | 'contact_name' | 'contact_number'
  >,
  token: string
): Promise<Res<ContactModel>> {
  return httpPost('/contacts/', newContact, token)
}

export interface ListContactsRes {
  count: number
  next: never
  previous: never
  results: ContactModel[]
}
export async function listContacts(
  token: string
): Promise<Res<ListContactsRes>> {
  return httpGet('/contacts', token)
}

export async function showContact(
  id: string,
  token: string
): Promise<Res<ContactModel>> {
  return httpGet('/contacts/' + id, token)
}

export async function updateContact(
  id: string,
  body: Partial<
    Pick<ContactModel, 'contact_email' | 'contact_name' | 'contact_number'>
  >,
  token: string
) {
  return httpPut('/contacts/' + id + '/', body, token)
}

export async function deleteContact(
  id: string,
  token: string
): Promise<Res<never>> {
  return httpDelete('/contacts/' + id + '/', token)
}

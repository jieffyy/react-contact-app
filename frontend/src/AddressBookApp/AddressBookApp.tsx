import { Spinner, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ContactModel, listContacts } from '../apis/contacts'
import { isError } from '../apis/errors.type'
import { useAuth } from '../contexts/AuthContext'
import ContactBox from './ContactBox'

export default function AddressBookApp() {
  const auth = useAuth()
  const token = auth.token
  console.log(auth)

  const [contacts, setContacts] = useState<ContactModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      // should not happen
      setError('Please login again.')
      return
    }

    setIsLoading(true)
    listContacts(token).then((res) => {
      if (isError(res)) {
        setError(res.message)
      } else {
        setContacts(res.results)
      }
    })
  }, [token])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Stack>
      {error && <Text>{error}</Text>}
      {contacts.map((contact) => (
        <ContactBox key={`contact-${contact.id}`} contact={contact} />
      ))}
    </Stack>
  )
}

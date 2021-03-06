import { Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ContactModel, listContacts } from '../apis/contacts'
import { isError } from '../apis/errors.type'
import { useAuth } from '../contexts/AuthContext'
import ContactList from './ContactList'

export default function AddressBookApp() {
  const { token } = useAuth()

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
    listContacts(token)
      .then((res) => {
        if (isError(res)) {
          setError('Unable to retrieve your contacts.')
        } else {
          setContacts(res.results)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [token])

  if (!token) {
    return <Text>Please login again</Text>
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <Text>{error}</Text>
  }

  return (
    <>
      <ContactList contacts={contacts} token={token} />
    </>
  )
}

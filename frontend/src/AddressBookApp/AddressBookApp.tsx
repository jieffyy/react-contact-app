import { Spinner, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ContactModel, listContacts } from '../apis/contacts'
import { isError } from '../apis/errors.type'
import { useAuth } from '../contexts/AuthContext'
import ContactBox from './ContactBox'
import EmptyContactList from './EmptyContactList'

export default function AddressBookApp() {
  const { token } = useAuth()

  const [contacts, setContacts] = useState<ContactModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [createContactModal, setCreateContactModel] =
    useState<React.ReactElement | null>(null)

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

  if (contacts.length === 0) {
    return (
      <>
        <EmptyContactList
          modalSetter={setCreateContactModel}
          token={token}
          contactSetter={setContacts}
        />
        {createContactModal}
      </>
    )
  }

  return (
    <>
      <Stack>
        {error && <Text>{error}</Text>}
        {contacts.map((contact) => (
          <ContactBox key={`contact-${contact.id}`} contact={contact} />
        ))}
      </Stack>
      {createContactModal}
    </>
  )
}

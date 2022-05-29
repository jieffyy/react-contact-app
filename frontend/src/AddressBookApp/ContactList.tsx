import { Box, Center, Heading, VStack } from '@chakra-ui/react'
import React, { ReactElement, useState } from 'react'
import { ContactModel } from '../apis/contacts'
import ContactBox from './ContactBox'
import CreateContactButton from './CreateContactButton'

interface Props {
  contacts: ContactModel[]
  token: string
}

function pluralize(count: number) {
  return count === 1 ? 'contact' : 'contacts'
}

export default function ContactList(props: Props) {
  const [contacts, setContacts] = useState<ContactModel[]>(props.contacts)
  const [modal, setModal] = useState<ReactElement | null>(null)

  return (
    <>
      <VStack margin={10} rowGap={5}>
        <Center>
          <Heading size='md'>
            You have {contacts.length} {pluralize(contacts.length)}.
          </Heading>
        </Center>
        <Center>
          <CreateContactButton
            btnText='Create more contacts'
            modalSetter={setModal}
            contactSetter={setContacts}
            token={props.token}
          />
        </Center>
        {contacts.map((contact) => (
          <Box>
            <ContactBox
              key={`contact-${contact.id}`}
              token={props.token}
              contact={contact}
              onUpdate={(newContact: ContactModel) => {
                setContacts((prev) => {
                  return prev.map((contact) => {
                    if (contact.id !== newContact.id) {
                      return contact
                    } else {
                      return newContact
                    }
                  })
                })
              }}
              onDelete={(deletedId: number) => {
                setContacts((prev) => {
                  return prev.filter((c) => c.id !== deletedId)
                })
              }}
            />
          </Box>
        ))}
      </VStack>
      {modal}
    </>
  )
}

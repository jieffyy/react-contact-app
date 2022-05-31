import { LinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  VStack,
  Text
} from '@chakra-ui/react'
import React, { ReactElement, SyntheticEvent, useState } from 'react'
import { logout } from '../apis/auth'
import { ContactModel } from '../apis/contacts'
import { useAuth } from '../contexts/AuthContext'
import { useCheckMobileScreen } from '../hooks'
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
  const { setUsername } = useAuth()

  const [contacts, setContacts] = useState<ContactModel[]>(props.contacts)
  const [modal, setModal] = useState<ReactElement | null>(null)

  const flexWidth = useCheckMobileScreen() ? '100%' : '50%'

  const logoutUser = (e: SyntheticEvent) => {
    e.preventDefault()
    logout(props.token).finally(() => {
      setUsername(null)
    })
  }

  return (
    <>
      <VStack margin={10} rowGap={5}>
        <Flex
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Heading size='md'>
            You have {contacts.length} {pluralize(contacts.length)}.
          </Heading>
          <Box>
            <Text as={Link} onClick={(e) => logoutUser(e)}>
              Logout <LinkIcon />
            </Text>
          </Box>
        </Flex>
        <Center>
          <CreateContactButton
            btnText='Create more contacts'
            modalSetter={setModal}
            contactSetter={setContacts}
            token={props.token}
          />
        </Center>
        <Flex
          gap='3'
          flexWrap='wrap'
          width={flexWidth}
          alignItems='center'
          justifyContent='center'
        >
          {contacts.map((contact) => (
            <Box
              key={`contact-${contact.id}`}
              border='1px'
              borderColor='gray.200'
              borderRadius='xl'
              padding='5'
            >
              <ContactBox
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
        </Flex>
      </VStack>
      {modal}
    </>
  )
}

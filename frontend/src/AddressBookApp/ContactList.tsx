import { Box, Center, Heading, VStack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { ContactModel } from '../apis/contacts'
import ContactBox from './ContactBox'
import CreateContactButton from './CreateContactButton'

interface Props {
  contacts: ContactModel[]
  modalSetter: React.Dispatch<React.SetStateAction<ReactElement | null>>
  contactSetter: React.Dispatch<React.SetStateAction<ContactModel[]>>
  token: string
}

function pluralize(count: number) {
  return count === 1 ? 'contact' : 'contacts'
}

export default function ContactList(props: Props) {
  return (
    <VStack margin={10} rowGap={5}>
      <Center>
        <Heading size='md'>
          You have {props.contacts.length} {pluralize(props.contacts.length)}.
        </Heading>
      </Center>
      <Center>
        <CreateContactButton
          btnText='Create more contacts'
          modalSetter={props.modalSetter}
          contactSetter={props.contactSetter}
          token={props.token}
        />
      </Center>
      {props.contacts.map((contact) => (
        <Box>
          <ContactBox key={`contact-${contact.id}`} contact={contact} />
        </Box>
      ))}
    </VStack>
  )
}

import { Center, Heading, Stack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { ContactModel } from '../apis/contacts'
import CreateContactButton from './CreateContactButton'

interface Props {
  modalSetter: React.Dispatch<React.SetStateAction<ReactElement | null>>
  contactSetter: React.Dispatch<React.SetStateAction<ContactModel[]>>
  token: string
}

export default function EmptyContactList(props: Props) {
  return (
    <Stack marginTop={10} rowGap={5}>
      <Center>
        <Heading size='md'>You have no contacts.</Heading>
      </Center>
      <Center>
        <CreateContactButton
          btnText='Create one here'
          modalSetter={props.modalSetter}
          contactSetter={props.contactSetter}
          token={props.token}
        />
      </Center>
    </Stack>
  )
}

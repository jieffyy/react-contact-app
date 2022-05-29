import { Button, Center, Heading, Stack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { ContactModel } from '../apis/contacts'
import CreateContactModal from './CreateContactModal'

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
        <Button
          onClick={() => {
            props.modalSetter(
              <CreateContactModal
                token={props.token}
                onSuccess={(contact: ContactModel) =>
                  props.contactSetter((prev) => [...prev, contact])
                }
                onClose={() => props.modalSetter(null)}
              />
            )
          }}
        >
          Create one here
        </Button>
      </Center>
    </Stack>
  )
}

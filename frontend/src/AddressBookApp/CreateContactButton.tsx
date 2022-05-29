import { Button } from '@chakra-ui/react'
import React from 'react'
import { ContactModel } from '../apis/contacts'
import CreateContactModal from './CreateContactModal'

interface Props {
  btnText: string
  token: string
  modalSetter: React.Dispatch<React.SetStateAction<React.ReactElement | null>>
  contactSetter: React.Dispatch<React.SetStateAction<ContactModel[]>>
}

export default function CreateContactButton(props: Props) {
  return (
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
      {props.btnText}
    </Button>
  )
}

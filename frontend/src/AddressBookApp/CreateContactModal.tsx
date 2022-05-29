import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from '@chakra-ui/react'
import { ContactModel } from '../apis/contacts'
import CreateContactForm from './CreateContactForm'

interface Props {
  onSuccess: (contact: ContactModel) => void
  onClose: () => void
  token: string
}

export default function CreateContactModal(props: Props) {
  return (
    <Modal isOpen onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Contact Details</ModalHeader>
        <ModalCloseButton />

        <ModalBody mb={8}>
          <CreateContactForm
            onSuccess={(c) => {
              props.onSuccess(c)
              props.onClose()
            }}
            token={props.token}
            onClose={props.onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

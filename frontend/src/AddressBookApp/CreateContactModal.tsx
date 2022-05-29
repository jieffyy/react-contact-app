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

        <ModalBody>
          <CreateContactForm
            onSuccess={(c) => {
              props.onSuccess(c)
              props.onClose()
            }}
            token={props.token}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3}>
            Create
          </Button>
          <Button variant='ghost' onClick={props.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

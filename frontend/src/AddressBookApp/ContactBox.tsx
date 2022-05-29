import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { Box, Stack, Heading, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ContactModel, deleteContact } from '../apis/contacts'
import { isError } from '../apis/errors.type'

interface ContactBoxProps {
  contact: ContactModel
  token: string
  onUpdate: (newContact: ContactModel) => void
  onDelete: (deletedId: number) => void
}

export default function ContactBox(props: ContactBoxProps) {
  const contact = props.contact
  const [err, setErr] = useState<string | null>(null)

  const handleDelete = () => {
    deleteContact(contact.id.toString(), props.token).then((res) => {
      if (isError(res)) {
        setErr('Could not delete ' + contact.contact_name)
        return
      } else {
        props.onDelete(contact.id)
      }
    })
  }

  return (
    <Box>
      <Stack rowGap={0.5}>
        <Box>{err && <Text>{err}</Text>}</Box>
        <Box>
          <Heading size='sm'>{contact.contact_name}</Heading>
        </Box>
        <Box>
          <PhoneIcon mr={2} mb={1} />
          {contact.contact_number}
        </Box>
        <Box>
          <EmailIcon mr={2} mb={1} />
          {contact.contact_email}
        </Box>
        <Box>
          <Button size='sm' mr={6}>
            Edit Contact
          </Button>
          <Button size='sm' background='red.200' onClick={handleDelete}>
            Delete Contact
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { Box, Stack, Heading, Button } from '@chakra-ui/react'
import React from 'react'
import { ContactModel } from '../apis/contacts'

interface ContactBoxProps {
  contact: ContactModel
}

export default function ContactBox(props: ContactBoxProps) {
  const contact = props.contact

  return (
    <Box>
      <Stack rowGap={0.5}>
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
          <Button size='sm' background='red.200'>
            Delete Contact
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

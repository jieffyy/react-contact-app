import { Box } from '@chakra-ui/react'
import React from 'react'
import { ContactModel } from '../apis/contacts'

interface ContactBoxProps {
  contact: ContactModel
}

export default function ContactBox(props: ContactBoxProps) {
  const contact = props.contact

  return <Box key={contact.id}>{contact.contact_name}</Box>
}

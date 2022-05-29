import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from '@chakra-ui/react'
import React, { SyntheticEvent, useState } from 'react'
import { ContactModel, createContact } from '../apis/contacts'
import { isError } from '../apis/errors.type'

interface Props {
  onSuccess: (contact: ContactModel) => void
  token: string
}

interface IContactFormFields {
  name: string
  number: string
  email: string
}

export default function CreateContactForm(props: Props) {
  const [contactDetails, setContactDetails] = useState<IContactFormFields>({
    name: '',
    number: '',
    email: ''
  })

  // intentionally allow for `??` to handle corner cases
  const handleNameChange = (e: any) =>
    setContactDetails((prev: IContactFormFields) => ({
      ...prev,
      name: e.target.value ?? ''
    }))
  const handleNumberChange = (e: any) =>
    setContactDetails((prev: IContactFormFields) => ({
      ...prev,
      number: e.target.value ?? ''
    }))
  const handleEmailChange = (e: any) =>
    setContactDetails((prev: IContactFormFields) => ({
      ...prev,
      email: e.target.value ?? ''
    }))

  const [firstAttempt, setFirstAttempt] = useState<boolean>(true)
  const nameError = !firstAttempt && contactDetails.name === ''
  const numberError = !firstAttempt && contactDetails.number === ''
  const emailError = !firstAttempt && contactDetails.email === ''

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)

    await createContact(
      {
        contact_email: contactDetails.email,
        contact_name: contactDetails.name,
        contact_number: contactDetails.number
      },
      props.token
    )
      .then((res) => {
        setFirstAttempt(false)
        if (isError(res)) {
          setError('Cannot create contact')
          return
        } else {
          props.onSuccess(res)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const { name, email, number } = contactDetails

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={nameError} marginY={5}>
        <FormLabel>Contact Name</FormLabel>
        <Input id='name' value={name} onChange={handleNameChange} />
        {nameError && (
          <FormErrorMessage>
            {nameError ?? 'Contact name is required.'}
          </FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={numberError} marginY={5}>
        <FormLabel>Contact Number</FormLabel>
        <Input id='number' value={number} onChange={handleNumberChange} />
        {numberError && (
          <FormErrorMessage>
            {numberError ?? 'Contact number is required.'}
          </FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={emailError} marginY={5}>
        <FormLabel>Contact Email</FormLabel>
        <Input id='email' value={email} onChange={handleEmailChange} />
        {emailError && (
          <FormErrorMessage>
            {emailError ?? 'Contact email is required.'}
          </FormErrorMessage>
        )}
      </FormControl>
    </form>
  )
}

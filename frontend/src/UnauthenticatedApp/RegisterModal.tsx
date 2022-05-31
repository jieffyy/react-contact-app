import { CheckIcon } from '@chakra-ui/icons'
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Spinner,
  Heading,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Box
} from '@chakra-ui/react'
import { SyntheticEvent, useState } from 'react'
import { register } from '../apis/auth'
import { isError } from '../apis/errors.type'

interface Props {
  isModalOpen: boolean
  onClose: () => void
}

export default function RegisterModal(props: Props) {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)

  const reset = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setLoading(false)
    setError(null)
    setMsg(null)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    register(username, email, password)
      .then((res) => {
        if (isError(res)) {
          setError(res.message)
        } else {
          setMsg('Registration successful. Please sign in.')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value)
  }
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  if (msg) {
    return (
      <Modal isOpen={props.isModalOpen} onClose={props.onClose}>
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection='column'
              justifyItems='center'
              alignItems='center'
              height='150px'
              rowGap={3}
            >
              <div>
                <CheckIcon />
              </div>
              <div>
                <Text>{msg}</Text>
              </div>
            </Flex>

            <Button
              isDisabled={loading}
              marginLeft={4}
              marginBottom={5}
              onClick={() => {
                props.onClose()
                reset()
              }}
            >
              {loading ? <Spinner /> : 'Done'}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  return (
    <Modal isOpen={props.isModalOpen} onClose={props.onClose}>
      <ModalContent>
        <ModalHeader>Register</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            {error && <Text mb={3}>{error}</Text>}
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                id='username'
                value={username}
                onChange={handleUsernameChange}
              />
            </FormControl>

            <FormControl marginY={5}>
              <FormLabel>Email</FormLabel>
              <Input id='email' value={email} onChange={handleEmailChange} />
            </FormControl>

            <FormControl marginY={5}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={handlePasswordChange}
              />
            </FormControl>

            <Button isDisabled={loading} type='submit' marginBottom={5}>
              {loading ? <Spinner /> : 'Submit'}
            </Button>
            <Button
              isDisabled={loading}
              marginLeft={4}
              marginBottom={5}
              onClick={props.onClose}
            >
              {loading ? <Spinner /> : 'Cancel'}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

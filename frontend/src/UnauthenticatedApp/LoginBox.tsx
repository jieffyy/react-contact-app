import React, { SyntheticEvent, useState } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  Text
} from '@chakra-ui/react'
import { login } from '../apis/auth'
import { isError } from '../apis/errors.type'
import { useAuth } from '../contexts/AuthContext'
import { LinkIcon } from '@chakra-ui/icons'
import RegisterModal from './RegisterModal'

export default function LoginBox() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [firstAttempt, setFirstAttempt] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleUsernameChange = (e: any) => setUsername(e.target.value)
  const handlePasswordChange = (e: any) => setPassword(e.target.value)

  const [usernameErr, setUsernameErr] = useState<boolean>(false)
  const [passwordErr, setPasswordErr] = useState<boolean>(false)

  const { setUsername: ctxSetUsername, setToken } = useAuth()

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (firstAttempt) {
      setFirstAttempt(false)
    }
    if (!username) {
      setUsernameErr(true)
    }
    if (!password) {
      setPasswordErr(true)
    }
    if (!username || !password) {
      return
    }
    setIsLoading(true)
    await login(username, password)
      .then((res) => {
        if (isError(res)) {
          setError(res.message)
          return
        } else {
          setError(null)
          ctxSetUsername(username)
          setToken(res.token)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Heading marginBottom={2}>Login</Heading>
      <Text size='md' marginBottom={5}>
        <Link onClick={() => setModalOpen(true)}>
          No account? Sign up here. <LinkIcon />
        </Link>
      </Text>
      {error ? <Text size='sm'>{error}</Text> : null}
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={usernameErr} marginY={5}>
          <FormLabel>Username</FormLabel>
          <Input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameErr && (
            <FormErrorMessage>Username is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={passwordErr} marginY={5}>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            id='password'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordErr && (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>

        <Button isDisabled={isLoading} type='submit'>
          {isLoading ? <Spinner /> : 'Submit'}
        </Button>
      </form>

      <RegisterModal
        isModalOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
      />
    </>
  )
}

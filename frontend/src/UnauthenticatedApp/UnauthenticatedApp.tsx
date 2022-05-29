import React from 'react'
import { Box, Center } from '@chakra-ui/react'
import LoginBox from './LoginBox'

export default function UnauthenticatedApp() {
  return (
    <Center>
      <Box margin={5}>
        <LoginBox />
      </Box>
    </Center>
  )
}

import React from 'react'
import AddressBookApp from './AddressBookApp/AddressBookApp'
import './App.css'
import { useAuth } from './contexts/AuthContext'
import UnauthenticatedApp from './UnauthenticatedApp/UnauthenticatedApp'

function App() {
  const { username } = useAuth()

  if (!username) {
    return <UnauthenticatedApp />
  } else {
    return <AddressBookApp />
  }
}

export default App

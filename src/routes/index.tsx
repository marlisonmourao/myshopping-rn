import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

import { SignIn } from '../screens/SignIn'
import { AppRoutes } from './app.routes'

type User = {
  uid: string
}

export function Routes() {
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user)
    })

    return subscriber
  }, [])

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}

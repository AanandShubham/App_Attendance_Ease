import { View, Text } from 'react-native'
import React from 'react'
import { createStaticNavigation } from '@react-navigation/native'
// import { Stack } from 'expo-router'

const Stack = createStaticNavigation<home>();

const home = () => {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  )
}

export default home
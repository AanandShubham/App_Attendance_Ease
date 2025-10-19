import { Stack } from 'expo-router'
import React from 'react'

const homeStackLayout = () => {
  return (
    <Stack>
      <Stack.Screen  name='index' options={{headerShown:false}}/>
      <Stack.Screen name='profile' options={{headerShown:false}}/>
      <Stack.Screen name='addClass' options={{headerShown:false}}/>
      <Stack.Screen name='addStudent' options={{headerShown:false}}/>
      <Stack.Screen name='updateStudent' options={{headerShown:false}}/>
      <Stack.Screen name='updateClass' options={{headerShown:false}}/>
      <Stack.Screen name='classMenu' options={{headerShown:false}}/>
      <Stack.Screen name='studentList' options={{headerShown:false}}/>
    </Stack>
  )
}

export default homeStackLayout
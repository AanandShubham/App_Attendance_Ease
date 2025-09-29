import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import '../global.css'

const onboarding = () => {

  const router = useRouter()

  return (
    <View className='w-full h-full bg-indigo-300'>
      <Text className='text-xl bg-blue-600'>onboarding</Text>
      <Pressable  onPress={()=>router.replace("/(tabs)")}>
        <Text>Tabs</Text>
      </Pressable>
    </View>
  )
}

export default onboarding
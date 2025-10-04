import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const profile = () => {
  const router = useRouter()

  return (
    <View className='bg-stone-300 w-full h-full flex justify-center items-center'>
      <Text>profile</Text>
      <Pressable onPress={()=> router.back()}>
        <Text>Back</Text>
      </Pressable>
    </View>
  )
}

export default profile
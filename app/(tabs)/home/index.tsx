import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const index = () => {
  const router = useRouter()
  return (
    <View className='bg-stone-300 w-full h-full flex justify-center items-center'>
      <Text>index of home page of home layout</Text>
        <Pressable onPress={()=>router.push("/home/profile")}>
        <Text>Profile</Text>
      </Pressable>
    </View>
  )
}

export default index
import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import '../global.css'

const slides = [
  {
    id: 1,
    title: "What is This",
    discription: "",
    image: "../assets/frontImg"
  }
]

const onboarding = () => {

  const router = useRouter()

  return (
    <View className='w-full h-full bg-indigo-300 flex  gap-5 justify-center items-center'>
      <Text className='text-xl bg-blue-600'>onboarding</Text>
      <Pressable onPress={() => router.replace("/(tabs)/home")}>
        <Text>Tabs</Text>
      </Pressable>

      <Link
        className='p-2 bg-green-400 rounded'
        href="./Login"
      >
        <Text>Login</Text>
      </Link>

      <Pressable className='p-2 bg-green-400 rounded' onPress={() => router.navigate("./Signup")}>
        <Text>Signup</Text>
      </Pressable>

    </View>
  )
}

export default onboarding
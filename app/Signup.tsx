import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import BaseContainer from './components/BaseContainer'
import InputBox from './components/InputBox'
import { Animated } from 'react-native'
import { useRef } from 'react'

const Signup = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const btnControl = () => {
    console.log("Button Pressed")
    startShake()
  }

  return (

    <BaseContainer
      shakeAnim={shakeAnim}
      btnAction={btnControl}
      headerLabel={"Register"}
      btnLabel={"Register"} >
      <Image className='w-[100px] h-[100px] bg-neutral-800 mb-2 mt-2' />
      <InputBox labelData={"fullname"} />
      <InputBox labelData={"username"} />
      <InputBox labelData={"password"} />
      <InputBox labelData={"confirm password"} />
      <InputBox labelData={"security key"} />
      <Link href={'./Login'}>
        <Text className='text-blue-500 text-lg font-semibold underline'>already have an account , Login</Text>
      </Link>
    </BaseContainer>
  )
}

export default Signup
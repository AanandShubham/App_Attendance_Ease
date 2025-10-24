import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import BaseContainer from './components/BaseContainer'
import InputBox from './components/InputBox'
import { Animated } from 'react-native'
import { useRef } from 'react'

const ForgetPassword = () => {

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
      headerLabel={"Forget"}
      btnLabel={"Forget"} >
      <InputBox labelData={"username"} />
      <InputBox labelData={"security Key"} />
      <InputBox labelData={"password"} />
      <InputBox labelData={"confirm password"} />
      <Link href={'./Login'}>
        <Text className='text-blue-500 text-lg font-semibold underline'>already have an account , Login</Text>
      </Link>
    </BaseContainer>
  )
}

export default ForgetPassword 

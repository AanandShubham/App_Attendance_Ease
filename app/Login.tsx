import { View, Text, Pressable } from 'react-native'
import InputBox from './components/InputBox'
import { Link } from 'expo-router'
import BaseContainer from './components/BaseContainer'
import React, { useRef } from 'react'
import { Animated } from 'react-native'
import useLogin from './hooks/useLogin'


const Login = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const { login } = useLogin()

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
    login("testUser", "testPassword")
    startShake()
  }

  return (
    <BaseContainer
      styleClass={"h-[35vh]"}
      shakeAnim={shakeAnim}
      btnAction={btnControl}
      headerLabel={"Login"} >
      <InputBox labelData={"username"} />
      <InputBox labelData={"password"} />
      <View
        className='w-full h-fit flex rounded-md flex-row justify-around items-center'>

        <Link href={'./Signup'}>
          <Text className='text-blue-500 text-lg font-semibold underline'>Register</Text>
        </Link>

        <Link href={'./ForgetPassword'}>
          <Text className='text-blue-500 text-lg font-semibold underline'>Forgot Password?</Text>
        </Link>
      </View>
    </BaseContainer>
  )
}

export default Login
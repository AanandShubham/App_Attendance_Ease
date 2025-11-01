import { View, Text, Pressable } from 'react-native'
import InputBox from './components/InputBox'
import { Link } from 'expo-router'
import BaseContainer from './components/BaseContainer'
import React, { useRef, useState } from 'react'
import { Animated } from 'react-native'
import useLogin from './hooks/useLogin'

import {LoginTypeFormData} from './FromTypes'

const Login = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current
  const [formData, setFormData] = useState<LoginTypeFormData>({
    username: '',
    password: ''
  })

  const handleInputChange = (key: keyof LoginTypeFormData, value: string):void => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }


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
    ]).start()
  }

  const btnControl = () => {
    console.log("Button Pressed")
    console.log("form Data : ",formData)
    login(formData)
    startShake()
  }

  return (
    <BaseContainer
      styleClass={"h-[35vh]"}
      shakeAnim={shakeAnim}
      btnAction={btnControl}
      headerLabel={"Login"} >


      <InputBox
        labelData={"username"}
        dataValue={formData.username}
        setDataValue={text => handleInputChange('username', text)}
      />
      <InputBox
        labelData={"password"}
        dataValue={formData.password}
        setDataValue={text => handleInputChange('password', text)}
      />
      <View
        className='w-full h-fit flex rounded-md flex-row justify-around items-center'>

        <Link href={'./Register'}>
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
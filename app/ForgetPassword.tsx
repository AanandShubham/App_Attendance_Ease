import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import BaseContainer from './components/BaseContainer'
import InputBox from './components/InputBox'
import { Animated } from 'react-native'
import { useRef } from 'react'
import { ForgetTypeFormData } from './FromTypes'

const ForgetPassword = () => {
  const [formData, setFormData] = useState<ForgetTypeFormData>({
    username: '',
    securityKey: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (key: keyof ForgetTypeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

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
      btnLabel={"Forget"}
    >
      <InputBox
        labelData={"username"}
        dataValue={formData.username}
        setDataValue={text => handleInputChange("username", text)}
      />
      <InputBox
        labelData={"security Key"}
        dataValue={formData.securityKey}
        setDataValue={text => handleInputChange("securityKey", text)}
      />
      <InputBox
        labelData={"password"}
        dataValue={formData.password}
        setDataValue={text => handleInputChange("password", text)}
      />
      <InputBox
        labelData={"confirm password"}
        dataValue={formData.confirmPassword}
        setDataValue={text => handleInputChange("confirmPassword", text)}
      />

      <Link href={'./Login'}>
        <Text className='text-blue-500 text-lg font-semibold underline'>already have an account , Login</Text>
      </Link>
      
    </BaseContainer>
  )
}

export default ForgetPassword 

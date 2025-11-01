import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import BaseContainer from './components/BaseContainer'
import InputBox from './components/InputBox'
import { Animated } from 'react-native'
import { useRef } from 'react'
import { RegisterTypeFormData } from './FromTypes'
import ImageSelector from './components/ImageSelector'

const Register = () => {

  const [imageUrl, setImageUrl] = useState<string | null>(null)


  const shakeAnim = useRef(new Animated.Value(0)).current
  const [formData, setFormData] = React.useState<RegisterTypeFormData>({
    profile: '',
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    securityKey: ''
  })

  const handleInputChange = (key: keyof RegisterTypeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

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
    formData['profile'] = imageUrl 
    console.log(formData)
    // console.log("Image Url : ",imageUrl)
    startShake()
  }

  return (

    <BaseContainer
      shakeAnim={shakeAnim}
      btnAction={btnControl}
      headerLabel={"Register"}
      btnLabel={"Register"} >

      {/* <Image className='w-[100px] h-[100px] bg-neutral-800 mb-2 mt-2' /> */}
      <ImageSelector
        setImage={setImageUrl}
        imgUrl={imageUrl}
      />

      <InputBox
        labelData={"fullname"}
        dataValue={formData.fullname}
        setDataValue={text => handleInputChange('fullname', text)}
      />
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
      <InputBox labelData={"confirm password"}
        dataValue={formData.confirmPassword}
        setDataValue={text => handleInputChange('confirmPassword', text)}
      />
      <InputBox
        labelData={"security key"}
        dataValue={formData.securityKey}
        setDataValue={text => handleInputChange('securityKey', text)}
      />
      <Link href={'./Login'}>
        <Text className='text-blue-500 text-lg font-semibold underline'>already have an account , Login</Text>
      </Link>
    </BaseContainer>
  )
}

export default Register
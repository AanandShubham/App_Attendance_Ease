import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import { Link, router } from 'expo-router'
import BaseContainer from './components/BaseContainer'
import InputBox from './components/InputBox'
import { Animated } from 'react-native'
import { useRef } from 'react'
import { ForgetTypeFormData } from './FromTypes'
import { SafeAreaView } from 'react-native-safe-area-context'
import useForgot from './hooks/useForgot'

const ForgetPassword = () => {

  const { loading, forgot } = useForgot()

  const [formData, setFormData] = useState<ForgetTypeFormData>({
    username: '',
    securityKey: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (key: keyof ForgetTypeFormData, value: SetStateAction<string>) => {
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

  const btnControl = async () => {

    const flag = await forgot(formData)

    if (!flag)
      startShake()
    else
      router.replace('./Login')


  }


  return (

    <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526]  bg-[#3A87BD] '>


      <BaseContainer
        shakeAnim={shakeAnim}
        btnAction={btnControl}
        headerLabel={"Forget"}
        btnLabel={"Forget"}
      >
        <InputBox
          infoMode={true}
          info={"Enter your registered username to reset your password."}
          labelData={"username"}
          dataValue={formData.username}
          setDataValue={text => handleInputChange("username", text)}
        />
        <InputBox
          infoMode={true}
          info={"Provide the security key associated with your account for verification."}
          labelData={"security Key"}
          dataValue={formData.securityKey}
          setDataValue={text => handleInputChange("securityKey", text)}
        />
        <InputBox
          infoMode={true}
          info={"Create a new password for your account. Make sure it's strong and secure."}
          labelData={"password"}
          dataValue={formData.password}
          passwordMode={true}
          setDataValue={text => handleInputChange("password", text)}
        />
        <InputBox
          infoMode={true}
          info={"Re-enter your new password to confirm it matches the one above."}
          labelData={"confirm password"}
          dataValue={formData.confirmPassword}
          passwordMode={true}
          setDataValue={text => handleInputChange("confirmPassword", text)}
        />

        <Link href={'./Login'}>
          <Text className='text-blue-500 text-lg font-semibold underline'>already have an account , Login</Text>
        </Link>

      </BaseContainer>

      {loading && (
        <View className='w-full h-full absolute bg-[#dae4e8e2] flex justify-center items-center gap-4'>
          <Text>Work in Progress!!</Text>
          <ActivityIndicator />
        </View>
      )}


    </SafeAreaView>
  )
}

export default ForgetPassword 

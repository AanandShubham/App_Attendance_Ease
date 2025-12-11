import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import { Link, router } from 'expo-router'
import BaseContainer from './components/BaseContainer'
import InputBox from './components/InputBox'
import { Animated } from 'react-native'
import { useRef } from 'react'
import { RegisterTypeFormData } from './FromTypes'
import ImageSelector from './components/ImageSelector'
import useRegister from './hooks/useRegister'
import Toast from 'react-native-toast-message'
import { SafeAreaView } from 'react-native-safe-area-context'

const Register = () => {

  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const { loading, register } = useRegister()


  const shakeAnim = useRef(new Animated.Value(0)).current
  const [formData, setFormData] = React.useState<RegisterTypeFormData>({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    securityKey: ''
  })

  const handleInputChange = (key: keyof RegisterTypeFormData, value: SetStateAction<string>) => {
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

  const btnControl = async () => {
    // console.log("Button Pressed")

    if (!await register(formData, imageUrl)) {
      startShake()
    } else {
      Toast.show({
        type: "success",
        text1: "Register Successfull"
      })
      router.replace("/(tabs)/home")

    }
    // console.log(formData)
    
    // console.log("Image Url : ",imageUrl)
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526]  bg-[#3A87BD] '>

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
          labelData={"security key"}
          dataValue={formData.securityKey}
          setDataValue={text => handleInputChange('securityKey', text)}
        />
        <InputBox
          labelData={"password"}
          dataValue={formData.password}
          setDataValue={text => handleInputChange('password', text)}
          passwordMode={true}
        />
        <InputBox
          labelData={"confirm password"}
          dataValue={formData.confirmPassword}
          setDataValue={text => handleInputChange('confirmPassword', text)}
          passwordMode={true}
        />
        <Link href={'./Login'}>
          <Text className='text-blue-500 text-lg font-semibold underline'>already have an account , Login</Text>
        </Link>
      </BaseContainer>

      {loading && (
        <View className='w-full h-full absolute bg-[#dae4e8e2] flex justify-center items-center gap-4'>
          <Text>Register in Progress ....</Text>
          <Text>It may take time</Text>
          <ActivityIndicator />
        </View>
      )}

    </SafeAreaView>
  )
}

export default Register
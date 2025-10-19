import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import BaseContainer from './components/BaseContainer'
import InputBox from './components/InputBox'

const ForgetPassword = () => {
  return (

    <BaseContainer headerLabel={"Forget"} >
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

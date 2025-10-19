import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import BaseContainer from './components/BaseContainer'
import InputBox from './components/InputBox'

const Signup = () => {
  return (

    <BaseContainer headerLabel={"Signup"} >
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
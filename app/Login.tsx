import { View, Text, Pressable } from 'react-native'
import React from 'react'
import InputBox from './components/InputBox'
import { Link } from 'expo-router'
import BaseContainer from './components/BaseContainer'

const Login = () => {
  return (
    <BaseContainer headerLabel={"Login"} >
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
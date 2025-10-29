import InputBox from '@/app/components/InputBox'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import BaseContainer from '@/app/components/BaseContainer'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const addClass = () => {
 
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526]  bg-[#3A87BD] '>
        <BaseContainer headerLabel={"Add Class"} btnLabel={"Add"} >
          <InputBox labelData={"Class Name"} />
          <InputBox labelData={"Subject"} />
          <InputBox labelData={"Time"} />
          <InputBox labelData={"Total Class"} />
          <InputBox labelData={"Room"} />
        </BaseContainer>
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default addClass

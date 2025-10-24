import InputBox from '@/app/components/InputBox'
import React from 'react'
import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import BaseContainer from '@/app/components/BaseContainer'
const addClass = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['top', 'bottom']} className='w-full h-full bg-[#3A87BD] '>
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

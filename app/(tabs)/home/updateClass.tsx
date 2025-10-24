import BaseContainer from '@/app/components/BaseContainer'
import InputBox from '@/app/components/InputBox'
import { Link } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const updateClass = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['top', 'bottom']} className='w-full h-full bg-[#3A87BD] '>
                <BaseContainer headerLabel={"Edit Class"} btnLabel={"Update"} >
                    <InputBox labelData={"Class Name"} inputValue={"MCA 2024 - 26"} />
                    <InputBox labelData={"Subject"} inputValue={"Android"} />
                    <InputBox labelData={"Time"} />
                    <InputBox labelData={"Total Class"} />
                    <InputBox labelData={"Room"} />
                </BaseContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default updateClass

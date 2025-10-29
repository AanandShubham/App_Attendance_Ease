import BaseContainer from '@/app/components/BaseContainer'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import InputBox from '@/app/components/InputBox'


const addStudent = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
                className='w-full h-full dark:bg-[#061526]  bg-[#3A87BD] '
            >
                <BaseContainer
                    headerLabel={"Add Student"}
                    btnLabel={"Add"}
                >
                    <InputBox labelData={"TCA Number"} />
                    <InputBox labelData={"Name"} />
                    <InputBox labelData={"Total Attendance"} />
                </BaseContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default addStudent

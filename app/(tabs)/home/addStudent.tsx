import BaseContainer from '@/app/components/BaseContainer'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import InputBox from '@/app/components/InputBox'


const addStudent = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['top', 'bottom']} className='w-full h-full bg-white '>
                <BaseContainer headerLabel={"Add Student"} btnLabel={"Add"} >
                    <InputBox labelData={"TCA Number"} />
                    <InputBox labelData={"Name"} />
                    <InputBox labelData={"Total Attendance"} />
                </BaseContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default addStudent

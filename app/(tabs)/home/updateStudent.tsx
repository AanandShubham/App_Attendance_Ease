import React from 'react'
import BaseContainer from '@/app/components/BaseContainer'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import InputBox from '@/app/components/InputBox'


const updateStudent = () => {
  return (
     <SafeAreaProvider>
            <SafeAreaView edges={['top', 'bottom']} className='w-full h-full bg-[#3A87BD] '>
                <BaseContainer headerLabel={"Edit Student"} btnLabel={"Update"} >
                     <InputBox labelData={"TCA Number"} inputValue={"TCA2463345"} />
                    <InputBox labelData={"Name"} inputValue={"Ankit Kumar Dubey"} />
                    <InputBox labelData={"Total Attendance"} inputValue={"Total Attendance : 23"} />
                </BaseContainer>
            </SafeAreaView>
        </SafeAreaProvider>
  )
}

export default updateStudent

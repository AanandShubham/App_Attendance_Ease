import React, { useState } from 'react'
import BaseContainer from '@/app/components/BaseContainer'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import InputBox from '@/app/components/InputBox'
import { StudentTypeFormData } from '@/app/FromTypes'



const updateStudent = () => {
  const [formData, setFormData] = useState<StudentTypeFormData>({
    tcaNumber: '',
    name: '',
    totalAttendance: 0
  })

  const handleInputChange = (key: keyof StudentTypeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526]  bg-[#3A87BD] '>
        <BaseContainer headerLabel={"Edit Student"} btnLabel={"Update"} >
          <InputBox
            labelData={"TCA Number"}
            inputValue={"TCA2463345"}
            dataValue={formData.tcaNumber}
            setDataValue={text => handleInputChange("tcaNumber", text)}
          />
          <InputBox
            labelData={"Name"}
            inputValue={"Ankit Kumar Dubey"}
            dataValue={formData.name}
            setDataValue={text => handleInputChange("name", text)}
          />
          <InputBox
            labelData={"Total Attendance"}
            inputValue={"Total Attendance : 23"}
            dataValue={formData.totalAttendance}
            setDataValue={text => handleInputChange("totalAttendance", text)}
          />
        </BaseContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default updateStudent

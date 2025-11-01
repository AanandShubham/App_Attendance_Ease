import BaseContainer from '@/app/components/BaseContainer'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import InputBox from '@/app/components/InputBox'
import { StudentTypeFormData } from '@/app/FromTypes'

const addStudent = () => {

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
            <SafeAreaView
                edges={['top', 'bottom']}
                className='w-full h-full dark:bg-[#061526]  bg-[#3A87BD] '
            >
                <BaseContainer
                    headerLabel={"Add Student"}
                    btnLabel={"Add"}
                >
                    <InputBox
                        labelData={"TCA Number"}
                        dataValue={formData.tcaNumber}
                        setDataValue={text => handleInputChange('tcaNumber', text)}
                    />
                    <InputBox
                        labelData={"Name"}
                        dataValue={formData.name}
                        setDataValue={text => handleInputChange('name', text)}
                    />
                    <InputBox
                        labelData={"Total Attendance"}
                        dataValue={formData.totalAttendance}
                        setDataValue={text => handleInputChange("totalAttendance", text)}
                    />
                </BaseContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default addStudent

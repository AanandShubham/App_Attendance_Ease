import BaseContainer from '@/app/components/BaseContainer'
import React, { SetStateAction, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import InputBox from '@/app/components/InputBox'
import { StudentTypeFormData } from '@/app/FromTypes'
import useAddStudent from '@/app/hooks/useAddStudent'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'
import useClassContext from '@/app/context/ClassContext'
import { ActivityIndicator, Text, View } from 'react-native'

const addStudent = () => {

    const { loading, addStudent } = useAddStudent()
    const { selectedClass } = useClassContext()

    const [formData, setFormData] = useState<StudentTypeFormData>({
        tca: '',
        name: '',
        totalAttendance: 0,
        classId: selectedClass?._id
    })

    const handleInputChange = (key: keyof StudentTypeFormData, value: SetStateAction<string>) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    const handleClick = async () => {
        // console.log("add student clicked") 
        const flag = await addStudent(formData)

        if (flag) {
            Toast.show({
                type: 'success',
                text1: "Student details Added "
            })
            router.back()
        } else {
            console.log("Error to add student data !!!")
            console.log("Student Data : ", formData)

        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
                className='w-full h-full dark:bg-[#061526]  bg-[#3A87BD] '
            >
                <BaseContainer
                    headerLabel={"Add Member"}
                    btnLabel={"Add"}
                    btnAction={handleClick}
                >
                    <InputBox
                        labelData={"ID"}
                        dataValue={formData.tca}
                        setDataValue={text => handleInputChange('tca', text)}
                    />
                    <InputBox
                        labelData={"Name"}
                        dataValue={formData.name}
                        setDataValue={text => handleInputChange('name', text)}
                    />
                    <InputBox
                        labelData={"Total Attendance"}
                        dataValue={formData.totalAttendance}
                        setDataValue={text => handleInputChange("totalAttendance", text.toString())}
                    />
                </BaseContainer>

                {loading && (
                    <View className='w-full h-full absolute bg-[#dae4e8e2] flex justify-center items-center gap-4'>
                        <Text>Prosessing ...</Text>
                        <ActivityIndicator />
                    </View>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default addStudent

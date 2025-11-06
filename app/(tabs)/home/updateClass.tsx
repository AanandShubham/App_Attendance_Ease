import { SetStateAction, useState } from 'react'
import BaseContainer from '@/app/components/BaseContainer'
import InputBox from '@/app/components/InputBox'
import { Link, router } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { ClassTypeFormData } from '@/app/FromTypes'
import useUpdateClass from '@/app/hooks/useUpdateClass'
import useClassContext from '@/app/context/ClassContext'
import Toast from 'react-native-toast-message'

// type FormData = {
//     className: string,
//     subject: string,
//     time: string,
//     totalClass: Number,
//     roomNo: Number
// }

const updateClass = () => {

    const { loading, updateClass } = useUpdateClass()
    const { selectedClass } = useClassContext()

    const [formData, setFormData] = useState<ClassTypeFormData>({
        id: '',
        name:'',
        roomNo:'',
        totalClass: 0,
        timeTable:'',
        subject: ''
    })

    const handleInputChange = (key: keyof ClassTypeFormData, value: SetStateAction<string>) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    const btnControl = async () => {
        console.log("Class Data : ", formData)
        const flag = await updateClass(formData)

        if (flag) {
            router.back()
            Toast.show({
                type: "success",
                text1: "Class Details updated Successfully"
            })
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526] bg-[#3A87BD] '>
                <BaseContainer
                    btnAction={btnControl}
                    headerLabel={"Edit Class"}
                    btnLabel={"Update"}
                >
                    <InputBox
                        labelData={"Class Name"}
                        inputValue={selectedClass.name}
                        dataValue={formData.name}
                        setDataValue={text => handleInputChange("name", text)}
                    />
                    <InputBox
                        labelData={"Subject"}
                        inputValue={selectedClass.subject}
                        dataValue={formData.subject}
                        setDataValue={text => handleInputChange("subject", text)}
                    />
                    <InputBox
                        labelData={"Time"}
                        inputValue={selectedClass.timeTable}
                        dataValue={formData.timeTable}
                        setDataValue={text => handleInputChange("timeTable", text)}
                    />
                    <InputBox
                        labelData={"Total Class"}
                        inputValue={selectedClass.totalClass.toString()}
                        dataValue={formData.totalClass}
                        setDataValue={text => handleInputChange("totalClass", text.toString())}
                    />
                    <InputBox
                        labelData={"Room"}
                        inputValue={selectedClass.roomNo}
                        dataValue={formData.roomNo}
                        setDataValue={text => handleInputChange("roomNo", text)}
                    />
                </BaseContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default updateClass

import { useState } from 'react'
import BaseContainer from '@/app/components/BaseContainer'
import InputBox from '@/app/components/InputBox'
import { Link } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { ClassTypeFormData } from '@/app/FromTypes'

// type FormData = {
//     className: string,
//     subject: string,
//     time: string,
//     totalClass: Number,
//     roomNo: Number
// }

const updateClass = () => {


    const [formData, setFormData] = useState<ClassTypeFormData>({
        className: '',
        subject: '',
        time: '',
        totalClass: 0,
        roomNo: 0
    })

    const handleInputChange = (key: keyof ClassTypeFormData, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526] bg-[#3A87BD] '>
                <BaseContainer headerLabel={"Edit Class"} btnLabel={"Update"} >
                    <InputBox
                     labelData={"Class Name"} 
                     inputValue={"MCA 2024 - 26"} 
                     dataValue={formData.className}
                     setDataValue={text=>handleInputChange("className",text)}
                     />
                    <InputBox 
                    labelData={"Subject"} 
                    inputValue={"Android"} 
                    dataValue={formData.subject}
                    setDataValue={text=>handleInputChange("subject",text)}
                    />
                    <InputBox 
                    labelData={"Time"}
                    dataValue={formData.time}
                    setDataValue={text=>handleInputChange("time",text)}
                    />
                    <InputBox
                     labelData={"Total Class"}
                     dataValue={formData.totalClass}
                     setDataValue={text=>handleInputChange("totalClass",text)}
                     />
                    <InputBox 
                    labelData={"Room"}
                    dataValue={formData.roomNo}
                    setDataValue={text=>handleInputChange("roomNo",text)}
                    />
                </BaseContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default updateClass

import InputBox from '@/app/components/InputBox'
import React, { SetStateAction, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import BaseContainer from '@/app/components/BaseContainer'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { ClassTypeFormData } from '@/app/FromTypes'
import useAddClass from '@/app/hooks/useAddClass'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'
import { ActivityIndicator, Text, View } from 'react-native'

const addClass = () => {

  const { loading, addClass } = useAddClass()

  const [formData, setFormData] = useState<ClassTypeFormData>({
    id: "id",
    name: '',
    subject: '',
    timeTable: '',
    totalClass: 0,
    roomNo: ''
  })

  const handleInputChange = (key: keyof ClassTypeFormData, value: SetStateAction<string>) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const btnControl = async () => {

    console.log(formData)
    const flag = await addClass(formData)
    if (flag) {
      Toast.show({
        type: "success",
        text1: "Class Added Successfully "
      })
      router.back()
    }

    console.log("request done ")

  }


  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526]  bg-[#3A87BD] '>
        <BaseContainer
          headerLabel={"Add Class"}
          btnAction={btnControl}
          btnLabel={"Add"} >
          <InputBox
            labelData={"Class Name"}
            dataValue={formData.name}
            setDataValue={text => handleInputChange('name', text)} />
          <InputBox
            labelData={"Subject"}
            dataValue={formData.subject}
            setDataValue={text => handleInputChange('subject', text)} />
          <InputBox
            labelData={"Time"}
            dataValue={formData.timeTable}
            setDataValue={text => handleInputChange('timeTable', text)}
          />
          <InputBox
            labelData={"Total Class"}
            dataValue={formData.totalClass}
            setDataValue={text => handleInputChange('totalClass', text.toString())}
          />
          <InputBox
            labelData={"Room"}
            dataValue={formData.roomNo}
            setDataValue={text => handleInputChange('roomNo', text)}
          />
        </BaseContainer>
        {
          loading ? <View className='w-full h-full absolute bg-[#dae4e8e2] flex justify-center items-center gap-4'><Text>"Generating PDF..."</Text> <ActivityIndicator /></View> :<Text></Text>
        }
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default addClass

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
    // console.log(formData)
    const flag = await addClass(formData)
    if (flag) {
      Toast.show({
        type: "success",
        text1: "Class Added Successfully"
      })
      router.back()
    }
    // console.log("request done ")
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526]  bg-[#3A87BD] '>
        <BaseContainer
          headerLabel={"Add Group"}
          btnAction={btnControl}
          btnLabel={"Add"} >
          <InputBox
            infoMode={true}
            info={"Provide the group's name or department as issued by organization refers to a class,batch,team or official department depending on your role Eg:- [MCA-SecA],[CS-3rd year],[Sales Dept],[Producton Unit]"}
            labelData={"Group Name"}
            dataValue={formData.name}
            setDataValue={text => handleInputChange('name', text)} />
          <InputBox
            infoMode={true}
            info={"Subject or focus area of the group. EX- 'Mathematics', 'Computer Science', or 'Web Development' "}
            labelData={"Assigned For"}
            dataValue={formData.subject}
            setDataValue={text => handleInputChange('subject', text)} />
          <InputBox
            infoMode={true}
            info={"Time slot which attendance is being marked . it's like class period (for Student) or work shift Eg:- [09:00am to 09:45am],[09:00am to 05:00pm],etc"}
            labelData={"Time"}
            dataValue={formData.timeTable}
            setDataValue={text => handleInputChange('timeTable', text)}
          />
          <InputBox
            infoMode={true}
            info={"Total number of days the group is scheduled to meet or hold classes. EX- '30', '45', or '60' "}
            labelData={"Assigned Days"}
            dataValue={formData.totalClass}
            setDataValue={text => handleInputChange('totalClass', text.toString())}
          />
          <InputBox
            infoMode={true}
            info={"Room number or location where the group meets. EX- 'Room 101', 'Lab A', or 'Building B, Room 202' "}
            labelData={"Room"}
            dataValue={formData.roomNo}
            setDataValue={text => handleInputChange('roomNo', text)}
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

export default addClass

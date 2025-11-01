import InputBox from '@/app/components/InputBox'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import BaseContainer from '@/app/components/BaseContainer'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { ClassTypeFormData } from '@/app/FromTypes'

const addClass = () => {

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
      <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526]  bg-[#3A87BD] '>
        <BaseContainer headerLabel={"Add Class"} btnLabel={"Add"} >
          <InputBox
            labelData={"Class Name"} 
            dataValue={formData.className}
            setDataValue={text=>handleInputChange('className',text)}/>
          <InputBox 
          labelData={"Subject"} 
          dataValue={formData.subject}
          setDataValue={text=>handleInputChange('subject',text)}/>
          <InputBox 
          labelData={"Time"}
          dataValue={formData.time}
          setDataValue={text=>handleInputChange('time',text)}
          />
          <InputBox 
          labelData={"Total Class"}
          dataValue={formData.totalClass}
          setDataValue={text=>handleInputChange('totalClass',text)}
          />
          <InputBox 
          labelData={"Room"} 
          dataValue={formData.roomNo}
          setDataValue={text=>handleInputChange('roomNo',text)}
          />
        </BaseContainer>
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default addClass

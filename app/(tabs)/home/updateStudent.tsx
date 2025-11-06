import React, { SetStateAction, useState } from 'react'
import BaseContainer from '@/app/components/BaseContainer'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import InputBox from '@/app/components/InputBox'
import { StudentTypeFormData } from '@/app/FromTypes'
import useClassContext from '@/app/context/ClassContext'
import useUpdateStudent from '@/app/hooks/useUpdateStudent'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'



const updateStudent = () => {
  const { loading, updateStudent } = useUpdateStudent()
  const { selectedStudent, selectedClass } = useClassContext()

  const totalAttendance = selectedStudent.classList.find(
    (item: any) => item.classId.toString() === selectedClass._id.toString()
  ).totalAttendance | 0
  const [formData, setFormData] = useState<StudentTypeFormData>({
    tca: '',
    name: '',
    totalAttendance: 0,
    classId: selectedClass._id
  })

  const handleInputChange = (key: keyof StudentTypeFormData, value: SetStateAction<string>) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleUpdateClick = async () => {
    const flag = await updateStudent(formData)
    if (flag) {
      Toast.show({
        type: "success",
        text1: "Student details updated Successfully"
      })
      router.back()
    }else{
      console.log("Student data of form : ", formData)
    }
    // console.log("------------------------------------------------")
    // console.log("student data of context : ", selectedStudent)
    // console.log("------------------------------------------------")
    // console.log("Student data of form : ", formData)
    // console.log("------------------------------------------------")
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526]  bg-[#3A87BD] '>
        <BaseContainer
          btnAction={handleUpdateClick}
          headerLabel={"Edit Student"}
          btnLabel={"Update"} >
          <InputBox
            labelData={"TCA Number"}
            inputValue={selectedStudent.tca}
            dataValue={formData.tca}
            setDataValue={text => handleInputChange("tca", text)}
          />
          <InputBox
            labelData={"Name"}
            inputValue={selectedStudent.name}
            dataValue={formData.name}
            setDataValue={text => handleInputChange("name", text)}
          />
          <InputBox
            labelData={"Total Attendance"}
            inputValue={totalAttendance.toString()}
            dataValue={formData.totalAttendance}
            setDataValue={text => handleInputChange("totalAttendance", text.toString())}
          />
        </BaseContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default updateStudent

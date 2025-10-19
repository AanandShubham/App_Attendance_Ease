import React from 'react'
import { View,Text, Pressable } from 'react-native'
type StudentDataCardProps = {
  onPressAction?:()=>void,
}       

const StudentDataCard:React.FC<StudentDataCardProps> = ({onPressAction=()=>{}}) => {
  return (
    <Pressable
        onPress={onPressAction}
        className='w-full h-[84px] bg-[#90C4EE] rounded-lg shadow-black elevation-4 shadow-[#3A87BD] border-1 border-[#1B64A8]  rounded-tl-[5px] rounded-tr-[25px] rounded-bl-[25px] rounded-br-[5px]'>
        <View className='h-full justify-center items-start gap-0 pl-6 '>
            <Text className='text-black text-lg font-semibold'>TCA Number</Text>
            <Text className='text-black text-lg font-semibold'>Name</Text>
            <Text className='text-black text-lg font-semibold'>Total Attendance</Text>
        </View>

       </Pressable>
  )
}

export default StudentDataCard

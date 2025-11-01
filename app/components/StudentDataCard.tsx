import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import Fontisto from '@expo/vector-icons/Fontisto'
import { useColorScheme } from 'nativewind'


type StudentDataCardProps = {
  onPressAction?: () => void,
  tcaNumber?: string,
  name?: string,
  totalAttendance?: number,
  showCheckbox?: boolean,
  isPresent?: boolean
}

const StudentDataCard: React.FC<StudentDataCardProps> = (
  {
    tcaNumber,
    name,
    totalAttendance,
    onPressAction = () => { },
    showCheckbox = false,
    isPresent
  }
) => {

  const [checked, setChecked] = useState(isPresent)
  const { colorScheme } = useColorScheme()

  return (
    <Pressable
      onPress={onPressAction}
      className='w-full h-[84px] dark:bg-[#17242D] bg-[#90C4EE] rounded-lg shadow-black elevation-4 shadow-[#3A87BD] border-1 dark:border-[#0B202E] border-[#1B64A8]  rounded-tl-[5px] rounded-tr-[25px] rounded-bl-[25px] rounded-br-[5px]'>
      <View className=' w-full h-full justify-center items-start gap-0 pl-6 '>
        <Text className='w-full text-black dark:text-white text-lg font-semibold'>{tcaNumber || "TCA Number"}</Text>
        <Text className='w-full text-black dark:text-white text-lg font-semibold'>{name || "Name"}</Text>
        <Text className='w-full text-black dark:text-white text-lg font-semibold'>Total Attendance : {totalAttendance || "0"}</Text>
        {
          showCheckbox && <Pressable
            onPress={() => setChecked((prev) => !prev)}
            className='absolute right-8 top-[35%] '>
            {
              checked ? <Fontisto name="checkbox-active" size={25} color={colorScheme === "dark" ? "white" : "black"} />
                : <Fontisto name="checkbox-passive" size={25} color={colorScheme === "dark" ? "white" : "black"} />
            }
          </Pressable>
        }
      </View>

    </Pressable>
  )
}

export default StudentDataCard

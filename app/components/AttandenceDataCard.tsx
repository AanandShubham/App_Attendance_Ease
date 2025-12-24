import React from 'react'
import { View, Text, Pressable } from 'react-native'
type DataCardProps = {
  date?: string,
  totalAttendance?: number,
  time?: string,
  onPressAction?: () => void,
}
const AttandanceDataCard: React.FC<DataCardProps> = (
  {
    date,
    totalAttendance,
    time,
    onPressAction = () => { console.log("Card Pressed") }
  }) => {
  return (
    <Pressable
      onPress={onPressAction}
      className='w-full h-[73px] dark:bg-[#17242D] bg-[#90C4EE] rounded-lg shadow-black elevation-4 shadow-&lsqb;#3A87BD&rsqb; border-1 dark:border-[#0B202E] border-[#1B64A8]  flex-1 flex-row justify-center items-center rounded-tl-[5px] rounded-tr-[25px] rounded-bl-[25px] rounded-br-[5px]'>
      <View className='w-[60%] h-full justify-center items-start gap-1 pl-6 '>
        <Text className='text-black dark:text-white text-lg font-semibold'>Date : {date}</Text>
        <Text className='text-black dark:text-white text-lg font-semibold'>Total Attendance : {totalAttendance}</Text>
      </View>
      <View className='w-[40%] h-full flex justify-center items-center'>
        <View className='w-[108px] h-[36px] dark:bg-[#16343D] bg-[#78B7E9] rounded-tl-[5px] rounded-tr-[15px] rounded-bl-[15px] rounded-br-[5px] flex justify-center items-center'>
          <Text className='text-[#3A87BD] text-[20px]'>{time}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default AttandanceDataCard

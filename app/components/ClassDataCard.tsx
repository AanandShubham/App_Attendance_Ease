import React from 'react'
import { View,Text, Pressable } from 'react-native'
type DataCardProps = {
  onPressAction?:()=>void,
}
const ClassDataCard:React.FC<DataCardProps> = ({onPressAction=()=>{console.log("Card Pressed")}}) => {
  return (
   <Pressable
    onPress={onPressAction}
    className='w-full h-[133px] dark:bg-[#17242D] dark:border-2 dark:border-[#0B202E] bg-[#90C4EE] rounded-lg shadow-black elevation-4 shadow-[#3A87BD] border-1 border-[#1B64A8]  flex-1 flex-row justify-center items-center rounded-tl-[5px] rounded-tr-[25px] rounded-bl-[25px] rounded-br-[5px]'>
    <View className='w-[50%] h-full justify-center items-start gap-1 pl-6 '>
        <Text className='text-black dark:text-white text-lg font-semibold'>MCA 2024 - 2026</Text>
        <Text className='text-black dark:text-white text-lg font-semibold'>Android</Text>
        <Text className='text-black dark:text-white text-lg font-semibold'>Room : 4246</Text>
        <Text className='text-black dark:text-white text-lg font-semibold'>9:30am to 11:30am</Text>
    </View>
    <View className='w-[50%] h-full flex justify-center items-center'>
      <View className='w-[108px] h-[80px] dark:bg-[#163043] bg-[#78B7E9] rounded-tl-[5px] rounded-tr-[25px] rounded-bl-[25px] rounded-br-[5px] flex justify-center items-center'>
        <Text className='text-[#1979D3] dark:text-[#7AAEDF] text-[16px]'>Remaining</Text>
        <Text className='text-[#3A87BD] dark:text-[#9CD1F8] text-[20px]'>23</Text>
      </View>
    </View>
   </Pressable>
  )
}

export default ClassDataCard

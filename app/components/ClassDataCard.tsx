import React, { useState } from 'react'
import { View, Text, Pressable, GestureResponderEvent, Modal } from 'react-native'

type DataCardProps = {
  showMenu?: boolean,
  showMenuAt?: { x: number, y: number }
  popUpAction?: () => void,
  onCloseMenu?: () => void
  onLongPressAction?: (event: any) => void,
  onPressAction?: () => void,
  className: string,
  subject: string,
  roomNo: any,
  time: string,
  totalClass: Number,
  attendanceSize: Number

}
const ClassDataCard: React.FC<DataCardProps> = (
  {
    className,
    subject,
    roomNo,
    time,
    totalClass,
    attendanceSize,
    showMenu = false,
    showMenuAt = { x: 0, y: 0 },
    popUpAction = () => { },
    onCloseMenu = () => { },
    onLongPressAction = (event: any) => { console.log("Card Long Pressed") },
    onPressAction = () => { console.log("Card Pressed") }
  }) => {

  const remaining = Number(totalClass) - Number(attendanceSize)

  return (
    <View>
      <Pressable
        onPress={onPressAction}
        onLongPress={onLongPressAction}
        className='w-full h-[133px] dark:bg-[#17242D] dark:border dark:border-[#0d4162] bg-[#90C4EE] rounded-lg shadow-xl elevation-2 shadow-blue-800 border  border-[#1B64A8]  flex-1 flex-row justify-center items-center rounded-tl-[5px] rounded-tr-[40px] rounded-bl-[40px] rounded-br-[5px] px'>

        <View className='w-[50%] h-full justify-center items-start gap-1 pl-6 '>
          <Text className='text-black dark:text-white text-lg font-semibold'>{className}</Text>
          <Text className='text-black dark:text-white text-lg font-semibold'>{subject}</Text>
          <Text className='text-black dark:text-white text-lg font-semibold'>Room : {roomNo}</Text>
          <Text className='text-black dark:text-white text-lg font-semibold'>{time}</Text>
        </View>
        <View className='w-[50%] h-full flex justify-center items-center'>
          <View className='w-[108px] h-[80px] dark:bg-[#163043] bg-[#78B7E9] rounded-tl-[5px] rounded-tr-[25px] rounded-bl-[25px] rounded-br-[5px] flex justify-center items-center'>
            <Text className='text-[#1979D3] dark:text-[#7AAEDF] text-[16px]'>Remaining</Text>
            <Text className='text-[#3A87BD] dark:text-[#9CD1F8] text-[20px]'>{remaining.toString()}</Text>
          </View>
        </View>
      </Pressable>

      <Modal visible={showMenu} transparent animationType="fade">
        <Pressable
          className="flex-1"
          onPress={onCloseMenu}   // <-- auto close menu
          style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}   // <-- prevent closing when clicking inside
            className="absolute bg-white rounded-xl shadow-lg p-3 w-40"
            style={{
              top: showMenuAt.y,
              left: showMenuAt.x - 150
            }}
          >

            <Pressable onPress={popUpAction}>
              <Text className="p-2 text-base">🗑 Delete</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

    </View>
  )
}

export default ClassDataCard

//  ✏ Edit
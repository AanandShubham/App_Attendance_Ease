import React, { useState } from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import Fontisto from '@expo/vector-icons/Fontisto'
import { useColorScheme } from 'nativewind'


type StudentDataCardProps = {
  showMenu?: boolean,
  showMenuAt?: { x: number, y: number }
  popUpAction?: () => void,
  onCloseMenu?: () => void
  onLongPressAction?: (event: any) => void,
  onPressAction?: () => void,
  tcaNumber?: string,
  name?: string,
  totalAttendance?: number,
  showCheckbox?: boolean,
  isPresent?: boolean,

}

const StudentDataCard: React.FC<StudentDataCardProps> = (
  {
    tcaNumber,
    name,
    totalAttendance,
    onPressAction = () => { },
    showCheckbox = false,
    isPresent,
    showMenu = false,
    showMenuAt = { x: 0, y: 0 },
    popUpAction = () => { },
    onCloseMenu = () => { },
    onLongPressAction = (event: any) => { console.log("Card Long Pressed") },
  }
) => {

  const { colorScheme } = useColorScheme()

  return (
    <View>

      <Pressable
        onLongPress={onLongPressAction}
        onPress={onPressAction}
        className='w-full h-[84px] dark:bg-[#17242D] bg-[#90C4EE] rounded-lg shadow-black elevation-4 shadow-&lsqb;#3A87BD&rsqb; border-1 dark:border-[#0B202E] border-[#1B64A8]  rounded-tl-[5px] rounded-tr-[25px] rounded-bl-[25px] rounded-br-[5px]'>
        <View className=' w-full h-full justify-center items-start gap-0 pl-6 '>
          <Text className='w-full text-black dark:text-white text-lg font-semibold'>{tcaNumber || "Student ID"}</Text>
          <Text className='w-full text-black dark:text-white text-lg font-semibold'>{name || "Name"}</Text>
          <Text className='w-full text-black dark:text-white text-lg font-semibold'>Total Attendance : {totalAttendance || "0"}</Text>
          {
            showCheckbox && <Pressable
              onPress={onPressAction}
              className='absolute right-8 top-[35%] '>
              {
                isPresent ? (
                  <Fontisto name="checkbox-active" size={25} color={colorScheme === "dark" ? "white" : "black"} />
                ) : (
                  <Fontisto name="checkbox-passive" size={25} color={colorScheme === "dark" ? "white" : "black"} />
                )}
            </Pressable>
          }
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

export default StudentDataCard

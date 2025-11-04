import React from 'react'
import { Text, Pressable } from 'react-native'
import { Animated } from 'react-native'
import AddStudent from '@/assets/images/AddStudent.png'

type uniqueButtonProps = {
  btnStyleClass?: String,
  itemStyleClass?: String,
  label?: String,
  btnAction?: () => void,
  shakeAnim?: Animated.Value,
  btnImageSource?: any,
}

const UniqueButton: React.FC<uniqueButtonProps> = (
  {
    btnStyleClass = "",
    itemStyleClass,
    label = "Click",
    btnAction,
    shakeAnim = new Animated.Value(0),
    btnImageSource = "",
  }
) => {

  return (
    <Pressable
      onPress={btnAction}
      className={`rounded-tr-[2px]  rounded-bl-[2px] rounded-tl-[48px] rounded-br-[48px] rounded-md flex justify-center items-center absolute  ${btnStyleClass}  dark:bg-[#183448] bg-[#3A87BD] shadow-2xl elevation-xl shadow-[#1B64A8]  border-2 dark:border-[#17242d] border-[#1B64A8]   absolute  `}
     
    >

      {
        btnImageSource ? <Animated.Image
          source={btnImageSource || AddStudent}
          className={`w-[100%] h-[100%] p-2 ${itemStyleClass}`}
        /> : <Animated.View
          style={{
            transform: [{ translateY: shakeAnim }]
          }}
        >
          <Text className={`${itemStyleClass}`}>
            {label}
          </Text>
        </Animated.View>
      }





    </Pressable>
  )

}

export default UniqueButton

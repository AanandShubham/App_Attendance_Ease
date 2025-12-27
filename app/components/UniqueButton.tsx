import React, { useRef } from 'react'
import { Text, Pressable, Animated } from 'react-native'
// import AddStudent from '@/assets/images/AddStudent.png'

type UniqueButtonProps = {
  btnStyleClass?: string
  itemStyleClass?: string
  label?: String
  btnAction?: () => void
  shakeAnim?: Animated.Value
  btnImageSource?: any
}

const UniqueButton: React.FC<UniqueButtonProps> = ({
  btnStyleClass = "",
  itemStyleClass = "",
  label = "Click",
  btnAction,
  shakeAnim,
  btnImageSource
}) => {

  const AddStudent = require('../../assets/images/AddStudent.png')

  // Create animation value only once
  const internalShakeAnim = useRef(new Animated.Value(0)).current
  const anim = shakeAnim || internalShakeAnim

  return (
    <Pressable
      onPress={btnAction}
      className={`rounded-tr-[2px] rounded-bl-[2px] rounded-tl-[48px] rounded-br-[48px] rounded-md 
        flex justify-center items-center absolute ${btnStyleClass} dark:bg-[#183448] bg-[#3A87BD] shadow-2xl elevation-xl shadow-&lsqb;1B64A8&rsqb; border-2 dark:border-[#17242d] border-[#1B64A8]`}
    >
      {btnImageSource ? (
        <Animated.Image
          source={btnImageSource || AddStudent}
          className={`w-[100%] h-[100%] p-2 ${itemStyleClass}`}
        />
      ) : (
        <Animated.View
          style={{
            transform: [{ translateY: anim }]
          }}
        >
          <Text className={itemStyleClass}>{label}</Text>
        </Animated.View>
      )}
    </Pressable>
  )
}

export default UniqueButton

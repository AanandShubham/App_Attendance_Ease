import React, { Component } from 'react'
import { Text, Pressable } from 'react-native'

type uniqueButtonProps = {
  btnStyleClass?:String,
  itemStyleClass?:String,
  label?:String,
  btnAction?:()=>void,
  
}

const UniqueButton:React.FC<uniqueButtonProps> = ({btnStyleClass="",itemStyleClass,label="Click",btnAction}) => {

  return (
    <Pressable 
      onPress={btnAction}
      className={`rounded-tr-[2px]  rounded-bl-[2px] rounded-tl-[48px] rounded-br-[48px] rounded-md flex justify-center items-center absolute  ${btnStyleClass}  bg-[#3A87BD] shadow-2xl elevation-xl shadow-[#1B64A8] border-2 border-[#1B64A8] absolute  `}
    >
      <Text className={`${itemStyleClass}`}>{label}</Text>

    </Pressable>
  )

}

export default UniqueButton

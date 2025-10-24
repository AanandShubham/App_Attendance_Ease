import { View, TextInput, Text, Animated, StyleSheet } from 'react-native'
import React, { useState, useRef, use } from 'react'
// import { } from 'nativewind'

type inputBoxProps = {
  labelData?:String,
  inputValue?:String
}

const InputBox:React.FC<inputBoxProps> = ({labelData="Label",inputValue=""}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')
  const [labelTextData,setLabelTextData] = useState(inputValue || labelData)

  const labelAnim = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isFocused, value])

  const labelStyle = {
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [8, -15],
    }),
    left: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 20],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#333', '#017ED8'],
    }),
    backgroundColor: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#90C4EE', '#e9eff6'],
    })
    
  }

  return (
    <View
      className='w-full h-[55px] rounded-tr-[20px] rounded-tl-[5px] rounded-bl-[20px] rounded-br-[5px] bg-[#90C4EE] border-2 elevation-md shadow-xl shadow-[#3A87BD] border-[#3A87BD] flex flex-col justify-center px-4'
    >
      <Animated.Text
        className={'rounded-b-[8px] pb-[2px] text-neutral-950 font-semibold '}
        style={[styles.label, labelStyle]}
      >
       {labelTextData}
      </Animated.Text>

      <TextInput
        value={value}
        onChangeText={setValue}
        onFocus={() => {
          setLabelTextData(labelData)
          setValue(inputValue.toString())
          setIsFocused(true)
          }}
        onBlur={() => setIsFocused(false)}
        className= ' w-full h-[90%] text-xl text-neutral-950 mt-2 pl-2 pr-2  ' 
        placeholder={ isFocused ?' ' :'________________________'}
      /> 
    </View>
  )
}

export default InputBox


const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    left: "10%",
    top: "5%",
    backgroundColor: '#e9eff6e8',
    paddingHorizontal: 5,
    paddingLeft:10

  },
})






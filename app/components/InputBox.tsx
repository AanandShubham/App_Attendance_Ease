import { View, TextInput, Animated, StyleSheet, Pressable } from 'react-native'
import React, { useState, useRef } from 'react'
import { useColorScheme } from 'nativewind'
import { Ionicons } from '@expo/vector-icons'

type inputBoxProps<T> = {
  labelData?: string,
  inputValue?: string,
  dataValue: T,
  setDataValue: React.Dispatch<React.SetStateAction<T>>,
  passwordMode?: boolean
}

const InputBox = <T,>(
  {
    labelData = "Label",
    inputValue = "",
    dataValue,
    setDataValue,
    passwordMode = false
  }: inputBoxProps<T>

) => {
  const labelAnim = useRef(new Animated.Value(0)).current

  const [showPassword, setShowPassword] = useState(false)

  const { colorScheme } = useColorScheme()

  const [isFocused, setIsFocused] = useState(false)

  const [labelTextData, setLabelTextData] = useState(inputValue || labelData)

  const labelBackgroundColorFinal = colorScheme === "dark" ? '#061526' : '#e9eff6e8'

  const labelBackgrondColorInitial = colorScheme === "dark" ? '#17242D' : '#90C4EE'

  const labelTextColorInitial = colorScheme === "dark" ? '#FFFFFF' : '#333333'

  const labelTextColorFinal = colorScheme === "dark" ? '#fff' : '#017ED8'


  React.useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || dataValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isFocused, dataValue])

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
      outputRange: [labelTextColorInitial, labelTextColorFinal],
    }),
    backgroundColor: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [labelBackgrondColorInitial, labelBackgroundColorFinal],
    })

  }

  return (
    <View
      className='w-full h-[55px] rounded-tr-[20px] rounded-tl-[5px] rounded-bl-[20px] rounded-br-[5px]   dark:bg-[#17242D] bg-[#90C4EE] border-2 dark:border-[#17242D]  border-[#3A87BD] elevation-md shadow-xl shadow-[#3A87BD] flex flex-col justify-center px-4'
    >
      <Animated.Text
        className={'rounded-b-[8px] pb-[2px] dark:text-white text-neutral-950 font-semibold '}
        style={[styles.label, labelStyle]}
      >
        {labelTextData}
      </Animated.Text>

      <View>
        <TextInput
          secureTextEntry={passwordMode ? !showPassword : false}
          value={dataValue}
          onChangeText={setDataValue}
          onFocus={() => {
            setLabelTextData(labelData)
            setDataValue(inputValue as string as T)
            setIsFocused(true)
          }}
          inputMode='text'
          onBlur={() => setIsFocused(false)}
          className=' w-full h-[90%] text-xl dark:placeholder:text-white   dark:text-white text-neutral-950 mt-2 pl-2 pr-2  '
          placeholder={isFocused ? ' ' : '________________________'}
        />

        {passwordMode &&
          <Pressable
            onPress={() => setShowPassword(prev => !prev)}
            className='absolute top-1 -right-3 p-2'>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              color={colorScheme === 'dark' ? 'white' : 'black'}
              size={30}
            />
          </Pressable>
        }
      </View>
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
    paddingLeft: 10

  },
})






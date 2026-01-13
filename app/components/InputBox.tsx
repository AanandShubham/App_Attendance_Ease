import { View, TextInput, Animated, StyleSheet, Pressable, Modal, Text } from 'react-native'
import React, { useState, useRef } from 'react'
import { useColorScheme } from 'nativewind'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import { Dimensions } from 'react-native'

type inputBoxProps<T> = {
  labelData?: string,
  inputValue?: string,
  dataValue: T,
  setDataValue: React.Dispatch<React.SetStateAction<T>>,
  passwordMode?: boolean,
  infoMode?: boolean,
  info?: string,
  disable?: boolean
}

const InputBox = <T,>(
  {
    labelData = "Label",
    inputValue = "",
    dataValue,
    setDataValue,
    passwordMode = false,
    infoMode = false,
    info = "This is an info box for this input field.",
    disable = true
  }: inputBoxProps<T>

) => {

  const labelAnim = useRef(new Animated.Value(0)).current

  const [showPassword, setShowPassword] = useState(false)

  const [showInfoAt, setShowInfoAt] = useState({ x: 0, y: 0 })

  const [showInfoText, setShowInfoText] = useState(false)

  const { colorScheme } = useColorScheme()

  const [isFocused, setIsFocused] = useState(false)

  const [labelTextData, setLabelTextData] = useState(inputValue || labelData)

  const labelBackgroundColorFinal = colorScheme === "dark" ? '#020b14e5' : '#e9eff6e8'

  const labelBackgrondColorInitial = colorScheme === "dark" ? '#17242D' : '#90C4EE'

  const labelTextColorInitial = colorScheme === "dark" ? '#FFFFFF' : '#333333'

  const labelTextColorFinal = colorScheme === "dark" ? '#fff' : '#017ED8'


  const tooltipWidth = 240
  const tooltipHeight = 80
  const arrowSize = 10

  // Tooltip ABOVE and to the LEFT of the icon
  const tooltipX = showInfoAt.x - tooltipWidth - 29
  const tooltipY = showInfoAt.y - tooltipHeight - arrowSize - 66

  // // Arrow points to the icon
  // const arrowX = showInfoAt.x - arrowSize - 28
  // const arrowY = showInfoAt.y - arrowSize - 53

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
      className='w-full h-[55px] rounded-tr-[20px] rounded-tl-[5px] rounded-bl-[20px] rounded-br-[5px]   dark:bg-[#17242D] bg-[#90C4EE] border-2 dark:border-[#17242D] border-[#3A87BD] elevation-md shadow-xl shadow-&lsqb;#3A87BD&rsqb; flex flex-row justify-center items-center px-2 gap-9'
    >
      <View className='w-full flex-1 h-full flex items-center justify-center relative'>
        <Animated.Text
          className={'rounded-b-[8px] pb-[2px] dark:text-white text-neutral-950 font-semibold '}
          style={[styles.label, labelStyle]}
        >
          {labelTextData}
        </Animated.Text>

        <View className='w-full ml-4'>
          <TextInput
            editable={disable}
            secureTextEntry={passwordMode ? !showPassword : false}
            value={dataValue}
            onChangeText={(text) => setDataValue(text as T)}
            onFocus={() => {
              setLabelTextData(labelData)
              setIsFocused(true)
              // setDataValue(inputValue as string as T)
            }}

            inputMode='text'
            onBlur={() => setIsFocused(false)}
            className='w-full h-[90%] text-xl  dark:placeholder:text-white   dark:text-white text-neutral-950 mt-2 pl-2 pr-2'
            placeholder={isFocused ? ' ' : ' _______________________'}
          />

          {passwordMode &&
            <Pressable
              onPress={() => setShowPassword(prev => !prev)}
              className='absolute top-1 -right-10 p-2'>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                color={colorScheme === 'dark' ? 'white' : 'black'}
                size={30}
              />
            </Pressable>
          }

        </View>
      </View>

      <Pressable
        className="p-2"
        onPressIn={(e) => {
          const { pageX, pageY } = e.nativeEvent
          setShowInfoAt({ x: pageX, y: pageY })
        }}
        onPress={() => setShowInfoText(true)}
      >

        {
          infoMode &&
          <Ionicons
            name={showInfoText ? 'information-circle' : 'information-circle-outline'}
            color={colorScheme === 'dark' ? 'white' : 'black'}
            size={32}
          />
        }
      </Pressable>

      <Modal visible={showInfoText} transparent animationType="fade">
        <Pressable
          className="flex-1"
          onPress={() => setShowInfoText(false)}   // <-- auto close menu
          style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
        >
          {/* Tooltip box */}
          <Pressable
            onPress={() => { }}
            style={{
              position: "absolute",
              top: tooltipY,
              left: tooltipX,
              width: tooltipWidth
            }}
            className="bg-white rounded-tl-[5px] rounded-tr-[30px] rounded-bl-[30px] shadow-lg p-3"
          >
            <Text className="text-neutral-900 px-1">{info}</Text>
          </Pressable>

          {/* Arrow */}
          {/* <View
            className='-rotate-[30deg]'
            style={{
              position: "absolute",
              top: arrowY,
              left: arrowX,
              width: 0,
              height: 0,
              borderLeftWidth: arrowSize,
              borderRightWidth: arrowSize,
              borderTopWidth: arrowSize,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: "white"
            }}
          /> */}
        </Pressable>
      </Modal>
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

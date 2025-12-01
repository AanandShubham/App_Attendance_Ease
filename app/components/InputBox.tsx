import { View, TextInput, Animated, StyleSheet, Pressable } from 'react-native'
import React, { useState, useRef } from 'react'
import { useColorScheme } from 'nativewind'
import { Ionicons } from '@expo/vector-icons'

type inputBoxProps<T> = {
  labelData?: string,
  inputValue?: string,
  dataValue: T,
  setDataValue: React.Dispatch<React.SetStateAction<T>>,
  passwordMode?: boolean,
  disable?: boolean
}

const InputBox = <T,>(
  {
    labelData = "Label",
    inputValue = "",
    dataValue,
    setDataValue,
    passwordMode = false,
    disable = true
  }: inputBoxProps<T>

) => {
  const labelAnim = useRef(new Animated.Value(0)).current

  const [showPassword, setShowPassword] = useState(false)

  const { colorScheme } = useColorScheme()

  const [isFocused, setIsFocused] = useState(false)

  const [labelTextData, setLabelTextData] = useState(inputValue || labelData)

  const labelBackgroundColorFinal = colorScheme === "dark" ? '#020b14e5' : '#e9eff6e8'

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



// import { View, TextInput, Animated, StyleSheet, Pressable } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import { useColorScheme } from 'nativewind'
// import { Ionicons } from '@expo/vector-icons'

// type InputBoxProps<T> = {
//   label?: string
//   value: T
//   setValue: React.Dispatch<React.SetStateAction<T>>
//   password?: boolean
//   disable?: boolean
// }

// const InputBox = <T extends string | number>(
//   {
//     label = "Label",
//     value,
//     setValue,
//     password = false,
//     disable = true
//   }: InputBoxProps<T>
// ) => {

//   const { colorScheme } = useColorScheme()
//   const [isFocused, setIsFocused] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)

//   const labelAnim = useRef(new Animated.Value(0)).current

//   const isFilled = String(value ?? "").length > 0

//   // Floating Label Animation
//   useEffect(() => {
//     Animated.timing(labelAnim, {
//       toValue: isFocused || isFilled ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start()
//   }, [isFocused, isFilled])

//   const labelStyle = {
//     top: labelAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [12, -12],
//     }),
//     left: labelAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [14, 20],
//     }),
//     fontSize: labelAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [18, 13],
//     }),
//     color: labelAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [
//         colorScheme === "dark" ? "#C7C7C7" : "#333333",
//         colorScheme === "dark" ? "#FFFFFF" : "#017ED8"
//       ]
//     }),
//     backgroundColor: labelAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [
//         colorScheme === "dark" ? "#17242D" : "#90C4EE",
//         colorScheme === "dark" ? "#020b14e5" : "#e9eff6e8"
//       ]
//     })
//   }

//   return (
//     <View
//       className="
//         w-full h-[55px]
//         rounded-tr-[20px] rounded-tl-[5px] rounded-bl-[20px] rounded-br-[5px]
//         dark:bg-[#17242D] bg-[#90C4EE]
//         border-2 dark:border-[#17242D] border-[#3A87BD]
//         elevation-md shadow-xl shadow-[#3A87BD]
//         flex justify-center px-4
//       "
//     >
//       <Animated.Text
//         style={[styles.label, labelStyle]}
//         className="absolute px-1 rounded-b-md font-semibold"
//       >
//         {label}
//       </Animated.Text>

//       <View className="flex-row w-full items-center">
//         <TextInput
//           editable={disable}
//           secureTextEntry={password ? !showPassword : false}
//           value={String(value)}
//           onChangeText={(text) => setValue(text as T)}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           className="
//             flex-1 h-[90%] text-xl mt-2
//             dark:text-white text-neutral-950
//           "
//           placeholder={isFocused ? ' ' : ''}
//           placeholderTextColor="#999"
//         />

//         {password && (
//           <Pressable
//             onPress={() => setShowPassword(prev => !prev)}
//             className="absolute right-0 p-2"
//           >
//             <Ionicons
//               name={showPassword ? 'eye-off' : 'eye'}
//               size={26}
//               color={colorScheme === "dark" ? "white" : "black"}
//             />
//           </Pressable>
//         )}
//       </View>
//     </View>
//   )
// }

// export default InputBox

// const styles = StyleSheet.create({
//   label: {
//     position: "absolute",
//     zIndex: 5,
//   }
// })





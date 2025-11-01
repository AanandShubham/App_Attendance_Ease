import React, { useState, useEffect } from 'react'
import { View, Text, Switch, Pressable,useWindowDimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

const settings = () => {

  const {height, width} =  useWindowDimensions()  

  const { colorScheme, setColorScheme } = useColorScheme()


  const onToggle = async () => {
    const next = colorScheme === "dark" ? "light" : "dark"
    setColorScheme(next)
    await AsyncStorage.setItem("theme", next)
    setIsEnabled(previousState => !previousState)
  }



  const [isEnabled, setIsEnabled] = useState(colorScheme === "dark" ? true : false)
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526] bg-[#3A87BD] flex justify-start items-center' >

        <View className='w-full h-full dark:bg-[#061526] bg-white p-2 py-6 relative flex  justify-start items-center'>
          <View className='w-[95vw] h-[84.8vh] dark:bg-[#061526] bg-[#e9eff6e8]   flex justify-start items-center gap-4  rounded-tl-[10px] rounded-tr-[50px] 
      rounded-br-[10px] rounded-bl-[50px]  border dark:border-2 dark:border-[#17242D]  border-[#0C5AA2] p-4 py-8 '>
            <Text
              style={{
                textShadowColor: '#000',
                textShadowOffset: { width: 2, height: 3 },
                textShadowRadius: 3,
              }}

              className='w-[70%] h-fit p-1  text-2xl text-white text-center font-bold rounded-md 
          absolute top-[-19px] dark:bg-[#183448] bg-[#3A87BD] rounded-bl-[20px] rounded-tr-[20px]   outline-black rounded-tl-[5px] rounded-br-[5px]  shadow-xl elevation-sm shadow-&lsqb;#1B64A8&rsqb;'
            >
              {"Settings"}
            </Text>

            <Pressable
            onPress={()=>router.push("/settings/profile")}
              className='w-full h-[55px] dark:bg-[#17242D] bg-[#90C4EE] flex flex-row justify-between items-center rounded-tr-[20px] rounded-bl-[20px] rounded-tl-[5px] rounded-br-[5px] p-2 px-4  '>
              <Text
                className='text-[24px] font-bold dark:text-white text-black'
              >
                Profile
              </Text>
              <Ionicons name='person' size={38} color={colorScheme === "dark" ? "white" : "black"} className='' />
            </Pressable>

            <View
              className='w-full h-[55px] dark:bg-[#17242D] bg-[#90C4EE] flex flex-row justify-between items-center rounded-tr-[20px] rounded-bl-[20px] rounded-tl-[5px] rounded-br-[5px] p-2 px-4  '>
              <Text
                className='text-[24px] font-bold dark:text-white text-black'
              >
                {isEnabled ? "Dark" : "Light"}
              </Text>

              <Switch
                trackColor={{ false: "#767577", true: "#2c80c5" }}
                thumbColor={"#3A87BD"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onToggle}
                value={isEnabled}
              />
            </View>

            <Pressable
              className='w-full h-[55px] dark:bg-[#17242D] bg-[#90C4EE] flex flex-row justify-between items-center rounded-tr-[20px] rounded-bl-[20px] rounded-tl-[5px] rounded-br-[5px] p-2 px-4  '>
              <Text
                className='text-[24px] font-bold dark:text-white text-black'
              >
                Help
              </Text>
              <Ionicons name='help-circle' size={38} color={colorScheme === "dark" ? "white" : "black"} className='' />


            </Pressable>

          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default settings
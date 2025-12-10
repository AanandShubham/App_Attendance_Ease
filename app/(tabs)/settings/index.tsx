import React, { useState, useEffect } from 'react'
import { View, Text, Switch, Pressable, useWindowDimensions, Linking } from 'react-native'
import Modal from 'react-native-modal'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import useAuthContext from '@/app/context/AuthContext'


const settings = () => {
  const { logout } = useAuthContext()

  const { height, width } = useWindowDimensions()

  const { colorScheme, setColorScheme } = useColorScheme()

  const [showMenu, setShowMenu] = useState(false)

  const sendEmail = () => {
    Linking.openURL("mailTo:www.subham.anand@gmail.com")
  }


  // const [showMenuAt, setShowMenuAt] = useState({ x: 0, y: 0 })


  const onToggle = async () => {
    const next = colorScheme === "dark" ? "light" : "dark"
    setColorScheme(next)
    await AsyncStorage.setItem("theme", next)
    setIsEnabled(previousState => !previousState)
    console.log("---------------------------------------------")
    console.log("Height : ", JSON.stringify(height, null, 2))
    console.log("---------------------------------------------")
    console.log("Width : ", JSON.stringify(width, null, 2))
    console.log("---------------------------------------------")
  }

  const [isEnabled, setIsEnabled] = useState(colorScheme === "dark" ? true : false)
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} className={`w-full h-[${height}] dark:bg-[#061526] bg-[${showMenu ? "#3d4035" : "#3A87BD"}] flex justify-start items-center`} >

        <View className={'w-full h-full dark:bg-[#061526] bg-white p-2 py-6 relative flex  justify-start items-center'}>
          <View
            // style={{height:height-150}} 
            className={`w-[95vw] h-[84.8vh] dark:bg-[#020b148a] bg-[#e9eff6e8]   flex justify-start items-center gap-4  rounded-tl-[10px] rounded-tr-[50px] rounded-br-[10px] rounded-bl-[50px]  border dark:border-2 dark:border-[#17242D]  border-[#0C5AA2] p-4 py-8 `}>

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
              onPress={() => router.push("/settings/profile")}
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
              onPress={(e) => {
                // const { pageX, pageY } = e.nativeEvent;
                // setShowMenuAt({ x: pageX, y: pageY })
                setShowMenu(true)
              }}
              className='w-full h-[55px] dark:bg-[#17242D] bg-[#90C4EE] flex flex-row justify-between items-center rounded-tr-[20px] rounded-bl-[20px] rounded-tl-[5px] rounded-br-[5px] p-2 px-4  ' >
              <Text
                className='text-[24px] font-bold dark:text-white text-black'
              >
                Help
              </Text>
              <Ionicons name='help-circle' size={38} color={colorScheme === "dark" ? "white" : "black"} className='' />
            </Pressable>

            <Pressable
              onPress={
                () => {
                  logout()
                  router.replace("/Login")
                }
              }
              className='w-full h-[55px] dark:bg-[#17242D] bg-[#90C4EE] flex flex-row justify-between items-center rounded-tr-[20px] rounded-bl-[20px] rounded-tl-[5px] rounded-br-[5px] p-2 px-4'>
              <Text
                className='text-[24px] font-bold dark:text-white text-black'
              >
                Logout
              </Text>
              {/* <Ionicons name='eye' size={30} color={colorScheme === "dark" ? "white" : "black"} className='' /> */}
              <MaterialCommunityIcons name="logout" size={32} color={colorScheme === "dark" ? "white" : "black"} />

            </Pressable>

            <Modal
              isVisible={showMenu}
              onBackdropPress={() => setShowMenu(false)}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              backdropOpacity={0.15}
              animationInTiming={300}
              animationOutTiming={250}
              style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
            >
              <View className="w-[90%] h-[50%] bg-[#4686bb] absolute rounded-s-[35px] rounded-e-[30px] shadow-lg p-3 border-0 border-[#4686bb]">

                {/* Header */}
                <View className="w-full h-full flex justify-between  items-center mb-4">
                  <Text className="px-6 py-3 text-3xl rounded-tl-[35px] rounded-tr-[35px] rounded-bl-[0px] rounded-br-[0px] font-bold bg-[#4686bb] absolute -top-20 text-white">Help</Text>

                  <View className='w-full h-fit flex mt-14 justify-start items-center'>
                    <Text className='text-2xl italic text-center align-text align-middle align text-white'>
                      If You have any questions, facing an issue or need help using the "Attendance Ease App" feel free to reach out , I will help you with setup ,account issue , feature guidence or anything else
                    </Text>
                    <Text className='border-b-2 border-[#1568bb] mt-14 text-2xl text-white'>
                      Support Email
                    </Text>
                    <Pressable
                      className='mt-4'
                      onPress={sendEmail}>
                      <Text className='w-fit h-fit text-xl px-2 py-1 rounded-md bg-[#296ab5] text-[#d5e5e9] border-b-2 border-[#1d67bb]'>
                        www.subham.anand@gmail.com
                      </Text>
                    </Pressable>
                  </View>

                  {/* Close button */}
                  <Pressable
                    className='absolute -bottom-20 px-6 py-2 rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[45px] rounded-br-[45px] font-bold bg-[#4686bb]'// bg-[#778899]'
                    onPress={() => setShowMenu(false)}>
                    <MaterialCommunityIcons
                      name="logout"
                      className='mt-2'
                      size={32}
                      color={"white"}
                      style={{ transform: [{ rotate: "90deg" }] }}
                    />
                  </Pressable>
                </View>

              </View>
            </Modal>

          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider >
  )
}

export default settings
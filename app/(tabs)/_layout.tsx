import { Tabs } from "expo-router"
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider } from "react-native-safe-area-context"
import React, { useRef, useEffect } from "react"
import { Animated } from "react-native"
import { useColorScheme } from "nativewind"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ClassContextProvider } from "../context/ClassContext"
import { AuthContextProvider } from "../context/AuthContext"


const TabsLayout = () => {

  // dark Color : #183448
  // light Color : #3A87BD

  // const { colorScheme, setColorScheme } = useColorScheme()
  const { colorScheme, setColorScheme } = useColorScheme()
  // setColorScheme("dark")

  // npm i @react-native-async-storage/async-storage

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("theme")
      if (saved === "light" || saved === "dark") {
        setColorScheme(saved as "light" | "dark")
      }
    })()
  }, [setColorScheme])

  const tabBackgroundColor = colorScheme === "dark" ? "#183448" : "#3A87BD";
  // const activeTintColor = colorScheme === "dark" ? "#fff" : "#fff";
  // const inactiveTintColor = colorScheme === "dark" ? "#90C4EE" : "red";
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // const startShake = () => {
  //   Animated.sequence([
  //     Animated.timing(shakeAnim, {
  //       toValue: 10,
  //       duration: 50,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(shakeAnim, {
  //       toValue: -10,
  //       duration: 50,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(shakeAnim, {
  //       toValue: 6,
  //       duration: 50,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(shakeAnim, {
  //       toValue: -6,
  //       duration: 50,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(shakeAnim, {
  //       toValue: 0,
  //       duration: 50,
  //       useNativeDriver: true,
  //     }),
  //   ]).start();
  // }

  // const btnControl = () => {
  //   console.log("Button Pressed")
  //   startShake()
  // }


  return (

    <>
      <ClassContextProvider>
        <AuthContextProvider>

          <SafeAreaProvider
            className="w-full h-full flex-1 relative justify-center items-center bg-white">
            <Tabs
              screenOptions={{
                headerShown: false,
                tabBarStyle: {
                  position: 'absolute',
                  backgroundColor: tabBackgroundColor,
                  borderTopWidth: 0,
                  elevation: 0,
                  borderRadius: 50,
                  shadowColor: '#3A87BD',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                },
                tabBarActiveTintColor: "red",
                tabBarInactiveTintColor: "white",
              }}

            >
              <Tabs.Screen
                name="home"
                options={{
                  title: "Home",
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" color={color} size={size} />
                  ),
                  // sceneStyle:{

                  // }

                }}

              />

              <Tabs.Screen
                name="settings"
                options={{
                  title: "Settings",
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings-outline" color={color} size={size} />
                  ),
                }}
              />
            </Tabs>

          </SafeAreaProvider>
        </AuthContextProvider>
      </ClassContextProvider>
    </>
  );
}

export default TabsLayout

//  <Pressable
//                 onPress={startShake}
//                 className="w-[50px] h-[40px] absolute bottom-[4.8%] left-[45%] bg-[#3A87BD] p-1 rounded-[25px]">
//                 {/* <Text style={{color:"#fff"}} >Menu</Text> */}
//                 <Animated.Image
//                     style={{
//                         transform: [{ translateX: shakeAnim }]
//                     }}
//                     source={require("../../assets/images/AddStudent.png")}
//                     className='w-[50px] h-[40px] mt-2'
//                 />
//             </Pressable>
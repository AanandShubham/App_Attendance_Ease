import { Tabs } from "expo-router"
import { Ionicons } from '@expo/vector-icons'
import { Image, Pressable, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Text } from "@react-navigation/elements"
import React, { useRef } from "react"
import { Animated } from "react-native"

const TabsLayout = () => {

    const shakeAnim = useRef(new Animated.Value(0)).current;
    
      const startShake = () => {
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 6,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -6,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ]).start();
      }
    
      const btnControl = () => {
        console.log("Button Pressed")
        startShake()
      }
    

    return (
        <SafeAreaProvider
            className="w-full h-full flex-1 relative justify-center items-center bg-white">
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: '#3A87BD', // 💡 Your color here
                        borderTopWidth: 0,
                        elevation: 0,
                        borderRadius: 50,
                        shadowColor: '#3A87BD',
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                    },
                    tabBarActiveTintColor: '#0D1164',
                    tabBarInactiveTintColor: '#fff',
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
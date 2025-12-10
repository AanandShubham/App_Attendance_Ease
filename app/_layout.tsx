import { Stack } from "expo-router"
import { useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useColorScheme } from "nativewind"
import Toast from 'react-native-toast-message'
import { AuthContextProvider } from "./context/AuthContext"
import { ClassContextProvider } from "./context/ClassContext"

export default function RootLayout() {

  const { setColorScheme } = useColorScheme()



  // npm i @react-native-async-storage/async-storage

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("theme")
      if (saved === "light" || saved === "dark") {
        setColorScheme(saved as "light" | "dark")
      }
    })()
  }, [setColorScheme])

  return (
    <>
      <ClassContextProvider>
        <AuthContextProvider>
          <Stack >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="Login" options={{ headerShown: false }} />
            <Stack.Screen name="Register" options={{ headerShown: false }} />
            <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </AuthContextProvider>
      </ClassContextProvider>
      <Toast />
    </>
  )
}

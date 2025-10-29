import { Stack } from "expo-router"
import { useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useColorScheme } from "nativewind"

export default function RootLayout() {

  const { colorScheme, setColorScheme } = useColorScheme()
  // setColorScheme("dark")

  // npm i @react-native-async-storage/async-storage

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("theme")
      if (saved === "light" || saved === "dark" ) {
        setColorScheme(saved as "light" | "dark")
      }
    })()
  }, [setColorScheme])

  return (
    <Stack >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login"  options={{ headerShown: false }} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} />
      <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

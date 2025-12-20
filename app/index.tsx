import { View, Text, Image, ActivityIndicator } from "react-native"
import { useEffect } from "react"
import { useRouter } from "expo-router"

export default function SplashScreen() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            return router.replace("/OnBoarding")
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <View className="flex-1 bg-[#b6daf4] items-center justify-center">
            {/* <Image
                source={require("../assets/images/icon.jpg")}
                className="w-[320px] h-[400px] mb-4 rounded-md "
                resizeMode="contain"
            /> */}


            <Image
                source={require("../assets/images/icon.jpg")}
                className="w-[45%] h-[20%] rounded-[30px] mb-4"
                resizeMode="cover"
            />



            <Text className="text-3xl font-bold text-sky-700">
                Attendance Ease
            </Text>

            <ActivityIndicator size="large" className="mt-8" />
        </View>
    )
}

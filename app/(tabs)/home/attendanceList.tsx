import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import { useRouter } from 'expo-router'
import AttandanceDataCard from '@/app/components/AttandenceDataCard'
import { View, Text, Pressable } from 'react-native'
// import { Text } from '@react-navigation/elements'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
const attendanceList = () => {
    const router = useRouter()
    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
                className='w-full h-full bg-[#3A87BD] flex justify-start items-center'
            >

                <HomeContainer
                    headerLabel={"Attendance List"}
                    showButton={false}
                >
                    <Pressable className='w-full flex items-end justify-start pr-2 bg-[#e9eff6e2]'>
                        <View className='flex flex-row justify-center items-center gap-3 px-4 py-1 bg-[#90C4EE] shadow-black elevation-4 shadow-[#3A87BD] border-1 border-[#1B64A8] rounded-tl-[5px] rounded-tr-[15px] rounded-bl-[15px] rounded-br-[5px]'
                        >
                            <Text className='font-extrabold'>Search</Text>
                            <Ionicons name="search" size={25} color="black" />
                        </View>
                    </Pressable>
                    <AttandanceDataCard
                        date='18/11/2025'
                        totalAttendance={23}
                        time='10:27 Am'
                        onPressAction={() => router.push("/home/showAttandence")}
                    />
                    <AttandanceDataCard
                        date='18/11/2025'
                        totalAttendance={29}
                        time='11:27 Am'
                        onPressAction={() => router.push("/home/showAttandence")}
                    />
                    <AttandanceDataCard
                        date='18/11/2025'
                        totalAttendance={21}
                        time='12:27 Pm'
                        onPressAction={() => router.push("/home/showAttandence")}
                    />
                </HomeContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default attendanceList

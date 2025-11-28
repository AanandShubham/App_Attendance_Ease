import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import { useRouter } from 'expo-router'
import AttandanceDataCard from '@/app/components/AttandenceDataCard'
import { View, Text, Pressable, FlatList } from 'react-native'
import { useColorScheme } from 'nativewind'
import { Ionicons } from '@expo/vector-icons'
import useClassContext from '@/app/context/ClassContext'

const attendanceList = () => {

    const router = useRouter()
    const { colorScheme } = useColorScheme()
    const { attendanceList, setSelectedAttendance } = useClassContext()

    const handlePress = (attendance: any) => {
        setSelectedAttendance(attendance)
        router.push("/(tabs)/home/showAttandence")
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
                className='w-full h-full dark:bg-[#061526] bg-[#3A87BD] flex justify-start items-center'
            >

                <HomeContainer
                    headerLabel={"Attendance List"}
                    showButton={false}
                >

                    <View className='w-full h-full px-4 mb-4 flex items-center justify-between'>

                        <Pressable className='w-full flex items-end justify-start pr-2 mb-3 dark:bg-[#17242D] bg-[#e9eff6e2]'>
                            <View className='flex flex-row justify-center items-center gap-3 px-4 py-1 dark:bg-[#0b202e] bg-[#90C4EE] shadow-black elevation-4 shadow-[#3A87BD] border-1 border-[#1B64A8] rounded-tl-[5px] rounded-tr-[15px] rounded-bl-[15px] rounded-br-[5px]'
                            >
                                <Text className='font-extrabold dark:text-white'>Search</Text>
                                <Ionicons name="search" size={25} color={colorScheme === "dark" ? "white" : "black"} />
                            </View>
                        </Pressable>


                        <FlatList
                            className='w-full'
                            data={attendanceList}
                            keyExtractor={(item) => item._id}
                            extraData={attendanceList}
                            ListEmptyComponent={
                                <View className='w-full h-fit p-1 flex justify-center items-start'>
                                    <Text className='dark:text-white'>Please Mark any Attendance</Text>
                                </View>
                            }
                            renderItem={
                                ({ item }) =>
                                    <AttandanceDataCard
                                        date={item.name}
                                        totalAttendance={item.students.length}
                                        time={item.time}
                                        onPressAction={() => handlePress(item)}
                                    />
                            }

                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}

                        />

                    </View>

                </HomeContainer>

            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default attendanceList

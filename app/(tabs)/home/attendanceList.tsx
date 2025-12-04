import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import { useRouter } from 'expo-router'
import AttandanceDataCard from '@/app/components/AttandenceDataCard'
import { View, Text, Pressable, FlatList, TextInput } from 'react-native'
import { useColorScheme } from 'nativewind'
import { Ionicons } from '@expo/vector-icons'
import useClassContext from '@/app/context/ClassContext'

const attendanceList = () => {

    const router = useRouter()
    const { colorScheme } = useColorScheme()
    const { attendanceList, setSelectedAttendance } = useClassContext()
    const [activateSearch, setActivateSearch] = useState(false)
    const [searchData, setSearchData] = useState("")
    const [filteredData, setFilteredData] = useState(attendanceList)

    const handlePress = (attendance: any) => {
        setSelectedAttendance(attendance)
        router.push("/(tabs)/home/showAttandence")
    }

    const handleSearch = () => {
        // Implement search functionality here
        if (searchData.trim() === "") {
            setActivateSearch(false)
            setFilteredData(attendanceList)
            return
        }

        const filteredAttendance = filteredData.filter((attendance: any) =>
            attendance.name.toLowerCase().includes(searchData.toLowerCase())
        )

        // Update the attendance list with the filtered data
        setFilteredData(filteredAttendance)
    }

    const handleTextChange = (text: any) => {
        setSearchData(text)

        if (text.trim() === "") {
            setFilteredData(attendanceList)
        }
        else {
            const filteredAttendance = attendanceList.filter((attendance: any) =>
                attendance.name.toLowerCase().includes(text.toLowerCase())
            )

            // Update the attendance list with the filtered data
            setFilteredData(filteredAttendance)
        }
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
                        {
                            activateSearch ? (
                                
                                <View className='w-full h-fit border-2 mb-3 border-gray-400 flex flex-row items-center justify-between rounded-tl-[5px] rounded-tr-[15px] rounded-bl-[15px] rounded-br-[5px]'>
                                    <TextInput
                                        className='px-2 text-2xl py-4 w-[80%] rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[40px] rounded-br-[80px] dark:text-white text-black'
                                        placeholder='Enter Date'
                                        inputMode='url'
                                        value={searchData}
                                        onChangeText={(text) => handleTextChange(text)}
                                    />
                                    <View className='h-full'>
                                        <Pressable
                                            onPress={handleSearch}
                                            className='py-4 px-6  dark:bg-[#0b202e] bg-[#90C4EE] shadow-black elevation-4 shadow-[#3A87BD] border-1 border-[#1B64A8] rounded-tl-[5px] rounded-tr-[15px] rounded-bl-[15px] rounded-br-[5px]'
                                        >
                                            <Ionicons name="search" size={25} color={colorScheme === "dark" ? "white" : "black"} />
                                        </Pressable>
                                    </View>

                                </View>
                            ) : (
                                <Pressable
                                    onPress={() => setActivateSearch((prev) => !prev)}
                                    className='w-full flex items-end justify-start pr-2 mb-3 dark:bg-[#020b148a] bg-[#e9eff6e2]'>
                                    <View
                                        className='flex flex-row justify-center items-center gap-3 px-4 py-1 dark:bg-[#0b202e] bg-[#90C4EE] shadow-black elevation-4 shadow-[#3A87BD] border-1 border-[#1B64A8] rounded-tl-[5px] rounded-tr-[15px] rounded-bl-[15px] rounded-br-[5px]'>
                                        <Text className='font-extrabold dark:text-white'>Search</Text>
                                        <Ionicons name="search" size={25} color={colorScheme === "dark" ? "white" : "black"} />
                                    </View>
                                </Pressable>)
                        }

                        <FlatList
                            className='w-full'
                            data={filteredData}
                            keyExtractor={(item) => item._id}
                            extraData={attendanceList}
                            ListEmptyComponent={
                                <View className='w-full h-fit p-1 flex justify-center items-start'>
                                    {
                                        activateSearch ? (
                                            <Text className='font-bold dark:text-white text-black text-lg'>No attendance found for "{searchData}"</Text>
                                        ) : (
                                            <Text className='font-bold dark:text-white text-black text-lg'>No attendance data available.</Text>
                                        )
                                    }
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

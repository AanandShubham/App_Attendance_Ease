import useAuthContext from '@/app/context/AuthContext'
import useClassContext from '@/app/context/ClassContext'
import useGetClassDetails from '@/app/hooks/useGetClassDetails'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'


const classMenu = () => {
    const router = useRouter()

    const { selectedClass } = useClassContext()
    const { loading, getClassDetails } = useGetClassDetails()


    useEffect(() => {
        getClassDetails(selectedClass._id)
    }, [])

    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
                className='w-full h-full dark:bg-[#061526] bg-[#3A87BD] flex justify-center items-center'
            >
                <View className='w-full h-full p-2 dark:bg-[#061526]  bg-white flex justify-center items-center'>
                    <View
                        className=' w-[90vw] h-[60vh] flex justify-center items-center gap-5 border-2 border-[#0C5AA2] dark:border-[#17242D] rounded-tr-[70px] rounded-tl-[10px] rounded-bl-[70px] rounded-br-[10px] dark:bg-[#061526] bg-[#e9eff6e8] p-4'>
                        <Text
                            style={{
                                textShadowColor: '#000',
                                textShadowOffset: { width: 2, height: 3 },
                                textShadowRadius: 3,
                            }}

                            className='w-[70%] h-fit p-1  text-2xl text-white text-center font-bold rounded-md 
                          absolute  top-[-19px] dark:bg-[#183448] bg-[#3A87BD] rounded-bl-[20px] rounded-tr-[20px]   outline-black rounded-tl-[5px] rounded-br-[5px]  shadow-xl elevation-sm shadow-[#3A87BD]'
                        >
                            {selectedClass.name}
                        </Text>
                        <View className='w-full flex-row justify-between items-center'>
                            <Pressable
                                onPress={() => { router.push("/home/updateClass") }}
                                className=' dark:bg-[#17242D] bg-[#90C4EE] w-[45%] h-[202px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[10px] rounded-tl-[10px] p-2'>
                                <Text
                                    className='text-lg dark:text-white text-[#1B64A8] text-center font-bold'>
                                    Edit Class
                                </Text>
                                <Image
                                    source={require("../../../assets/images/editClass.png")}
                                    className='w-full h-[150px] mt-2'
                                />
                            </Pressable>

                            <Pressable
                                onPress={() => { router.push("/home/studentList") }}
                                className='dark:bg-[#17242D] bg-[#90C4EE] w-[45%]  h-[202px]  rounded-tr-[20px] rounded-bl-[20px] rounded-br-[10px] rounded-tl-[10px] p-2'>
                                <Text
                                    className='text-lg dark:text-white text-[#1B64A8] text-center font-medium'>
                                    Student List
                                </Text>
                                <Image
                                    source={require("../../../assets/images/studentList.png")}
                                    className='w-full h-[150px] mt-2'
                                />
                            </Pressable>
                        </View>
                        <View className='w-full  flex-row justify-between items-center'>
                            <Pressable
                                onPress={() => { router.push("/home/attendanceList") }}
                                className='dark:bg-[#17242D] bg-[#90C4EE] w-[45%] h-[202px]  rounded-tr-[20px] rounded-bl-[20px] rounded-br-[10px] rounded-tl-[10px] p-2 '>
                                <Text
                                    className='text-lg dark:text-white text-[#1B64A8] text-center font-medium'>
                                    Attendance List
                                </Text>
                                <Image source={require("../../../assets/images/attendanceList.png")} className='w-[90%] h-[145px] p-2 mt-2 ml-3' />
                            </Pressable>
                            <Pressable
                                onPress={() => { router.push("/home/takeAttandence") }}
                                className='dark:bg-[#17242D] bg-[#90C4EE] w-[45%] h-[202px]  rounded-tr-[20px] rounded-bl-[20px] rounded-br-[10px] rounded-tl-[10px] p-2 '>
                                <Text
                                    className='text-lg dark:text-white text-[#1B64A8] text-center font-medium'>
                                    Take Attendance
                                </Text>
                                <Image
                                    source={require("../../../assets/images/takeAttendance.png")}
                                    className='w-full p-2 h-[150px] mt-2'
                                />
                            </Pressable>
                        </View>
                    </View>

                </View>

                {loading && (
                    <View className='w-full h-full absolute bg-[#dae4e8e2] flex justify-center items-center gap-4'>
                        <Text>Loading Class Details</Text>
                        <ActivityIndicator />
                    </View>
                )}

            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default classMenu

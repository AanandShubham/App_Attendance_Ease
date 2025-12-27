// import useAuthContext from '@/app/context/AuthContext'
import useClassContext from '@/app/context/ClassContext'
import useGetClassDetails from '@/app/hooks/useGetClassDetails'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Modal from 'react-native-modal'


const classMenu = () => {
    const router = useRouter()
    const { selectedClass } = useClassContext()
    const { loading, getClassDetails } = useGetClassDetails()
    const [showMenu, setShowMenu] = useState(false)

    const handleTakeAttendance = () => {
        // const remaningClass = selectedClass.attendance.filter(att => {
        //     const attDate = new Date(att.date)
        //     const today = new Date()

        //     return attDate.getDate() === today.getDate() &&
        //         attDate.getMonth() === today.getMonth() &&
        //         attDate.getFullYear() === today.getFullYear()
        // })

        // if (remaningClass.length > 0) {
        //     alert("Attendance for today has already been taken.")
        // } else {
        //     router.push("/home/takeAttandence")
        // }

        const remainingClass = selectedClass.totalClass - selectedClass.attendance.length

        //    console.log("REmoa ningoaodj jClalsdhol : ",remainingClass)

        if (remainingClass > 0) {
            router.push("/home/takeAttandence")
        } else {
            setShowMenu(true)
        }

    }

    useEffect(() => {
        getClassDetails(selectedClass._id)
    }, [])

    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
                className={`w-full h-full dark:bg-[#061526]  bg-[#3A87BD] bg-[${showMenu ? "#3d4035" : "#3A87BD"}] flex justify-center items-center`}
            >
                <View className='w-full h-full p-2 py-4 dark:bg-[#061526]  bg-white flex justify-center items-center'>
                    <View
                        className=' w-[90vw] h-[60vh] flex justify-center items-center gap-2 border-2 border-[#0C5AA2] dark:border-[#17242D] rounded-tr-[70px] rounded-tl-[10px] rounded-bl-[70px] rounded-br-[10px] dark:bg-[#061526] bg-[#e9eff6e8] '>
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
                        <View className='w-full pt-4 p-2 flex-row justify-between items-center'>
                            <Pressable
                                onPress={() => { router.push("/home/updateClass") }}
                                className=' dark:bg-[#17242D] bg-[#90C4EE] w-[45%] h-[202px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[10px] rounded-tl-[10px] p-2'>
                                <Text
                                    className='text-lg dark:text-white text-[#1B64A8] text-center font-bold'>
                                    Edit Group
                                </Text>
                                <Image
                                    source={require("../../../assets/images/editClass.png")}
                                    className='w-full h-[145px] mt-2'
                                />
                            </Pressable>

                            <Pressable
                                onPress={() => { router.push("/home/studentList") }}
                                className='dark:bg-[#17242D] bg-[#90C4EE] w-[45%]  h-[202px]  rounded-tr-[20px] rounded-bl-[20px] rounded-br-[10px] rounded-tl-[10px] p-2'>
                                <Text
                                    className='text-lg dark:text-white text-[#1B64A8] text-center font-medium'>
                                    Member List
                                </Text>
                                <Image
                                    source={require("../../../assets/images/studentList.png")}
                                    className='w-full h-[145px] mt-2'
                                />
                            </Pressable>
                        </View>

                        <View className='w-full pt-4 p-2 flex-row justify-between items-center'>
                            <Pressable
                                onPress={() => { router.push("/home/attendanceList") }}
                                className='dark:bg-[#17242D] bg-[#90C4EE] w-[45%] h-[202px]  rounded-tr-[20px] rounded-bl-[20px] rounded-br-[10px] rounded-tl-[10px] p-2 '>
                                <Text
                                    className='text-lg dark:text-white text-[#1B64A8] text-center font-medium'>
                                    Attendance List
                                </Text>
                                <Image
                                    source={require("../../../assets/images/attendanceList.png")}
                                    className='w-[90%] h-[145px] p-2 mt-2 ml-3'
                                />
                            </Pressable>
                            <Pressable
                                onPress={handleTakeAttendance}
                                className='dark:bg-[#17242D] bg-[#90C4EE] w-[45%] h-[202px]  rounded-tr-[20px] rounded-bl-[20px] rounded-br-[10px] rounded-tl-[10px] p-2 '>
                                <Text
                                    className='text-lg dark:text-white text-[#1B64A8] text-center font-medium'>
                                    Take Attendance
                                </Text>
                                <Image
                                    source={require("../../../assets/images/takeAttendance.png")}
                                    className='w-full p-2 h-[145px] mt-2'
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
                    <View className="w-[90%] h-[40%]  bg-[#4686bb] absolute rounded-s-[35px] rounded-e-[30px] shadow-lg p-3 border-0 border-[#4686bb]">

                        {/* Header */}
                        <View className="w-full h-full flex justify-between  items-center mb-4">
                            <Text className="px-3 py-2  text-2xl rounded-tl-[35px] rounded-tr-[35px] rounded-bl-[0px] rounded-br-[0px] font-bold border-2 border-red-600 absolute -top-20 text-red-600 flex flex-row justify-center items-center ">
                                <MaterialCommunityIcons name="alert" size={44} color="red" /></Text>

                            <View className='w-full h-fit flex mt-14 justify-start items-center'>
                                <Text className='text-2xl italic text-center align-text align-middle align text-white'>
                                    Your assigned days are finished for this group Task.
                                    No remaining No Days left to take attendance.
                                </Text>
                                <Text className='text-2xl italic font-bold  text-center align-text align-middle align text-white '>" If you want to take attendance please update TotalDays from Edit Group Section "</Text>

                            </View>

                        </View>

                    </View>
                </Modal>


            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default classMenu

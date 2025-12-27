import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import StudentDataCard from '@/app/components/StudentDataCard'
import Fontisto from '@expo/vector-icons/Fontisto'
import { ActivityIndicator, FlatList, Pressable } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { useColorScheme } from 'nativewind'
import useClassContext from '@/app/context/ClassContext'
// import { StudentTypeFormData } from '@/app/FromTypes'
import { router } from 'expo-router'
import useAddAttendance from '@/app/hooks/useAddAttendance'
import Toast from 'react-native-toast-message'
import Modal from 'react-native-modal'

// import saveData from '../../../assets/images/saveData.png'

const takeAttandence = () => {

    const saveData: any = require('../../../assets/images/saveData.png')

    const { colorScheme } = useColorScheme()
    const { students, selectedClass } = useClassContext()

    // save attendance hook
    const { loading, addAttendance } = useAddAttendance()

    // student attendance list state
    const [attendance, setAttendance] = useState<boolean[]>([])

    // modal state

    const [showModal, setShowModal] = useState(false)

    // attencdance list for saving list of present students

    const [attendanceList, setAttendanceList] = useState<string[]>([])


    const [allChecked, setAllChecked] = useState(false)

    const date = new Date().toLocaleDateString()


    // toggle studentes attendance
    const toggleAllChecked = () => {
        setAllChecked(prev => !prev)
        setAttendance(attendance.map(() => !allChecked))
    }

    const handleClick = (item: any, index: number) => {
        setAttendance(prev => {
            const updated = [...prev]
            updated[index] = !updated[index]
            return updated
        })

        // setAttendanceList(prev => {
        //     const updated = [...prev]
        //     // write the main logic for attendance
        //     // updated[index] = !updated[index].id 
        //     return updated 
        // })
    }

    const saveAttendanceBtnLogic = async () => {
        // const presentStudentsIds = students
        //     .filter((_, index) => attendance[index])
        //     .map(student => student._id)

        // console.log("Present Students IDs: ", presentStudentsIds)
        // Here, you can add logic to save the attendance data to your backend or state management

        attendance.some((item: any, index: number) => {
            // console.log(index, " : ", item, " : ", students[index]._id)
            if (item)
                attendanceList.push(students[index]._id)
        })
        // console.log("Attendance List : ", attendanceList)

        if (attendance.length === 0) {
            Toast.show({
                type: 'error',
                text1: "No attendance to add"
            })
        } else {

            await addAttendance(attendanceList)
            Toast.show({
                type: 'success',
                text1: "Attendance added successfully"
            })

            router.back()
        }

    }

    // take attendance Confirmation
    useEffect(() => {
        if (students.length > 0) {
            setAttendance(students.map(() => true))
            setAllChecked(true)
        }
    }, [students])


    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
                className={`w-full h-full dark:bg-[#061526] bg-[#3A87BD] flex justify-start items-center`}
            >
                <HomeContainer
                    headerLabel={date + " Attendance"}
                    btnAction={() => setShowModal(true)}
                    showButton={true}
                    btnImageSource={saveData}

                >

                    <Pressable
                        onPress={toggleAllChecked}
                        className='w-full flex items-end justify-start pr-2 mb-3 dark:bg-[#020b148a] bg-[#e9eff6e2]'>
                        <View className='flex flex-row justify-center items-center gap-3 px-4 py-1 dark:bg-[#0b202e] bg-[#90C4EE] shadow-black elevation-4 shadow-[#3A87BD] border-1 border-[#1B64A8] rounded-tl-[5px] rounded-tr-[15px] rounded-bl-[15px] rounded-br-[5px]'
                        >
                            <Text className='font-extrabold dark:text-white'>Present All</Text>
                            {
                                allChecked ? <Fontisto name="checkbox-active" size={25} color={colorScheme === "dark" ? "white" : "black"} />
                                    : <Fontisto name="checkbox-passive" size={25} color={colorScheme === "dark" ? "white" : "black"} />
                            }

                        </View>
                    </Pressable>

                    <FlatList
                        data={students}
                        keyExtractor={(item) => item._id}
                        extraData={students}
                        ListEmptyComponent={
                            <View className='w-full h-fit p-1 flex justify-center items-start'>
                                <Text className='font-bold dark:text-white text-black text-lg'>No Student data available.</Text>
                            </View>
                        }
                        renderItem={
                            ({ item, index }) =>
                                <StudentDataCard

                                    isPresent={attendance[index]}
                                    showCheckbox={true}
                                    onPressAction={
                                        () => handleClick(item, index)
                                    }
                                    tcaNumber={item.tca}
                                    name={item.name}
                                    totalAttendance={
                                        item.classList.find(
                                            (details: any) => details.classId === selectedClass._id
                                        )?.totalAttendance | 0
                                    }

                                />

                        }
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}

                    />

                </HomeContainer>


                {/* modal for user confirmation about save Attendance Details  */}
                <Modal
                    isVisible={showModal}
                    onBackdropPress={() => setShowModal(false)}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    backdropOpacity={0.15}
                    animationInTiming={300}
                    animationOutTiming={250}
                    style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
                >
                    <View className="w-[95%] h-[50%] flex gap-3 justify-center items-center pb-10">

                        {/* Header */}
                        <Text className=" bg-[#aebd3a] text-black text-2xl px-6 py-4 rounded-tl-[35px] rounded-tr-[35px] font-bold">
                            Confirm Save
                        </Text>

                        {/* Content */}
                        <View className="mt-2 flex-1 items-center bg-[#aebd3a] rounded-s-[35px] rounded-e-[30px] shadow-lg p-4 px-2 py-4">

                            <View className="px-2 pb-6 justify-center items-center">

                                <Text className="text-xl text-black font-bold ">Attendance to be Saved</Text>
                                <Text className="text-lg  text-black/80">
                                    All these attendance data will be saved and cannot be reversed.
                                </Text>

                                <Text className="text-black font-bold text-lg mb-3">This action is irreversible.</Text>
                                <Text className="text-black/90 mb-6">
                                    If you proceed, these Attendance data will be saved to cloud
                                    and can not be deleted.
                                </Text>

                            </View>


                        </View>
                        <View className="flex-row justify-between gap-4">
                            <Pressable
                                onPress={() => setShowModal(false)}
                                className="flex-1 py-3 rounded-full bg-[#94b8d6] items-center"
                            >
                                <Text className="text-white font-bold">Cancel</Text>
                            </Pressable>

                            <Pressable
                                onPress={async () => {
                                    try {
                                        // saving attendance
                                        saveAttendanceBtnLogic()
                                        // router.replace("/Login")
                                    } catch (err) {
                                        Toast.show({
                                            type: "error",
                                            text1: "There is something wrong !!"
                                        })
                                        setShowModal(false)
                                    }
                                }}
                                disabled={loading}
                                className={`flex-1 py-3 rounded-full items-center ${loading ? 'bg-[#aebd3a]/60' : 'bg-[#aebd3a]'}`}
                            >
                                <Text className="text-black font-bold">{loading ? 'Saving...' : 'Save Attendance'}</Text>
                            </Pressable>
                        </View>



                    </View>

                </Modal>

                {loading && (
                    <View className='w-full h-full absolute bg-[#dae4e8e2] flex justify-center items-center gap-4'>
                        <Text>Prosessing ...</Text>
                        <ActivityIndicator />
                    </View>
                )}

            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default takeAttandence

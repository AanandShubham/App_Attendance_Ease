import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import StudentDataCard from '@/app/components/StudentDataCard'
import Fontisto from '@expo/vector-icons/Fontisto'
import { ActivityIndicator, FlatList, Pressable } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import saveData from '../../../assets/images/saveData.png'
import { useColorScheme } from 'nativewind'
import useClassContext from '@/app/context/ClassContext'
import { StudentTypeFormData } from '@/app/FromTypes'
import { router } from 'expo-router'
import useAddAttendance from '@/app/hooks/useAddAttendance'
import Toast from 'react-native-toast-message'


const takeAttandence = () => {

    const { colorScheme } = useColorScheme()
    const { students, selectedClass } = useClassContext()

    const { loading, addAttendance } = useAddAttendance()

    // student attendance list state
    const [attendance, setAttendance] = useState<boolean[]>([])


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

    const saveBtnLogic = async () => {
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
        console.log("Attendance List : ", attendanceList)

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
                className='w-full h-full dark:bg-[#061526] bg-[#3A87BD] flex justify-start items-center'
            >
                <HomeContainer
                    headerLabel={date+" Attendance"}
                    btnAction={saveBtnLogic}
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

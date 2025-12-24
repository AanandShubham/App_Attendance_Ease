import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import StudentDataCard from '@/app/components/StudentDataCard'
import useClassContext from '@/app/context/ClassContext'
import { FlatList, Text, View } from 'react-native'
import useDeleteStudent from '@/app/hooks/useDeleteStudent'

// import addStudent from '@/assets/images/AddStudent.png'

const studentList = () => {

    const addStudent: any = require('../../../assets/images/AddStudent.png')

    const router = useRouter()
    const { students, selectedClass, setSelectedStudent } = useClassContext()
    const [studentToDelete, setStudentToDelete] = useState<any>({})
    const [showMenu, setShowMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
    const { loading, deleteStudentById } = useDeleteStudent()

    const handlePopUp = async () => {
        // console.log("Delete Pressed")
        // console.log("-------------------------------------------")
        // studentToDelete && console.log("Class to delete : ", studentToDelete?._id,)
        // console.log("-------------------------------------------")
        await deleteStudentById(selectedClass._id, studentToDelete?._id)
        // if (await deleteStudentById(selectedClass._id, studentToDelete?._id)) {
        //     console.log("Class Deleted Successfully !!!")
        // }
        // else {
        //     console.log("Problem in class delete")
        // }

        setShowMenu(false)
    }

    const handleLongPress = (event: any, StudentData: any) => {
        setStudentToDelete(StudentData)
        setMenuPosition({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY - 50 })
        setShowMenu(true)
        // console.log("------------------------------")
        // console.log("--- btn pressed at : ", event.nativeEvent.pageX, event.nativeEvent.pageY)
        // console.log("------------------------------")

        // console.log("----------------------------------------")
        // console.log("class Data : ", JSON.stringify(classes, null, 2))
        // console.log("----------------------------------------")
        // console.log("Students Data : ", JSON.stringify(students, null, 2))
        // console.log("----------------------------------------")
        // console.log("Selected Clas Data : ", JSON.stringify(selectedClass, null, 2))
        // console.log("----------------------------------------")
    }

    const handlePress = (student: any) => {
        setSelectedStudent(student)
        router.push("/(tabs)/home/updateStudent")
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
                className='w-full h-full dark:bg-[#061526] bg-[#3A87BD] flex justify-start items-center'
            >
                <HomeContainer
                    headerLabel={"Student List"}
                    btnAction={() => router.push("/home/addStudent")}
                    showButton={true}
                    btnImageSource={addStudent}
                >

                    <FlatList
                        data={students}
                        keyExtractor={(item, index) => item?._id ?? index.toString()}
                        extraData={{ students, selectedClass }}
                        ListEmptyComponent={
                            <View className='w-full h-fit p-2 flex justify-center items-start'>
                                <Text className='font-bold dark:text-white text-black text-lg'>No Student data available.</Text>
                            </View>
                        }
                        renderItem={({ item }) => {

                            if (!item) return null

                            return (
                                <StudentDataCard
                                    showMenu={showMenu}
                                    showMenuAt={menuPosition}
                                    popUpAction={handlePopUp}
                                    onLongPressAction={(e) => handleLongPress(e, item)}
                                    onCloseMenu={() => setShowMenu(false)}
                                    onPressAction={() => handlePress(item)}
                                    tcaNumber={item.tca}
                                    name={item.name}
                                    totalAttendance={
                                        item.classList.find(
                                            (details: any) => details.classId === selectedClass._id
                                        )?.totalAttendance ?? 0
                                    }
                                />
                            )
                        }
                        }
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                    />
                </HomeContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default studentList

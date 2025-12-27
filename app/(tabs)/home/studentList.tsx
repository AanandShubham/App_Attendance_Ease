import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import StudentDataCard from '@/app/components/StudentDataCard'
import useClassContext from '@/app/context/ClassContext'
import { FlatList, Pressable, Text, View } from 'react-native'
import useDeleteStudent from '@/app/hooks/useDeleteStudent'
import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'

// import addStudent from '@/assets/images/AddStudent.png'

const studentList = () => {

    const addStudent: any = require('../../../assets/images/AddStudent.png')

    const router = useRouter()
    const [showConfirm, setShowConfirm] = useState(false)
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
        // if (await deleteStudentById(selectedClass._id, studentToDelete?._id)) {
        //     console.log("Class Deleted Successfully !!!")
        // }
        // else {
        //     console.log("Problem in class delete")
        // }

        setShowMenu(false)
        setShowConfirm(true)
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
                    headerLabel={"Member List"}
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

                <Modal
                    isVisible={showConfirm}
                    onBackdropPress={() => setShowConfirm(false)}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    backdropOpacity={0.15}
                    animationInTiming={300}
                    animationOutTiming={250}
                    style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
                >
                    <View className="w-[95%] h-[50%] flex gap-3 justify-center items-center pb-10">

                        {/* Header */}
                        <Text className=" bg-[#c91919] text-white text-2xl px-6 py-4 rounded-tl-[35px] rounded-tr-[35px] font-bold">
                            !! Warning !!
                        </Text>

                        {/* Content */}
                        <View className="mt-2 flex-1 items-center bg-[#c91919]  rounded-s-[35px] rounded-e-[30px] shadow-lg p-4 px-2 py-4">
                            <View className="px-2 pb-6 justify-center items-center">

                                <Text className="text-lg text-white font-semibold">Data to be deleted</Text>
                                <Text className="text-md text-white/80">
                                    students and attendance records for this Member will be permanently removed for this group and cannot be recovered.
                                </Text>

                                <Text className="text-white font-bold text-lg mb-3">This action is irreversible.</Text>

                            </View>

                        </View>
                        <View className="flex-row justify-between gap-4">
                            <Pressable
                                onPress={() => setShowConfirm(false)}
                                className="flex-1 py-3 rounded-full bg-[#94b8d6] items-center"
                            >
                                <Text className="text-white font-bold">Cancel</Text>
                            </Pressable>

                            <Pressable
                                onPress={async () => {
                                    try {
                                        await deleteStudentById(selectedClass._id, studentToDelete?._id)
                                        setShowConfirm(false)
                                        // setLoader(false)
                                    } catch (err) {
                                        Toast.show({
                                            type: "error",
                                            text1: "There is something wrong !!"
                                        })
                                        setShowConfirm(false)
                                    }
                                }}
                                disabled={loading}
                                className={`flex-1 py-3 rounded-full items-center ${loading ? 'bg-[#9e2a2a]/60' : 'bg-[#c91919]'}`}
                            >
                                <Text className="text-white font-bold">{loading ? 'Deleting...' : 'Delete Member'}</Text>
                            </Pressable>
                        </View>
                        {/* Next Button */}


                    </View>

                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default studentList

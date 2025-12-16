import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import StudentDataCard from '@/app/components/StudentDataCard'
import DownloadPdf from '../../../assets/images/DownloadPDF.png'
import useClassContext from '@/app/context/ClassContext'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import usePrintPdf from '@/app/hooks/usePrintPdf'
import Toast from 'react-native-toast-message'

const showAttandence = () => {

    const { selectedAttendance, selectedClass, students } = useClassContext()
    const router = useRouter()
    const { loading, generateAttendancePdf } = usePrintPdf()


    // console.log("**********************************************")
    // console.log("Show Selected Attendance : ", JSON.stringify(selectedAttendance, null, 2))
    // console.log("**********************************************")


    const idSet = new Set(selectedAttendance.students)

    const studentsList = students?.filter((std: any) => idSet.has(std._id))

    const handleClick = (student: any, index: Number) => {
        // console.log("Student : ", student)
    }

    const printPdf = async () => {
        if (!selectedClass || !selectedAttendance) return;

        const attendanceData = {
            name: selectedClass.name,
            date: selectedAttendance.name,
            Time: selectedAttendance.time,
            subject: selectedClass.subject,
            roomNo: selectedAttendance.roomNo,
            totalClassAttendance: selectedAttendance.students.length,
            students: studentsList,
            classHeld: selectedClass.totalClass - selectedClass.attendance.length
        }

        await generateAttendancePdf(attendanceData)
        Toast.show({
            type: "success",
            text1: "Pdf Generated Successfully !"
        })
        router.back()
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
                className='w-full h-full dark:bg-[#061526] bg-[#3A87BD] flex justify-start items-center'
            >
                <HomeContainer
                    headerLabel={selectedAttendance.name}
                    btnAction={printPdf}
                    showButton={true}
                    btnImageSource={DownloadPdf}
                >

                    <FlatList
                        data={studentsList}
                        keyExtractor={(item) => item._id}
                        extraData={studentsList}
                        ListEmptyComponent={
                            <View className='w-full h-fit p-1 flex justify-center items-start'>
                                <Text className='font-bold dark:text-white text-black text-lg'>No Student data available.</Text>
                            </View>
                        }
                        renderItem={
                            ({ item, index }) =>
                                <StudentDataCard
                                    // onPressAction={
                                    //     () => handleClick(item, index)
                                    // }
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

export default showAttandence

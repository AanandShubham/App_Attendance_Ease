import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import StudentDataCard from '@/app/components/StudentDataCard'
import addStudent from '@/assets/images/AddStudent.png'
import useClassContext from '@/app/context/ClassContext'
import { FlatList, Text, View } from 'react-native'

const studentList = () => {
    const router = useRouter()
    const { students, selectedClass, setSelectedStudent } = useClassContext()


    useEffect(() => {
        // console.log('------------------------------')
        // console.log("Students List : ", JSON.stringify(students, null, 2))
        // console.log('------------------------------')
    }, [students, selectedClass])

    const handlePress = (student: any) => {
        setSelectedStudent(student)
        router.push("/(tabs)/home/updateStudent")

        // console.log('------------------------------')
        // console.log("Student Card Data : ", JSON.stringify(student, null, 2))
        // console.log('------------------------------')
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
                        keyExtractor={(item) => item._id}
                        extraData={{ students, selectedClass }}
                        ListEmptyComponent={
                            <View className='w-full h-fit p-2 flex justify-center items-start'>
                                <Text className='font-bold dark:text-white text-black text-lg'>No Student data available.</Text>
                            </View>
                        }
                        renderItem={({ item }) =>
                            <StudentDataCard
                                onPressAction={() => handlePress(item)}
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
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default studentList

import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import StudentDataCard from '@/app/components/StudentDataCard'
import addStudent from '@/assets/images/AddStudent.png'

const studentList = () => {
    const router = useRouter()
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
                    <StudentDataCard
                        tcaNumber='tca2463...'
                        name="Ankit Kumar Dubey"
                        totalAttendance={42}
                        onPressAction={() => router.push("/home/updateStudent")}
                    />
                    <StudentDataCard />
                    <StudentDataCard />
                    <StudentDataCard />
                </HomeContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default studentList

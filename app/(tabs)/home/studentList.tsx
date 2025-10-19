import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import DataCard from '@/app/components/ClassDataCard'
import { View, Text } from 'react-native'
import StudentDataCard from '@/app/components/StudentDataCard'

const studentList = () => {
    const router = useRouter()
    return (
        <SafeAreaProvider>

            <SafeAreaView edges={['top', 'bottom']} className='w-full h-full bg-white flex justify-start items-center'>
                <HomeContainer
                    headerLabel={"Student List"}
                    btnLabel={"Add"}
                    btnAction={() => router.push("/home/addStudent")}
                >

                    <StudentDataCard onPressAction={() => router.push("/home/updateStudent")} />
                    <StudentDataCard />
                    <StudentDataCard />
                    <StudentDataCard />


                </HomeContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default studentList

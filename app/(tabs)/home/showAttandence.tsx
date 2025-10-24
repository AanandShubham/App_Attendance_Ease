import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import StudentDataCard from '@/app/components/StudentDataCard'
import DownloadPdf from '../../../assets/images/DownloadPDF.png'

const showAttandence = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
                className='w-full h-full bg-[#3A87BD] flex justify-start items-center'
            >
                <HomeContainer
                    headerLabel={"18/11/2025"}
                    // btnLabel={"PDF"}
                    // btnAction={() => router.push("/home/addStudent")}
                    showButton={true}
                    btnImageSource={DownloadPdf}
                >
                    <StudentDataCard
                        tcaNumber='tca2463...'
                        name="Ankit Kumar Dubey"
                        totalAttendance={42}
                        // onPressAction={() => router.push("/home/updateStudent")}
                    />
                    <StudentDataCard />
                    <StudentDataCard />
                    <StudentDataCard />
                </HomeContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default showAttandence

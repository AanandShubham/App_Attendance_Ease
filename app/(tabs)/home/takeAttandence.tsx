import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HomeContainer from '@/app/components/HomeContainer'
import StudentDataCard from '@/app/components/StudentDataCard'
import Fontisto from '@expo/vector-icons/Fontisto'
import { Pressable } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import saveData from '../../../assets/images/saveData.png'
import { useColorScheme } from 'nativewind'



const takeAttandence = () => {

    const {colorScheme} = useColorScheme()

    const [allChecked, setAllChecked] = useState(false)

    const toggleAllChecked = () => {
        setAllChecked(!allChecked);
    };

    // useEffect(()=>{

    // },[allChecked,setAllChecked])

    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
                className='w-full h-full dark:bg-[#061526] bg-[#3A87BD] flex justify-start items-center'
            >
                <HomeContainer
                    headerLabel={"18/11/2025"}
                    btnLabel={"Save"}
                    btnAction={() => console.log("Generate PDF")}
                    showButton={true}
                    btnImageSource={saveData}
                
                >

                    <Pressable
                        onPress={() => setAllChecked((prev) => !prev)}
                        className='w-full flex items-end justify-start pr-2 dark:bg-[#061526] bg-[#e9eff6e2]'>
                        <View className='flex flex-row justify-center items-center gap-3 px-4 py-1 dark:bg-[#0b202e] bg-[#90C4EE] shadow-black elevation-4 shadow-[#3A87BD] border-1 border-[#1B64A8] rounded-tl-[5px] rounded-tr-[15px] rounded-bl-[15px] rounded-br-[5px]'
                        >
                            <Text className='font-extrabold dark:text-white'>Present All </Text>
                            {
                                allChecked ? <Fontisto name="checkbox-active" size={25} color={colorScheme === "dark" ? "white" : "black"} />
                                    : <Fontisto name="checkbox-passive" size={25} color={colorScheme === "dark" ? "white" : "black"} />
                            }


                        </View>
                    </Pressable>

                    <StudentDataCard
                        isPresent={allChecked}
                        showCheckbox={true}
                        tcaNumber='tca2463...'
                        name="Ankit Kumar Dubey"
                        totalAttendance={42}
                    // onPressAction={() => router.push("/home/updateStudent")}
                    />
                    <StudentDataCard
                        isPresent={allChecked}

                        showCheckbox={true}
                        tcaNumber='tca2463...'
                        name="Ankit Kumar Dubey"
                        totalAttendance={42}
                    />
                    <StudentDataCard
                        isPresent={allChecked}
                        showCheckbox={true}
                        tcaNumber='tca2463...'
                        name="Ankit Kumar Dubey"
                        totalAttendance={42}
                    />
                    <StudentDataCard
                        isPresent={allChecked}

                        showCheckbox={true}
                        tcaNumber='tca2463...'
                        name="Ankit Kumar Dubey"
                        totalAttendance={42}
                    />

                </HomeContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default takeAttandence

import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import BaseContainer from '@/app/components/BaseContainer'
import InputBox from '@/app/components/InputBox'
import { Animated } from 'react-native'
import { useRef } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

type formData = {
    profile: string,
    fullname: string,
    username: string,
    password: string,
    confirmPassword: string,
    securityKey: string
}

const Profile = () => {
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const [fromData, setFormData] = React.useState<formData>({
        profile: '',
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        securityKey: ''
    })

    const handleInputChange = (key: keyof formData, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    }

    const startShake = () => {
        Animated.sequence([
            Animated.timing(shakeAnim, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 6,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -6,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();
    }

    const btnControl = () => {
        console.log("Button Pressed")
        console.log(fromData)
        startShake()
    }

    return (

        <SafeAreaProvider>
            <SafeAreaView edges={['top', 'bottom']} className='w-full h-full dark:bg-[#061526] bg-[#3A87BD]  flex justify-start items-center' >

                <BaseContainer
                    styleClass={""}
                    shakeAnim={shakeAnim}
                    btnAction={btnControl}
                    headerLabel={"Profile"}
                    btnLabel={"Update"} >

                    <Image className='w-[100px] h-[100px] bg-neutral-800 mb-2 mt-2' />

                    <InputBox
                        // inputValue={"Ankit Kumar Dubey"}
                        labelData={"fullname"}
                        dataValue={fromData.fullname}
                        setDataValue={text => handleInputChange('fullname', text)}
                    />
                    <InputBox
                        // inputValue={"AnkitDubey"}
                        labelData={"username"}
                        dataValue={fromData.username}
                        setDataValue={text => handleInputChange('username', text)}
                    />
                    <InputBox
                        // inputValue={"*********"}
                        labelData={"password"}
                        dataValue={fromData.password}
                        setDataValue={text => handleInputChange('password', text)}
                    />

                    <InputBox
                        // inputValue={"**********"}
                        labelData={"confirm password"}
                        dataValue={fromData.confirmPassword}
                        setDataValue={text => handleInputChange('confirmPassword', text)}
                    />
                    <InputBox
                        // inputValue={"*************"}
                        labelData={"security key"}
                        dataValue={fromData.securityKey}
                        setDataValue={text => handleInputChange('securityKey', text)}
                    />
                    {/* <Link href={'./Login'}>
                        <Text className='text-blue-500 text-lg font-semibold underline'>already have an account , Login</Text>
                    </Link> */}
                </BaseContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Profile
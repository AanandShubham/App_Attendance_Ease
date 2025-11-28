import React, { SetStateAction, useState } from 'react'
import BaseContainer from '@/app/components/BaseContainer'
import InputBox from '@/app/components/InputBox'
import { Animated } from 'react-native'
import { useRef } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { RegisterTypeFormData } from '@/app/FromTypes'
import ImageSelector from '@/app/components/ImageSelector'
import useAuthContext from '@/app/context/AuthContext'

type formData = {
    profile: string,
    fullname: string,
    username: string,
    password: string,
    confirmPassword: string,
    securityKey: string
}

const Profile = () => {

    const { user } = useAuthContext()
    console.log("---------------------------------------------")
    console.log("User Data : ", user)
    console.log("---------------------------------------------")

    const shakeAnim = useRef(new Animated.Value(0)).current
    const [imageUrl, setImageUrl] = useState<string | null>(user?.profile.secure_url)
    const [fromData, setFormData] = React.useState<RegisterTypeFormData>({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        securityKey: ''
    })

    const handleInputChange = (key: keyof formData, value: SetStateAction<string>
    ) => {
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

                    {/* <Image className='w-[100px] h-[100px] bg-neutral-800 mb-2 mt-2' /> */}

                    <ImageSelector
                        imgUrl={imageUrl}
                        setImage={setImageUrl}
                    />
                    {/* labelData={"Class Name"}
                        inputValue={selectedClass.name}
                        dataValue={formData.name}
                        setDataValue={text => handleInputChange("name", text)} */}

                    <InputBox
                        labelData={"fullname"}
                        inputValue={user?.fullname}
                        dataValue={fromData.fullname}
                        setDataValue={text => handleInputChange('fullname', text)}
                    />
                    <InputBox
                        labelData={"username"}
                        inputValue={user?.username}
                        dataValue={fromData.username}
                        setDataValue={text => handleInputChange('username', text)}
                    />
                    <InputBox
                        inputValue={user?.securityKey}
                        labelData={"security key"}
                        dataValue={fromData.securityKey}
                        setDataValue={text => handleInputChange('securityKey', text)}
                        passwordMode={true}
                    />
                    <InputBox
                        inputValue={"**********"}
                        labelData={"password"}
                        dataValue={fromData.password}
                        setDataValue={text => handleInputChange('password', text)}
                        passwordMode={true}
                    />

                    <InputBox
                        inputValue={"**********"}
                        labelData={"confirm password"}
                        dataValue={fromData.confirmPassword}
                        setDataValue={text => handleInputChange('confirmPassword', text)}
                        passwordMode={true}
                    />

                </BaseContainer>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Profile
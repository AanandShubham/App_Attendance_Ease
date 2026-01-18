import React, { SetStateAction, useState } from 'react'
import BaseContainer from '@/app/components/BaseContainer'
import InputBox from '@/app/components/InputBox'
import { ActivityIndicator, Animated, Text, View } from 'react-native'
import { useRef } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { RegisterTypeFormData } from '@/app/FromTypes'
import ImageSelector from '@/app/components/ImageSelector'
import useAuthContext from '@/app/context/AuthContext'
import useUpdateUser from '@/app/hooks/useUpdateUser'
import Toast from 'react-native-toast-message'

type formData = {
    profile: string,
    fullname: string,
    username: string,
    password: string,
    confirmPassword: string,
    securityKey: string
}

const Profile = () => {

    const { loading, updateUser } = useUpdateUser()

    const { user } = useAuthContext()
    // console.log("---------------------------------------------")
    // console.log("User Data : ", user)
    // console.log("---------------------------------------------")

    const shakeAnim = useRef(new Animated.Value(0)).current
    const [imageUrl, setImageUrl] = useState<string | null>(user?.profile?.secure_url || null)
    const [fromData, setFormData] = React.useState<RegisterTypeFormData>({
        fullname: user?.fullname,
        username: user?.username,
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

    const btnControl = async () => {
        // console.log("Button Pressed")
        // console.log(fromData)

        if (!await updateUser(fromData, imageUrl)) {
            startShake()
        } else {
            Toast.show({
                type: "success",
                text1: "Profile Updated Successfully"
            })
        }

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
                        // inputValue={user?.fullname}
                        dataValue={fromData.fullname}
                        setDataValue={text => handleInputChange('fullname', text)}
                    />
                    <InputBox
                        labelData={"username"}
                        // inputValue={user?.username}
                        dataValue={fromData.username}
                        setDataValue={text => handleInputChange('username', text)}
                    />
                    <InputBox
                        labelData={"security key"}
                        // inputValue={user?.securityKey}
                        dataValue={fromData.securityKey}
                        setDataValue={text => handleInputChange('securityKey', text)}
                        passwordMode={true}
                    />
                    <InputBox
                        labelData={"new password"}
                        // inputValue={"**********"}
                        dataValue={fromData.password}
                        setDataValue={text => handleInputChange('password', text)}
                        passwordMode={true}
                    />

                    <InputBox
                        // inputValue={"**********"}
                        labelData={"confirm password"}
                        dataValue={fromData.confirmPassword}
                        setDataValue={text => handleInputChange('confirmPassword', text)}
                        passwordMode={true}
                    />

                </BaseContainer>

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

export default Profile
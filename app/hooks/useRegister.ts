import { useState } from "react"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"
import { RegisterTypeFormData } from "../FromTypes"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from 'expo-constants'

const useRegister = () => {
    const [loading, setLoading] = useState(false)
    const { setUser, setToken } = useAuthContext()
    const { setClasses } = useClassContext()
    const {apiUrl} = Constants.expoConfig?.extra || {}

    const register = async (registerForm: RegisterTypeFormData, imageUrl: string | null) => {

        const flag = inputValidation(registerForm, imageUrl)

        if (!flag) return false

        setLoading(true)

        try {

            const formData = new FormData()
            formData.append('username', registerForm.username)
            formData.append('fullname', registerForm.fullname)
            formData.append('password', registerForm.password)
            formData.append('confirmPassword', registerForm.confirmPassword)
            formData.append('securityKey', registerForm.securityKey)
            // formData.append('profile',registerForm.profile as string)

            if (imageUrl) {
                formData.append('profile', {
                    uri: imageUrl,
                    type: "image/jpeg",
                    name: "profile.jpg"
                } as any)
            }

            const response = await fetch(`${apiUrl}/auth/signup`, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })

            const data = await response.json()

            if (data.error) throw new Error(data.error)

            console.log("----------------------------------------")
            console.log("Register Data : ", data)
            console.log("Register Classes : ", data["user"]["classes"])
            console.log("----------------------------------------")

            // setting and storing token to the context and and the async storage 
            setToken(data.token)
            await AsyncStorage.setItem("AuthToken", JSON.stringify(data.token))

            // setting and storing user  to the context and the async storage 
            setUser(data.user)
            await AsyncStorage.setItem("AuthUser", JSON.stringify(data.user))

            // setting the classes of the user to the class context 
            setClasses(data.user["classes"])

            return true

        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: `Error message : ${error.message}`
            })
            console.log("Error : ", error)
        } finally {
            setLoading(false)
        }
        return false
    }

    return { loading, register }
}

export default useRegister

const inputValidation = (formData: RegisterTypeFormData, imageUrl: string | null) => {


    if (
        [
            formData.fullname,
            formData.username,
            formData.password,
            formData.confirmPassword,
            formData.securityKey
        ].some(item => item?.trim() === "")) {
        Toast.show({
            type: "error",
            text1: " Fields Can't be Emplty !!!!!",
            text1Style: {
                backgroundColor: 'red',
                padding: 4,
                fontSize: 15,
                color: "white"
            },
            text2: ""
        })

        return false
    }

    if (imageUrl == null) {
        Toast.show({
            type: "info",
            text1: "Please Add Profile Photo ",
            text1Style: {
                backgroundColor: "yellow",
                padding: 4,
                color: "black"
            },
        })
        return false
    }

    if (formData.password.length < 6) {
        Toast.show({
            type: "info",
            text1: "Password Lenght Error ",
            text1Style: {
                backgroundColor: "yellow",
                padding: 4,
                color: "black"
            },
            text2: "! Password Should be greater than 6 ! "
        })
        return false
    }

    if (formData.password !== formData.confirmPassword) {
        Toast.show({
            type: "error",
            text1: "! Password and ConfirmPassword should be same !",
            text1Style: {
                backgroundColor: 'red',
                padding: 4,
                fontSize: 15,
                color: "white"
            },
            text2: ""
        })

        return false
    }

    return true
}
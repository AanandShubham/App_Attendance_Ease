import { useState } from "react"
import { ForgetTypeFormData } from "../FromTypes"
import Toast from "react-native-toast-message"

const useForgot = () => {
    const [loading, setLoading] = useState(false)

    const forgot = async (forgotData: ForgetTypeFormData) => {
        const flag = inputValidation(forgotData)
        if (!flag) return false

        setLoading(true)

        try {
            const response = await fetch("http://10.118.247.162:3000/api/auth/forgot",{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(forgotData)
            })

            const data = await response.json()

            if(data.error) throw new Error(data.error)

            Toast.show({
                type:"success",
                text1:data.message
            })

            return true

        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: `Error message : ${error.message}`
            })
            console.log("Error : ", error)
        }finally{
            setLoading(false)
        }

        return false
    }
}
export default useForgot

const inputValidation = (forgetData: ForgetTypeFormData) => {

    if (
        [
            forgetData.username,
            forgetData.securityKey,
            forgetData.password,
            forgetData.confirmPassword
        ].some(item => item?.trim() === "")
    ) {
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

    return true
}
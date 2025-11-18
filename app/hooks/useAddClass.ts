import { useState } from "react"
import { ClassTypeFormData } from "../FromTypes"
import Toast from "react-native-toast-message"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"

const useAddClass = () => {
    const { token } = useAuthContext()
    const { classes, setClasses } = useClassContext()
    const [loading, setLoading] = useState(false)

    const addClass = async (classData: ClassTypeFormData) => {
        const flag = inputValidation(classData)

        if (!flag) return false

        setLoading(true)

        try {
            const response = await fetch("http://10.118.247.162:3000/api/class/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify(classData)
            })

            const data = await response.json()

            if (data.error) throw new Error(data.error)

            console.log("new Added Class ", data.newClass)

            setClasses([...classes, data.newClass])

            return true

        } catch (error) {

        } finally {
            setLoading(false)
        }
        return false
    }

    return { loading, addClass }
}

export default useAddClass

const inputValidation = (classData: ClassTypeFormData) => {

    if (
        [
            classData.name,
            classData.roomNo,
            classData.subject,
            classData.timeTable

        ].some(item => item?.trim() === "")
        || !classData.totalClass) {
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
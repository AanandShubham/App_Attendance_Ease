import { useState } from "react"
import { ClassTypeFormData } from "../FromTypes"
import Toast from "react-native-toast-message"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"

const useUpdateClass = () => {
    const { token } = useAuthContext()
    const { classes, setClasses, selectedClass, setSelectedClass } = useClassContext()
    const [loading, setLoading] = useState(false)

    const updateClass = async (classData: ClassTypeFormData) => {
        const flag = inputValidation(classData)

        if (!flag) return

        setLoading(true)

        try {
            const response = await fetch("http://10.131.201.161:3000/api/class/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication": `Token ${token}`
                },
                body: JSON.stringify(classData)
            })

            const data = await response.json()

            if (data.error) throw new Error(data.error)

            const updatedClasses = classes.map((item: any) => item._id == data.updatedClass ? data.updatedClass : item)

            setClasses(updatedClasses)
            setSelectedClass(data.updatedClass)

        } catch (error) {

        } finally {
            setLoading(false)
        }

    }

    return { loading, updateClass }

}

export default useUpdateClass

const inputValidation = (classData: ClassTypeFormData) => {

    if (
        [
            classData.className,
            classData.roomNo,
            classData.subject,
            classData.time,
            classData.totalClass
        ].some(item => item === '')
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
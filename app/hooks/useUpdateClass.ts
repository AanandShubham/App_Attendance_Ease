import { useState } from "react"
import { ClassTypeFormData } from "../FromTypes"
import Toast from "react-native-toast-message"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"

const useUpdateClass = () => {
    const { token } = useAuthContext()
    const { classes, setClasses, setSelectedClass,selectedClass } = useClassContext()
    const [loading, setLoading] = useState(false)

    const updateClass = async (classData: ClassTypeFormData) => {
        const flag = inputValidation(classData)

        if (!flag) return false

        setLoading(true)

        try {
                if(!classData.id){
                    classData.id = selectedClass._id
                }

            const response = await fetch("http://10.118.247.162:3000/api/class/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify(classData)
            })

            const data = await response.json()

            if (data.error) throw new Error(data.error)

            const updatedClasses = classes.map((item: any) => item._id == data.updatedClass._id ? data.updatedClass : item)

            setClasses(updatedClasses)
            setSelectedClass(data.updatedClass)

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

    return { loading, updateClass }

}

export default useUpdateClass

const inputValidation = (classData: ClassTypeFormData) => {

    if (
        [
            classData.name,
            classData.roomNo,
            classData.subject,
            classData.timeTable,
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
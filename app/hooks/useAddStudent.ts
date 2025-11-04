import { useState } from "react"
import { StudentTypeFormData } from "../FromTypes"
import Toast from "react-native-toast-message"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"

const useAddStudent = () => {

    const { token } = useAuthContext()
    const { classes, setClasses, setSelectedClass, students, setStudents } = useClassContext()

    const [loading, setLoading] = useState(false)

    const addStudent = async (studentData: StudentTypeFormData) => {
        const flag = inputValidation(studentData)

        if (!flag) return false

        setLoading(true)
        try {
            const response = await fetch("http://10.151.202.163:3000/api/student/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication": `Token ${token}`
                },
                body: JSON.stringify(studentData)
            })

            const data = await response.json()

            if (data.error) throw new Error(data.error)

            const updatedClasss = classes.map((item: any) => item._id == data.classes._id ? data.classes : item)

            setClasses(updatedClasss)

            setSelectedClass(updatedClasss)

            setStudents([...students, data.student])

            return true 


        } catch (error:any) {
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

    return { loading, addStudent }

}

export default useAddStudent

const inputValidation = (studentData: StudentTypeFormData) => {

    if (
        [
            studentData.tcaNumber,
            studentData.name,
            studentData.totalAttendance
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
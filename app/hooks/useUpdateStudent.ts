import { useState } from "react"
import { StudentTypeFormData } from "../FromTypes"
import Toast from "react-native-toast-message"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"

const useUpdateStudent = () => {

    const { token } = useAuthContext()
    const { students, setStudents } = useClassContext()
    const [loading, setLoading] = useState(false)

    const updateStudent = async (studentData: StudentTypeFormData) => {

        const flag = inputValidation(studentData)

        if (!flag) return false

        setLoading(true)

        try {

            const response = await fetch("http://10.140.202.160:3000/api/student/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authentication": `Token ${token}`
                },
                body: JSON.stringify(studentData)
            })

            const data = await response.json()

            if (data.error) throw new Error(data.error)

            const updatedStudents = students.map((student: any) => student._id == data.student._id ? data.student : student)

            setStudents(updatedStudents)

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

    return { loading, updateStudent }
}

export default useUpdateStudent


const inputValidation = (studentData: StudentTypeFormData) => {

    if (
        [
            studentData.tca,
            studentData.name,

        ].some(item => item?.trim() === "")
        || !studentData.totalAttendance) {
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
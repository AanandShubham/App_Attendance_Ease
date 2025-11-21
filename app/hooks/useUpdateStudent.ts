import { useState } from "react"
import { StudentUpdateTypeFormData } from "../FromTypes"
import Toast from "react-native-toast-message"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"
import Constants from 'expo-constants'


const useUpdateStudent = () => {
    
    const { token } = useAuthContext()
    const { students, setStudents, selectedStudent } = useClassContext()
    const [loading, setLoading] = useState(false)
    const {apiUrl} = Constants.expoConfig?.extra || {}
    
    const updateStudent = async (studentData: StudentUpdateTypeFormData) => {

        const flag = inputValidation(studentData)

        if (!flag) return false

        setLoading(true)

        try {

            if (!studentData.id) {
                studentData.id = selectedStudent?._id
            }

            const response = await fetch(`${apiUrl}/student/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
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


const inputValidation = (studentData: StudentUpdateTypeFormData) => {

    if (!studentData.newAttendance) {
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
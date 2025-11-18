import { useState } from "react"
import { StudentTypeFormData } from "../FromTypes"
import Toast from "react-native-toast-message"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"

const useAddStudent = () => {

    const { token, user } = useAuthContext()
    const { classes, setClasses, selectedClass, setSelectedClass, students, setStudents } = useClassContext()

    const [loading, setLoading] = useState(false)

    const addStudent = async (studentData: StudentTypeFormData) => {

        const flag = inputValidation(studentData)

        if (!flag) return false

        setLoading(true)
        try {
            if (!studentData.classId) {
                studentData.classId = selectedClass._id
            }
            console.log("User : ", user)

            const response = await fetch("http://10.239.230.162:3000/api/student/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
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

    return { loading, addStudent }

}

export default useAddStudent

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
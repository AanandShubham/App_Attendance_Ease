import { useState } from "react"
import Constants from "expo-constants"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"
import Toast from "react-native-toast-message"

const useDeleteStudent = () => {
    const [loading, setLoading] = useState(false)
    const { apiUrl } = Constants.expoConfig?.extra || {}
    const { token } = useAuthContext()
    const { classes, setClasses, students, setStudents, selectedClass, setSelectedClass } = useClassContext()

    const deleteStudentById = async (classId: String, studentId: String) => {
        setLoading(true)

        try {
            const respose = await fetch(`${apiUrl}/student/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify({ classId, id: studentId })
            })

            const data = await respose.json()

            if (respose.status !== 200) throw new Error(data.error)

            const updatedSelectedStudents = selectedClass.students.filter(
                (stid: any) => stid.toString() !== studentId
            )
            setSelectedClass({ ...selectedClass, students: updatedSelectedStudents })
            const updatedClassList = classes.map((cls: any) =>
                cls._id === classId
                    ? { ...cls, students: updatedSelectedStudents }
                    : cls
            )
            setClasses(updatedClassList)

            // write logic to update students

            const updatedStudents = students.map((std: any) =>
                std._id === studentId
                    ? {
                        ...std, classList: std.classList.filter(
                            (cls: any) => cls.classId !== classId
                        )
                    }
                    : std
            )

            const filteredStudents = updatedStudents.filter((std:any)=>std.classList.length != 0)


            setStudents(filteredStudents)

            Toast.show({
                type: "success",
                text1: data.message
            })

            // console.log("---------------------------------------------------")
            // console.log("Selected Class : ", JSON.stringify(selectedClass, null, 2))
            // console.log("---------------------------------------------------")
            // console.log("Class List :", JSON.stringify(classes, null, 2))
            // console.log("---------------------------------------------------")
            // console.log("Student List :", JSON.stringify(students, null, 2))
            // console.log("---------------------------------------------------")

            return true

        } catch (error: any) {
            console.log("Error in deleting Class by id : ", error)
            Toast.show({
                type: "error",
                text1: error.message
            })
        }
        return false
    }

    return { loading, deleteStudentById }
}

export default useDeleteStudent
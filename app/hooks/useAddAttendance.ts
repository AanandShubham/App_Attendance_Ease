import { useState } from "react"
import Toast from "react-native-toast-message"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"
import Constants from 'expo-constants'


const useAddAttendance = () => {
    const { apiUrl } = Constants?.expoConfig?.extra || {}

    const { token } = useAuthContext()

    const [loading, setLoading] = useState(false)

    const {
        selectedClass,
        classes, setClasses,
        setSelectedClass,
        attendanceList, setAttendanceList,
        students, setStudents
    } = useClassContext()


    const addAttendance = async (attendance: any) => {

        const idSet = new Set(attendance)

        // updating student attendance in student list 
        const updatedStudents = students?.map(
            (std: any) => idSet.has(std._id) ? updateAttendance(std, selectedClass._id) : std
        )

        console.log("################################################")
        console.log("attendance UPdated Students : ", JSON.stringify(updatedStudents, null, 2))
        console.log("################################################")

        console.log("################################################")
        console.log("Students List : ", JSON.stringify(students, null, 2))
        console.log("################################################")

        // now we have updated sutudents with attendance count increased by 1 for selected class
        const attendanceUpdatedStudents = updatedStudents?.filter((std: any) => idSet.has(std._id))


        const attendanceData = {
            name: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }),
            subject: selectedClass?.subject,
            roomNo: selectedClass?.roomNo,
            classId: selectedClass?._id,
            students: attendanceUpdatedStudents,
            attendanceList: attendance
        }

        // now write the logic to update the students in db with bulkWrite 
        // then only run the app again 

        // console.log("***************************************")
        // console.log("Attendance Data : ", attendanceData)
        // console.log("***************************************")

        setLoading(true)

        try {
            const response = await fetch(`${apiUrl}/attendance/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Token ${token}`
                },
                body: JSON.stringify(attendanceData)
            })

            const data = await response.json()

            if (data.error) throw new Error(data.error)

            console.log("**********************************************")
            console.log("After Adding attendance Response : ", JSON.stringify(data, null, 2))
            console.log("**********************************************")
            
            //updating updated classes 
            const updatedClasses = classes.map((item: any) => item._id == data.updatedClass._id ? data.updatedClass : item)

            setSelectedClass(data.updatedClass)
            setClasses(updatedClasses)
            setStudents(updatedStudents)
            setAttendanceList([...attendanceList, data.attendance])

            return true

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: "Error in adding attendance"
            })
            console.log("Error in adding attendance : ", error)
        } finally {
            setLoading(false)
        }

        return false
    }

    return { loading, addAttendance }
}

export default useAddAttendance

const updateAttendance = (std: any, classId: any) => {
    return {
        ...std,
        classList: std?.classList?.map((cls: any) => cls.classId === classId ? { ...cls, totalAttendance: cls?.totalAttendance + 1 } : cls)
    }
}


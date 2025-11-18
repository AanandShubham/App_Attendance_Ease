import { useState } from "react"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"
import Toast from "react-native-toast-message"

const useGetClassDetails = () => {
    const [loading, setLoading] = useState(false)

    const { token } = useAuthContext()

    const { setStudents, setAttendanceList } = useClassContext()

    const getClassDetails = async (classId: string) => {

        setLoading(true)

        try {

            const response = await fetch(`http://10.118.247.162:3000/api/class/getDetails/${classId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`
                }
            })

            // const response = await fetch(`http://10.222.211.162:3000/api/student/get/68c9b9f2c2a113b821994c29`, {
            //     method: "GET",
            //     headers: {
            //         "Authorization": `Token ${token}`
            //     }
            // })

            // const text = await response.text()

            // console.log("Raw Response : ", text)

            const data = await response.json()

            // console.log("Class Data get Hook  : ", data)

            if (data.error) throw new Error(data.error)

            setStudents(data.students)
            console.log("----------------------------------------")
            console.log("Students Details : ", JSON.stringify(data.students,null,2))
            console.log("----------------------------------------")

            setAttendanceList(data.attendances)

        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: error.message
            })
            console.log("Error in Class Menu : \n", error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, getClassDetails }
}

export default useGetClassDetails


// Student data :  {
//   _id: new ObjectId('68c9b9f2c2a113b821994c29'),
//   tca: 'tca24631237',
//   name: 'Mohin Kumar',
//   classList: [
//     {
//       totalAttendance: 0,
//       classId: new ObjectId('68c8f25d866105cc4ebf4b9b'),
//       _id: new ObjectId('68c9b9f2c2a113b821994c2a')
//     },
//     {
//       totalAttendance: 10,
//       classId: new ObjectId('68c9ba9fc2a113b821994c2e'),
//       _id: new ObjectId('68c9bac4c2a113b821994c35')
//     }
//   ],
//   createdAt: 2025-09-16T19:26:42.820Z,
//   updatedAt: 2025-09-16T19:37:05.094Z,
//   __v: 1
// }
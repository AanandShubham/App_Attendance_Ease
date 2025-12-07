import { useState } from "react"
import Constants from "expo-constants"
import useAuthContext from "../context/AuthContext"
import Toast from "react-native-toast-message"
import useClassContext from "../context/ClassContext"

const useDeleteClass = () => {
    const [loading2, setLoading] = useState(false)
    const { apiUrl } = Constants.expoConfig?.extra || {}
    const { token, user, setUser } = useAuthContext()
    const { classes, setClasses } = useClassContext()

    const deleteClassById = async (id: String) => {
        setLoading(true)

        try {
            const response = await fetch(`${apiUrl}/class/delete/${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`
                }
            })

            const data = await response.json()
            // console.log("REsponse Data of Class !!!", JSON.stringify(data, null, 2))
            console.log("REsponse Data of Class !!!", JSON.stringify(response, null, 2))

            if (response.status !== 200) throw new Error(data.error)

            // const filteredUserClass = user.classes.filter((cId: any) => cId._id.toString() !== id)
            const filteredClass = classes.filter((item: any) => item._id !== id)
            setUser({ ...user, classes: filteredClass })
            setClasses(filteredClass)

            Toast.show({
                type: "success",
                text1: data.message
            })

            return true

        } catch (error: any) {
            console.log("Error in deleting Class by id : ", error)
            Toast.show({
                type: "error",
                text1: error.message
            })
        } finally {
            setLoading(false)
        }
        return false
    }

    return { loading2, deleteClassById }
}
export default useDeleteClass
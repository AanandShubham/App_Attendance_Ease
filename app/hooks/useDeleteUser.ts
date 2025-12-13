import { useState } from "react"
import Constants from "expo-constants"
import useAuthContext from "../context/AuthContext"
import Toast from "react-native-toast-message"
const useDeleteUser = () => {
    const [loading, setLoading] = useState(false)
    const { apiUrl } = Constants.expoConfig?.extra || {}
    const { token } = useAuthContext()
    const deleteUser = async () => {

        setLoading(true)

        try {
            const response = await fetch(`${apiUrl}/auth/delete-all`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`
                }
            })

            const data = await response.json()

            if(response.status !== 200) {
                throw new Error(data.error)
            }

            Toast.show({
                type:"success",
                text1:"Your Data Deleted Successfully"
            })

        } catch (error: any) {
            console.log("Error in delete user Data : ",error.message)
            Toast.show({
                type:"error",
                text1:`Error : ${error.message}`
            })
        } finally {
            setLoading(false)
        }
    }

    return { loading, deleteUser }
}

export default useDeleteUser 
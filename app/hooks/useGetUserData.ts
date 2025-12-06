import { useState } from "react"
import useAuthContext from "../context/AuthContext"
import useClassContext from "../context/ClassContext"
import Constants from 'expo-constants'
import Toast from "react-native-toast-message"


const useGetUserData = () => {

    const { apiUrl } = Constants.expoConfig?.extra || {}

    const { user, setUser, token, setToken } = useAuthContext()
    const { setClasses } = useClassContext()
    const [loading, setLoading] = useState(false)


    const loadUserData = async () => {

        setLoading(true)

        try {
            const response = await fetch(`${apiUrl}/auth/getUserData`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`
                }
            })

            const data = await response.json()

            console.log("User Data : ", JSON.stringify(data, null, 2))
            console.log("User Data : ", JSON.stringify(data.user, null, 2))

            console.log("Status code in Hook : ", data.status)

            if (data.status === 401) {
                // handle unauthorized access, logout the user if token expired
                Toast.show({
                    type: 'info',
                    text1: "Token Expired !!",
                    text2: "Please Login again"
                })
                // console.log("Token expired or invalid , logging out the user")
                setToken("")
                setUser(null)
                setClasses([])
                return 401
            }

            setUser(data.user)
            setClasses(data.user.classes)

            return 200

        } catch (error) {
            console.error('Error fetching user data:', error)
            Toast.show({
                type: 'error',
                text1: "Network Error !!"
            })
        } finally {
            setLoading(false)
        }
        return 404
    }

    return { loadUserData, loading }

}

export default useGetUserData
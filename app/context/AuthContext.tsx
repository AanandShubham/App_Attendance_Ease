import React, { useState, useEffect, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import useClassContext from "./ClassContext"
import Toast from "react-native-toast-message"


type AuthContextType = {
    user: any,
    token: string | null,
    loading: boolean,
    setUser: (user: any) => void,
    setToken: (token: string) => void,
    logout: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
    user: [],
    token: '',
    loading: true,
    setUser: (user: any) => [],
    setToken: (token: string) => '',
    logout: () => { }
})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const { setClasses } = useClassContext()


    const logout = async () => {
        try {
            setUser(null)
            setToken(null)
            setClasses(null)
            await AsyncStorage.removeItem("AuthToken")
            await AsyncStorage.removeItem("AuthUser")
            await AsyncStorage.removeItem("theme")
            Toast.show({
                type: "info",
                text1: "Logout Completed"
            })
        }
        catch {
            console.log("Error in clearing the auth data !!")

        }
    }

    useEffect(() => {
        const loadAuthContext = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("AuthToken")
                const storedUser = await AsyncStorage.getItem("AuthUser")
                if (storedToken && storedUser) {
                    setToken(JSON.parse(storedToken))
                    const parsedUser = JSON.parse(storedUser)
                    setUser(parsedUser)

                    if (parsedUser.classes) {
                        setClasses(parsedUser.classes)
                    }
                }
            } catch (error) {
                console.log("Error in loading auth Data !!")
            } finally {
                setLoading(false)
            }
        }

        loadAuthContext()
    }, [])

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    return useContext(AuthContext)
}

export default useAuthContext

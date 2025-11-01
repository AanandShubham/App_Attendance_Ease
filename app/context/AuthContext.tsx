import React, { useState, useEffect, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import useClassContext from "./ClassContext"


type AuthContextType = {
    user: any,
    token: string | null,
    setUser: (user: any) => void,
    setToken: (token: string) => void,
    logout: () => void
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<any>(null)

    const { setClasses } = useClassContext()


    const logout = async () => {
        try {
            setUser({})
            setToken('')
            await AsyncStorage.removeItem("AuthToken")
            await AsyncStorage.removeItem("AuthUser")
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
            }
        }

        loadAuthContext()
    }, [])

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    return useContext(AuthContext)
}

export default useAuthContext

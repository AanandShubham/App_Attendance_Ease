import { useState } from "react"
import { LoginTypeFormData } from "../FromTypes"
import Toast from "react-native-toast-message"
import useAuthContext from "../context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import useClassContext from "../context/ClassContext"

import Constants from 'expo-constants'

const useLogin = () => {

  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useAuthContext()
  const { setClasses } = useClassContext()
  const { apiUrl } = Constants.expoConfig?.extra || {}

  const login = async (loginForm: LoginTypeFormData) => {

    const flag = InputValidation(loginForm)

    if (!flag) return false

    setLoading(true)
    // console.log("************************************")
    // console.log("api Url : ", apiUrl)
    // console.log("************************************")

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginForm)
      })

      const data = await response.json()

      if (data.error) throw new Error(data.error)

      // console.log("Data : ", data)
      // console.log("Classes : ", data["user"]["classes"])

      // setting and storing token to the context and and the async storage 
      setToken(data.token)
      await AsyncStorage.setItem("AuthToken", JSON.stringify(data.token))

      // setting and storing user  to the context and the async storage 
      setUser(data.user)
      await AsyncStorage.setItem("AuthUser", JSON.stringify(data.user))

      // setting the classes of the user to the class context 
      setClasses(data.user["classes"])

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

  return { loading, login };
}

export default useLogin

const InputValidation = (formData: LoginTypeFormData): Boolean => {


  if (formData.username?.trim() === "" || formData.password?.trim() === "") {
    Toast.show({
      type: "error",
      text1: " Fields Can't be Emplty !",
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

  if (formData.username.includes(' ')) {
    Toast.show({
      type: "error",
      text1: "Username can't contains",
      text2: "White Spaces !!",
      text2Style: {
        backgroundColor: 'red',
        padding: 4,
        fontSize: 15,
        color: "white"
      }
    })
    return false
  }

  if (formData.password.length < 6) {
    Toast.show({
      type: "info",
      text1: "Password Lenght Error ",
      text1Style: {
        backgroundColor: "yellow",
        padding: 4,
        color: "black"
      },
      text2: "Password Should be greater than 6 ! "
    })
    return false
  }

  return true

}
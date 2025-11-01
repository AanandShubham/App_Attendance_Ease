import { useState } from "react";
import { LoginTypeFormData } from "../FromTypes";
import { Alert, ToastAndroid } from "react-native";
import Toast from "react-native-toast-message";
import useAuthContext from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useClassContext from "../context/ClassContext";

const useLogin = () => {

  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useAuthContext()
  const { setClasses } = useClassContext()

  const login = async (loginForm: LoginTypeFormData) => {
   
    const flag = InputValidation(loginForm)

    if (!flag) return false

    setLoading(true)

    try {
      const response = await fetch("http://10.141.201.162:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginForm)
      })

      const data = await response.json()

      if (data.error) throw new Error(data.error)

      console.log("Data : ", data)
      console.log("Classes : ", data["user"]["classes"])

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
  let flag = true

  if (formData.username === "" || formData.password === "") {
    // Alert.alert("Field Can't be empty")
    // ToastAndroid.show("Fields Can't be Emplty",ToastAndroid.LONG)

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
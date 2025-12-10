import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, useRouter } from 'expo-router'
import '../global.css'
import useAuthContext from './context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from 'react-native-modal'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const onboarding = () => {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const { user, loading } = useAuthContext()
  const [accepted, setAccepted] = useState(false);


  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null)

  const goToLogin = async () => {
    setStep(3)
    await AsyncStorage.setItem("onboarding", "completed")
    router.replace("/Login")
  }

  useEffect(() => {
    (async () => {
      const flag = await AsyncStorage.getItem("onboarding")
      setOnboardingDone(flag === "completed")
    })()
  }, [])

  // Wait for both loading states
  if (loading || onboardingDone === null) return null

  // If user logged in → Go to tabs
  if (user) return <Redirect href="/(tabs)/home" />

  // If NOT logged in, but onboarding already done → go to login
  if (!user && onboardingDone) {
    return <Redirect href="/Login" />
  }

  return (
    <View className="flex-1 bg-white justify-center items-center">


      {/* ---------------- MODAL 1 ---------------- */}
      <Modal
        isVisible={step === 1}
        onBackdropPress={() => setStep(2)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.15}
        animationInTiming={300}
        animationOutTiming={250}
        style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
      >
        <View className="w-[95%] h-[60%] flex justify-center items-center  bg-[#4686bb] rounded-s-[35px] rounded-e-[30px] shadow-lg p-4 pb-10">

          {/* Header */}
          <Text className="absolute -top-20 bg-[#4686bb] text-white text-2xl px-6 py-4 rounded-tl-[35px] rounded-tr-[35px] font-bold">
            Welcome to Attendance Ease
          </Text>

          {/* Content */}
          <View className="mt-10 flex-1 items-center px-2">
            <ScrollView showsVerticalScrollIndicator={false}>


              <Text className="text-white text-lg mt-4 text-center leading-7">
                Thank you for choosing <Text className="font-semibold">Attendance Ease</Text> —
                your smart and simple companion for managing attendance effortlessly.
              </Text>

              <Text className="text-white text-lg mt-4 leading-7 text-center">
                This app is designed to help you stay organized, track class attendance,
                monitor daily progress, and maintain records without any hassle.
              </Text>

              <Text className="text-white text-lg mt-4 leading-7 text-center">
                Whether you are a student who wants to keep accurate attendance logs,
                or someone who likes maintaining discipline and consistency in daily activities,
                Attendance Ease gives you the tools to stay on track with ease.
              </Text>

              <Text className="text-white text-lg mt-4 mb-12 leading-7 text-center">
                Let’s walk you through a quick introduction to help you understand
                how things work and how the app can benefit you in the best possible way.
              </Text>
            </ScrollView>
          </View>

          {/* Next Button */}
          <Pressable
            onPress={() => setStep(2)}
            className="absolute -bottom-20 px-8 py-2 rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[45px] rounded-br-[45px] bg-[#4686bb]"
          >
            <MaterialCommunityIcons
              name="arrow-right"
              size={32}
              color="white"
            />
          </Pressable>

        </View>
      </Modal>



      {/* ---------------- MODAL 2 ---------------- */}

      <Modal
        isVisible={step === 2}
        onBackdropPress={() => setStep(1)}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropOpacity={0.15}
        animationInTiming={300}
        animationOutTiming={250}
        style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
      >
        <View className="w-[90%] h-[60%] flex justify-center items-center bg-[#4686bb] rounded-s-[35px] rounded-e-[30px] shadow-lg p-4">

          {/* Header */}
          <Text className="absolute -top-16 bg-[#4686bb] text-white text-3xl px-6 py-3 rounded-tl-[35px] rounded-tr-[35px] font-bold">
            Terms & Conditions
          </Text>

          {/* Content */}
          <View className="mt-6 flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>

              <Text className="text-white text-xl font-bold leading-7">
                Welcome to Attendance Ease. By using this app, you agree to the
                following terms and conditions. Please read them carefully.
              </Text>

              {/* --- Sections --- */}
              <Text className="mt-6 text-xl text-white font-bold">1. Usage Policy</Text>
              <Text className="text-white text-lg leading-7 mt-1">
                This app is created for attendance management. Any misuse or unauthorized
                manipulation is strictly prohibited.
              </Text>
              <Text className="mt-6 text-xl text-white font-bold">2. User Responsibility</Text>
              <Text className="text-white text-lg leading-7 mt-1">
                You are responsible for maintaining the confidentiality of your account information, including login credentials. Any activity performed through your account will be presumed to be initiated by you, and you agree to take appropriate steps to secure your device and personal data.
              </Text>

              <Text className="mt-6 text-xl text-white font-bold">3. Data & Privacy</Text>

              <Text className="text-white text-lg leading-7 mt-1">
                Attendance Ease collects and stores user information solely for the purpose of providing attendance-related services. All data is handled with reasonable security measures; however, the app does not guarantee absolute protection against unauthorized access, system failures, or data breaches. Limitation of Responsibility While we strive to maintain data integrity and confidentiality, Attendance Ease shall not be held responsible for any loss, unauthorized access, alteration, or disclosure of user data arising from device issues, network failures, user negligence, third-party actions, or any circumstances beyond our control.
              </Text>



              <Text className="mt-6 text-xl text-white font-bold">
                4. Limitations
              </Text>

              <Text className="text-white text-lg leading-7 mt-1">
                Attendance Ease shall not be held responsible or liable for any form of data loss, corruption, unauthorized access, breach, or misuse resulting from factors beyond our reasonable control. This includes, but is not limited to, device malfunction, operating system issues, accidental deletion, user negligence, insecure networks, third-party interference, or any technological vulnerability not caused directly by the app.
              </Text>

              <Text className="mt-6 text-xl text-white font-bold">5. No Guarantee of Error-Free Operation</Text>
              <Text className="text-white text-lg leading-7 mt-1">
                While we strive to maintain stable and reliable app performance, Attendance Ease does not guarantee uninterrupted service or error-free operation. Any downtime, update-related changes, or technical issues may affect how your data is processed or displayed.
              </Text>

              <Text className="mt-6 text-xl text-white font-bold">6. Assumption of Risk</Text>
              <Text className="text-white text-lg leading-7 mt-1">
                By continuing to use this application, you acknowledge and agree that you are using the app at your own risk. You further accept that Attendance Ease, its developers, and associated parties shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or misuse of the application or any data-related issues.
              </Text>

              <Text className="mt-6 text-xl text-white font-bold">7. App Updates</Text>
              <Text className="text-white text-lg leading-7 mt-1">
                App updates may introduce new features or changes. You agree to use
                the latest version for best experience.
              </Text>

              <Text className="mt-6 text-xl text-white font-bold">8. Acceptance</Text>
              <Text className="text-white text-lg leading-7 mt-1 mb-8">
                To continue, please accept the Terms & Conditions below.
              </Text>

            </ScrollView>

            {/* Checkbox */}
            <Pressable
              onPress={() => setAccepted(!accepted)}
              className="flex flex-row items-center gap-3 mt-2"
            >
              <View
                className={`w-6 h-6 rounded-md flex justify-center items-center ${accepted ? "bg-green-500" : "bg-white"
                  }`}
              >
                {accepted && (
                  <MaterialCommunityIcons
                    name="check"
                    size={20}
                    color="white"
                  />
                )}
              </View>
              <Text className='w-fit h-fit text-xl px-2 py-1 rounded-md bg-[#296ab5] text-[#d5e5e9] border-b-2 border-[#1d67bb]'>I agree to the terms & conditions</Text>
            </Pressable>
          </View>

          {/* Buttons */}
          <View className="absolute -bottom-20 w-full flex-row justify-between px-4">

            {/* Back Button */}
            <Pressable
              onPress={() => setStep(1)}
              className="px-6 py-2 rounded-2xl bg-[#3c7ab0] flex-row items-center"
            >
              <MaterialCommunityIcons name="arrow-left" size={26} color="white" />
              <Text className="text-white ml-2 text-lg">Back</Text>
            </Pressable>

            {/* Continue Button */}
            <Pressable
              disabled={!accepted}
              onPress={goToLogin}
              className={`px-6 py-2 rounded-2xl flex-row items-center ${accepted ? "bg-green-600" : "bg-gray-400"
                }`}
            >
              <MaterialCommunityIcons name="check-decagram" size={26} color="white" />
              <Text className="text-white ml-2 text-lg">Agree & Continue</Text>
            </Pressable>
          </View>
        </View>
      </Modal >

    </View >

  )
}

export default onboarding
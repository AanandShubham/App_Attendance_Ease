import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import HomeContainer from '@/app/components/HomeContainer'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ClassDataCard from '@/app/components/ClassDataCard'
import useClassContext from '@/app/context/ClassContext'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import { ClassTypeFormData } from '@/app/FromTypes'
import useGetUserData from '@/app/hooks/useGetUserData'
import { Ionicons } from '@expo/vector-icons'
import useDeleteClass from '@/app/hooks/useDeleteClass'

import { BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'

// import useAuthContext from '@/app/context/AuthContext'
const index = () => {

  const addClass3d: any = require('../../../assets/images/addClass3d.png')

  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()
  const { loading, loadUserData } = useGetUserData()
  // const { user, token } = useAuthContext() // for test only  
  const { classes, setSelectedClass } = useClassContext()
  const [loader, setLoader] = useState(loading || false)
  const [reloadCode, setReloadCode] = useState(200)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [classToDelete, setClassToDelete] = useState<any>({})
  const { loading2, deleteClassById } = useDeleteClass()

  const [showMenu, setShowMenu] = useState(false)

  // console.log("-------------------------------------------")
  // console.log("HOME User : ", user)
  // console.log("HOME Token : ", token)
  // console.log("HOME Classes : ", classes)
  // console.log("-------------------------------------------")

  const handleClick = (classData: ClassTypeFormData) => {
    setSelectedClass(classData)
    // console.log(classData)
    router.push("/(tabs)/home/classMenu")
  }

  const handlePopUp = async () => {
    // console.log("Delete Pressed")
    // console.log("-------------------------------------------")
    // classToDelete && console.log("Class to delete : ", classToDelete?._id,)
    // console.log("-------------------------------------------")
    // if (await deleteClassById(classToDelete?._id)){
    //   console.log("Class Deleted Successfully !!!")
    // }
    // else{
    //   console.log("Problem in class delete")
    // }

    // console.log("classIdTo delete : ", classToDelete?._id)

    setShowMenu(false)
    setShowConfirm(true)
  }

  const handleLongPress = (event: any, classData: any) => {
    setClassToDelete(classData)
    setMenuPosition({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY - 50 })
    setShowMenu(true)
    // console.log("------------------------------")
    // console.log("--- btn pressed at : ", event.nativeEvent.pageX, event.nativeEvent.pageY)
    // console.log("------------------------------")
  }

  useEffect(() => {
    (async () => {
      const code = await loadUserData()
      // console.log("Status Code  in Index : ", code) 
      if (code === 200) {
        setLoader(false)
      }
      else if (code === 404) {
        setLoader(true)
        setReloadCode(404)
      }
      else if (code === 401) {
        setLoader(false)
        router.replace("/Login")
      }
    })()

  }, [reloadCode])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp()
        return true
      }

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      )

      return () => subscription.remove()
    }, [])
  )


  return (
    <SafeAreaProvider>

      <SafeAreaView
        edges={['top', 'bottom']}
        className='w-full dark:bg-[#061526] bg-[#3A87BD] flex justify-start items-center'
      >
        <HomeContainer
          headerLabel={"Home"}
          btnLabel={"Add"}
          btnAction={() => router.push("/home/addClass")}
          showButton={true}
          btnImageSource={addClass3d}
        >
          <FlatList
            data={classes}
            keyExtractor={(item) => item._id}
            extraData={classes}
            ListEmptyComponent={
              <View className='w-full h-fit p-1 flex justify-center items-start'>
                <Text className='font-bold dark:text-white text-black text-lg'>No class data available.</Text>
              </View>
            }
            renderItem={

              (

                { item }
              ) =>
                <ClassDataCard
                  popUpAction={handlePopUp}
                  onCloseMenu={() => setShowMenu(false)}
                  onLongPressAction={(e) => handleLongPress(e, item)}
                  showMenu={showMenu}
                  showMenuAt={menuPosition}
                  onPressAction={() => handleClick(item)}
                  className={item.name}
                  subject={item.subject}
                  roomNo={item.roomNo}
                  time={item.timeTable}
                  totalClass={item.totalClass}
                  attendanceSize={item.attendance.length}
                />
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          />

        </HomeContainer>


        <Modal
          isVisible={showConfirm}
          onBackdropPress={() => setShowConfirm(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.15}
          animationInTiming={300}
          animationOutTiming={250}
          style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
        >
          <View className="w-[95%] h-[50%] flex gap-3 justify-center items-center pb-10">

            {/* Header */}
            <Text className=" bg-[#c91919] text-white text-2xl px-6 py-4 rounded-tl-[35px] rounded-tr-[35px] font-bold">
              !! Warning !!
            </Text>

            {/* Content */}
            <View className="mt-2 flex-1 items-center bg-[#c91919]  rounded-s-[35px] rounded-e-[30px] shadow-lg p-4 px-2 py-4">
              <View className="px-2 pb-6 justify-center items-center">

                <Text className="text-lg text-white font-semibold">Data to be deleted</Text>
                <Text className="text-md text-white/80">
                  All your Classes ,students and attendance records, settings, attachments and backups associated with this account will be permanently removed and cannot be recovered.
                </Text>

                <Text className="text-white font-bold text-lg mb-3">This action is irreversible.</Text>
                <Text className="text-white/90 mb-6">
                  If you proceed, your class data will be permanently deleted.
                </Text>

              </View>

            </View>
            <View className="flex-row justify-between gap-4">
              <Pressable
                onPress={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-full bg-[#94b8d6] items-center"
              >
                <Text className="text-white font-bold">Cancel</Text>
              </Pressable>

              <Pressable
                onPress={async () => {
                  try {
                    // await deleteUser()
                    // setLoader(true)
                    await deleteClassById(classToDelete?._id)
                    setShowConfirm(false)
                    // setLoader(false)
                    // router.replace("/Login")
                  } catch (err) {
                    Toast.show({
                      type: "error",
                      text1: "There is something wrong !!"
                    })
                    setShowConfirm(false)
                  }
                }}
                disabled={loading}
                className={`flex-1 py-3 rounded-full items-center ${loading ? 'bg-[#9e2a2a]/60' : 'bg-[#c91919]'}`}
              >
                <Text className="text-white font-bold">{loading ? 'Deleting...' : 'Delete Group'}</Text>
              </Pressable>
            </View>
            {/* Next Button */}


          </View>

        </Modal>

        {
          loader && (
            <View className='w-full h-full absolute bg-[#dae4e8e2] flex justify-center items-center gap-4'>
              {
                reloadCode === 404 ? <View className='w-full h-full flex flex-col gap-6 justify-center items-center'>
                  <Text>Something Wrong</Text>
                  <Pressable onPress={() => setReloadCode(200)}>
                    <Text className='w-fit h-fit bg-gray-500 px-5 py-2 rounded-[25px]'>
                      <Ionicons name='reload' color={"black"} size={24} />
                    </Text>
                  </Pressable>
                </View> : <View>
                  <Text>Loading Your Data ....</Text>
                  <ActivityIndicator />
                </View>
              }
            </View>
          )
        }
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default index
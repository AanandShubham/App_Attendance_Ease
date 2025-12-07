import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import HomeContainer from '@/app/components/HomeContainer'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ClassDataCard from '@/app/components/ClassDataCard'
import addClass3d from '../../../assets/images/addClass3d.png'
import useAuthContext from '@/app/context/AuthContext'
import useClassContext from '@/app/context/ClassContext'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import { ClassTypeFormData } from '@/app/FromTypes'
import useGetUserData from '@/app/hooks/useGetUserData'
import { Ionicons } from '@expo/vector-icons'

const index = () => {
  const router = useRouter()
  const { loading, loadUserData } = useGetUserData()
  const { user, token } = useAuthContext() // for test only  
  const { classes, setSelectedClass } = useClassContext()
  const [loader, setLoader] = useState(loading || false)
  const [reloadCode, setReloadCode] = useState(200)
  const [showMenu, setShowMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [classToDelete, setClassToDelete] = useState<any>({})

  console.log("-------------------------------------------")
  console.log("HOME User : ", user)
  console.log("HOME Token : ", token)
  console.log("HOME Classes : ", classes)
  console.log("-------------------------------------------")

  const handleClick = (classData: ClassTypeFormData) => {
    setSelectedClass(classData)
    // console.log(classData)
    router.push("/(tabs)/home/classMenu")
  }

  const handlePopUp = () => {
    console.log("Delete Pressed")
    console.log("-------------------------------------------")
    classToDelete && console.log("Class to delete : ", classToDelete?._id,)
    console.log("-------------------------------------------")
    setShowMenu(false)
  }

  const handleLongPress = (event: any, classData: any) => {
    setClassToDelete(classData)
    setMenuPosition({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY - 50 })
    setShowMenu(true)
    console.log("------------------------------")
    console.log("--- btn pressed at : ", event.nativeEvent.pageX, event.nativeEvent.pageY)
    console.log("------------------------------")
  }

  useEffect(() => {
    (async () => {
      const code = await loadUserData()
      console.log("Status Code  in Index : ", code)
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

  return (
    <SafeAreaProvider>

      <SafeAreaView
        edges={['top', 'bottom']}
        className='w-full h-[100vh] dark:bg-[#061526] bg-[#3A87BD] flex justify-start items-center'
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
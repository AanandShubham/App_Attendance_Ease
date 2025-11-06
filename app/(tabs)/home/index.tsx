import React from 'react'
import { useRouter } from 'expo-router'
import HomeContainer from '@/app/components/HomeContainer'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ClassDataCard from '@/app/components/ClassDataCard'
import addClass3d from '../../../assets/images/addClass3d.png'
import useAuthContext from '@/app/context/AuthContext'
import useClassContext from '@/app/context/ClassContext'
import { FlatList, GestureResponderEvent, View } from 'react-native'
import { ClassTypeFormData } from '@/app/FromTypes'

const index = () => {
  const router = useRouter()

  const { user, token } = useAuthContext()
  const { classes,setSelectedClass } = useClassContext()

  console.log("-------------------------------------------")
  console.log("HOME User : ", user)
  console.log("HOME Token : ", token)
  console.log("HOME Classes : ", classes);
  console.log("-------------------------------------------")

  // const dataCard = [
  //   {
  //     id: 1,
  //     name: "mohan"
  //   },
  //   {
  //     id: 2,
  //     name: "sohan"
  //   }, {
  //     id: 3,
  //     name: "rohan"
  //   }, {
  //     id: 4,
  //     name: "mohanlal"
  //   },
  // ]

  const handleClick = (classData:ClassTypeFormData)=>{
    setSelectedClass(classData)
    router.push("/(tabs)/home/classMenu")
    console.log(classData)
  }

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

          {/* <ClassDataCard onPressAction={() => { router.push("/home/classMenu") }} />
          <ClassDataCard />
          <ClassDataCard />
          <ClassDataCard />
          <ClassDataCard />
          <ClassDataCard /> */}



          <FlatList
            data={classes}
            keyExtractor={(item) => item._id}
            extraData={classes}
            renderItem={
              (
                { item, index }
              ) =>
                <ClassDataCard
                  onPressAction={()=>handleClick(item)}
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

          {/* <FlatList
            data={dataCard}
            extraData={item => item.id}
            renderItem={({ item,index }) =>
              <View className='w-full h-fit bg-sky-400 p-2'>
                <Text>id : {item.id}</Text>
                <Text>name : {item.name}</Text>
              </View>
            }
          /> */}


        </HomeContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default index
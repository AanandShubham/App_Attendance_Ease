import React from 'react'
import { useRouter } from 'expo-router'
import HomeContainer from '@/app/components/HomeContainer'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ClassDataCard from '@/app/components/ClassDataCard'
import addClass3d from '../../../assets/images/addClass3d.png'
import useAuthContext from '@/app/context/AuthContext'
import useClassContext from '@/app/context/ClassContext'

const index = () => {
  const router = useRouter()

  const {user,token} = useAuthContext()
  const {classes} = useClassContext()
  console.log("-------------------------------------------")
  console.log("HOME User : ",user)
  console.log("HOME Token : ",token)
  console.log("HOME Classes : ",classes);
  console.log("-------------------------------------------")
  

  return (
    <SafeAreaProvider>

      <SafeAreaView 
      edges={['top', 'bottom']}
       className='w-full h-[100vh] dark:bg-[#061526] bg-[#3A87BD] flex justify-start items-center'
       >
        <HomeContainer
         headerLabel={"Home"} 
         btnLabel={"Add"}
         btnAction={()=>router.push("/home/addClass")}
         showButton={true}
         btnImageSource={addClass3d}
         >
          
          <ClassDataCard onPressAction={()=>{router.push("/home/classMenu")}} />
          <ClassDataCard />
          <ClassDataCard />
          <ClassDataCard />
          <ClassDataCard />
          <ClassDataCard />


        </HomeContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default index
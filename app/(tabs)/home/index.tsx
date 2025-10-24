import React from 'react'
import { useRouter } from 'expo-router'
import HomeContainer from '@/app/components/HomeContainer'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ClassDataCard from '@/app/components/ClassDataCard'
import addClass3d from '../../../assets/images/addClass3d.png'

const index = () => {
  const router = useRouter()
  return (
    <SafeAreaProvider>

      <SafeAreaView 
      edges={['top', 'bottom']}
       className='w-full h-full bg-[#3A87BD] flex justify-start items-center'
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
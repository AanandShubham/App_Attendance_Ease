import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import UniqueButton from './UniqueButton'
type baseContainerProps = {
  children: React.ReactNode,
  styleClass?: String,
  headerLabel?: String,
  btnLabel?: String,
  btnAction?: () => void,

}
const HomeContainer: React.FC<baseContainerProps> = (
  {
    children,
    styleClass = "",
    headerLabel,
    btnLabel = "",
    btnAction = () => { console.log("addBtnClicked") }
  }
) => {

  return (
    <View className='w-full h-[88vh] p-2  relative flex  justify-start items-center'>
      <View className='w-[95vw] h-full  bg-[#e9eff6e8]   flex justify-start items-center  rounded-tl-[10px] rounded-tr-[10px]
      rounded-br-[80px] rounded-bl-[10px]  border border-[#0C5AA2] p-4 '>
        <Text
          style={{
            textShadowColor: '#000',
            textShadowOffset: { width: 2, height: 3 },
            textShadowRadius: 3,
          }}

          className='w-[70%] h-fit p-1  text-2xl text-white text-center font-bold rounded-md 
          absolute top-[-19px] bg-[#3A87BD] rounded-bl-[20px] rounded-tr-[20px]   outline-black rounded-tl-[5px] rounded-br-[5px]  shadow-xl elevation-sm shadow-&lsqb;#1B64A8&rsqb;'
        >
          {headerLabel}
        </Text>

        <ScrollView
          className='w-full flex-1 pb-6'
          contentContainerClassName='flex flex-col gap-4 pt-4  justify-start items-center'
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        {/* w-[80px] h-[70px]  -rotate-[186.90deg] right-[-6px] bottom-[3px] */}

        <UniqueButton
        btnAction={btnAction}
          btnStyleClass={"w-[80px] h-[70px]  -rotate-[5.7deg] right-[-5px] bottom-[3px]"}
          itemStyleClass={"rotate-[6deg]"}
          label={btnLabel} />




      </View>
    </View>
  )
}

export default HomeContainer

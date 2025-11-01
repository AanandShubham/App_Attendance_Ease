import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import UniqueButton from './UniqueButton'
import { Animated } from 'react-native'

type baseContainerProps = {
  children: React.ReactNode,
  styleClass?: String,
  headerLabel?: String,
  btnLabel?: String,
  btnAction?: () => void,
  showButton?: Boolean,
  shakeAnim?: Animated.Value,
  btnImageSource?: any,

}
const HomeContainer: React.FC<baseContainerProps> = (
  {
    children,
    styleClass = "",
    headerLabel,
    btnLabel = "",
    btnAction = () => { console.log("addBtnClicked") },
    showButton = false,
    shakeAnim = new Animated.Value(0),
    btnImageSource = "",

  }
) => {

  return (
    <View className='w-full h-full dark:bg-[#061526] bg-white p-2 py-6 relative flex  justify-start items-center'>
      <View className={`w-[95vw] h-[84.8vh]  dark:bg-[#061526] bg-[#e9eff6e8]   flex justify-start items-center  rounded-tl-[10px] rounded-tr-[10px]
      ${showButton ? "rounded-br-[80px]" : "rounded-br-[10px]"}  rounded-bl-[10px]  border-2 dark:border-[#17242d] border-[#0C5AA2] p-4 py-6 `}>
        <Text
          style={{
            textShadowColor: '#000',
            textShadowOffset: { width: 2, height: 3 },
            textShadowRadius: 3,
          }}

          className='w-[70%] h-fit p-1  text-2xl text-white text-center font-bold rounded-md 
          absolute top-[-19px] dark:bg-[#183448] bg-[#3A87BD] rounded-bl-[20px] rounded-tr-[20px] dark:outline-red-900   outline-black rounded-tl-[5px] rounded-br-[5px]  shadow-xl elevation-sm shadow-&lsqb;#1B64A8&rsqb;'
        >
          {headerLabel}
        </Text>

        <ScrollView
          className='w-full flex-1 pb-6'
          contentContainerClassName='flex flex-col gap-4 p-1  justify-start items-center'
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        {/* w-[80px] h-[70px]  -rotate-[186.90deg] right-[-6px] bottom-[3px] */}

        {showButton && <UniqueButton
          btnImageSource={btnImageSource}
          shakeAnim={shakeAnim}
          btnAction={btnAction}
          btnStyleClass={"w-[80px] h-[70px]  -rotate-[5.7deg] right-[-5px] bottom-[3px]"}
          itemStyleClass={"rotate-[6deg]"}
          label={btnLabel}
        />
        }




      </View>
    </View>
  )
}

export default HomeContainer

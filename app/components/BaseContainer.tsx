import { View, Text } from 'react-native'
import React from 'react'
import UniqueButton from './UniqueButton'
import { Animated } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type baseContainerProps = {
    children: React.ReactNode,
    styleClass?: String,
    headerLabel?: String,
    btnLabel?: String,
    btnAction?: () => void,
    shakeAnim?: Animated.Value

}
const BaseContainer: React.FC<baseContainerProps> = (
    {
        children,
        styleClass,
        headerLabel,
        btnLabel = "Add",
        btnAction,
        shakeAnim
    }
) => {
    return (
        <KeyboardAwareScrollView

            className='w-full h-[60vh] dark:bg-[#061526] bg-white'
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 30,
            }}

            enableOnAndroid={true}
            extraScrollHeight={40}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>

            {/* <View className='w-full h-full  relative bg-white flex  justify-center items-center'> */}
           
            <View className='w-[90vw] -mt-[40px] h-fit dark:bg-[#020b148a]  bg-[#e9eff6e8] relative flex justify-evenly items-center rounded-tl-[20px] rounded-tr-[80px] rounded-bl-[80px] rounded-br-[20px]  border-2 dark:border-[#17242d] border-[#0C5AA2] p-4 '>
                <Text
                    style={{
                        textShadowColor: '#000',
                        textShadowOffset: { width: 2, height: 3 },
                        textShadowRadius: 3,
                    }}

                    className='w-[70%] h-fit p-1  text-2xl text-white text-center font-bold rounded-md 
                     absolute  top-[-19px] dark:bg-[#183448] bg-[#3A87BD] rounded-bl-[20px] rounded-tr-[20px]   outline-black rounded-tl-[5px] rounded-br-[5px]  shadow-xl elevation-sm shadow-[#3A87BD]'>
                    {headerLabel}
                </Text>

                <View className={`w-full ${styleClass} flex flex-col gap-9  p-8 py-10 justify-evenly items-center`}>
                    {children}
                </View>

                <UniqueButton
                    shakeAnim={shakeAnim}
                    btnAction={btnAction}
                    btnStyleClass={"w-[90px] h-[80px]  rotate-[41.60deg]  bottom-[-40.20px]"}
                    itemStyleClass={"-rotate-[40deg] text-[20px] text-white font-bold "}
                    label={btnLabel}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default BaseContainer

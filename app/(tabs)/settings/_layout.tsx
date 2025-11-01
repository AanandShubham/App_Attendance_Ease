import { Stack } from "expo-router"

const settingsStackLayout = ()=>{
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}}/>
            <Stack.Screen name="profile" options={{headerShown:false}}/>
        </Stack>
    )
}

export default settingsStackLayout
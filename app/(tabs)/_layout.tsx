import { Stack, Tabs } from "expo-router"

const TabsLayout = () => {
    return (
        <Tabs >
            <Tabs.Screen
                name="index"
                
                options={{ title: "Home", headerShown: false }}

            />

            <Tabs.Screen
                name="settings"
                options={{ title: "Settings", headerShown: false }}
            />
        </Tabs>
    );
}

export default TabsLayout 
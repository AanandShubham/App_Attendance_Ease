import { Tabs } from "expo-router"
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#3A87BD', // 💡 Your color here
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarActiveTintColor: '#0D1164',
                tabBarInactiveTintColor: '#fff',
            }}

        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),

                }}

            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}

export default TabsLayout 
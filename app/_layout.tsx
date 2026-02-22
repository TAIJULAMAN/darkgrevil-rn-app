import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#000000' },
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="home" />
                <Stack.Screen name="watch" />
                <Stack.Screen name="vote" />
                <Stack.Screen name="results" />
            </Stack>
        </GestureHandlerRootView>
    );
}

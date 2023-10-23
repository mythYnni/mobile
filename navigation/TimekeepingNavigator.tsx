import React, { useContext, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthContext from '../config/auth/AuthContext';
import BottomTabsNavigation from './bottomTabsNavigation';
import TimekeepingScreen from '../screens/componentScreen/TimekeepingScreen';
import MapScreen from '../screens/componentScreen/mapScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function TimekeepingNavigator() {
    const { state } = useContext(AuthContext);

    return (
        <Stack.Navigator initialRouteName="Timekeeping">
            <Stack.Screen name="Timekeeping" 
                options={{
                    title: 'Địa Điểm Chấm Công',
                }}
                component={TimekeepingScreen} 
            />
            <Stack.Screen
                name="Map"
                component={MapScreen}
                options={({ route }) => ({
                  headerShown: true,
                  title: 'Google Map',
                })} 
            />
        </Stack.Navigator>
    )
};
import { View, Text, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { themeColors } from '../theme'
import FlashMessage from 'react-native-flash-message';
import DawerNavigator from './drawerNavigator';
import AuthContext from '../config/auth/AuthContext';
import BottomTabsNavigation from './bottomTabsNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import CheckTimekeepingScreen from '../screens/componentScreen/checkTimekeepingScreen';

const Stack = createNativeStackNavigator();

export default function AppHomeNavigation() {
    const { state } = useContext(AuthContext)

    return (
        <>
            <Stack.Navigator initialRouteName="AppHomeTime">
                <Stack.Screen name="AppHomeTime" options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="CheckTimekeeping" 
                options={{ 
                    headerShown: true,
                    title: 'Bảng Công',
                }}
                component={CheckTimekeepingScreen} />
            </Stack.Navigator>
        </>
    )
};
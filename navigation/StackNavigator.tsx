import { View, Text, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState} from 'react'
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

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    const { state } = useContext(AuthContext)

    return (
        <>
            {state._id != null ? (
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen name="Home" options={{ headerShown: false }} component={BottomTabsNavigation} />
                    <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen name="Home" options={{ headerShown: false }} component={BottomTabsNavigation} />
                    <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                    <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
                </Stack.Navigator>
            )}
        </>
    )
};
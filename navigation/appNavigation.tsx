import { View, Text, StatusBar} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { themeColors } from '../theme'
import FlashMessage from 'react-native-flash-message';
import BottomTabsNavigation from './bottomTabsNavigation';
import StackNavigator from './StackNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={themeColors.bg} />
            {/* <StatusBar hidden={true} /> */}
            <StackNavigator/>

            <FlashMessage position="top" />
        </NavigationContainer>
    );
};
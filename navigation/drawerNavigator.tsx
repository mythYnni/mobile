import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabsNavigation from './bottomTabsNavigation';
import { COLORS } from '../theme/color';
import ProfileScreen from '../screens/componentScreen/profileScreen';
import TimekeepingScreen from '../screens/componentScreen/TimekeepingScreen';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const DawerNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" 
                component={ProfileScreen}
                options={{
                    title: 'Thông Tin Cá Nhân',
                    headerStyle: {
                        
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export default DawerNavigator;
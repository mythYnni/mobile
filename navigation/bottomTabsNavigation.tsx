import { View, Text, StatusBar, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimekeepingScreen from '../screens/componentScreen/TimekeepingScreen';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import ProfileScreen from '../screens/componentScreen/profileScreen';
import { COLORS } from '../theme/color';
import Icon from 'react-native-vector-icons/AntDesign'
import DawerNavigator from './drawerNavigator';
import TimekeepingNavigator from './TimekeepingNavigator';
import AppHomeNavigation from './appHomeNavigation';

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigation() {
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            initialRouteName='HomeTabNavigator'
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: COLORS.dark,
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: COLORS.primary,
            }}>
            <Tab.Screen name="HomeTabNavigator"
                component={AppHomeNavigation}
                options={{
                    title: 'Trang Chủ',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen name="TimekeepingStack" 
                component={TimekeepingNavigator}
                options={{
                    title: 'Chấm Công',
                    tabBarIcon: ({ color }) => (
                        <Icon name="scan1" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen name="DawerProfile" component={DawerNavigator}
                options={{
                    title: 'Thông Tin Cá Nhân',
                    headerShown: false,
                    headerStyle: {
                        
                    },
                    tabBarIcon: ({ color }) => (
                        <Icon name="contacts" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        borderTopWidth: 0,
        height: 60,
    },
});
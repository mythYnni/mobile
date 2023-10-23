import 'react-native-gesture-handler';
import React, { useEffect, useReducer } from 'react';
import AppNavigation from './navigation/appNavigation';
import AuthContext, { authReducer, initialState } from './config/auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import BottomTabsNavigation from './navigation/bottomTabsNavigation';
import { PaperProvider } from 'react-native-paper';
import { format } from 'date-fns';
import axios from 'axios';
import { GET_TIME_WHERE } from './config/urlAPI';

export default function App() {
  //ẩn thanh statu-bar
  // StatusBar.setHidden(true);

  const [state, dispatch] = useReducer(authReducer, initialState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser: any) => {
      // console.log(foundUser);
      // const userId = String(foundUser._id);
      try {
        // Lưu Thông Tin vào AsyncStorage
        await AsyncStorage.setItem('User', JSON.stringify(foundUser));
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', payload: foundUser });
    },
    signUp: async (foundUser: any) => {
      try {
        // Lưu Thông Tin vào AsyncStorage
        await AsyncStorage.setItem('User', JSON.stringify(foundUser));
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'SIGNUP', payload: foundUser });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('User');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    updateFile: async (foundUser: any) => {
      try {
        const currentValue = await AsyncStorage.getItem('User');
        if (currentValue !== null) {
          JSON.parse(currentValue).avatar = foundUser;
          // console.log("avass ===>>>> " +  JSON.parse(currentValue).avatar);
          await AsyncStorage.setItem('User', JSON.stringify(currentValue));
        }
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'UPDATE_FILE', payload: foundUser });
    },
    updateProfile: async (foundUser: any) => {
      // console.log(foundUser);
      // const userId = String(foundUser._id);
      try {
        const currentValue = await AsyncStorage.getItem('User');
        if (currentValue !== null) {
          JSON.parse(currentValue).fullName = foundUser.fullName;
          JSON.parse(currentValue).email = foundUser.email;
          JSON.parse(currentValue).phone = foundUser.phone;
          JSON.parse(currentValue).address = foundUser.address;
          JSON.parse(currentValue).birthday = foundUser.birthday;
          // console.log("avass ===>>>> " +  JSON.parse(currentValue).avatar);
          await AsyncStorage.setItem('User', JSON.stringify(currentValue));
        }
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'UPDATE_PROFILE', payload: foundUser });
    },

    timekeeping_On: async (foundUser: any) => {
      // console.log("foundUser:" + foundUser);
      dispatch({ type: 'TIMEKEEPING_ON', payload: foundUser });
    },

    timekeeping_Off: async () => {
      // console.log("foundUser:" + foundUser);
      dispatch({ type: 'TIMEKEEPING_OFF' });
    },

  }), []);


  useEffect(() => {
    setTimeout(async () => {
      var user: any = null;
      try {
        user = await AsyncStorage.getItem('User');
      } catch (e) {
        console.log("useEffect =====>>> " + e);
      }
      dispatch({ type: 'RETRIEVE_USER', payload: JSON.parse(user) });
      
    }, 1000);
    // AsyncStorage.removeItem('User');

  }, []);


  return (
    <PaperProvider>
      <AuthContext.Provider value={{ state, ...authContext }}>
        <AppNavigation />
      </AuthContext.Provider>
    </PaperProvider>
  );
}
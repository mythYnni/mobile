import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export const initialState: any = {
    _id: null,
    fullName: null,
    email: null,
    phone: null,
    avatar: null,
    address: null,
    birthday: null,
    timekeeping:
    {
        _id: null,
        userId: null,
        address: null,
        imageUser: null,
        start_Time: null,
        end_Time: null,
        total_Work: 0
    }
};
export const AuthContext = React.createContext<any>(initialState);

export default AuthContext;

export const authReducer = (state: any, action: any) => {
    // console.log(state);
    // console.log(action);
    switch (action.type) {
        case 'RETRIEVE_USER':
            if (action.payload) {
                return {
                    ...state,
                    _id: action.payload._id,
                    fullName: action.payload.fullName,
                    email: action.payload.email,
                    phone: action.payload.phone,
                    avatar: action.payload.avatar,
                    address: action.payload.address,
                    birthday: action.payload.birthday
                };
            } else {
                return state;
            }
        case 'LOGIN':
            return {
                ...state,
                _id: action.payload._id,
                fullName: action.payload.fullName,
                email: action.payload.email,
                phone: action.payload.phone,
                avatar: action.payload.avatar,
                address: action.payload.address,
                birthday: action.payload.birthday
            };
        case 'LOGOUT':
            return {
                ...state,
                _id: null,
                fullName: null,
                email: null,
                phone: null,
                avatar: null,
                address: null,
                birthday: null
            };
        case 'SIGNUP':
            return {
                ...state,
                _id: action.payload._id,
                fullName: action.payload.fullName,
                email: action.payload.email,
                phone: action.payload.phone,
                avatar: action.payload.avatar,
                address: action.payload.address,
                birthday: action.payload.birthday,
                timekeeping:
                {
                    _id: null,
                    userId: null,
                    address: null,
                    imageUser: null,
                    start_Time: null,
                    end_Time: null,
                    total_Work: 0
                }

            };
        case 'UPDATE_FILE':
            return {
                ...state,
                avatar: action.payload,
            };

        case 'UPDATE_PROFILE':
            return {
                ...state,
                fullName: action.payload.fullName,
                email: action.payload.email,
                phone: action.payload.phone,
                address: action.payload.address,
                birthday: action.payload.birthday
            };

        case 'TIMEKEEPING_ON':
            return {
                ...state,
                timekeeping:
                {
                    _id: action.payload?._id || null,
                    userId: action.payload?.userId,
                    address: action.payload?.address,
                    imageUser: action.payload?.imageUser,
                    start_Time: action.payload?.start_Time,
                    end_Time: action.payload?.end_Time,
                    total_Work: action.payload?.total_Work
                }
            };

        case 'TIMEKEEPING_OFF':
            return {
                ...state,
                timekeeping:
                {
                    _id: null,
                    userId: null,
                    address: null,
                    imageUser: null,
                    start_Time: null,
                    end_Time: null,
                    total_Work: 0
                }
            };

        default:
            return state;
    }
};

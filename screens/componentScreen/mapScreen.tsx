import { View, Text, Image, PermissionsAndroid, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import MapView from 'react-native-maps';
import { Marker, Callout, Circle } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Button } from 'react-native-paper';
import AuthContext from '../../config/auth/AuthContext';
import { showError, showSuccess, showWarning } from '../../message/message';
import MapViewDirections from 'react-native-maps-directions';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { GET_TIME_WHERE, TIMEKEEPING_OFF, TIMEKEEPING_ON, UPLOAD_TIME } from '../../config/urlAPI';
import axios from 'axios';
import { format } from 'date-fns';
import publicIPv4 from 'react-native-public-ip';


export default function MapScreen({ route }: any) {
    const navigation: any = useNavigation();
    const { item } = route.params;
    const { state, timekeeping_On, timekeeping_Off } = useContext(AuthContext);
    const [currentLocation, setCurrentLocation] = useState(
        null as { latitude: number; longitude: number } | null
    );
    const [checkMap, setCheckMap] = useState(true);

    //Tính Khoảng Cách
    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Bán kính trái đất tính bằng km
        const dLat = (lat2 - lat1) * (Math.PI / 180); // Chuyển đổi độ sang radian
        const dLon = (lon2 - lon1) * (Math.PI / 180); // Chuyển đổi độ sang radian
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; //Khoảng cách tính bằng km
        const distanceInMeters = distance * 1000; //Đổi Sang mét
        return distanceInMeters;
    };

    // Cấp Quyền
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Quyền đối với ứng dụng FastWord',
                    message:
                        'Ứng dụng FastWord Cần Quyền Truy Cập Vào Định Vị Của Bạn ' +
                        'Để Xác Định Vị Trí Của Bạn!.',
                    buttonNeutral: 'Hãy Hỏi Tôi Sau',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Bạn Có Thể Sử Dụng Vị Trí');
            } else {
                console.log('Quyền Vị Trí Bị Từ Chối');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const get_total_Work = (start: string, end: string): any => {
        const [startHour, startMinute, startSecond] = start.split(':').map(Number);
        const [endHour, endMinute, endSecond] = end.split(':').map(Number);

        const startTime = new Date(0, 0, 0, startHour, startMinute, startSecond);
        const endTime = new Date(0, 0, 0, endHour, endMinute, endSecond);

        const workDuration = endTime.getTime() - startTime.getTime();

        const workDurationInSeconds = workDuration / 1000; //chuyển về giây
      
        const workingHours = Math.floor(workDurationInSeconds / 3600); //tính số giờ làm việc bằng cách chia tổng số giây làm việc cho 3600
        const remainingSeconds = workDurationInSeconds % 3600;
        // phần dư sau khi chia tổng số giây làm việc cho 3600. Nó đại diện cho số giây còn lại sau khi đã tính số giờ làm việc.
        const isFullTime = workingHours == 8 && remainingSeconds >= 5400;
        if(workingHours > 8 && remainingSeconds >= 5400){
            const time_check = 1
            return time_check;
        } else if (isFullTime) {
            const time_check = 1
            return time_check;
        } else if (workingHours >=5 && workingHours <=8 && remainingSeconds >= 5400){
            // console.log('pass');
            const workDurationInSeconds = (workDuration / 1000) - remainingSeconds;
            const time = workDurationInSeconds / 28800;
            const time_check = time.toFixed(2);
            // console.log(time_check);
            return time_check;
        } else if (workingHours == 4 && remainingSeconds <= 5400){
            // console.log('pass');
            const workDurationInSeconds = (workDuration / 1000) - remainingSeconds;
            const time = workDurationInSeconds / 28800;
            const time_check = time.toFixed(2); 
            // console.log(time_check);
            return time_check;
        } else {
            const time = workDurationInSeconds / 28800;
            const time_check = time.toFixed(2); 
            return time_check;
        }
    }

    const turnOnCamera = async (CheckOut: any) => {

        const formData = new FormData();

        const options: any = {
            title: 'Camera',
            allowsEditing: true,
            cameraType: 'back',
            maxWidth: 1000,
            maxHeight: 1000,
            quality: 0.8,
        };

        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Truy Cập Camera Thành Công!");
                const result: any = await launchCamera(options);
                // console.log(result.assets[0].fileName);

                const currentDate = new Date();

                formData.append("uploaded_file", {
                    uri: result.assets[0].uri,
                    name: result.assets[0].fileName,
                    type: result.assets[0].type
                })

                const setting: any = {
                    method: "POST",
                    url: UPLOAD_TIME,
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    responseType: 'json',
                }

                axios(setting).then((res: any) => {
                    // console.log(res.data.TimekeepingFile);
                    if (CheckOut == "Timekeeping_On") {
                        const data = {
                            userId: state._id,
                            imageUser: res.data.TimekeepingFile,
                            timekeeping_Date: format(currentDate, 'yyyy-dd-MM'),
                            address: item.googleMap.address,
                        };

                        axios(setting).then((res: any) => {
                            var message = '';
                            axios.post(TIMEKEEPING_ON, data).then(function (res) {
                                // console.log(res.data.obj_timekeeping);
                                message = res.data.message;
                                const obj = res.data.obj_timekeeping;
                                timekeeping_On(obj);
                                navigation.goBack()
                                showSuccess(message);
                            }).catch(function (error) {
                                showError("Chấm Công Thất Bại");
                                console.log("Timekeeping_On ======>>>>>" + error);
                            });
                        }).catch(function (error) {
                            console.log("Timekeeping_On file ======>>>>>" + error);
                        });
                    } else {
                        const hours = currentDate.getHours();
                        const minutes = currentDate.getMinutes();
                        const seconds = currentDate.getSeconds();
                        const currentTime = hours + ":" + minutes + ":" + seconds;
                        const data = {
                            _id: state.timekeeping._id,
                            userId: state._id,
                            address: item.googleMap.address,
                            imageUser: res.data.TimekeepingFile,
                            start_Time: state.timekeeping.start_Time,
                            end_Time: currentTime,
                            total_Work: get_total_Work(state.timekeeping.start_Time, currentTime),
                        };

                        // console.log(data)

                        axios(setting).then((res: any) => {
                            var message = '';
                            axios.post(TIMEKEEPING_OFF, data).then(function (res) {
                                message = res.data.message;
                                timekeeping_Off()
                                navigation.goBack()
                                showSuccess(message);
                            }).catch(function (error) {
                                showError("Chấm Công Thất Bại");
                                console.log("Chấm Công Ra ======>>>>>" + error);
                            });
                        }).catch(function (error) {
                            console.log("Chấm Công Ras ======>>>>>" + error);
                        });
                    }

                }).catch(function (error) {
                    console.log("Lỗi Camera ======>>>>>" + error);
                });

            } else {
                console.log("Truy Cập Camera Thất Bại!");
            }
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        // console.log(state);
        requestCameraPermission();

        //Xử Lý Lấy Vị Trí Cá Nhân
        Geolocation.getCurrentPosition(
            (position) => {
                // console.log(position);
                // console.log(position.coords.longitude);
                // console.log(position.coords.latitude);
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })

                const check_KM_Maps = getDistance(position.coords.latitude, position.coords.longitude, parseFloat(item.googleMap.latitude), parseFloat(item.googleMap.longitude));

                if (check_KM_Maps <= 30) {
                    const currentDate = new Date();
                    const monthNames = [
                        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
                    ];
                    const currentMonth = currentDate.getMonth();
                    const CheckcurrentDate = format(currentDate, 'yyyy-dd-MM')

                    const getTimekeeping = {
                        userId: state._id,
                        month: monthNames[currentMonth],
                        timekeeping_Date : CheckcurrentDate
                    };

                    var obj: any = null;

                    axios.post(GET_TIME_WHERE, getTimekeeping).then(function (res) {
                        // console.log(res);
                        obj = res.data.obj_timekeeping;
                        if (res.data.obj_timekeeping && res.data.obj_timekeeping.total_Work > 0) {
                            setCheckMap(false);
                            showWarning("Hôm Nay Bạn Đã Chấm Công!");
                            timekeeping_Off()
                        } else {
                            setCheckMap(true);
                            timekeeping_On(obj);
                        }
                        // console.log(state);
                    }).catch(function (error) {
                        console.log("Get Timekeeping ======>>>>>" + error);
                    });
                } else {
                    setCheckMap(false);
                    showError("Vị Trí Của Bạn Đang Nằm Ngoài Vị Trí Chấm Công.");
                }
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

    }, []);

    return (
        <SafeAreaView>
            <MapView
                style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'center',

                }}
                initialRegion={{
                    latitude: parseFloat(item.googleMap.latitude),
                    longitude: parseFloat(item.googleMap.longitude),
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {currentLocation && (
                    <Marker
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                        pinColor='blue'
                    >
                        <Callout>
                            <Text>{state.fullName}</Text>
                        </Callout>
                    </Marker>
                )}

                <Marker
                    coordinate={{
                        latitude: parseFloat(item.googleMap.latitude),
                        longitude: parseFloat(item.googleMap.longitude),
                    }}
                    pinColor='red'
                >
                    <Callout>
                        <Text>{item.googleMap.address}</Text>
                    </Callout>
                </Marker>

                {/* {currentLocation && (
                    <MapViewDirections
                        origin={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}
                        destination={{
                            latitude: parseFloat(item.googleMap.latitude),
                            longitude: parseFloat(item.googleMap.longitude),
                        }}
                        apikey= "AIzaSyC_TAIql9cuNt3fP8CUavGkKFPXWy0xkwQ"
                        strokeWidth={3}
                        strokeColor="blue"
                    />
                )} */}

                <Circle
                    center={{
                        latitude: parseFloat(item.googleMap.latitude),
                        longitude: parseFloat(item.googleMap.longitude),
                    }}
                    radius={200}
                    strokeWidth={2}
                    strokeColor="red"
                    fillColor="#ff000057"
                />
            </MapView>
            {
                checkMap ? (
                    <Button
                        style={{
                            width: '50%',
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            alignSelf: 'center',
                            bottom: 25
                        }}
                        icon="camera"
                        mode="contained"
                        onPress={() => turnOnCamera(state.timekeeping.start_Time == null ? "Timekeeping_On" : "Timekeeping_Off")}>
                        {state.timekeeping.start_Time == null ? "Chấm Công Vào" : "Chấm Công Ra"}
                    </Button>
                ) : (<></>)
            }
        </SafeAreaView>
    )
}
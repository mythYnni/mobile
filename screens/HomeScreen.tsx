import { View, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeStyle } from '../styleSheet/HomeStyle'
import { themeColors } from '../theme'
import Icon from 'react-native-vector-icons/AntDesign'
import AuthContext from '../config/auth/AuthContext'
import { useNavigation } from '@react-navigation/native'
import CircularProgress from 'react-native-circular-progress-indicator';
import { Card, Text, IconButton, Avatar, Button } from 'react-native-paper';
import { showSuccess } from '../message/message'
import axios from 'axios'
import { GET_TIME_WHERE_ALL, LOCAHOST } from '../config/urlAPI'


export default function HomeScreen() {
    const navigation: any = useNavigation();
    const { state, signOut } = useContext(AuthContext);
    const [totalWork, setTotalWork] = useState(0);

    const log_out = () => {
        // console.log("signOut");
        signOut();
        navigation.navigate('Welcome');
        showSuccess("Hẹn Gặp Lại");
    }

    useEffect(() => {
        // console.log(state);
        axios.get(GET_TIME_WHERE_ALL("/getALLTimekeeping/", state._id)).then(function (res) {
            setTotalWork(res.data.total);
        }).catch(function (error) {
            console.log("error update user ======>>>>>" + error);
        });
    }, [state]);

    return (
        <SafeAreaView style={[HomeStyle.container]}>
            <View style={[HomeStyle.flexDirection_row, HomeStyle.justifyContent_flex_start, HomeStyle.header]}>
                <View >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={[HomeStyle.button_back, { backgroundColor: "#2b3990" }]}>
                        <Icon size={20} color="white" name='back' />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={[HomeStyle.Welcome_Header_Text]}>VELZON</Text>
                </View>
            </View>
            <View style={[HomeStyle.Home_Header]}>

                <Card style={[HomeStyle.marginHorizontal]}>
                    <Card.Content>
                        <View style={[HomeStyle.Home_Labour]}>
                            <TouchableOpacity onPress={() => navigation.navigate('CheckTimekeeping')}>
                                <CircularProgress
                                    value={totalWork}
                                    radius={80}
                                    maxValue={26}
                                    clockwise={true}
                                    progressValueColor={'#2b3990'}
                                    activeStrokeColor={'#2b3990'}
                                    inActiveStrokeColor={'#2aace2'}
                                    inActiveStrokeOpacity={0.5}
                                    inActiveStrokeWidth={40}
                                    activeStrokeWidth={20}
                                    progressFormatter={(value: number) => {
                                        'worklet';
                                        return value.toFixed(2);
                                    }}
                                />
                            </TouchableOpacity>
                            <View style={[HomeStyle.Home_Labour_View]}>
                                <Text style={[HomeStyle.Home_Labour_Text]} variant="titleLarge">Ngày Công</Text>
                                <Text style={[HomeStyle.Home_Labour_Text_Time]} variant="titleLarge">Công Tháng: 26 Công</Text>
                                <Text style={[HomeStyle.Home_Labour_Text_Time]} variant="titleLarge">Số Giờ: 208 giờ</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                <View style={[]}>
                    <TouchableOpacity onPress={() => navigation.navigate('DawerProfile')}>
                        <Card.Title
                            title={state.fullName}
                            titleStyle={{ fontWeight: 'bold', fontSize: 17, color: 'white' }}
                            rightStyle={{ borderColor: 'red', }}
                            subtitle={state.email}
                            subtitleStyle={{ color: 'white' }}
                            style={[HomeStyle.Card_Google_maps]}
                            left={(props) => <Avatar.Image size={48} source={{ uri: LOCAHOST + (state.avatar) }} />}
                            right={() => <IconButton icon="logout" iconColor='white' size={30} onPress={() => log_out()} />}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[HomeStyle.HomeImage]}>
                <Image
                    source={require('../assets/images/FastWork-3.png')}
                    style={{ width: "100%", height: 300 }}
                />
            </View>
        </SafeAreaView>
    )
}
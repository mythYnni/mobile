import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { TimekeepingStyle } from '../../styleSheet/TimekeepingStyle';
import { HAIPHONG_MAP, HANOI_MAP, HANOI_MAP_USER } from '../../config/urlAPI';
import { FlatList } from 'react-native';


export default function TimekeepingScreen() {
    const navigation: any = useNavigation();

    const List_Timekeeping_Map = [
        { id: '1', title: "Hà Nội", subtitle: "250 Hoàng Quốc Việt", googleMap: HANOI_MAP },
        { id: '2', title: "Hà Nội", subtitle: "Số 25 Ngõ 116 Miếu Đầm - Hà Nội", googleMap: HANOI_MAP_USER },
        { id: '3', title: "Hải Phòng", subtitle: "An Hồng - An Dương - Hải Phòng", googleMap: HAIPHONG_MAP },
    ];

    return (
        <SafeAreaView>
            <View style={[TimekeepingStyle.View_Google_maps]}>
                <FlatList
                    data={List_Timekeeping_Map}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => navigation.navigate('Map', { item })}>
                            <Card.Title
                                title={item.title}
                                subtitle={item.subtitle}
                                style={[TimekeepingStyle.Card_Google_maps]}
                                left={(props) => <Avatar.Icon {...props} icon="google-maps" />}
                                right={(props) => <IconButton {...props} icon="camera-control" onPress={() => navigation.navigate('Map', { item })} />}
                            />
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                />

            </View>
        </SafeAreaView>
    )
}
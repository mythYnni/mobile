import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { WelcomeStyle } from '../styleSheet/WelcomeStyle';
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../config/auth/AuthContext';

export default function WelcomeScreen() {

    const navigation: any = useNavigation();
    const { state, updateFile, loadData } = useContext(AuthContext);

    return (
        <SafeAreaView style={[{ backgroundColor: themeColors.bg }, WelcomeStyle.container]}>

            <View style={[WelcomeStyle.Welcome_Header]}>
                {
                    state._id != null ?
                        (
                            <Text style={[WelcomeStyle.Welcome_Header_Helo_Name]}>
                                <Text style={[WelcomeStyle.font_Helo_Name]}>VELZON Xin Chào: {state.fullName}</Text>
                                {'\n'}
                                <Text>Hãy Bắt Đầu Công Việc Của Bạn Ngay Nào.</Text>
                            </Text>
                        ) : (
                            <Text style={[WelcomeStyle.Welcome_Header_Helo_Names]}>
                                <Text style={[WelcomeStyle.Welcome_Header_Text]}>VELZON.VN</Text>
                                {'\n'}
                                <Text>Giải Pháp Doanh Nghiệp Hiệu Quả Hàng Đầu.</Text>
                            </Text>
                        )}
                <View style={[WelcomeStyle.WelcomeImage]}>
                    <Image
                        source={require('../assets/images/product3-20210904165504.png')}
                        style={{ width: "100%", height: 380}}
                    />
                </View>
                <View style={WelcomeStyle.Welcome_Login}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(state._id != null || state._id != undefined ? 'Home' : 'Login')}
                        style={[{ backgroundColor: themeColors.yield }, WelcomeStyle.Welcome_Button_Login]}>
                        <Text style={[WelcomeStyle.Welcome_Button_Login_Text]}>
                            Bắt Đầu
                        </Text>
                    </TouchableOpacity>
                    {/* {state._id === null || state._id === undefined ? (
                        <View style={[WelcomeStyle.Welcome_SigUp]}>
                            <Text style={[WelcomeStyle.Welcome_SigUp_Text]}>
                                Bạn có sẵn sàng để tạo một tài khoản?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={[{ color: themeColors.yield }, WelcomeStyle.Welcome_SigUp_Text_yellow]}>
                                    Đăng Ký
                                </Text>
                            </TouchableOpacity>
                        </View>) : (<></>)} */}
                </View>
            </View>
        </SafeAreaView>
    );
};



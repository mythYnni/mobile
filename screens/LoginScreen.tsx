import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { LoginStyle } from '../styleSheet/LoginStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { SINGUP, UPLOAD, LOGIN } from '../config/urlAPI';
import { showError, showSuccess } from '../message/message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../config/auth/AuthContext';

export default function LoginScreen() {
  const { signIn } = React.useContext(AuthContext);

  const navigation: any = useNavigation();

  const isValidEmail = (email: any) => {
    // Kiểm tra định dạng email bằng biểu thức chính quy
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  });


  const { email, password } = loginUser;
  const updateState = (data: any) => setLoginUser(() => ({ ...loginUser, ...data }));

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleEnterEmail = () => {
    passwordRef.current?.focus();
  };

  const handleEnterPassword = () => {
    handleLogin();
  };

  const handleLogin = () => {

    setErrors({
      emailError: '',
      passwordError: '',
    });

    // Form validation
    let isValid = true;

    if (!email || !password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: !email ? 'Không Được Để Trống' : '',
        passwordError: !password ? 'Không Được Để Trống' : '',
      }));
      isValid = false;
    }

    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: 'Không Được Để Trống' }));
      isValid = false;
    } else if (!isValidEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: 'Email Không Hợp Lệ' }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordError: 'Không Được Để Trống' }));
      isValid = false;
    } else if (password.length < 6) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordError: 'Mật Khẩu Phải Có Ít Nhất 6 Ký Tự' }));
      isValid = false;
    }

    if (isValid) {
      // console.log(loginUser);
      var message = '';
      axios.post(LOGIN, loginUser).then(function (res) {
        message = res.data.message;
        const currentUser = res.data.user;
        signIn(currentUser);
        navigation.navigate('Home');
        showSuccess(message);
      }).catch(function (error) {
        showError("Email Hoặc Passwork Không Đúng!");
        console.log("error login user ======>>>>>" + error);
      });
    }
  };

  return (
    <View style={[{ backgroundColor: themeColors.bg }, LoginStyle.flex]}>
      <SafeAreaView style={[LoginStyle.flex]}>
        <View style={[LoginStyle.flexDirection_row, LoginStyle.justifyContent_flex_start]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[LoginStyle.button_back, { backgroundColor: themeColors.yield }]}>
            <Icon size={20} color="black" name='back' />
          </TouchableOpacity>
        </View>
        <View style={[LoginStyle.flexDirection_row, LoginStyle.justifyContent_center]}>
          <Image source={require('../assets/images/FastWork-4.png')} style={{ width: '100%', height: 300 }} />
        </View>
      </SafeAreaView>
      <View style={[LoginStyle.background_Color_White]}>
        <View style={[LoginStyle.form_login]}>
          <Text style={[LoginStyle.text_form]}>Email</Text>
          <TextInput style={[LoginStyle.form_button, errors.emailError ? LoginStyle.errButton : null]}
            ref={emailRef}
            placeholder="Email"
            value={email}
            onChangeText={(obj) => updateState({ email: obj })}
            onSubmitEditing={handleEnterEmail}
          />
          {errors.emailError ? <Text style={[LoginStyle.err]}>{errors.emailError}</Text> : null}
          <Text style={[LoginStyle.text_form]}>Mật Khẩu</Text>
          <TextInput style={[LoginStyle.form_button, errors.passwordError ? LoginStyle.errButton : null]} secureTextEntry
            ref={passwordRef}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={(obj) => updateState({ password: obj })}
            onSubmitEditing={handleEnterPassword}
          />
          {errors.passwordError ? <Text style={[LoginStyle.err]}>{errors.passwordError}</Text> : null}
          <TouchableOpacity style={{ alignItems: 'flex-end' }}>
            <Text style={[LoginStyle.forgot_pass]}>Quên Mật Khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{ backgroundColor: themeColors.yield }, LoginStyle.button_Login]} onPress={handleLogin}>
            <Text style={[LoginStyle.text_button_login]}>Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={[LoginStyle.or]}>Or</Text>
        <View style={[LoginStyle.icon_login_or]}>
          <TouchableOpacity style={[LoginStyle.icon_login]}>
            <Image source={require('../assets/icons/google.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity style={[LoginStyle.icon_login]}>
            <Image source={require('../assets/icons/apple.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity style={[LoginStyle.icon_login]}>
            <Image source={require('../assets/icons/facebook.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
        <View style={[LoginStyle.text_sigUp]}>
          <Text style={[{ color: 'gray' }, LoginStyle.fontWeight]}> Bạn có sẵn sàng để tạo một tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[{ color: themeColors.yield }, LoginStyle.fontWeight]}> Đăng Ký</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};
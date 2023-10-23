import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { SigUpStyle } from '../styleSheet/SignUpStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginStyle } from '../styleSheet/LoginStyle';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SINGUP, UPLOAD, LOGIN } from '../config/urlAPI';
import { showError, showSuccess } from '../message/message';
import { showMessage } from 'react-native-flash-message';


export default function SignUpScreen() {

  const navigation: any = useNavigation();
  const [File, setFile] = useState({
    uri: null,
    name: null,
    type: null
  } as { uri: any, name: any, type: any });

  const isValidEmail = (email: any) => {
    // Kiểm tra định dạng email bằng biểu thức chính quy
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [loginUser, setLoginUser] = useState({
    fullName: '',
    email: '',
    avatar: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    fullNameError: '',
    emailError: '',
    avatarError: '',
    passwordError: '',
  });


  const { fullName, email, avatar, password } = loginUser;
  const updateState = (data: any) => setLoginUser(() => ({ ...loginUser, ...data }));

  //Xử Lý Nút Enter
  const fullNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleEnterFullName = () => {
    emailRef.current?.focus();
  }

  const handleEnterEmail = () => {
    passwordRef.current?.focus();
  };

  const handleEnterPassword = () => {
    handleSignUp();
  };

  // Xử Lý Ảnh
  const requestCameraPermission = async () => {
    const options: any = {
      title: 'Select Image',
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 0.8,
      mediaType: 'photo',
      allowsEditing: true,
      cameraType: 'front'
    };

    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Truy Cập Album Thành Công!");
        const result: any = await launchImageLibrary(options);
        // console.log(result.assets[0].uri, result.assets[0].fileName, result.assets[0].type);
        setFile({
          uri: result.assets[0].uri,
          name: result.assets[0].fileName,
          type: result.assets[0].type
        });
        updateState({ avatar: result.assets[0].uri });

      } else {
        console.log("Truy Cập Album Thất Bại!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = () => {

    setErrors({
      fullNameError: '',
      emailError: '',
      avatarError: '',
      passwordError: '',
    });

    // Form validation
    let isValid = true;

    if (!fullName || !email || !password || !File) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullNameError: !fullName ? 'Không Được Để Trống' : '',
        emailError: !email ? 'Không Được Để Trống' : '',
        passwordError: !password ? 'Không Được Để Trống' : '',
        avatarError: 'err'
      }));
      isValid = false;
    }

    if (!fullName) {
      setErrors((prevErrors) => ({ ...prevErrors, fullNameError: 'Không Được Để Trống' }));
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

    if (!avatar) {
      setErrors((prevErrors) => ({ ...prevErrors, avatarError: 'err' }));
      isValid = false;
    }

    if (isValid) {
      const formData = new FormData();

      formData.append("uploaded_file", {
        uri: File?.uri,
        name: File?.name,
        type: File?.type
      })

      const setting: any = {
        method: "POST",
        url: UPLOAD,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        responseType: 'json',
      }
      axios(setting).then((res: any) => {
        var message = '';
        loginUser.avatar = res.data.avatar;
        axios.post(SINGUP, loginUser).then(function (res) {
          message = res.data.message;
          navigation.navigate('Welcome');
          showSuccess(message);
        }).catch(function (error) {
          showError("Đăng Ký Thất Bại!");
          console.log("error create user ======>>>>>" + error);
        });
      }).catch(function (error) {
        console.log("error upload file ======>>>>>" + error);
      });
    }
  };

  return (

    <View style={[{ backgroundColor: themeColors.bg }, SigUpStyle.flex]}>
      <SafeAreaView style={[SigUpStyle.flex]}>
        <View style={[SigUpStyle.flexDirection_row, SigUpStyle.justifyContent_flex_start]}>
          <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={[SigUpStyle.button_back, { backgroundColor: themeColors.yield }]}>
            <Icon size={20} color="black" name='back' />
          </TouchableOpacity>
        </View>
        <View style={[SigUpStyle.flexDirection_row, SigUpStyle.justifyContent_center]}>
          <View style={[SigUpStyle.avatarImage, errors.avatarError ? SigUpStyle.errFile : null]}>
            {!avatar ?
              <Image
                source={require('../assets/images/login.png')}
                style={{ width: '100%', height: '100%', borderRadius: 100, }}
              />
              : <Image
                source={{ uri: avatar }}
                style={{ width: '100%', height: '100%', borderRadius: 100, }} />}

            <TouchableOpacity style={[SigUpStyle.iconFile, { backgroundColor: themeColors.yield }]}
              onPress={requestCameraPermission}
            >
              <Icon size={20} color="black" name='plus' />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View style={[SigUpStyle.background_Color_White]}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={[SigUpStyle.form_SigUp]}>
            <Text style={[SigUpStyle.text_form]}>Họ và Tên</Text>
            <TextInput style={[SigUpStyle.form_button, errors.fullNameError ? SigUpStyle.errButton : null]}
              ref={fullNameRef}
              placeholder="Họ và Tên"
              value={fullName}
              onChangeText={(obj) => updateState({ fullName: obj })}
              blurOnSubmit={false}
              onSubmitEditing={handleEnterFullName}
            />
            {errors.fullNameError ? <Text style={[SigUpStyle.err]}>{errors.fullNameError}</Text> : null}
            <Text style={[SigUpStyle.text_form]}>Email</Text>
            <TextInput style={[SigUpStyle.form_button, errors.emailError ? SigUpStyle.errButton : null]}
              ref={emailRef}
              placeholder="Email"
              value={email}
              onChangeText={(obj) => updateState({ email: obj })}
              onSubmitEditing={handleEnterEmail}
            />
            {errors.emailError ? <Text style={[SigUpStyle.err]}>{errors.emailError}</Text> : null}
            <Text style={[SigUpStyle.text_form]}>Mật Khẩu</Text>
            <TextInput style={[SigUpStyle.form_button, errors.passwordError ? SigUpStyle.errButton : null]} secureTextEntry
              ref={passwordRef}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={(obj) => updateState({ password: obj })}
              onSubmitEditing={handleEnterPassword}
            />
            {errors.passwordError ? <Text style={[SigUpStyle.err]}>{errors.passwordError}</Text> : null}
            <TouchableOpacity style={[{ backgroundColor: themeColors.yield }, SigUpStyle.button_SigUp]} onPress={handleSignUp}>
              <Text style={[SigUpStyle.text_button_SigUp]}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
          <Text style={[SigUpStyle.or]}>Or</Text>
          <View style={[SigUpStyle.icon_SigUp_or]}>
            <TouchableOpacity style={[SigUpStyle.icon_SigUp]}>
              <Image source={require('../assets/icons/google.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <TouchableOpacity style={[SigUpStyle.icon_SigUp]}>
              <Image source={require('../assets/icons/apple.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <TouchableOpacity style={[SigUpStyle.icon_SigUp]}>
              <Image source={require('../assets/icons/facebook.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
          <View style={[SigUpStyle.text_sigUp]}>
            <Text style={[{ color: 'gray' }, SigUpStyle.fontWeight]}> Bạn đã có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[{ color: themeColors.yield }, SigUpStyle.fontWeight]}> Đăng Nhập</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { themeColors } from '../../theme';
import { useNavigation } from '@react-navigation/native'
import { ProfileStyle } from '../../styleSheet/ProfileStyle';
import { SafeAreaView } from 'react-native-safe-area-context'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SINGUP, UPLOAD, LOGIN, getApiUrl_ByID, LOCAHOST } from '../../config/urlAPI';
import { showError, showSuccess } from '../../message/message';
import { showMessage } from 'react-native-flash-message';
import AuthContext from '../../config/auth/AuthContext';
import { format } from 'date-fns';


export default function ProfileScreen() {

    const navigation = useNavigation();
    const { state, updateFile, updateProfile } = useContext(AuthContext);

    const isValidEmail = (email: any) => {
        // Kiểm tra định dạng email bằng biểu thức chính quy
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone: any) => {
        const phoneRegex = /^(0|\+84)[1-9]\d{8}$/;
        return phoneRegex.test(phone);
    };

    const isValidBirthday = (birthday: any) => {
        const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
        return birthdayRegex.test(birthday);
    };
    
    const [profile, setProfile] = useState({
        fullName: state.fullName,
        email: state.email,
        phone: state.phone,
        address: state.address,
        birthday: format(new Date(state.birthday), 'yyyy-dd-MM'),
    });

    const [errors, setErrors] = useState({
        fullNameError: '',
        emailError: '',
        avatarError: '',
        phoneError: '',
        addressError: '',
        birthdayError: '',
    });

    const { fullName, email, phone, address, birthday } = profile;
    const updateState = (data: any) => setProfile(() => ({ ...profile, ...data }));

    //Xử Lý Nút Enter
    const fullNameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const phoneRef = useRef<TextInput>(null);
    const addressRef = useRef<TextInput>(null);
    const birthdayRef = useRef<TextInput>(null);


    const handleEnterFullName = () => {
        emailRef.current?.focus();
    }

    const handleEnterEmail = () => {
        phoneRef.current?.focus();
    };

    const handleEnterPhone = () => {
        addressRef.current?.focus();
    };

    const handleEnterAddress = () => {
        birthdayRef.current?.focus();
    };
    const handleEnterBirthday = () => {
        handleProfile();
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
                const formData = new FormData();

                formData.append("uploaded_file", {
                    uri: result.assets[0].uri,
                    name: result.assets[0].fileName,
                    type: result.assets[0].type
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
                    var fileImage: any = {
                        uri: ''
                    };
                    fileImage.uri = res.data.avatar;

                    var message: any = null;
                    axios.post(getApiUrl_ByID("/update-avatar/", state._id), fileImage).then(function (res) {
                        console.log("SDASDS" + res.data.user.avatar);
                        updateFile(res.data.user.avatar);
                        showSuccess(res.data.message);
                    }).catch(function (error) {
                        showError("Cập Nhật Avatar Thất Bại!");
                        console.log("error create user ======>>>>>" + error);
                    });
                }).catch(function (error) {
                    showError("Cập Nhật Avatar Thất Bại!");
                    console.log("error upload file ======>>>>>" + error);
                });

            } else {
                showError("Không Thể Try Cập Vào Thư Viện Ảnh!");
                console.log("Truy Cập Album Thất Bại!");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleProfile = () => {
        let isValid = true;
        if (!fullName || !email || !phone || !address || !birthday) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                fullNameError: !fullName ? 'Không Được Để Trống' : '',
                emailError: !email ? 'Không Được Để Trống' : '',
                phoneError: !phone ? 'Không Được Để Trống' : '',
                addressError: !address ? 'Không Được Để Trống' : '',
                birthdayError: !birthday ? 'Không Được Để Trống' : '',
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

        if (!phone) {
            setErrors((prevErrors) => ({ ...prevErrors, phoneError: 'Không Được Để Trống' }));
            isValid = false;
        } else if (!isValidPhone(phone)) {
            setErrors((prevErrors) => ({ ...prevErrors, phoneError: 'Phone Không Hợp Lệ' }));
            isValid = false;
        }

        if (!address) {
            setErrors((prevErrors) => ({ ...prevErrors, addressError: 'Không Được Để Trống' }));
            isValid = false;
        }

        if (!birthday) {
            setErrors((prevErrors) => ({ ...prevErrors, birthdayError: 'Không Được Để Trống' }));
            isValid = false;
        } else if (!isValidBirthday(birthday)) {
            setErrors((prevErrors) => ({ ...prevErrors, birthdayError: 'Birthday Không Đúng Định Dạng "YYYY-MM-DD"' }));
            isValid = false;
        }

        if (isValid) {
            console.log(profile);
            axios.post(getApiUrl_ByID("/update-user/", state._id), profile).then(function (res) {
                console.log(res);
                updateProfile(res.data.user);
                showSuccess(res.data.message);
            }).catch(function (error) {
                showError("Cập Nhật Thông Tin Thất Bại!");
                console.log("error update user ======>>>>>" + error);
            });
        }
    }

    useEffect(() => {
        // console.log(state.avatar);
    }, [state]);

    return (
        <View style={[ProfileStyle.flex]}>
            <SafeAreaView style={[ProfileStyle.maginTop]}>
                <View style={[ProfileStyle.flexDirection_row, ProfileStyle.justifyContent_center]}>
                    <View style={[ProfileStyle.avatarImage]}>
                        <Image
                            source={{uri: LOCAHOST + (state.avatar) }}
                            style={{ width: '100%', height: '100%', borderRadius: 100,}} />
                        <TouchableOpacity
                            style={[ProfileStyle.iconFile, { backgroundColor: themeColors.yield }]}
                            onPress={requestCameraPermission}>
                            <Icon size={20} color="black" name='plus' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[ProfileStyle.Profile_Header]}>
                    <Text style={[ProfileStyle.Profile_Header_Text]}>
                        {state.fullName}
                    </Text>
                    <Text style={[ProfileStyle.Profile_Header_Text_email]}>
                        {state.email}
                    </Text>
                </View>
            </SafeAreaView>
            <View style={[ProfileStyle.background_Color_White]}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={[ProfileStyle.form_SigUp]}>
                        <Text style={[ProfileStyle.text_form]}>Họ và Tên</Text>
                        <TextInput style={[ProfileStyle.form_button, errors.fullNameError ? ProfileStyle.errButton : null]}
                            placeholder="Họ và Tên"
                            ref={fullNameRef}
                            value={fullName}
                            onChangeText={(obj) => updateState({ fullName: obj })}
                            onSubmitEditing={handleEnterFullName}
                        />
                        {errors.fullNameError ? <Text style={[ProfileStyle.err]}>{errors.fullNameError}</Text> : null}
                        <Text style={[ProfileStyle.text_form]}>Email</Text>
                        <TextInput style={[ProfileStyle.form_button, errors.emailError ? ProfileStyle.errButton : null]}
                            placeholder="Email"
                            ref={emailRef}
                            value={email}
                            onChangeText={(obj) => updateState({ email: obj })}
                            onSubmitEditing={handleEnterEmail}
                        />
                        {errors.emailError ? <Text style={[ProfileStyle.err]}>{errors.emailError}</Text> : null}
                        <Text style={[ProfileStyle.text_form]}>Phone</Text>
                        <TextInput style={[ProfileStyle.form_button, errors.phoneError ? ProfileStyle.errButton : null]}
                            placeholder="Phone"
                            ref={phoneRef}
                            value={phone}
                            onChangeText={(obj) => updateState({ phone: obj })}
                            onSubmitEditing={handleEnterPhone}
                        />
                        {errors.phoneError ? <Text style={[ProfileStyle.err]}>{errors.phoneError}</Text> : null}
                        <Text style={[ProfileStyle.text_form]}>Địa Chỉ</Text>
                        <TextInput style={[ProfileStyle.form_button, errors.addressError ? ProfileStyle.errButton : null]}
                            placeholder="address"
                            ref={addressRef}
                            value={address}
                            onChangeText={(obj) => updateState({ address: obj })}
                            onSubmitEditing={handleEnterAddress}
                        />
                        {errors.addressError ? <Text style={[ProfileStyle.err]}>{errors.addressError}</Text> : null}
                        <Text style={[ProfileStyle.text_form]}>Ngày Sinh</Text>
                        <TextInput style={[ProfileStyle.form_button, errors.birthdayError ? ProfileStyle.errButton : null]}
                            placeholder="birthday"
                            ref={birthdayRef}
                            onSubmitEditing={handleEnterBirthday}
                            onChangeText={(obj) => updateState({ birthday: obj })}
                            value={birthday}
                        />
                        {errors.birthdayError ? <Text style={[ProfileStyle.err]}>{errors.birthdayError}</Text> : null}
                        <TouchableOpacity style={[{ backgroundColor: themeColors.yield }, ProfileStyle.button_SigUp]} onPress={handleProfile}>
                            <Text style={[ProfileStyle.text_button_SigUp]}>Cập Nhật</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
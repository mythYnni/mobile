import { StyleSheet } from 'react-native';

export const WelcomeStyle = StyleSheet.create({
    container: {
        flex: 1,
    },

    Welcome_Header: {
        flex: 1,
        justifyContent: 'space-around',
        marginVertical: 16,
    },

    Welcome_Header_Text: {
        color: '#ffb500',
        fontWeight: '900',
        fontSize: 32,
        marginHorizontal: 25,
        fontFamily: 'aldhyaksa-personal-use',
        marginVertical: 20,
        textAlign: 'center',
    },

    WelcomeImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 0
    },

    Welcome_Login: {
        marginVertical: 20,
    },

    Welcome_Button_Login: {
        paddingVertical: 12,
        marginHorizontal: 28,
        borderRadius: 20,
    },

    Welcome_Button_Login_Text: {
        fontSize: 24,
        color: '#333',
        fontWeight: '900',
        textAlign: 'center',
    },

    Welcome_SigUp:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },

    Welcome_SigUp_Text: {
        color: 'white',
        fontWeight: '600',
    },

    Welcome_SigUp_Text_yellow:{
        color: 'yellow',
        fontWeight: '600',
        marginHorizontal: 10,
    },

    font_Helo_Name:{
        fontWeight: '900',
        fontSize: 20,
        color: '#ffb500',
    },

    Welcome_Header_Helo_Name: {
        color: 'white',
        fontWeight: '900',
        fontSize: 21,
        marginHorizontal: 25,
        fontFamily: 'aldhyaksa-personal-use',
        marginVertical: 0,
        textAlign: 'center',
    },

    Welcome_Header_Helo_Names: {
        color: 'white',
        fontWeight: '900',
        fontSize: 21,
        marginHorizontal: 25,
        fontFamily: 'aldhyaksa-personal-use',
        marginVertical: 0,
        textAlign: 'center',
    },
});
import { StyleSheet } from 'react-native';

export const LoginStyle = StyleSheet.create({
    flex: {
        flex: 1,
    },

    flexDirection_row:{
        flexDirection: 'row'
    },

    justifyContent_flex_start:{
        justifyContent: 'flex-start'
    },
    
    button_back:{
        padding: 10,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        //lề dọc
        marginVertical: 10,
        //lề ngang
        marginHorizontal: 10,
    },

    justifyContent_center:{
        justifyContent: 'center'
    },

    background_Color_White:{
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50, 
        flex: 1, 
        backgroundColor: 'white', 
        paddingHorizontal: 10, 
        paddingTop: 8
    },

    form_login:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingTop: 25,
    },

    text_form:{
        color: '#000',
        marginLeft: 4,
        fontSize: 18,
        marginVertical: 5,
    },

    form_button:{
        padding: 12, 
        backgroundColor: '#EEEEEE', 
        color: '#000', 
        borderRadius: 20, 
        marginBottom: 3,
        fontSize: 15
    },

    forgot_pass:{
        color: 'gray', 
        marginVertical: 12,
        fontSize: 15
    },

    button_Login:{
        padding: 12, 
        borderRadius: 20
    },

    text_button_login:{
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: '#000'
    },

    or:{
        fontSize: 20,
        color: '#4A5568',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },

    icon_login_or:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginHorizontal: 100,
    },

    icon_login:{
        padding: 5, 
        backgroundColor: '#DDDDDD', 
        borderRadius: 20,
    },

    text_sigUp:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginVertical:30
    },

    fontWeight:{
        fontWeight: '800'
    },

    err:{
        color: 'red',
        marginHorizontal:10
    },

    errButton:{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red', 
    },

});
import { StyleSheet } from 'react-native';

export const ProfileStyle = StyleSheet.create({
    flex: {
        flex: 1
    },

    flexDirection_row:{
        flexDirection: 'row',
    },

    justifyContent_center:{
        justifyContent: 'center',
        marginVertical: 0
    },

    maginTop:{
        marginTop: 20
    },

    avatarImage:{
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#000',
        width: 150, 
        height: 150,
        padding: 1,
        borderRadius: 100,
        position:'relative',
    },

    iconFile:{
        padding: 8,
        borderRadius: 100,
        position:'absolute',
        right: 0,
        bottom: 0,
    },

    Profile_Header:{
        justifyContent: 'space-around',
        marginVertical: 10,
    },

    Profile_Header_Text: {
        color: 'black',
        fontWeight: '900',
        fontSize: 25,
        fontFamily: 'aldhyaksa-personal-use',
        textAlign: 'center',
    },

    Profile_Header_Text_email:{
        color: 'black',
        fontWeight: '900',
        fontSize: 18,
        fontFamily: 'aldhyaksa-personal-use',
        textAlign: 'center',
    },

    background_Color_White:{
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,  
        backgroundColor: 'white', 
        paddingHorizontal: 10, 
        paddingTop: 0,
        overflow: 'hidden',
        scrollbarWidth: 0,
        height: "100%",
        marginTop: 10,
        flex: 1
    },
    
    errFile:{
        borderColor: 'red',
    },

    form_SigUp:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 25
    },

    text_form:{
        color: '#000',
        marginLeft: 4,
        fontSize: 15,
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

    button_SigUp:{
        padding: 12, 
        borderRadius: 20,
        marginTop: 20
    },

    text_button_SigUp:{
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
        paddingVertical: 15,
    },

    icon_SigUp_or:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginHorizontal: 100,
    },

    icon_SigUp:{
        padding: 5, 
        backgroundColor: '#DDDDDD', 
        borderRadius: 20,
    },

    text_sigUp:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginVertical:15
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

    contentContainer: {
        flexGrow: 1,
    },
});
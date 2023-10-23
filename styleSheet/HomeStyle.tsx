import { StyleSheet } from 'react-native';

export const HomeStyle = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        height: 60,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // chỉ áp dụng cho Android
    },

    container: {
        flex: 1,
        paddingBottom: 20
    },

    Header_Backgroud: {
        width: '100%',
        height: 55,
    },

    Welcome_Header_Text: {
        color: 'black',
        fontFamily: 'aldhyaksa-personal-use',
        fontSize: 18,
        marginHorizontal: 15,
        fontWeight: 'bold',
    },

    button_back: {
        padding: 8,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    Home_Header: {
        flex: 1,
    },

    marginHorizontal: {
        marginHorizontal: 10,
        marginTop: 30
    },

    Home_Labour: {
        flexDirection: 'row',
    },

    Home_Labour_View: {
        flex: 1,
        // backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 15
    },

    Home_Labour_Text: {
        color: '#2b3990',
        fontWeight: '900',
        fontSize: 23,
        fontFamily: 'aldhyaksa-personal-use',
        marginVertical: 10,
        textAlign: 'center',
    },

    Home_Labour_Text_Time: {
        fontSize: 12,
        fontWeight: 'bold',
    },

    flexDirection_row: {
        flexDirection: 'row',
    },

    justifyContent_flex_start: {
        justifyContent: 'flex-start'
    },

    justifyContent_center: {
        justifyContent: 'center',
        marginVertical: 0
    },

    avatarImage: {
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#EEEEEE',
        width: 100,
        height: 100,
        padding: 5,
        borderRadius: 100,
        position: 'relative',
    },

    Home_Header_Text: {
        color: 'white',
        fontWeight: '900',
        fontSize: 32,
        marginHorizontal: 25,
        fontFamily: 'aldhyaksa-personal-use',
        marginVertical: 20,
        textAlign: 'center',
    },

    HomeImage: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 50
    },

    Card_Google_maps: {
        marginVertical: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#2b3990',
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: '#2b3990',

    },

});
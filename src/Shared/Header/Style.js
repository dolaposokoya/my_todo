import { StyleSheet, Dimensions } from 'react-native'
import { THEME_COLOR, TODO_TEXT_COLOR, TODO_TEXT_COLOR_OPACITY } from '../../Config/Colors';


const { width, height } = Dimensions.get('window')
const Styles = StyleSheet.create({

    headerConatiner: {
        position: 'absolute',
        top: 0,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    textContainer: {
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 20,
    },
    imageContainer: {
        top: 20,
        left: 20,
        width: width * 0.20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        backgroundColor: THEME_COLOR,
        borderRadius: 50
    },
    textStyle: {
        color: TODO_TEXT_COLOR,
        opacity: TODO_TEXT_COLOR_OPACITY,
        fontSize: 18,
        height: 40,
        fontWeight: 'bold'
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 50,
    }
})

export default Styles
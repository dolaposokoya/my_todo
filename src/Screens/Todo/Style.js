import { StyleSheet, Dimensions } from 'react-native'
import { THEME_COLOR, TODO_TEXT_COLOR, TODO_TEXT_COLOR_OPACITY } from '../../Config/Colors';


const { width, height } = Dimensions.get('window')
const Styles = StyleSheet.create({

    todoContainer: {
        marginTop: height * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: THEME_COLOR,
        borderWidth: 2,
        width: width * 0.90,
        padding: 20,
        margin: 5
    },
    imageContainer: {
        top: 20,
        width: width * 0.20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: TODO_TEXT_COLOR,
        opacity: TODO_TEXT_COLOR_OPACITY,
        fontSize: 18,
        padding: 7,
        fontWeight: 'bold'
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 50,
    }
})

export default Styles
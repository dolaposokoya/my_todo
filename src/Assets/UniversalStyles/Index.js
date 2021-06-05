import { StyleSheet, Dimensions } from 'react-native'
import { TODO_TEXT_COLOR, TODO_TEXT_COLOR_OPACITY } from '../../Config/Colors';


const { width, height } = Dimensions.get('window')

const UniversalStyles = StyleSheet.create({

    textStyle: {
        color: TODO_TEXT_COLOR,
        opacity: TODO_TEXT_COLOR_OPACITY,
        fontSize: 18,
        // height: 40,
    },
})

export default UniversalStyles
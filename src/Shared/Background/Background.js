import React from 'react'
import { Dimensions, ImageBackground } from 'react-native'


const { width, height } = Dimensions.get('window')
export default function Background(props) {
    return (
        <ImageBackground source={require('../../Assets/Images/background.png')} style={{
            flex: 1,
            resizeMode: "contain",
            position: 'relative',
            top: 0,
            bottom: 0,
            width: width,
            justifyContent: "center",
            alignItems: 'center',
        }} >
            {props.children}
        </ImageBackground>
    )
}

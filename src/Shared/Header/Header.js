import React from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Styles from './Style'

export default function Header(props) {
    const { user } = props
    return (
        <View style={Styles.headerConatiner}>
            {/* <View style={Styles.textContainer}>
                <Text style={Styles.textStyle}>Welcome {user.email}</Text>
            </View> */}
            <TouchableOpacity style={Styles.imageContainer} onPress={() => Alert.alert(user.email)}>
                <Image source={user.photoURL ? { uri: user.photoURL } : require('../../Assets/Images/user.png')} style={Styles.imageStyle} />
            </TouchableOpacity>
        </View>
    )
}

import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TODO_TEXT_COLOR } from '../../Config/Colors';
import Style from './Style'


export default function CompletedTask(props) {

    const { item, onPress, undoTask } = props

    return (
        <>
            {item.completed && <View style={Style.listContainer}>
                <Text style={[Style.textStyle, { textDecorationLine: 'line-through', color: 'gray' }]}>{item.name}</Text>
                <View style={Style.buttonContainer}>
                    <TouchableOpacity onPress={() => undoTask(item.id)}>
                        <Image source={require('../../Assets/Images/undo.png')} style={{
                            width: 26,
                            height: 26,
                            marginLeft: 20
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPress}>
                        <Image source={require('../../Assets/Images/trash.png')} style={{
                            width: 26,
                            height: 26,
                            marginLeft: 20
                        }} />
                    </TouchableOpacity>
                </View>
            </View>}
        </>
    )
}

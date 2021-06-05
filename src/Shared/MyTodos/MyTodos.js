import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TODO_TEXT_COLOR } from '../../Config/Colors';
import Style from './Style'

export default function MyTodos(props) {
    const { item, onPress, completeTask } = props

    const [complete, setcomplete] = useState(false)
    return (
        <>
            {!item.completed && <View style={Style.listContainer}>
                <View>
                    <Text style={[Style.textStyle, { textDecorationLine: !complete ? 'none' : 'line-through', color: !complete ? TODO_TEXT_COLOR : 'gray' }]}>{item.name}</Text>
                </View>
                <View style={Style.buttonContainer}>
                    <TouchableOpacity onPress={() => completeTask(item.id)}>
                        <Image source={require('../../Assets/Images/check.png')} style={{
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

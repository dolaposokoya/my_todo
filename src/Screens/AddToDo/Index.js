import React, { useRef, useState, useContext } from "react";
import { View, Button, TextInput, TouchableOpacity, Image, Text, Alert, Dimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { THEME_COLOR } from "../../Config/Colors";
import { randomBytes } from 'react-native-randombytes';
import { TodoContext } from '../../Context/TodoContext'
import AsyncStorage from "@react-native-async-storage/async-storage";



const { width } = Dimensions.get('window')
export default function AddToDo() {
    const refRBSheet = useRef();

    const [task, settask] = useState('')
    const [myTodos, setmyTodos] = useContext(TodoContext)

    const addTask1 = async () => {
        if (task === '') {
            Alert.alert('Task is empty')
        }
        else {
            const rand = randomBytes(8);
            const newTask = {
                id: rand.toString('hex'),
                name: task,
                completed: false
            }
            setmyTodos([...myTodos, newTask])
            console.warn('myTodos', myTodos)
            refRBSheet.current.close()
            settask('')
        }
    }

    const addTask = async () => {
        if (task === '') {
            Alert.alert('Task is empty')
        }
        else {
            const myTask = await AsyncStorage.getItem('@myTodos')
            const rand = randomBytes(8);
            if (myTask === null) {
                const newTask = {
                    id: rand.toString('hex'),
                    name: task,
                    completed: false
                }
                const myNewTask = []
                myNewTask.push(newTask)
                setmyTodos(myNewTask)
                const jsonValue = JSON.stringify(myNewTask)
                await AsyncStorage.setItem('@myTodos', jsonValue)
                refRBSheet.current.close()
                settask('')
            }
            else {
                const newTask = {
                    id: rand.toString('hex'),
                    name: task,
                    completed: false
                }
                const parsedValue = JSON.parse(myTask)
                parsedValue.push(newTask)
                setmyTodos(parsedValue);
                const jsonValue = JSON.stringify(parsedValue)
                await AsyncStorage.setItem('@myTodos', jsonValue);
                refRBSheet.current.close()
                settask('')
            }
        }
    }


    return (
        <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={{
                // flex: 1,
                position: 'absolute',
                bottom: 25,
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                opacity: 0.5,
                backgroundColor: THEME_COLOR
            }}
        >
            <Image source={require('../../Assets/Images/add.png')} style={{
                width: 40,
                height: 40
            }} />
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: '#e3e3e3',
                        opacity: 0.8
                    },
                    draggableIcon: {
                        backgroundColor: THEME_COLOR,
                        marginTop: 13,
                        width: 90,
                        height: 10
                    }
                }}
            >
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: 30,
                }}>
                    <TextInput value={task} onChangeText={(text) => settask(text)}
                        style={{
                            width: 250,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: THEME_COLOR,
                            paddingLeft: 10,
                            paddingRight: 10,
                            fontSize: 18,
                            color: THEME_COLOR
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => addTask()}
                        style={{
                            margin: 20,
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            backgroundColor: '#F89B2E'
                        }}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#fff'
                        }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </TouchableOpacity>
    );
}
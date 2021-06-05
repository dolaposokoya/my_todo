import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, Dimensions, Image, TouchableOpacity, Alert } from 'react-native'
import UniversalStyles from '../../Assets/UniversalStyles/Index'
import MyTodos from '../../Shared/MyTodos/MyTodos';
import { SECOND_COLOR, THEME_COLOR } from '../../Config/Colors';
import CompletedTask from '../../Shared/CompletedTask/CompletedTask';
import AddToDo from '../AddToDo/Index'
import { TodoContext } from '../../Context/TodoContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width, height } = Dimensions.get('window')
export default function Index(props) {

    const { user } = props
    const [selected, setselected] = useState('my_todos')
    const [myTodos, setmyTodos] = useContext(TodoContext)

    useEffect(() => {
        getTask()
        // setmyTodos(myTodos)
        return () => getTask()
        // return () => setmyTodos(myTodos)
    }, [selected])

    const getTask = async () => {
        const myTask = await AsyncStorage.getItem('@myTodos')
        if (myTask === null) {
            setmyTodos([])
        }
        else {
            const parsedValue = JSON.parse(myTask)
            setmyTodos(parsedValue)
        }
    }

    const deleteTodo = async (index) => {
        const myTask = await AsyncStorage.getItem('@myTodos')
        if (myTask === null) {
            Alert.alert('Task is empty')
        }
        else {
            const parsedValue = JSON.parse(myTask)
            const newTodo = parsedValue.filter(item => {
                return item.id !== index
            })
            setmyTodos(newTodo)
            const jsonValue = JSON.stringify(newTodo)
            await AsyncStorage.setItem('@myTodos', jsonValue);
        }
        // const newTodo = myTodos.filter(item => {
        //     return item.id !== index
        // })
        // setmyTodos(newTodo)
    }

    const completeTask = async (index) => {
        const myTask = await AsyncStorage.getItem('@myTodos')
        if (myTask === null) {
            Alert.alert('Task is empty')
        }
        else {
            const parsedValue = JSON.parse(myTask)
            const newTodo = parsedValue.filter(item => {
                if (item.id === index) {
                    item.completed = true
                }
                return item
            })
            setmyTodos(newTodo)
            const jsonValue = JSON.stringify(newTodo)
            await AsyncStorage.setItem('@myTodos', jsonValue);
        }
        // const newTodo = myTodos.filter(item => {
        //     return item.completed !== false
        // })
        // setmyTodos(newTodo)
    }

    const undoTask = async (index) => {
        const myTask = await AsyncStorage.getItem('@myTodos')
        if (myTask === null) {
            Alert.alert('Task is empty')
        }
        else {
            const parsedValue = JSON.parse(myTask)
            const newTodo = parsedValue.filter(item => {
                if (item.id === index) {
                    item.completed = false
                }
                return item
            })
            setmyTodos(newTodo)
            const jsonValue = JSON.stringify(newTodo)
            await AsyncStorage.setItem('@myTodos', jsonValue);
        }
    }

    const renderItem = ({ item }) => (
        <MyTodos item={item} onPress={() => deleteTodo(item.id)} completeTask={completeTask} />
    )

    const renderCompletedItem = ({ item }) => (
        <CompletedTask item={item} onPress={() => deleteTodo(item.id)} undoTask={undoTask} />
    )

    return (
        <View style={{
            marginTop: height * 0.4,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                flexDirection: 'row',
                width: width,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginBottom: 15,
            }}>
                <TouchableOpacity style={{
                    borderBottomWidth: selected === 'my_todos' ? 4 : 0,
                    borderBottomColor: selected === 'my_todos' ? THEME_COLOR : '',
                    paddingBottom: 3,
                }}
                    onPress={() => setselected('my_todos')}
                >
                    <Text style={[UniversalStyles.textStyle, { fontWeight: 'bold', }]}>My Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setselected('completed')}
                    style={{
                        borderBottomWidth: selected === 'completed' ? 4 : 0,
                        borderBottomColor: selected === 'completed' ? THEME_COLOR : '',
                        paddingBottom: 3,
                    }}>
                    <Text style={[UniversalStyles.textStyle, { fontWeight: 'bold' }]}>Completed Todos</Text>
                </TouchableOpacity>
            </View>
            {selected === 'my_todos' ? <FlatList
                showsVerticalScrollIndicator={false}
                data={myTodos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
                :
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={myTodos}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCompletedItem}
                />
            }
            <AddToDo />
            <View style={{ height: Dimensions.get('window').height * 0.04 }}></View>
        </View>
    )
}

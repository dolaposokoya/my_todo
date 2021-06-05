import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomBytes } from 'react-native-randombytes';

export const TodoContext = createContext()

const todos = [
    {
        id: '1',
        name: 'Todo Number 1',
        completed: false
    },
    {
        id: '2',
        name: 'Todo Number 2',
        completed: false
    },
    {
        id: '3',
        name: 'Todo Number 3',
        completed: false
    },
    {
        id: '4',
        name: 'Todo Number 4',
        completed: false
    },
    {
        id: '5',
        name: 'Todo Number 5',
        completed: false
    },
]
export const TodoProvider = (props) => {
    const [myTodos, setmyTodos] = useState([])
    const [loading, setloading] = useState(true)

    // if (loading) getTask()

    useEffect(() => {
        getTask()
        return () => getTask()
    }, []);



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

    const addNewTask = async () => {
        const myTask = await AsyncStorage.getItem('@myTodos')
        if (myTask === null) {
            setmyTodos(myTodos)
            const jsonValue = JSON.stringify(myTodos)
            await AsyncStorage.setItem('@myTodos', jsonValue)
        }
        else {
            const myNewTask = [...myTask, myTodos]
            setmyTodos(myNewTask)
            const jsonValue = JSON.stringify(myNewTask)
            await AsyncStorage.setItem('@myTodos', jsonValue)
        }
    }

    return (
        <TodoContext.Provider value={[myTodos, setmyTodos]}>
            {props.children}
        </TodoContext.Provider>
    )
}
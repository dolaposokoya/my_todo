import React, { useState, useEffect } from 'react'
import { View, Text, Button, Dimensions, Alert, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { THEME_COLOR } from '../../Config/Colors';
import Background from '../../Shared/Background/Background'
import Todo from '../Todo/Index'
import Header from '../../Shared/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width, height } = Dimensions.get('window')
export default function Index() {

    const [user, setUser] = useState('');
    const [loading, setloading] = useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('');
    const [passwordError, setpasswordError] = useState('')
    const [emailError, setemailError] = useState('')

    async function onAuthStateChanged() {
        try {
            setloading(true)
            const loggedIUser = await AsyncStorage.getItem('@loggedIUser')
            if (loggedIUser !== null) {
                setUser(JSON.parse(loggedIUser))
                setloading(false)
            }
            else {
                setUser('')
            }
        } catch (error) {
            Alert.alert(error.message)
            setloading(false)
        }
    }

    const validateUser = async () => {
        let isValid = true;
        const emailError = {};
        const passwordError = {};
        if (email === '') {
            emailError.empty = 'Email is empty';
            isValid = false;
        }
        if (!email.includes('@')) {
            emailError.valid = 'Email is not valid';
            isValid = false;
        }
        if (password === '') {
            passwordError.empty = 'Password is empty'
            isValid = false;
        }
        if (password.length < 8) {
            passwordError.tooshort = 'Password is too short'
            isValid = false;
        }
        setpasswordError(passwordError)
        setemailError(emailError)
        return isValid
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged();
        return subscriber; // unsubscribe on unmount
    }, []);


    const signUpUser = async () => {
        setloading(true)
        try {
            const loggedIUser = await AsyncStorage.getItem('@loggedIUser')
            if (loggedIUser === null) {
                const valid = await validateUser();
                if (valid === true) {
                    const formData = {}
                    formData.email = email
                    formData.password = password
                    const jsonValue = JSON.stringify(formData)
                    await AsyncStorage.setItem('@loggedIUser', jsonValue)
                    setUser(JSON.parse(jsonValue))
                    await onAuthStateChanged();
                    setloading(false)
                }
                else {
                    setloading(false)
                }
            }
            else {
                setUser(JSON.parse(loggedIUser))
                setloading(false)
            }
        } catch (error) {
            setloading(false)
            Alert.alert(error.message)
        }
    }

    if (loading) return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color={THEME_COLOR} />
        </View>
    )
    if (!user) {
        return (
            <View style={{
                flex: 1,
            }}>
                <Background>
                    <View style={{
                        marginTop: height * 0.25,
                        width,
                        height,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View
                            style={{
                                width,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{
                                fontSize: 24,
                                paddingTop: 40,
                                fontWeight: 'bold',
                                color: THEME_COLOR,
                            }}>Sign up / Register</Text>
                            <View style={{
                                padding: 15,
                                // borderColor: THEME_COLOR,
                                // borderWidth: 2,
                                marginBottom: height * 0.04,
                            }}>
                                <View>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="email"
                                            onChangeText={(value) => setemail(value)}
                                        />
                                    </View>
                                    <View style={styles.errorContainer}>
                                        {Object.keys(emailError).map((key, index) => {
                                            return key && key ? (
                                                <Text key={index} style={styles.errorText}>
                                                    {emailError[key]}
                                                </Text>
                                            ) : null;
                                        })}
                                    </View>
                                    <View
                                        style={[styles.inputView, {
                                            marginTop: 10,
                                        }]}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="password"
                                            blurOnSubmit={true}
                                            secureTextEntry={true}
                                            onChangeText={(value) => setpassword(value)}
                                        />
                                    </View>
                                    <View style={styles.errorContainer}>
                                        {Object.keys(passwordError).map((key, index) => {
                                            return key && key ? (
                                                <Text key={index} style={styles.errorText}>
                                                    {passwordError[key]}
                                                </Text>
                                            ) : null;
                                        })}
                                    </View>
                                    <TouchableOpacity
                                        style={styles.btnContainer}
                                        onPress={() => signUpUser()}
                                    >
                                        <Text style={styles.btnText}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 18,
                                    }}>This app helps you manage your day to day activities</Text>
                            </View>
                        </View>
                    </View>

                </Background>
            </View>
        )
    }

    return (
        <Background>
            <Header user={user} />
            <Todo />
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    inputView: {
        borderColor: THEME_COLOR,
        borderWidth: 2,
        borderRadius: 5
    },
    textInput: {
        paddingLeft: 10,
        fontSize: 18,
        color: THEME_COLOR
    },
    btnContainer: {
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: THEME_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
    },
    btnText: {
        fontSize: 25,
        color: '#fff'
    },
    errorContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        width: width * 0.8,
    },
    errorText: {
        color: 'red',
        fontSize: 17,
    },
});
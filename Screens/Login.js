import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Components/Config';

export default function Login({ navigation }) {

    const [correo, setcorreo] = useState('')
    const [pass, setpass] = useState('')

    function login() {
        if (correo.trim() === '' || pass.trim() === '') {
            Alert.alert('Error', 'Ingrese el correo y la contraseña');
            return;
        }

        const app = initializeApp(firebaseConfig)
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, correo, pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                navigation.navigate('Juego')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;


                if (errorCode === "auth/wrong-password") {
                    Alert.alert("Error", "Verifique las credenciales")
                } else {
                    Alert.alert("Error")
                }
                console.log(errorCode)
            });

        limpiar()

    }
    function limpiar() {
        setcorreo("")
        setpass("")
    }

    function registrar() {

        navigation.navigate("Registro")
    }



    return (
        <ImageBackground source={require("../assets/83d928060ba1324135535823317f7a5b.jpg")} style={styles.background}>
            <View>


                <Image source={require("../assets/title.png")} style={styles.logo}></Image>
                <Text style={styles.text}>Login</Text>

                <TextInput style={styles.textInput}
                    placeholder='Ingrese login'
                    keyboardType='email-address'
                    onChangeText={(text) => setcorreo(text)}
                    value={correo}
                    required={true}
                />

                <TextInput style={styles.textInput}
                    placeholder="Ingrese contraseña"
                    onChangeText={(text) => setpass(text)}
                    value={pass}  
                    required={true} 
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.btn} onPress={() => login()}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => registrar()}>
                    <Text style={styles.btnText}>Registrar</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create(
    {

        btn: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 20,
            borderRadius: 10,
            backgroundColor: 'red',
            width: '30%',
            marginLeft: 150,


        },
        textInput: {
            padding: 10,
            paddingStart: 20,
            width: '80%',
            height: 50,
            marginTop: 20,
            borderRadius: 10,
            backgroundColor: '#95A5A6',
            marginLeft: 45,
        },

        btnText: {
            color: '#fff',
            fontSize: 16,

        },
        logo: {
            width: 200,
            height: 200,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: 20,
        },
        text: {

            fontSize: 50,
            color: 'red',
            fontWeight: 'bold',
            alignSelf: 'center',

        },
        background: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center', 
            resizeMode: "cover",
        },



    })
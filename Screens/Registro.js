import { View, Text, Alert, Button } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../Components/Config";
import { db } from "../Components/Config";
import {  ref, onValue} from "firebase/database";

export default function Registro({navigation}) {
 
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");
  const [nick, setNick] = useState("");
  const [edad, setEdad] = useState("");
  const [datos, setDatos] = useState("");
 
  function registrar() {
 
    const app = initializeApp (firebaseConfig);
    const auth = getAuth(app);
 
    createUserWithEmailAndPassword(auth, correo, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
 
        guardar(correo, nick, edad);
 
        Alert.alert('Mensaje', 'Usuario registrado con exito');
        navigation.navigate("Juego");
       
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error');
        // ..
      });
  }
 
  //Función para guardar los datos en un json
function guardar (correoE, nickE, edadE) {
  /* Se elimina la línea 45 debido a que ya se encuentra
  implementada en el archivo Config.js*/
  // const db = getDatabase();
  set(ref(db, 'jugadores/' + nick), {
    email: correoE,
    nick: nickE,
    age : edadE
  });
}
 
function leer () {
  const starCountRef = ref(db, 'jugadores/');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    setDatos(data)
    console.log(datos)
});
}
 
  return (
    <View>
      <Text>Registro</Text>
 
      <TextInput
      placeholder="Ingrese su e-mail"
      keyboardType="email-address"
      onChangeText={ (text)=> setCorreo(text)}
      />
 
      <TextInput
      placeholder="Ingrese un nick"
      onChangeText={ (text)=> setNick(text)}  
      />
 
      <TextInput
      placeholder="Ingrese su edad"
      onChangeText={ (text)=> setEdad(text)}
      keyboardType="numeric"
      />
 
      <TextInput
      placeholder="Ingrese una contraseña"
      onChangeText={ (text)=> setPass(text)}
      />
 
      <Button
      title='Registrar'
      onPress={()=>registrar()}
      />
 
      <Button
      title='Leer'
      onPress={()=>leer()}
      />  
 
    </View>
  );
}

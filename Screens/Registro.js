import { View, Text, Alert, Button,  TouchableOpacity , StyleSheet, FlatList, TextInput, ImageBackground} from "react-native";
import React, { useState } from "react";

 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig , db } from "../Components/Config";
import {  ref, onValue , getDatabase, set , remove} from "firebase/database";

export default function Registro({navigation} , prop) {
 
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");
  const [nick, setNick] = useState("");
  const [edad, setEdad] = useState("");

  const [datos, setDatos] = useState([]);
 
  function registrar() { 
    if (correo.trim() === '' || pass.trim() === '' || nick.trim() === ''|| edad.trim() === '') {
      Alert.alert('Error', 'Ingrese los datos necesarios');
      return;
  }
 
    const app = initializeApp (firebaseConfig);
    const auth = getAuth(app);
 
    createUserWithEmailAndPassword(auth, correo, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
 
        guardar(correo, nick, edad)
 
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
function guardar (correo, nick, edad) {
  /* Se elimina la línea 45 debido a que ya se encuentra
  implementada en el archivo Config.js*/
  // const db = getDatabase();
  set(ref(db, 'jugadores/' + nick), {
    email: correo,
    nick: nick,
    edad : edad
  });
}
 
function leer () {
  const starCountRef = ref(db, 'jugadores/');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    setDatos(data) 

    const dataArray= Object.entries(datos).map(([key, value])=>({
      key, ...value
    }));
    setDatos(dataArray)
    //console.log(datos)
});
} 


function eliminar (){

  remove (ref(db,'jugadores/'+id))
} 

function login() {

  navigation.navigate("Login")
}
  return ( 
    <ImageBackground source={require("../assets/Stage01.png")} style={styles.background}>
    <View>
      <Text style={styles.text}>Registro</Text>
 
      <TextInput style={styles.textInput}
      placeholder="Ingrese su e-mail"
      keyboardType="email-address"
      onChangeText={ (text)=> setCorreo(text)} 
      required={true}
      />
 
      <TextInput style={styles.textInput}
      placeholder="Ingrese un nick"
      onChangeText={ (text)=> setNick(text)}   
      required={true}
      />
 
      <TextInput style={styles.textInput}
      placeholder="Ingrese su edad"
      onChangeText={ (text)=> setEdad(text)}
      keyboardType="numeric" 
      required={true}
      />
 
      <TextInput style={styles.textInput}
      placeholder="Ingrese una contraseña"
      onChangeText={ (text)=> setPass(text)} 
      required={true} 
      secureTextEntry={true}
      /> 

      <TouchableOpacity style={styles.btn} onPress={()=>registrar()} >  
      <Text>Registrar</Text>

      </TouchableOpacity> 


      <TouchableOpacity style={styles.btn}  onPress={()=>leer()} >  
      <Text>Leer</Text>

      </TouchableOpacity>  


      <FlatList 
      data = {datos}
      renderItem={({ item })=>
      <View>
      <Text>{item.nick}</Text>  

      <TouchableOpacity style={styles.btn}  onPress={()=>eliminar(item.nick)} >  
      <Text>Elimninar</Text>

      </TouchableOpacity> 
      </View> 

      } 
      
      > 
  
      </FlatList> 


      <TouchableOpacity style={styles.btn} onPress={()=>login()}

  >  
      <Text>ir al inicio </Text>
      </TouchableOpacity> 
 
     
 
    </View> 
    </ImageBackground>
  );
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
          backgroundColor: "#A6ACAF",
          width: '30%',
          marginLeft: 150,
      },  
      background: {
        flex: 1,
        resizeMode: 'stretch',
        alignItems: 'flex-start',
      },  
      textInput: {
        padding: 10,
        paddingStart: 20,
       alignContent:'center',
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginLeft: 45,
    }, 
    text:{

      fontSize: 50,
      color: 'red',
      fontWeight: 'bold',
      alignSelf: 'center',
      marginLeft: 120, 
      marginTop: 50,
  } ,

    })

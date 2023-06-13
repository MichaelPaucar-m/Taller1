
import { View, Text, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Components/Config';
import { set } from 'firebase/database';
import Pato from '../Components/Pato';



export default function Juego({ navigation }) {

  const [tiempo, settiempo] = useState(10)


  //temporizador
  useEffect(() => {
    /* const temporizador = setInterval(()=>{ 
       settiempo((tiempoAnterior) => tiempoAnterior -1)
   
     },1000
      
     )*/

    const temporizador = setInterval(() => {
      settiempo((tiempoAnterior) => {

        if (tiempoAnterior == 1) {
          clearInterval(temporizador) //detiene el temporizador
        }
        return tiempoAnterior - 1;
      })
    }, 1000)
  }, [])

  useEffect(() => {

    if (tiempo == 0) {
      Alert.alert("Game over", "Su puntiaci[on es: ", [])
      settiempo(10)
    }

  }, [tiempo])






  function logout() {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    signOut(auth).then(() => {
      navigation.navigate("Login")

      // Sign-out successful.
    }).catch((error) => {

      Alert.Alert("Error")
      // An error happened.
    });
  }

  return (
    <View>
      <Text>Juego</Text>
      <Button

        title='LogOut'
        onPress={() => logout()}
      />

      <Text>{tiempo}</Text> 
      <Pato/>

    </View>
  )
}
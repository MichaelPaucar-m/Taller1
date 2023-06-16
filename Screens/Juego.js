
import { View, Text, Button, Alert, StyleSheet, ImageBackground , TouchableOpacity, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig,db } from '../Components/Config';
import { ref,  set, onValue} from "firebase/database";

import Pato from '../Components/Pato'; 


export default function Juego({ navigation }) {

  const [tiempo, settiempo] = useState(30)
  const [contador, setcontador] = useState(0) 
  const [datos, setDatos]= useState([])  
  
  

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
    return () => {
      clearInterval(temporizador); // Limpiar el temporizador al desmontar el componente
    };
   
  }, [])   
  function reiniciar() {
    settiempo(10);
    setcontador(0);
  }
  


  useEffect(() => {

    if (tiempo == 0) {  
      

      Alert.alert("Game over", "Su puntiaci[on es: "  + contador  )
      settiempo(10)
      //emviar la informacion a fireBase
      puntuacion()
      setcontador(0) 
    
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
  
 

  // funcion contar
  function contar() {
    setcontador(contador + 1)

  } 
  function com (){
    contar()
 
  }

  // guardar en fire base \
  const jugador = "pepe"
  function puntuacion() {

    set(ref(db, 'Puntuacion/' + jugador), {

      nick: jugador,
      puntaje: contador

    }); 
  } 
  useEffect(() => {
    // Obtener información de la base de datos
    const databaseRef = ref(db, 'Puntuacion/' + jugador);
    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      // Hacer algo con los datos obtenidos
      console.log(data);
    });

    // Limpiar la suscripción al desmontar el componente
    return () => {
      // Detener la escucha de cambios
      databaseRef.off();
    };
  }, []);{}
 

  return ( 
    <ImageBackground source={require("../assets/Stage02.png")} style={styles.background}>
   
      
   <Text style={styles.text3} > PUNTUACIÓN :</Text> 
        <Text style={styles.text2}> {contador}</Text> 
         
        <Text style={styles.text3}> Tiempo :</Text> 
        <Text style={styles.text2}> {tiempo}</Text> 
       
       
       
  
      
      <View> 
      <Pato presionar={com} />
      </View> 

      <View style={styles.container}>
      <Button
          title='LogOut'
          onPress={() => logout()}
        /> 
         <Button
          title='Reiniciar'
          onPress={() => reiniciar()}
        />
      </View>
    </ImageBackground>
  );
  } 
  
  const styles = StyleSheet.create ({
    background: {
      flex: 1,
     
      alignItems: 'flex-start', 
      resizeMode: "cover",
    }, 
    container: {
      margintop:0
    },
    text2: { 
      
      fontSize: 50,
      color: 'red',
      fontWeight: 'bold',
      marginLeft: 200,
      
    }, 
    text1: { 
      fontSize: 50,
      color: 'red',
      fontWeight: 'bold',
      marginLeft: 200, 
      marginTop: 30,
    }, 
    text3: { 
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      marginLeft: 100, 
      marginTop: 30,
    },
  });
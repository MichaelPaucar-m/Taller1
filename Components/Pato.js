import { View, Text,  TouchableOpacity , StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'


export default function Pato() {  

    const [posicion, setposicion]= useState ({x:0, y:0})

    function moverPato(){
        const MAXX= 350; 
        const MAXY = 700;

        const randomX= Math.floor(Math.random () * MAXX)
        const randomY= Math.floor(Math.random () * MAXY)

        setposicion ({x:randomX, y:randomY})

    }

  return (
    <View style={{top: posicion.y, left: posicion.x, position: 'absolute'}}> 

    <TouchableOpacity onPress={ ()=> moverPato()}>
      <Image source = {require("../assets/duck.png")} style={styles.img}/>
   
      </TouchableOpacity>
    </View> 
  )  
}

const styles= StyleSheet.create (
    { 
        img : {
            width:200,
            height:60
        
        }

    }
)
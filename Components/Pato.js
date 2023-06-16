import { View, Text,  TouchableOpacity , StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react' 


export default function Pato ( prop ) {  
console.log (prop)
    const [posicion, setposicion]= useState ({x:0, y:0}) 
    const [imagen, setImagen] = useState(require("../assets/duck.png")); 
    const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

    function moverPato(){
        const MAXX= 350; 
        const MAXY = 600;

        const randomX= Math.floor(Math.random () * MAXX)
        const randomY= Math.floor(Math.random () * MAXY)

        setposicion ({x:randomX, y:randomY})

    } 

    useEffect(() => { 

      const interval= setInterval(()=> {
        moverPato()
      },1000)
    }, [])
    

    function compuesta (){
      moverPato()  
      cambiarImagen() 
     
      prop.presionar() 
      
 
    } 
    function cambiarImagen() {
      if (imagen == require("../assets/duck.png")) {
        setImagen(require("../assets/duck_clicked.png"));
      } else {
        setImagen(require("../assets/duck_clicked.png"));
      } 
      setTimeout(() => {
        setImagen(require("../assets/duck.png"));
      }, 400);
    }  
    

  return (
    <View style={{top: posicion.y, left: posicion.x, position: 'absolute'}}> 

    <TouchableOpacity onPress={ ()=> compuesta()}>
      <Image source = {imagen} style={styles.img}/>
   
      </TouchableOpacity>
    </View> 
  )  
}

const styles= StyleSheet.create (
    { 
        img : { 

            width:200,
            height:140
        
        }

    }
)
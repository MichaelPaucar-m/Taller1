
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"

export const firebaseConfig = { 
  apiKey: "AIzaSyA4AIySGezKl2QFeBy7cR48as_pITZ0OE8",
  authDomain: "juego-85563.firebaseapp.com", 
  databaseURL: "https://juego-85563-default-rtdb.firebaseio.com",
  projectId: "juego-85563",
  storageBucket: "juego-85563.appspot.com",
  messagingSenderId: "627623657219",
  appId: "1:627623657219:web:40913c6a3eafc8eac53336"
 
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const db= getDatabase(app) 


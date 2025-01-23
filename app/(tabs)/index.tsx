import { Image, StyleSheet, View, Button, Alert, TextInput, SafeAreaView, Text } from 'react-native';
import {Link, useLocalSearchParams} from 'expo-router';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
//https://firebase.google.com/docs/reference/js/auth
import { getFirestore } from "firebase/firestore";
//https://firebase.google.com/docs/reference/js/firestore_.md
import { collection, addDoc } from "firebase/firestore"; 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import '../../firebase';

const {firebaseConfig} = require('../../firebase.js');

export default function HomeScreen() {
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);


const [loginout, setloginout] = useState('Login');
const [created, setCreate] = useState('create');
const [pword, setPword] = useState('password');
const [email, setEmail] = useState('email@mail.com');

const db = getFirestore(app);
let n = 0;

async function debug(tag: String, str: String) {
  console.log(tag + "No. " + n.toString(), str);
  n++;
  try {
    const docRef = await addDoc(collection(db, "Debug"), {
      Tag: tag + "No. " + n.toString(),
      Str: str,
    });  
    console.log("Write to firestore", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
}

function loginA() {
  setEmail(email);
  setPword(pword);
  signInWithEmailAndPassword(auth, email, pword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    debug("signinEmailPassowrd: ", "success: " + user.email );
    setloginout('login: ' + user.email!);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setloginout('login unsuccessful' );;
    debug("SiginEmailPassword: ", errorCode + " " + errorMessage);
  });
    debug("loginA", "login: " + email + " password: " + pword + "success");   
}


function createA() {
  setEmail(email);
  setPword(pword);
  setCreate('created');
  createUserWithEmailAndPassword(auth, email, pword)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    setCreate('Created' + user.email!);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    debug("Create User Accout", errorCode + " " + errorMessage);
  });
    debug("createA", "created: "  + email + " password: " + pword);      
}

function logoutA() {
  setEmail(email);
  setPword(pword);
  signOut(auth)
  .then(() => {
    // Sign out 
    setloginout('login');
    debug("Sign Out: ", "success: logout " + email );
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    debug("Sign Out Error: ", errorCode + " " + errorMessage);
  });
  debug("createA", "created: "  + email + " password: " + pword);      
}
function deleteA() {
  setEmail(email);
  setPword(pword);
  deleteUser(auth.currentUser!)
  .then(() => {
    // Delete user 
    debug("Delete: ", "success: " + email );
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    debug("Delete Error: ", errorCode + " " + errorMessage);
  });

  debug("DeleteA", "created: "  + email + " password: " + pword);      

}

  return (
    <SafeAreaProvider>
    <SafeAreaView style = {styles.header}>
          <View style = {styles.colContainer}>
          <View style = {styles.rowContainer}>
            <Text>
              {loginout}
            </Text>
            <Text>
              {created}
            </Text>
          </View>
          <View style = {styles.rowContainer}>
            <TextInput style = {styles.sUser}
            onChangeText = {setEmail}
            value={email} />
            <TextInput style = {styles.sUser}
            secureTextEntry={true}
            onChangeText = {setPword}
            value={pword}/>
          </View>

          <View style = {styles.rowContainer}>
            <Button
              title = "login"
              onPress={()=>loginA()} >
             </Button>
             <Button
              title = "Create"
              onPress={()=>createA()} >
             </Button>
             <Button
              title = "Logout"
              onPress={()=>logoutA()} >
             </Button>
             <Button
              title = "Delete"
              onPress={()=>deleteA()} >
             </Button>
          </View>
       </View>
       </SafeAreaView>
       </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 40,
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  colContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
  },
 sUser: {},
});

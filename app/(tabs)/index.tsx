import { Image, StyleSheet, View, Button, Alert, TextInput, SafeAreaView, Text } from 'react-native';
import {Link, useLocalSearchParams} from 'expo-router';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import '../../firebase.js';

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

let n = 0;

async function debug(tag: String, str: String) {
  console.log(tag + "No. " + n.toString(), str);
  n++;
  
}

function loginA() {
  setEmail(email);
  setPword(pword);
  
  signInWithEmailAndPassword(auth, email, pword)
  .then((userCredential) => {
    //sigined in
    const user = userCredential.user;
    debug("siginEmailPassword: ", "success: " + user.email);
    setloginout('login: ' + user.email);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setloginout('login unsuccessful');
    debug("SignInEmailPassword: ", errorCode + " " + errorMessage);
  });

  debug("loginA", "login: " + email + " password: " + pword + "success");   
}


function createA() {
  setEmail(email);
  setPword(pword);
  setCreate('created');
  createUserWithEmailAndPassword(auth, email, pword)
  .then((userCredential) => {
    //sigined in
    const user = userCredential.user;
    debug("CreateEmailPassword: ", "success: " + user.email);
    setloginout('created + login: ' + user.email);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setloginout('create unsuccessful');
    debug("CreateEmailPassword: ", errorCode + " " + errorMessage);
  });
    debug("createA", "created: "  + email + " password: " + pword);      
}

function logoutA() {
  setEmail(email);
  setPword(pword);
  debug("createA", "created: "  + email + " password: " + pword);      
  signOut(auth)
  .then((userCredential) => {
    //sigined in
    debug("SignoutEmailPassword: ", "success: " + email);
    setloginout('Signout + login: ' + email);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setloginout('signout unsuccessful');
    debug("SignoutEmailPassword: ", errorCode + " " + errorMessage);
  });
  

}
function deleteA() {
  setEmail(email);
  setPword(pword);
  deleteUser(auth.currentUser!)
  .then((userCredential) => {
    //sigined in
    debug("DeleteEmailPassword: ", "success: " + email);
    setloginout('Delete: ' + email);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setloginout('Delete unsuccessful');
    debug("DeleteEmailPassword: ", errorCode + " " + errorMessage);
  });

  debug("deleteA", "Delete: "  + email + " password: " + pword);      

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

import { Image, StyleSheet, View, Button, Alert, TextInput, SafeAreaView, Text } from 'react-native';
import {Link, useLocalSearchParams} from 'expo-router';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function HomeScreen() {

const [loginout, setloginout] = useState('Login');
const [created, setCreate] = useState('create');
const [pword, setPword] = useState('password');
const [user, setUser] = useState('email');
const [text, onChangeText] = useState('email');
const [text2, onChangeText2] = useState('password');

function loginA() {
  setUser(user);
  setPword(text2);
  if (loginout === 'logout')  {
       setloginout('login');
       debug("loginA", "login: " + user + " password: " + pword);
  } else {
       setloginout('logout');
       debug("loginA", "logout: "  + user + " password: " + pword);
  }    
}

function debug(tag: String, str: String) {
  console.log(tag, str);
}


function createA() {
  setUser(user);
  setPword(text2);
  if (created === 'create')  {
      setCreate('created');
      debug("createA", "created: "  + user + " password: " + pword);
    } else {
      setCreate('create');
      debug("createA","create: " + user + " password: " + pword)
    }    
      
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
            onChangeText = {setUser}
            value={user} />
            <TextInput style = {styles.sUser}
            secureTextEntry={true}
            onChangeText = {setPword}
            value={pword}/>
          </View>

          <View style = {styles.rowContainer}>
            <Button
              title = {loginout}
              onPress={()=>loginA()} >
             </Button>
             <Button
              title = {created}
              onPress={()=>createA()} >
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

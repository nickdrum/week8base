import { Image, StyleSheet, View, Button, Alert, TextInput, SafeAreaView, Text } from 'react-native';
import {Link, useLocalSearchParams} from 'expo-router';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function HomeScreen() {

const [loginout, setloginout] = useState('Login');
const [created, setCreate] = useState('create');

function loginA() {
  if (loginout === 'logout')  {
       setloginout('login');
       debug("loginA", "login");
  } else {
       setloginout('logout');
       debug("loginA", "logout");
  }    
}

function debug(tag: String, str: String) {
  console.log(tag, str);
}


function createA() {
  if (created === 'create')  {
      setCreate('created');
      debug("createA", "created");
    } else {
      setCreate('create');
      debug("createA","create")
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
 
});

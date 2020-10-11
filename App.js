import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,TextInput,Button,Alert,ActivityIndicator } from 'react-native';

export default function App() {

  const [text, setText] = useState('');  
  useEffect(
    () => {
      const username = "purnimathy6047"
      fetch(`https://api.github.com/users/${username}/repos`)
      .then(data => data.json())
      .then(parsedData => {
        setText(parsedData)
        const [firstRepo] = parsedData
        fetch(`https://api.github.com/repos/${username}/${firstRepo.name}/commits?author=${username}`)
       // api.github.com/repos/:user/{repositoryNameFromArray}/commits?author=:user.
       .then(data => data.json())
      .then(commitedList => {
        console.log(commitedList)
      })
      })
    }, []);
  const changeHandler = (val) => {
    setText(val);
    }

 const buttonClickListener = (text) =>{
    
     Alert.alert(text);
  }

console.log('here is the text', text);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text> Enter Commits</Text>
        {
          Array.isArray(text) ? text.map(repo => {
          return <Text key={repo.id}>{repo.id}</Text>
          }) : null
        }
        <TextInput 
        placeholder='e.g 5' 
        style={styles.input} 
        onChangeText={changeHandler}
        keyboardType='numeric'/>
      </View>
      <Button title="Retrieve" 
        onPress={buttonClickListener}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    /* alignItems: 'center',
    justifyContent: 'center', */
  },
  header:{
    backgroundColor: 'pink',
    padding: 20

  },
  input:{
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,

  }
});

import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,TextInput,Button,Alert,FlatList } from 'react-native';

export default function App() {

  const [commits, setCommits] = useState('');  
  useEffect(
    () => {
        const username = "purnimathy6047"
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(data => data.json())
        .then(parsedData => {
          const [firstRepo] = parsedData
          fetch(`https://api.github.com/repos/${username}/${firstRepo.name}/commits?author=${username}`)
          .then(data => data.json())
          .then(commitedList => {
            setCommits(Array.isArray(commitedList) ? commitedList.map(commit => {
              return {
                author: commit.author.login,
                commitHash: commit.sha,
                comment: commit.commit.message
              }
            }) : null)
        
        //console.log(commitedList)
        })
      })
    }, 
  []);
  
  const changeHandler = (val) => {  
    setCommits(val);
    }

  const CommitItem = ({ author, commitHash,comment }) => (
    <View >
      <Text >{author}</Text>
      <Text >{commitHash}</Text>
      <Text >{comment}</Text>
    </View>
  );
  
  const renderCommitLog = ({ item }) => (
    <CommitItem author={item.author} commitHash ={item.commitHash} comment = {item.comment} />
  );

console.log( commits);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text> List of Commits</Text>
      </View>
      <FlatList style ={styles.listItem}
        data={commits}
        renderItem={renderCommitLog}
        keyExtractor={commit => commit.commitHash}
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
    backgroundColor: 'grey',
    alignContent: "center",
    padding: 20

  },
  listItem:{
    backgroundColor: 'white',
    alignContent: "center",
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

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
        
        })
      })
    }, 
  []);
  
  const changeHandler = (val) => {  
    setCommits(val);
    }

  const CommitItem = ({ author, commitHash,comment }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemHeader}>{author}</Text>
      <Text style={styles.listContent}>{commitHash}</Text>
      <Text style={styles.listContent}>{comment}</Text>
    </View>
  );
  
  const renderCommitLog = ({ item }) => (
    <CommitItem author={item.author} commitHash ={item.commitHash} comment = {item.comment} />
  );

console.log( commits);
  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.header}> List of Commits</Text>
      </View>

      <FlatList 
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
    /*  alignItems: 'center',
    justifyContent: 'center',  */
  },
  
  header:{
    backgroundColor: '#abadb0',
    alignContent: "center",
    fontWeight: "bold",
    padding: 20
  },

  listItem:{
    backgroundColor: 'white',
    alignContent: "center",
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 10,
  },

  listItemHeader:{
    fontWeight: "bold"
  },

  listContent: {
   // marginVertical: 8,
    marginHorizontal: 16,
  },
});

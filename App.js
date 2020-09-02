import React, { useState } from 'react';
import Entete from './Components/Header';
import { StyleSheet, Text, View, FlatList, Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import TodoItem from './Components/todoItem'
import AddTodo from './Components/appTodo'

export default function App() {

  const [todos, setTodos] = useState([
    {text: 'buy coffee', key: '1'},
    {text: 'create an app', key: '2'},
    {text: 'play on the switch', key :'3'}
  ]); 

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    })
  }

  const submitHandler = (text) => {

    if (text.length > 3){
      setTodos((prevTodos) => {
        return [
          {text: text, key: Math.random().toString()},
          ...prevTodos
        ]
      })
    } else {
      Alert.alert('Fail', 'Need more three char',
      [
        {text: 'Unterstood'}
      ])
    }
  }

  return ( 
    <TouchableWithoutFeedback onPress={()=> {
      Keyboard.dismiss(); 
    }}>
      <View style={styles.container}>
        <Entete />
          <View style={styles.content}>
          <AddTodo submitHandler={submitHandler}/>
            <View style={styles.list}>
              <FlatList
                data={todos}
                renderItem={({ item }) => (
                  <TodoItem item={item} pressHandler={pressHandler} />
                )}
              /> 
            </View>
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  }
});

import React, {useState, useEffect, useRef} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from '../../components/Task';

function Todo() {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const [nullError, setNullError] = useState(false);
    const didMount = useRef(false);
    const STORAGE_KEY = '@OKOK'

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
        } catch (e) {
          // saving error
        }
      }
    
      useEffect(()=>{
        // Add data to the async storage
        // Return early, if this is the first render:
        
        if(taskItems && didMount.current){
            storeData(taskItems)
        }
        
        if (!didMount.current) {
            didMount.current = true;
       }
        
      },[taskItems])

    //  Get data from async storage
      useEffect(()=>{
        getData(taskItems)
      },[])
    
    // Sets the data from async storage into state
    const getData = async () => {
        try {
        const data = await AsyncStorage.getItem(STORAGE_KEY)
        if(data && data.length > 0) {
            // value previously stored
            setTaskItems(JSON.parse(data))
        }
        } catch(e) {
        // error reading value
        }
    }
  

    const handleAddTask = () => {
        if(!task){
           setNullError(true)
           return false
        }
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(null);
      }
    
      const removeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy)
      }

      const renderNullError = () => {
        if(nullError){
            return (<View style={styles.errorView}>
                <Text style={styles.errorText}>Please enter a valid text</Text>
            </View>)
        } else {
            return null
        }
      }

      const changeText = (text) => {
        setTask(text)
        setNullError(false)
      }

      const renderUserInputArea = () => {
        return (
            <View style={styles.userInputView}>
                 <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => changeText(text)} />
                    <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                    </TouchableOpacity>
            </View>
        )
      }

      const deleteAll = () => {
        setTaskItems([])
        AsyncStorage.removeItem(STORAGE_KEY);
      }

      const renderTasks = () => {
        if(!taskItems || taskItems.length == 0){
            return null
        } else{
            console.log('++++++++++++++++++++', taskItems, taskItems.length)
            return (
                taskItems.map((item, index) => {
                    return (
                        <Task text={item} key={index} removeItem={removeTask}  /> 
                    )
                  })
            )  
        }
      }

    return (
        <View style={styles.container}>
        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >
  
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.sectionTitle}>Today's tasks</Text>
            <TouchableOpacity onPress={()=>{deleteAll()}}>
                <Text>Delete</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.items}>
            {/* This is where the tasks will go! */}

            {renderTasks()}
          </View>
        </View>
          
        </ScrollView>

    {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >

        {renderNullError()}
        
        {renderUserInputArea()}

      </KeyboardAvoidingView>

        </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
      },
      tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
      },
      items: {
        marginTop: 30,
      },
      writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
      },
      input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
      },
      addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
      },
      addText: {},
      userInputView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      errorView: {
        paddingVertical: 15,
        paddingHorizontal: 15,
      },
      errorText: {
        marginLeft: 20
      }
  });

export default Todo;
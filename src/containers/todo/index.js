import React, {useState, useEffect, useRef} from 'react';
import { KeyboardAvoidingView, Text, View, TextInput,
   TouchableOpacity, Keyboard, ScrollView, Platform, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from '../../components/task';
import COLORS from '../../constants/Colors';
import TEXTS from '../../constants/Texts';
import uuid from 'react-native-uuid';
import {getFormattedDate} from '../../utils/helpers.js';
import styles from './styles';

function Todo() {
    const initialTask = {title: '', description: '', type: TEXTS.activeTab.pending, ID: ''}
    const [task, setTask] = useState(initialTask);
    const [taskItems, setTaskItems] = useState([]);
    const [nullError, setNullError] = useState(false);
    const [activeTab, setActiveTab] = useState(TEXTS.activeTab.pending);
    const didMount = useRef(false);

    // For persisting the todos 
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(TEXTS.STORAGE_KEY, jsonValue)
        } catch (e) {
          // TODO: handle error
        }
      }
    
      useEffect(()=>{
        // used ref here, as we don't the storing of data on first render
        if(taskItems && didMount.current){
            storeData(taskItems)
        }
        
        // setting the ref to false
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
        const data = await AsyncStorage.getItem(TEXTS.STORAGE_KEY)
        if(data && data.length > 0) {
            // value previously stored
            setTaskItems(JSON.parse(data))
        }
        } catch(e) {
        // TODO: handle error
        }
    }
  
    // On click of add button
    const handleAddTask = () => {
        if(!task || task.title == ''){
           setNullError(true)
           return false
        }
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(initialTask);
      }
      
      /*
      @input: id as uuid
      */
      const removeTask = (id) => {
        let itemsCopy = [...taskItems];
        let obj = itemsCopy.find(o => o.ID === id);
        let index = itemsCopy.indexOf(obj)

        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy)
      }
      
      /*
      @output: JSX
      */
      const renderNullError = () => {
        if(nullError){
            return (<View style={styles.errorView}>
                <Text style={styles.errorText}>{TEXTS.errors.nullError}</Text>
            </View>)
        } else {
            return null
        }
      }

      /*
      @input: string
      */
      const changeText = (text) => {
        let task = {
          title: text,
          description: '',
          type: TEXTS.activeTab.pending,
          ID: uuid.v4()
        }
        setTask(task)
        setNullError(false)
      }

      /*
      @output: JSX
      */
      const renderUserInputArea = () => {
        return (
            <View style={styles.userInputView}>
                 <TextInput style={styles.input} placeholder={TEXTS.placeholders.todoInput} value={task?.title} onChangeText={text => changeText(text)} />
                    <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                    </TouchableOpacity>
            </View>
        )
      }

      // Delete all items and removes scope from async storage as well
      const deleteAll = () => {
        setTaskItems([])
        AsyncStorage.removeItem(TEXTS.STORAGE_KEY);
      }

      /*
      @input: id as uuid
      */
      const handleCheckBox = (id) =>{
        let itemsCopy = [...taskItems];
        let obj = itemsCopy.find(o => o.ID === id);
        let index = itemsCopy.indexOf(obj)

        if(itemsCopy[index].type == TEXTS.activeTab.completed){
            itemsCopy[index].type = TEXTS.activeTab.pending
        } else {
            itemsCopy[index].type = TEXTS.activeTab.completed
        }
        setTaskItems(itemsCopy)
      }

      /*
      @output: JSX
      */
      const renderTasks = () => {
        if(!taskItems || taskItems.length == 0){
            return null
        } else{
            return (
                taskItems.map((item, index) => {
                  if(activeTab == TEXTS.activeTab.pending && item.type == TEXTS.activeTab.pending){
                    return (
                      <Task handleCheckBox = {handleCheckBox} item={item} key={index} removeItem={removeTask}  /> 
                    )
                  } else if(activeTab == TEXTS.activeTab.completed && item.type == TEXTS.activeTab.completed){
                    return (
                      <Task handleCheckBox = {handleCheckBox} item={item} key={index} removeItem={removeTask}  /> 
                    )
                  }
                   
                  })
            )  
        }
      }

      /*
      @input: boolean
      @output: JSX
      */
      const getTabTextStyle = (active) => {
          if(active){
            return {color: COLORS.whiteColor}
          } else {
            return {color: COLORS.primaryColor}
          }
      }

      /*
      @input: boolean
      @output: JSX
      */
      const getTabButtonStyle = (active)  => {
          if(active){
            return {borderColor: COLORS.primaryColor, backgroundColor: COLORS.primaryColor}
          } else {
            return {borderColor: COLORS.primaryColor}
          }
      }

      /*
      @output: JSX
      */
      const renderTabs = () => {
        return(
          <View style={{flexDirection: 'row', marginTop: 20, paddingHorizontal: 20}}>
              <TouchableOpacity style={[styles.tabButtons, getTabButtonStyle(activeTab == TEXTS.activeTab.pending? true: false)]} 
                    onPress={()=>{setActiveTab(TEXTS.activeTab.pending)}}>
                    <Text style={getTabTextStyle(activeTab == TEXTS.activeTab.pending? true: false)}>{TEXTS.activeTab.pending}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tabButtons, getTabButtonStyle(activeTab == TEXTS.activeTab.completed? true: false)]} 
                    onPress={()=>{setActiveTab(TEXTS.activeTab.completed)}}>
                    <Text style={getTabTextStyle(activeTab == TEXTS.activeTab.completed? true: false)}>{TEXTS.activeTab.completed}</Text>
              </TouchableOpacity>
        </View>
        )
      }

      /*
      @output: String
      */
      const getHeading = () => {
        if(activeTab == TEXTS.activeTab.pending){
          return TEXTS.headings.todaysTask
        } else {
          return TEXTS.headings.completedTasks
        }
      }

      /*
      @output: JSX
      */
      const renderHeader = () => {
          return (
            <View style={styles.headerView}>
                <View>
                      <View>
                            <Text>Welcome Back,</Text>
                      </View>
                      <View>
                            <Text style={{fontSize: 20, fontWeight: '800'}}>James Sullivan</Text>
                      </View>
                </View>

                <View style={styles.dateView}>
                      <Text>{getFormattedDate()}</Text>
                </View>
            </View>
          )
      }
    
    /*
      @output: JSX
    */
    const renderDeleteAll = () => {
      return (
        <View style={styles.deleteAllView}>
                <Text style={styles.sectionTitle}>{getHeading()}</Text>
                <TouchableOpacity onPress={()=>{deleteAll()}}>
                    <Text>Delete</Text>
                </TouchableOpacity>
          </View>
      )
    }
    
    // Main rendering of TODO
    return (
        <SafeAreaView style={styles.container}>

          {renderHeader()}

          {renderTabs()}

        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >
  
              {/* Today's Tasks */}
              <View style={styles.tasksWrapper}>

                    {/* delete All */}
                    {renderDeleteAll()}
                    
                    {/* All TODOs will render here */}
                    <View style={styles.items}>
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

      </SafeAreaView>
    );
  }

export default Todo;
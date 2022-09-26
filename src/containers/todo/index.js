import React, {useState, useEffect, useRef} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput,
   TouchableOpacity, Keyboard, ScrollView, Platform, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from '../../components/Task';
import COLORS from '../../constants/Colors';
import TEXTS from '../../constants/Texts';
import uuid from 'react-native-uuid';

function Todo() {
    const [task, setTask] = useState({title: '', description: '', type: TEXTS.activeTab.pending, ID: ''});
    const [taskItems, setTaskItems] = useState([]);
    const [nullError, setNullError] = useState(false);
    const [activeTab, setActiveTab] = useState(TEXTS.activeTab.pending);
    const didMount = useRef(false);

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(TEXTS.STORAGE_KEY, jsonValue)
        } catch (e) {
          // saving error
        }
      }
    
      useEffect(()=>{
        // Add data to the async storage
        
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
        const data = await AsyncStorage.getItem(TEXTS.STORAGE_KEY)
        if(data && data.length > 0) {
            // value previously stored
            setTaskItems(JSON.parse(data))
        }
        } catch(e) {
        // error reading value
        }
    }
  

    const handleAddTask = () => {
        if(!task || task.title == ''){
           setNullError(true)
           return false
        }
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask({title: '', description: '', type: TEXTS.activeTab.pending, ID: ''});
      }
    
      const removeTask = (id) => {
        let itemsCopy = [...taskItems];
        let obj = itemsCopy.find(o => o.ID === id);
        let index = itemsCopy.indexOf(obj)

        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy)
      }

      const renderNullError = () => {
        if(nullError){
            return (<View style={styles.errorView}>
                <Text style={styles.errorText}>{TEXTS.errors.nullError}</Text>
            </View>)
        } else {
            return null
        }
      }

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

      const deleteAll = () => {
        setTaskItems([])
        AsyncStorage.removeItem(TEXTS.STORAGE_KEY);
      }

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

      const getTabTextStyle = (active) => {
          if(active){
            return {color: COLORS.whiteColor}
          } else {
            return {color: COLORS.primaryColor}
          }
      }

      const getTabButtonStyle = (active)  => {
          if(active){
            return {borderColor: COLORS.primaryColor, backgroundColor: COLORS.primaryColor}
          } else {
            return {borderColor: COLORS.primaryColor}
          }
      }

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

      const getHeading = () => {
        if(activeTab == TEXTS.activeTab.pending){
          return TEXTS.headings.todaysTask
        } else {
          return TEXTS.headings.completedTasks
        }
      }

    return (
        <SafeAreaView style={styles.container}>

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
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.sectionTitle}>{getHeading()}</Text>
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

        </SafeAreaView>
    );
  }


  const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
      },
      tasksWrapper: {
        paddingTop: 30,
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
        backgroundColor: COLORS.whiteColor,
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
      },
      addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: COLORS.whiteColor,
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
      },
      tabButtons: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 10,
        paddingVertical: 10
      }
  });

export default Todo;
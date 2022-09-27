import React, {useState, useEffect, useRef} from 'react';
import { KeyboardAvoidingView, Text, View, TextInput,
   TouchableOpacity, Keyboard, ScrollView, Platform, SafeAreaView } from 'react-native';
import styles from './styles';
import Header from '../../components/header/header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TEXTS from '../../constants/Texts';
import COLORS from '../../constants/Colors';

   function Details({ route, navigation }) {
   const [todo, setTodo] = useState({})
   const [taskItems, setTaskItems] = useState([]);
   const [updateError, setUpdateError] = useState(false);
   
   useEffect(()=>{
      setTodo(route.params.detailObj)
      getData()
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

   // For persisting the todos 
   const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(TEXTS.STORAGE_KEY, jsonValue)

      // After updating async storage, go back to todos page
        navigation.navigate('todo', {refresh: true})
      } catch (e) {
        // TODO: handle error
      }
    }

     const navigateBack = () => {
      navigation.navigate('todo')
     }
     
     const changeTextTitle = (text) => {
         let _todo = {...todo}
         _todo.title= text

         setTodo(_todo)
     }

     const changeTextDesc = (text) => {
         let _todo = {...todo}
         _todo.description= text

         setTodo(_todo)
      }
   
      const updateTodo = () => {
          if(!todo || todo.title.length < 1){
            setUpdateError(true)
            return false
          }
          
         let itemsCopy = [...taskItems];
         let obj = itemsCopy.find(o => o.ID === todo.ID);
         let index = itemsCopy.indexOf(obj)

         itemsCopy[index].title =  todo.title
         itemsCopy[index].description =  todo.description
         setTaskItems(itemsCopy)
         storeData(taskItems)
         Keyboard.dismiss()
      }

      /*
      @output: JSX
      */
      const renderErrorView = () => {
        if(updateError){
            return (<View style={styles.errorView}>
                <Text style={styles.errorText}>{TEXTS.errors.updateError}</Text>
            </View>)
        } else {
            return null
        }
      }

    return (
        <SafeAreaView style={styles.container}>
            <Header
            backButton= {true}
            handleBack = {()=>{navigateBack()}}
            preHeading='Add details or edit:'
            heading= {route.params.detailObj.title}
            />
            
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
           style={{flex: 1, marginTop: 20, paddingHorizontal: 20}}>
                  <Text style={{color: COLORS.primaryColor}}>Title</Text>

                  <TextInput 
                   style={styles.titleInput}
                   onChangeText={text => changeTextTitle(text)}
                   autoCorrect= {false}
                   value={todo.title}/>
                  
                  <Text style={{color: COLORS.primaryColor}}>Description</Text>
                  <TextInput 
                   multiline={true}
                   numberOfLines={5}
                   onChangeText={text => changeTextDesc(text)}
                   style={styles.descInput} 
                   autoCorrect= {false}
                   value={todo?.description}/>
                  
                  {renderErrorView()}

                  <TouchableOpacity style={styles.update} 
                    onPress={()=>{updateTodo()}}>
                    <Text style={{color: COLORS.whiteColor}}>{`Update`}</Text>
                  </TouchableOpacity>

            </KeyboardAvoidingView>

        </SafeAreaView>  
        )
   }

   export default Details
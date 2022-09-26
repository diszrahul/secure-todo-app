import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import TEXTS from '../constants/Texts';

const Task = (props) => {
  const {item, id} = props
  let checkValue = false
  if(item && item.type){
      if(item.type == TEXTS.activeTab.completed){
        checkValue = true
      } else {
        checkValue = false
      }
  }

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
              <Checkbox
              style={styles.checkBox}
              lineWidth={1}
              onFillColor={'#0052cc'}
              onCheckColor={'#fff'}
              onTintColor={'#0052cc'}
              tintColors={{
                true: '#0052cc',
                false: '#e1e1e1',
              }} // Android only prop
              animationDuration={0.1}
              onAnimationType={'fade'}
              value={checkValue}
              boxType="square"
              onValueChange={()=>{props.handleCheckBox(id)}}
            />
      </View>
      
      <View style={{flex: 4, flexWrap: 'wrap'}}>
            <Text style={styles.itemText}>{props.item.title}</Text>
      </View>

      <TouchableOpacity style={{flex: 0.5}} onPress={props.removeItem}>
            <View style={{flex: 1}}>
                <Text>-</Text>
            </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    alignItems: 'center',
    flex: 1
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  checkBox: {
    height: 22, 
    width: 22, 
    alignSelf: 'center',
    borderRadius:2
  },
});

export default Task;
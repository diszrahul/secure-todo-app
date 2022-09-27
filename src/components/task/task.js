import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import TEXTS from '../../constants/Texts';
import DeleteIcon from '../../assets/deleteIcon.svg'
import EditIcon from '../../assets/editIcon.svg'
import styles from './styles'

import Poke from '../../assets/characters/poke.svg';
import Anon from '../../assets/characters/anon.svg';
import Iron from '../../assets/characters/iron.svg';
import Koya from '../../assets/characters/koya.svg';
import Sama from '../../assets/characters/sama.svg';
import Scrm from '../../assets/characters/scrm.svg';
import Walt from '../../assets/characters/walt.svg';

const Task = (props) => {
  const {item} = props
  let checkValue = false
  if(item && item.type){
      if(item.type == TEXTS.activeTab.completed){
        checkValue = true
      } else {
        checkValue = false
      }
  }

  const getCharacter = (char) => {
    switch(char){
      case 'poke':
        return <Poke width='22' height='22' />
      case 'anon':
        return <Anon width='22' height='22' />
      case 'iron':
        return <Iron width='22' height='22' />
      case 'koya':
        return <Koya width='22' height='22' />
      case 'sama':
        return <Sama width='22' height='22' />
      case 'scrm':
        return <Scrm width='22' height='22' />
      case 'walt':
        return <Walt width='22' height='22' />
      default:
        return <Poke width='22' height='22' />
    }
  }

  return (
    <>
            <View style={styles.item}>
              <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                    {getCharacter(item.character)}
              </View>
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
                      onValueChange={()=>{props.handleCheckBox(item.ID)}}
                    />
              </View>
              
              <View style={{flex: 4, flexWrap: 'wrap'}}>
                    <Text style={styles.itemText}>{props.item.title}</Text>
              </View>

              <TouchableOpacity testID='editIcon' style={{flex: 1}} onPress={()=>{props.taskPressed(item.ID)}}>
                    <View style={{flex: 1, padding: 5}}>
                        <EditIcon width="15" height="15"/>
                    </View>
              </TouchableOpacity>

              <TouchableOpacity testID='deleteIcon' style={{flex: 0.5}} onPress={()=>{props.removeItem(item.ID)}}>
                    <View style={{flex: 1, padding: 5}}>
                        <DeleteIcon width="15" height="15"/>
                    </View>
              </TouchableOpacity>
            </View>
    </>
  )
}

export default Task;
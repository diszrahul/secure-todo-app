import React from 'react';
import {Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import {getFormattedDate} from '../../utils/helpers'
import BackIcon from '../../assets/backIcon.svg'
import COLORS from '../../constants/Colors';

 const renderHeader = (props) => {
        return (
          <View style={styles.headerView}>
              <View>
                   {props.backButton?
                    <TouchableOpacity style={styles.backButton} onPress={()=>{props.handleBack()}} >
                        <BackIcon color={COLORS.primaryColor} height={20} width={20}/>
                        <Text style={{color: COLORS.primaryColor}}>Back</Text>
                    </TouchableOpacity>: 
                    null}

                    <View style={{marginBottom: 10}}>
                          <Text style={{fontSize: 13, fontWeight: '500'}}>{props.preHeading}</Text>
                    </View>
                    <View>
                          <Text style={{fontSize: 20, fontWeight: '800'}}>{props.heading}</Text>
                    </View>
              </View>

              <View style={styles.dateView}>
                    <Text>{getFormattedDate()}</Text>
              </View>
          </View>
        )
    }

export default renderHeader
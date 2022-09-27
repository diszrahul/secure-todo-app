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
                    <TouchableOpacity style={{marginBottom: 10, marginLeft: -5}} onPress={()=>{props.handleBack()}} >
                        <BackIcon color={COLORS.primaryColor} height={20} width={20}/>
                    </TouchableOpacity>: 
                    null}

                    <View>
                          <Text>{props.preHeading}</Text>
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
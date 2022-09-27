import React from 'react';
import {Text, View } from 'react-native';
import styles from './styles';
import {getFormattedDate} from '../../utils/helpers'

      export const renderHeader = () => {
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
import {StyleSheet} from 'react-native';
import COLORS from '../constants/Colors';

const styles = StyleSheet.create({
    item: {
      backgroundColor: COLORS.whiteColor,
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
      backgroundColor: COLORS.bgColorGrey,
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
      borderColor: COLORS.bgColorGrey,
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
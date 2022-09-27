import {StyleSheet} from 'react-native';
import COLORS from '../../constants/Colors';

const styles = StyleSheet.create({
    headerView: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingHorizontal: 20, 
      paddingTop: 30,
    },
    dateView: {
      backgroundColor: COLORS.whiteColor,
      borderRadius: 8, 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 5,
      maxHeight: 40,
    },
    backButton: {
      marginBottom: 10, 
      marginLeft: -5, 
      flexDirection: 'row', 
      alignItems: 'flex-end'
    }
});

export default styles
import {StyleSheet} from 'react-native';
import COLORS from '../../constants/Colors';

const styles = StyleSheet.create({
    headerView: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingHorizontal: 20, 
      paddingTop: 20,
    },
    dateView: {
      backgroundColor: COLORS.whiteColor,
      borderRadius: 8, 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 5
    },
});

export default styles
import {StyleSheet} from 'react-native';
import COLORS from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        paddingTop: 20
      },
      headerView: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 20, 
        paddingTop: 20
      },
      dateView: {
        backgroundColor: COLORS.whiteColor,
        borderRadius: 8, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 5
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
        bottom: 20,
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
      },
      deleteAllView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
      }
  });

  export default styles;
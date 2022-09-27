import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../constants/Colors';
let windowWidth = Dimensions.get('window').width;

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
  titleInput: {
    height: 40,
    width: windowWidth*0.8,
    marginTop: 5,
    marginBottom: 12,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.whiteColor,
    borderColor: COLORS.primaryColor
  },
  descInput: {
    height: 150,
    width: windowWidth*0.8,
    marginBottom: 12,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.whiteColor,
    borderColor: COLORS.primaryColor
  },
  update: {
    borderColor: COLORS.primaryColor, 
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 10,
    paddingVertical: 10,
    width: windowWidth*0.8,
    marginTop: 20
  }
})

export default styles;
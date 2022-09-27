import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import * as LocalAuthentication from  'expo-local-authentication';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../../constants/Colors';
let windowWidth = Dimensions.get('window').width;
let logicalWidth = windowWidth * 0.9

export default function Auth({navigation}) {
  const [isBiometricSupported, setBiometricSupported] = useState(false)

  // For face detection or fingerporint scan
  useEffect(()=>{
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setBiometricSupported(compatible)
    })();
  })

  const fallBackToDefaultAuth = () => {
    Alert.alert('ID and Password feature coming soon!')
  }

  const alertComponent = (title, message, buttonText, buttonFunction) => {
    return Alert.alert(title, message, [
      {
        text: buttonText,
        onPress: buttonFunction
      }
    ])
  }

  const canLogin = () => {
    Alert.alert('Welcome to TODO App', 'Successfully logged in', [
      {
        text: 'Back',
        onPress: () => {
          Alert.alert('User cancelled Authetication by clicking back')
        }
      },
      {
        text: 'Ok',
        onPress: () => {navigation.navigate('todo')}
      }
    ])
  }

  const handleBiometricAuth = async () => {
    // check if hardware supports biometric
    const compatible = await LocalAuthentication.hasHardwareAsync();

    // Fallback to default authentication 
    if(!compatible){
      return alertComponent('Please enter your password', 'Biometric not supported', 'OK', ()=>{fallBackToDefaultAuth()})
    }

    // Check biometric types available
    let supportedBiometrics
    if(compatible){
      supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync()
    }

    // Check the Biometric types stored in user device
    const savedBiometric = await LocalAuthentication.isEnrolledAsync()
    if(!savedBiometric){
      return alertComponent(
        'Biometric record not found',
        'Please Login with password',
        'Ok',
        ()=> fallBackToDefaultAuth()
      )
    }

    // Authenticate with biometric
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Face ID/ Biometric',
      cancelLabel: 'cancel',
      disableDeviceFallback: false
    })

    if(biometricAuth){
      console.warn(biometricAuth)
      if(biometricAuth.error){
        if(biometricAuth.error == 'user_cancel'){
          Alert.alert('User cancelled Authetication. Please try again')
        } else{
          Alert.alert("Something went wrong!")
        }
      }
      if(biometricAuth.success){
        canLogin()
      }
    }

  }

  return (
    <SafeAreaView testID='001' style={styles.container}>
        <View style={styles.mainView}>
              <Text style={styles.todoHeading}>TODO APP</Text>
              <Text>{isBiometricSupported? 'Your Device is compaible with Biometrics'
              : 'Face or fingerprint scanner is available on this device'}</Text>

              <TouchableOpacity style={styles.login} onPress={()=>{handleBiometricAuth()}}>
                    <Text style={{color: COLORS.whiteColor}}>Login with Biometrics</Text>
              </TouchableOpacity>

              <StatusBar style="light" backgroundColor={COLORS.primaryColor} />
        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
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
  },
  todoHeading: {
    fontSize: 25, 
    fontWeight: '700', 
    marginBottom: 50
  },
  mainView: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  }
});

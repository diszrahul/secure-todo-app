import { useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as LocalAuthentication from  'expo-local-authentication';

export default function Auth({navigation}) {
  const [isBiometricSupported, setBiometricSupported] = useState(false)
  const [isAuthenticated, setAuthenticated] = useState(false)

  useEffect(()=>{
    const auth = LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with Face ID/ Biometric/ Pattern',
        fallbackLabel: 'Enter password'
      });
      auth.then(result => {
        setAuthenticated(result.success)
        navigation.navigate('todo')
      })
  },[])

  useEffect(()=>{
      (async () =>{
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setBiometricSupported(compatible)
      })
  })

  return (
    <View testID='001' style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

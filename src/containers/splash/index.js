import React, {useState, useEffect, useRef} from 'react';
import { KeyboardAvoidingView, Text, View, TextInput,
   TouchableOpacity, Keyboard, ScrollView, Platform, SafeAreaView } from 'react-native';
import Lottie from 'lottie-react-native';

function Splash({navigation}){

    return(
        <View style={{flex: 1}}>
            <Lottie
            autoPlay
            loop={false}
            resizeMode={'cover'}
            source={require('../../assets/animation/splash.json')}
            onAnimationFinish={()=>{navigation.navigate('auth')}}
            />
        </View>
       
    )
}
export default Splash;
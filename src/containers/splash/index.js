import React, {useState, useEffect, useRef} from 'react';
import { KeyboardAvoidingView, Text, View, TextInput,
   TouchableOpacity, Keyboard, ScrollView, Platform, SafeAreaView } from 'react-native';
import Lottie from 'lottie-react-native';

function Splash({navigation}){

    return(
        <Lottie
        autoPlay
        loop={false}
        source={require('../../assets/animation/splash.json')}
        onAnimationFinish={()=>{navigation.navigate('auth')}}
        />
    )
}
export default Splash;
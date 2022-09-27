import React from 'react';
import { View } from 'react-native';
import Lottie from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../../constants/Colors';

function Splash({navigation}){

    return(
        <View style={{flex: 1}}>
            <StatusBar style="light" backgroundColor={COLORS.primaryColor} />
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
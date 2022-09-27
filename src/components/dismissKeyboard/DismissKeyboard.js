/*
@Author: Rahul
@use: Use it to dismiss the keyboard, make it a topmost component
*/
import React from 'react';
import {TouchableWithoutFeedback, Keyboard } from 'react-native';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

export default DismissKeyboard;
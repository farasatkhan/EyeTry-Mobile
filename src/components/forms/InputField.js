import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export const InputField = ({ name,value,onChangeText, style ,secureTextEntry }) => {
  const inputStyle = {
    height: 48,
    width: 325,
    color:'#000',
    borderWidth: 1,
    borderColor: '#E9EDF4',
    backgroundColor: '#FCFDFE',
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 6,
    marginBottom:25, // default margin of 37
  };

  return (
    <TextInput
      style={[inputStyle,style]}
      placeholder={name}
      placeholderTextColor={'#ACB6BE'}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

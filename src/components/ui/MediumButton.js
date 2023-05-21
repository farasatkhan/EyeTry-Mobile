import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MediumButton = ({ onPress, title,style,color }) => {
    const buttonStyle = {
        height:40,
        width:142,
        backgroundColor: color || '#3056D3',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
      };
    const textStyle = {
        color: '#fff',
        fontSize: 16,
        fontWeight:'500'
    }
  return (
    <TouchableOpacity style={[buttonStyle,style]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};


export default MediumButton;

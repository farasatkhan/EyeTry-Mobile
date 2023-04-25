import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MediumButtonOutline = ({ onPress, title,style,color }) => {
    const buttonStyle = {
        height:40,
        width:142,
        backgroundColor: '#fff',
        borderWidth:1,
        borderColor: color  ||  '#3056D3',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
      };
    const textStyle = {
        color: color || '#3056D3',
        fontSize: 16,
        fontWeight:'600'
    }
  return (
    <TouchableOpacity style={[buttonStyle,style]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};


export default MediumButtonOutline;

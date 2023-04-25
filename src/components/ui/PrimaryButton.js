import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PrimaryButton = ({ onPress, title,style,color }) => {
  const buttonStyle = {
    height: 40,
    width: 315,
    backgroundColor: color  || '#000',
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



export default PrimaryButton;

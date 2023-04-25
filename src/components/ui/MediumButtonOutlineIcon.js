import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const MediumButtonOutlineIcon = ({ onPress, title, icon, style, color }) => {
  const buttonStyle = {
    height: 40,
    width: 142,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: color || '#3056D3',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  };
  const textStyle = {
    color: color || '#3056D3',
    fontSize: 16,
    fontWeight: '600',
    paddingRight: 10,
  };

  return (
    <TouchableOpacity style={[buttonStyle, style]} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={textStyle}>{title}</Text>
        <Ionicons name={icon} size={18} color={color || '#3056D3'} />
      </View>
    </TouchableOpacity>
  );
};

export default MediumButtonOutlineIcon;

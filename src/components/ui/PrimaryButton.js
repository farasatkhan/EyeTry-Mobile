import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PrimaryButton = ({ onPress, title,style }) => {
  return (
    <TouchableOpacity style={[styles.button,style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 315,
    backgroundColor: '#000',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PrimaryButton;

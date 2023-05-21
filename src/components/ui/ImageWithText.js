import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';

const ImageWithText = ({ imageSource, name,onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity onPress={onPress}>
        <Image source={require('../../assets/images/persons/person.png')} style={styles.image}  />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom:10
  },
  image: {
    width: 89,
    height: 89,
    borderRadius: 89/2,
  },
  name: {
    color:'#000',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'right',
    marginRight: 10,
    overflow:'hidden'
  },
});

export default ImageWithText;

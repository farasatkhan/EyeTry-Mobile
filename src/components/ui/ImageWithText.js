import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';

const ImageWithText = ({ imageSource='http://localhost:3000/uploads/profile_images/4ca697ceaa579c3708f49413a2a81314.jpg', name,onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity onPress={onPress}>
        <Image source={{uri:imageSource}} style={styles.image}  />
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

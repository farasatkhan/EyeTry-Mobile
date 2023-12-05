import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatHeader = ({ title, imageUrl, onPressBack }) => {
  const navigation = useNavigation();

  return ( 
    <View style={[styles.header]} >
      <TouchableOpacity onPress={onPressBack ? onPressBack : () => navigation.goBack()}>
        <Image source={require('../../assets/BackButton/back.png')} style={{height:24,width:24}} />
      </TouchableOpacity>
      <View style={styles.userInfo} >
        {
            imageUrl ? ( <Image source={{ uri: imageUrl }} style={styles.userImage} />) : (<Image source={require('../../assets/images/persons/person.png')} style={styles.userImage} />)
        }
       
        <Text style={styles.title}>Sammi Gul</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 70,
    backgroundColor: '#FFFFFF', // Change this to your desired header color
    
  },
  backButton: {
    fontSize: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatHeader;

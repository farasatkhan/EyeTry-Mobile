import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ConversationsHeader = ({ onPressBack }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title} className='mx-auto '>Chats</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
    backgroundColor: '#FFFFFF', // Change this to your desired header color
    height: 60,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingRight:24
  },
});

export default ConversationsHeader;

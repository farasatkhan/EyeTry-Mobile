import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserDetailItem = ({ iconName, label, details }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.rowContainer}>
        <Ionicons name={iconName} size={20} color="#637381" />
        <Text style={styles.details}>{details}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  rowContainer: {
    borderWidth:1,
    borderColor:"#E0E0E0",
    borderRadius:10,
    paddingVertical:11,
    paddingLeft:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize:17,
    fontWeight:'500',
    color:'#212B36',
    marginLeft:5,
    paddingBottom:10
  },
  details: {
    marginLeft: 10,
    fontSize:16,
    color:'#212B36'
  },
});

export default UserDetailItem;

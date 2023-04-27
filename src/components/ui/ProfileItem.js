import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ProfileItem = ({ iconName, name ,iconSize, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={iconSize} color="#000" />
      </View>
      <Text style={styles.settingName}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    height:48,
    borderRadius:8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom:11,
    // Shadow
    backgroundColor:'#fff',
      elevation: 3,
    shadowColor: '#000',
    shadowOffset:
    {
        width: 0,
        height: 3 
    },
    shadowOpacity: 0.24,
    shadowRadius: 8
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 25,
    marginLeft:15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingName: {
    fontSize: 18,
    color: '#000',
    fontWeight:'500'
  },
};

export default ProfileItem;

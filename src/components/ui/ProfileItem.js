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
    height:52,
    borderRadius:8,
    // borderWidth:1,
    // broderColor:'#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom:13,
    // Shadow
    backgroundColor:'#fff',
      elevation: 5,
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
    fontSize: 20,
    color: '#000',
    fontWeight:'500'
  },
};

export default ProfileItem;

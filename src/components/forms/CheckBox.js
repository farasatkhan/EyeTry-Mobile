import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const MyCheckBox = ({ label, label1,value, onChange,style }) => {
  return (
    <View style={[styles.container,style]}>
      <CheckBox 
        disabled={false}
        value={value}
        onValueChange={onChange}
      />
      <Text style={styles.label}>{label} <Text style={styles.label1}>{label1}</Text></Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf:'flex-start',
    flexDirection: 'row',
    alignItems:'center',
    paddingLeft:2
  },
  label: {
    color:"#637381",
    fontSize:16,
    paddingLeft: 8,
    paddingBottom:2,
    alignSelf:'center',
  },
  label1:{
    fontSize: 16,
    color:'#3056D3',
    fontWeight:'400'
  }
});

export default MyCheckBox;

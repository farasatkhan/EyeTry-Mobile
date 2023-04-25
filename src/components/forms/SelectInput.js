import React, { useState } from 'react';
import { View, Text, StyleSheet,  } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SelectInput = ({labelVisible=true,label,selectedValue,setSelectedValue,array,style,labelStyle,pickerStyle}) => {
  return (
    <View style={styles.sec_container}>
        {labelVisible && <Text style={[styles.label,labelStyle]}>{label}</Text>
        }
        <View style={[styles.sec_container1,style]}>
            <Picker  style={[styles.picker,pickerStyle]}
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}
            >
                {array.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} style={{paddingLeft:20}} />
                ))}
            </Picker>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    sec_container:{
        alignItems:'center',
    },
    label:{
        fontSize:16,
        fontWeight:'500',
        color:'#000',
        paddingVertical:12,
        alignSelf:'center'
    },
  sec_container1:{
    borderRadius:5,
    borderColor:'#E9EDF4',
    backgroundColor: '#FCFDFE',
    borderWidth:1,
    paddingLeft:10
  },
  picker:{
    width:120,
    height:50,
  }
});

export default SelectInput;

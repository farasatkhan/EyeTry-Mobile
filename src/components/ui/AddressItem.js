import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MediumButton from './MediumButton';
import MediumButtonOutline from './MediumButtonOutline';

const AddressItem = ({ handleEditAddress, handleDeleteAddress, addressLine, name,city,phoneNumber, isDefaultAddress }) => {
  
    // methods
    return (
      <View style={styles.card}>
        <Text style={styles.txt_bld}>{name}</Text>
        <Text style={styles.txt_normal}>{addressLine}</Text>
        <Text style={styles.txt_normal}>{city}</Text>
        <Text style={styles.txt_normal}>{phoneNumber}</Text>
        {isDefaultAddress && <Text style={styles.txt_normal}>This is your default address</Text>
        }
        
      <View style={styles.btn_container}>
        <MediumButtonOutline title='Edit' onPress={handleEditAddress} style={{width:'45%'}}   />
        <MediumButton title='Delete' color='#ff0000' onPress={handleDeleteAddress} style={{width:'45%'}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
card:{
    backgroundColor:"#fff",
    marginVertical:10,
    paddingVertical:20,
    paddingHorizontal:15,
    justifyContent:'space-evenly',
    alignItems:'flex-start',
    borderRadius:10,
// Shadow
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
btn_container:{
    flexDirection:'row',
    width:'100%',
    marginTop:15,
    justifyContent:'space-between',

},
txt_bld:{
    color:'#000',
    fontSize:16,
    fontWeight:'600',
    overflow:'hidden',
    padding:2
},
txt_normal:{
    fontSize:16,
    fontWeight:'500',
    color:'#637381',
    padding:2,
}
});

export default AddressItem;

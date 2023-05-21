import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MediumButton from './MediumButton';
import MediumButtonOutline from './MediumButtonOutline';

const PaymentMethodItem = ({ handleEditPaymentMethod, handleDeletePaymentMethod, cardType, name,cardNo,expDate,cvv}) => {
  
    // methods
    return (
      <View style={styles.card}>
        <Text style={styles.txt_bld}>{name}</Text>
        <Text style={styles.txt_normal}>{cardType}</Text>
        <Text style={styles.txt_normal}>{cardNo}</Text>
        <Text style={styles.txt_normal}>{expDate}</Text>
        <Text style={styles.txt_normal}>{cvv}</Text>
        <View style={styles.btn_container}>
            <MediumButtonOutline title='Edit' onPress={handleEditPaymentMethod} style={{width:'45%'}}  />
            <MediumButton title='Delete' color='#ff0000' onPress={handleDeletePaymentMethod} style={{width:'45%'}}/>
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

export default PaymentMethodItem;

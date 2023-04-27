import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MediumButton from './MediumButton';
import MediumButtonOutline from './MediumButtonOutline';

const GiftCardItem = ({ handleEditGiftCard, handleDeleteGiftCard, cardType,cardNo,cardValue}) => {
  
    // methods
    return (
      <View style={styles.card}>
        <View style={styles.row}>
            <Text style={styles.txt_bld}>Gift Card No.</Text>
            <Text style={styles.txt_normal}>{cardNo}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.txt_bld}>Value</Text>
            <Text style={styles.txt_normal}>{cardValue}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.txt_bld}>Type</Text>
            <Text style={styles.txt_normal}>{cardType}</Text>
        </View>

        <View style={styles.btn_container}>
            <MediumButtonOutline title='Edit' onPress={handleEditGiftCard} style={{width:'40%'}}  />
            <MediumButton title='Delete' color='#ff0000' onPress={handleDeleteGiftCard} style={{width:'40%'}}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
card:{
    width:'100%',
    overflow:'hidden',
    backgroundColor:"#fff",
    marginVertical:10,
    paddingVertical:20,
    paddingHorizontal:10,
    justifyContent:'space-evenly',
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
    justifyContent:'space-evenly',

},
txt_bld:{
    color:'#000',
    fontSize:16,
    fontWeight:'600',
    overflow:'hidden',
    padding:2
},
row:{
    flexDirection:'row', 
    justifyContent:'space-between',
    padding:10
},
txt_normal:{
    fontSize:16,
    fontWeight:'400',
    color:'#000',
    padding:2,
    alignSelf:'flex-end',
    textAlign:'right'

}
});

export default GiftCardItem;

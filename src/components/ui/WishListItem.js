import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MediumButton from './MediumButton';
import MediumButtonOutline from './MediumButtonOutline';
import MediumButtonOutlineIcon from './MediumButtonOutlineIcon';

const WishListItem = ({ handleAddToCart, handleDelete, showItemDetails, name, price, description, image }) => {
  return (
    <View style={styles.card}>
      <View style={styles.btn_container}>
        <MediumButton title='Add to Cart' onPress={handleAddToCart} style={styles.med_btn} />
        <MediumButtonOutlineIcon icon={'trash'} title='Delete' onPress={handleDelete} style={styles.med_outline_btn} />
      </View>
      <Image source={require('../../assets/images/glasses/glasses.png')} style={styles.img} />
      <View style={styles.txt_container}>
        <Text style={styles.txt_bld}>{name}</Text>
        <Text style={styles.txt_bld}>RS{price}</Text>
      </View>
      <View style={styles.txt_container}>
        <Text style={{ fontWeight: '400', fontSize: 14, color: '#000' }}>{description}</Text>
        <MediumButtonOutline title='Details' onPress={showItemDetails} color='#000' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
card:{
    backgroundColor:"#fff",
    minHeight:311,
    width:335,
    paddingTop:21,
    marginVertical:10,
    paddingHorizontal:20,
    justifyContent:'flex-start',
    alignItems:'center',
    borderRadius:10,
    // overflow:'scroll',
    paddingBottom:15,
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
},
txt_container:{
    
    width:'100%',
    paddingBottom:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
},
img:{
    width:276,
    height:155,
    marginTop:10
},
med_outline_btn:{
    marginLeft:7,
},
med_btn:{
    marginRight:7,
},
txt_bld:{
    
    color:'#000',
    fontSize:20,
    fontWeight:'600',
    marginRight:15,
    overflow:'hidden'
},
});

export default WishListItem;

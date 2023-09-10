import * as React from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  Alert,

} from 'react-native';

// importing form components
import Container from '../../components/ui/Container';
import HorizontalDivider from '../../components/ui/HorizontalDivider';
import { InputField } from '../../components/forms/InputField';
import PrimaryButtonOutline from '../../components/ui/PrimaryButtonOutline';
import MediumButton from '../../components/ui/MediumButton';
import MediumButtonOutline from '../../components/ui/MediumButtonOutline';


const GiftCard = ({ navigation }) => {

    const [cardNo,setCardNo] = React.useState(null)
  
  const checkBalance = () => {
    Alert.alert("Check Balance")
}
const goToBuyGiftCards = () => {
    Alert.alert('Buy Gift Cards')
    navigation.navigate('BuyGiftCard')
    
  };

  const goToManageGiftCards = () => {
    Alert.alert("Manage GIft Cards");
    navigation.navigate("ManageGiftCard")

  }

  return (
<Container>
    <ScrollView contentContainerStyle={styles.sec_container}>
        <Text style={styles.txt}>
            To check your Gift Card/Store Credit balance, enter your card number or store credit
        </Text>
        <InputField name='Gift Card/Store Credit Number' style={styles.inputField} value={cardNo} onChangeText={setCardNo}/>
        <PrimaryButtonOutline title='Check Balance'  color='#3056D3' onPress={checkBalance} style={styles.primary_btn}/>
        <HorizontalDivider text='OR' lineStyle={{backgroundColor:'#ddd'}} style={styles.divider}/>
        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
            <MediumButton title='Buy Gift Cards' color='#000' onPress={goToBuyGiftCards} style={{width:'47%'}}/>
            <MediumButtonOutline title='Mange Gift Cards' color='#000' onPress={goToManageGiftCards} style={{width:'47%'}}/>
        </View>
    </ScrollView>
</Container>
  );
};

const styles = StyleSheet.create({
  sec_container: {
    alignItems: 'center',
    padding:'4%'
  },
  txt:{
    fontSize:16,
    fontWeight:'500',
    color:"#637381",
    textAlign:'center',
    marginBottom:'10%'
  },
  inputField:{
    marginBottom:'10%',
    borderColor:'#E0E0E0',
    width:'100%'
  },
  primary_btn:{
    marginBottom:'10%',
    width:'100%'
},
divider:{
    marginBottom:'10%'
}


});

export default GiftCard;

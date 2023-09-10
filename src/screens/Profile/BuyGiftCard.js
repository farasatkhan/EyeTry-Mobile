import * as React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,

} from 'react-native';

// importing form components
import Container from '../../components/ui/Container';
import PrimaryButton from '../../components/ui/PrimaryButton';
import SelectInput from '../../components/forms/SelectInput';

const BuyGiftCard = ({ navigation }) => {

    const [selectedType, setSelectedType] = React.useState(null);
    const [selectedCardValue, setSelectedCardValue] = React.useState(null);

    const types = ['Sunglasses','Prescriptionglasses','Frames','VirtualStore']
    const cardValues = ['20 USD','50 USD','100 USD','200 USD']

  const buyGiftCard = () => {
    Alert.alert("Buy Gift Cards");

  }

  return (
<Container>
    <ScrollView contentContainerStyle={styles.sec_container}>
    <SelectInput
                label="Gift Card Type"
                array={types}
                selectedValue={selectedType}
                setSelectedValue={setSelectedType}
                pickerStyle={styles.select}
                labelStyle={{ alignSelf:'flex-start'}}
                style={{marginBottom:25,width:'100%',height:57}}
                containerStyle={{width:'100%'}}
           />
    <SelectInput
                label="Gift Card Value"
                array={cardValues}
                selectedValue={selectedCardValue}
                setSelectedValue={setSelectedCardValue}
                pickerStyle={styles.select}
                labelStyle={{ alignSelf:'flex-start'}}
                style={{marginBottom:25,width:'100%',height:57}}
                containerStyle={{width:'100%'}}
           />
       
        <PrimaryButton title='Buy Gift Card'  color='#3056D3' onPress={buyGiftCard} style={styles.primary_btn}/>
        
    </ScrollView>
</Container>
  );
};

const styles = StyleSheet.create({
  sec_container: {
    alignItems: 'center',
    padding:'4%'
  },
  select:{
    width:'100%'
  },
  primary_btn:{
    marginVertical:'4%',
    width:'100%'
},



});

export default BuyGiftCard;

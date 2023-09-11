import * as React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,

} from 'react-native';

// importing form components
import Container from '../../components/ui/Container';
import GiftCardItem from '../../components/ui/GiftCardItem';



const ManageGiftCard = ({ navigation }) => {


const handleDeleteGiftCard = () => {Alert.alert("Delete Gift Card")}
const handleEditGiftCard = () => {
    Alert.alert("Edit GIft card");
}
  return (
<Container>
    <ScrollView contentContainerStyle={styles.sec_container}>
        <GiftCardItem cardNo='5678-9012-3456-7890' cardValue='200 USD' cardType='Sunglasses' handleDeleteGiftCard={handleDeleteGiftCard} handleEditGiftCard={handleEditGiftCard} />
    </ScrollView>
</Container>
  );
};

const styles = StyleSheet.create({
  sec_container: {
    alignItems: 'center',
    padding:'4%'
  },



});

export default ManageGiftCard;

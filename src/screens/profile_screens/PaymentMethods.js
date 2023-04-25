
import * as React from 'react';
import { ScrollView,View, Text,StyleSheet,Alert,Image,  TouchableOpacity, ScrollScro, ScrollViewllView } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import Container from '../../components/ui/Container';
import PaymentMethodItem from '../../components/ui/PaymentMethodItem';

export default function PaymentMethods({navigation}){

    // methods


    const handleAddNewPaymentMethod = () => {
        Alert.alert("Add new Payment Method")
        navigation.navigate('AddPaymentMethod')
    }
    const handleEditPaymentMethod = () => {
        Alert.alert("Edit Payment Method")
        navigation.navigate('EditPaymentMethod')
    }
    const handleDeletePaymentMethod = () => {
        Alert.alert("Delete Payment Method")
    }

    return(
        <Container>
            <ScrollView contentContainerStyle={styles.sec_container}>
                <PaymentMethodItem name='Abdul Sammi' cardType='Visa' cardNo='4599350720135209' expDate='12/26' cvv="565" 
                    handleEditPaymentMethod={handleEditPaymentMethod} handleDeletePaymentMethod={handleDeletePaymentMethod}/>
                 <PrimaryButton title='Add New Payment Method' onPress={handleAddNewPaymentMethod} style={{marginVertical:15}}/>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    sec_container:{
        alignItems:'center',
        padding:5
    },
})
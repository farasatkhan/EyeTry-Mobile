
import * as React from 'react';
import { ScrollView,View, Text,StyleSheet,Alert,Image,  TouchableOpacity, ScrollScro, ScrollViewllView } from 'react-native';
import MediumButton from '../../components/ui/MediumButton';
import MediumButtonOutline from '../../components/ui/MediumButtonOutline';
import PrimaryButton from '../../components/ui/PrimaryButton';
import PrimaryButtonOutline from '../../components/ui/PrimaryButtonOutline';
import Container from '../../components/ui/Container';
import MediumButtonOutlineIcon from '../../components/ui/MediumButtonOutlineIcon';
import WishListItem from '../../components/ui/WishListItem';
import AddressItem from '../../components/ui/AddressItem';
import { NativeStackView } from '@react-navigation/native-stack';

export default function AddressBook({navigation}){

    // methods


    const handleAddNewAddress = () => {
        Alert.alert("Add new Address")
        navigation.navigate('AddAddress')
    }
    const handleEditAddress = () => {
        Alert.alert("Edit Address")
        navigation.navigate('EditAddress')
    }
    const handleDeleteAddress = () => {
        Alert.alert("Delete Address")
    }

    return(
        <Container>
            <ScrollView contentContainerStyle={styles.sec_container}>
                <AddressItem name='Abdul Sammi' addressLine='4 Allen Street, Hostel City' city='Islamabad, 11000' phoneNumber='+92300-0000000' isDefaultAddress={true}
                    handleEditAddress={handleEditAddress} handleDeleteAddress={handleDeleteAddress}
                />
                <PrimaryButton title='Add New Address' onPress={handleAddNewAddress} style={{marginVertical:'5%',alignSelf:'center'}}/>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    sec_container:{
        padding:'4%',
    },
})
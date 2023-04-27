
import * as React from 'react';
import {StyleSheet,Alert, ScrollView} from 'react-native';
import PrimaryButtonOutline from '../../components/ui/PrimaryButtonOutline';
import Container from '../../components/ui/Container';
import LabelledTextInput from '../../components/forms/LabelledTextInput';

export default function AddAddress({navigation}){

    const [fName,setFName] = React.useState('')
    const [lName,setLName] = React.useState('')
    const [address,setAddress] = React.useState('')
    const [addressLine2,setAddressLine2] = React.useState('')

    // methods


    const next = () => {
        Alert.alert("Go to Add Address Screen 2")
        navigation.navigate("AddAddress2")
    }

    const showItemDetails = () => {Alert.alert('Show Details')}
    return(
        <Container >
            <ScrollView contentContainerStyle={{padding:'5%',}}>
                <LabelledTextInput label="First Name" placeholder="Abdul Sammi" value={fName} onChangeText={setFName} style={styles.input}/>
                <LabelledTextInput label="Last Name" placeholder="Gul" value={lName} onChangeText={setLName} style={styles.input}/>
                <LabelledTextInput label="Address" placeholder="City abc" value={address} onChangeText={setAddress} style={styles.input}/>
                <LabelledTextInput label="Address Line 2" placeholder="Appartment, suite, optional" value={addressLine2} onChangeText={setAddressLine2} style={styles.input}/>
                <PrimaryButtonOutline title="Next" onPress={next} color={'#3056D3'} style={styles.btn}/>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    input:{
        width:'100%',
        marginBottom:'5%'
    },
    btn:{
        alignSelf:'center',
        marginVertical:'4%'
    }
})
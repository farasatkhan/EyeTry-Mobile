
import * as React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';

import { addPaymentMethod, updatePaymentMethod } from '../../services/Profile/userapi';
import PrimaryButton from '../../components/ui/PrimaryButton';
import Container from '../../components/ui/Container';
import SelectInput from '../../components/forms/SelectInput';
import { InputField } from '../../components/forms/InputField';

export default function EditPaymentMethod2({ navigation, route }) {
    const id = route.params.id

    const [firstName, setFirstName] = React.useState(route.params?.firstName)
    const [lastName, setLastName] = React.useState(route.params?.lastName)
    const [address, setAddress] = React.useState(route.params?.address)
    const [city, setCity] = React.useState(route.params?.city)
    const [zip, setZip] = React.useState(route.params?.zip)
    const [state, setState] = React.useState(route.params?.state)

    const [selectedCountry, setSelectedCountry] = React.useState(route.params?.country)

    const countries = ['Pakistan', 'Afghanistan', 'UAE', 'USA', 'India', 'Bangladesh', 'Saudi-Arabia']

    // methods


    const handleUpdate = async () => {
        const paymentMethodData = {
            paymentType: 'Visa',
            nameOnCard: route.params.name,
            cardNumber: route.params.cardNo,
            expirationMonth: route.params.expDate.split('-')[1],
            expirationYear: route.params.expDate.split('-')[0],
            cvv: route.params.cvv,
            firstName: firstName,
            lastName: lastName,
            country: selectedCountry,
            city: city,
            address: address,
            state: state,
            zipCode: zip
        }
        try {
            await updatePaymentMethod(paymentMethodData, id)
            navigation.navigate('PaymentMethods')
        }
        catch (e) {
            console.log("Error while adding payment method", e)
        }
    }


    return (
        <Container >
            <ScrollView style={{ padding: '4%' }}>
                <View >
                    <Text style={styles.txt}>Billing Address </Text>
                    <InputField style={styles.input} name='First Name' value={firstName} onChangeText={setFirstName} />
                    <InputField style={styles.input} name='Last Name' value={lastName} onChangeText={setLastName} />
                    <InputField style={styles.input} name='Address' value={address} onChangeText={setAddress} />
                    <InputField style={styles.input} name='Zip Code' value={zip} onChangeText={setZip} keyboardType={'numeric'} />
                    <InputField style={styles.input} name='City' value={city} onChangeText={setCity} />
                    <InputField style={styles.input} name='State' value={state} onChangeText={setState} />
                    <SelectInput array={countries} labelVisible={false} selectedValue={selectedCountry} setSelectedValue={setSelectedCountry} pickerStyle={styles.pickerStyle} style={styles.selectInput} containerStyle={{ width: '100%' }} />
                    <PrimaryButton title="Save" onPress={handleUpdate} color={'#3056D3'} style={styles.btn} />
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    txt: {
        color: '#000',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginBottom: '8%'
    },
    input: {
        width: '100%',
        marginBottom: '6%',
        height: 'auto',
    },
    pickerStyle: {
        width: '100%',
        height: 'auto',
        // color:'#ACB6BE'
    },
    selectInput: {
        width: '100%',
        justifyContent: 'center',
    },
    btn: {
        alignSelf: 'center',
        marginVertical: '8%'
    }
})
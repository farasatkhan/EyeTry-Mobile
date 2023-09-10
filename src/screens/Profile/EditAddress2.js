
import * as React from 'react';
import { ScrollView, View, Text, StyleSheet, } from 'react-native';
import { updateAddress } from '../../services/Profile/userapi';

import PrimaryButton from '../../components/ui/PrimaryButton';
import Container from '../../components/ui/Container';
import LabelledTextInput from '../../components/forms/LabelledTextInput';
import SelectInput from '../../components/forms/SelectInput';

export default function EditAddress2({ navigation, route }) {

    console.log("route", route.params)

    const [city, setCity] = React.useState(route.params.city)
    const [postalCode, setPostalCode] = React.useState(route.params.zipCode)
    const [phone, setPhone] = React.useState(route.params.phone)

    const [selectedCountry, setSelectedCountry] = React.useState(route.params.selectedCountry)

    const countries = ['Pakistan', 'Afghanistan', 'UAE', 'USA', 'India', 'Bangladesh', 'Saudi-Arabia']

    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [successVisible, setSuccessVisible] = React.useState(false)
    const [successMessage, setSuccessMessage] = React.useState(null)


    // form validation 
    const validateForm = () => {
        if (!selectedCountry || !city || !postalCode || !phone) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        return true
    }

    const update = async () => {
        if (!validateForm()) {
            return
        }
        const addressData = {
            firstName: route.params.firstName,
            lastname: route.params.lastName,
            phone: phone,
            currentAddress: route.params.currentAddress,
            city: city,
            state: route.params.state,
            country: selectedCountry,
            zipCode: postalCode
        }

        console.log("Address Data to be sent for update", addressData)
        try {
            const response = await updateAddress(addressData, route.params.addressId)
            console.log("Response of adderss Update inside comp", response)
            if (response.status == 200) {
                setSuccessMessage("Address Added Successfully. Redirecting to My Addresses Screen")
                setSuccessVisible(true)

                setTimeout(() => {
                    navigation.navigate('AddressBook')
                }, 3000);

            }
        }
        catch (e) {
            console.error(e)
        }
    }



    return (
        <Container >
            <ScrollView contentContainerStyle={{ padding: '5%', }} onFocus={() => setErrorVisible(false)}>
                {errorVisible &&
                    <Text style={{ color: 'red', fontSize: 16, alignSelf: 'flex-start', paddingBottom: '2%' }}>
                        {errorMsg}
                    </Text>
                }
                {successVisible &&
                    <Text style={{ color: 'green', fontSize: 16, alignSelf: 'flex-start', textAlign: 'center', paddingBottom: '2%' }}>
                        {successMessage}
                    </Text>
                }
                <LabelledTextInput label="City" placeholder={city} value={city} onChangeText={setCity} style={styles.input} />
                <LabelledTextInput label="Postal Code" placeholder={postalCode} value={postalCode} onChangeText={setPostalCode} style={styles.input} />
                <LabelledTextInput label="Phone" placeholder={phone} value={phone} onChangeText={setPhone} style={styles.input} />
                {/* <LabelledTextInput label="Country" placeholder="Pakistan" value={country} onChangeText={setCountry} style={styles.input}/> */}
                <SelectInput array={countries} label={'Select Country'} selectedValue={selectedCountry} setSelectedValue={setSelectedCountry} labelStyle={{ alignSelf: 'flex-start', }} pickerStyle={{ width: '100%', }} style={{ width: '100%', justifyContent: 'center', height: 57 }} containerStyle={{ width: '100%' }} />
                <PrimaryButton title="Save" onPress={update} color={'#3056D3'} style={styles.btn} />
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginBottom: '5%',
        height: 57
    },
    btn: {
        alignSelf: 'center',
        marginVertical: '10%'
    }
})
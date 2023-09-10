
import * as React from 'react';
import { ActivityIndicator, StyleSheet, Alert, Text, View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import PrimaryButtonOutline from '../../components/ui/PrimaryButtonOutline';
import Container from '../../components/ui/Container';
import { InputField } from '../../components/forms/InputField';
import HorizontalDivider from '../../components/ui/HorizontalDivider'
import { viewSpecificPaymentMethod } from '../../services/Profile/userapi';

export default function EditPaymentMethod({ navigation, route }) {
    const paymentMethodId = route.params?.paymentId

    const [isDataFetched, setIsDataFetched] = React.useState(false)

    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')

    const [name, setName] = React.useState('')
    const [cardNo, setCardNo] = React.useState('')
    const [expDate, setExpDate] = React.useState('')
    const [cvv, setCVV] = React.useState('')

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [city, setCity] = React.useState('')
    const [zip, setZip] = React.useState('')
    const [state, setState] = React.useState('')

    const [selectedCountry, setSelectedCountry] = React.useState('Pakistan')

    // Fetching Address Data
    React.useEffect(() => {
        const setData = async () => {
            try {
                const response = await viewSpecificPaymentMethod(paymentMethodId);
                console.log("Payment Method Edit Component ", response)

                setName(response?.nameOnCard)
                setCardNo(response?.cardNumber)
                setExpDate(response?.expirationYear.split('T')[0])
                setCVV(response?.cvv)
                setFirstName(response.billingInfo.firstName)
                setLastName(response.billingInfo.lastName)
                setSelectedCountry(response.billingInfo.country)
                setAddress(response.billingInfo.address)
                setCity(response.billingInfo.city)
                setState(response.billingInfo.state)
                setZip(response.billingInfo.zipCode)
                setIsDataFetched(true)
            }
            catch (e) {
                console.log("Error ", e)
            }
        }
        setData()
    }, [])

    // form validation 
    const validateForm = () => {
        if (!name || !cardNo || !expDate || !cvv) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        return true
    }

    const next = () => {
        if (!validateForm()) {
            return
        }
        const data = {
            id: paymentMethodId,
            name: name,
            cardNo: cardNo,
            expDate: expDate,
            cvv: cvv,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            zip: zip,
            state: state,
            country: selectedCountry
        }
        navigation.navigate("EditPaymentMethod2", data)
    }


    return (
        isDataFetched ? (
            <Container >
                <ScrollView contentContainerStyle={{ backgroundColor: "#fff", padding: '4%' }} onFocus={() => setErrorVisible(false)} >
                    <HorizontalDivider text={'Express Checkout'} lineStyle={{ backgroundColor: '#E9EDF4' }} style={styles.express_cont} />
                    <View style={styles.btn_cont}>
                        <TouchableOpacity style={styles.btn_stripe}>
                            <Image source={require('../../assets/images/stripeLogo.png')} style={styles.img} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn_paypal}>
                            <Image source={require('../../assets/images/paypalLogo.png')} style={styles.img} />
                        </TouchableOpacity>
                    </View>
                    {errorVisible &&
                        <Text style={{ color: 'red', fontSize: 16, alignSelf: 'flex-start', paddingTop: '5%' }}>
                            {errorMsg}
                        </Text>
                    }
                    <Text style={styles.txt}>Credit Card Information </Text>
                    <InputField style={styles.input} name='Legal Name on Credit Card' value={name} onChangeText={setName} />
                    <InputField style={styles.input} name='Card Number' value={cardNo} onChangeText={setCardNo} />
                    <View style={styles.row}>
                        <InputField style={styles.input2} name='CVV' value={cvv} onChangeText={setCVV} />
                        <InputField style={styles.input2} name='Expiry Date' value={expDate} onChangeText={setExpDate} />
                    </View>
                    <PrimaryButtonOutline title="Next" onPress={next} color={'#3056D3'} style={styles.btn} />
                </ScrollView>
            </Container>
        ) : <ActivityIndicator size="large" style={{ marginTop: '50%' }} />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginBottom: '8%'
    },
    txt: {
        color: '#000',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginVertical: '8%'
    },
    input2: {
        width: '45%'
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    btn: {
        alignSelf: 'center',
        marginVertical: '5%'
    },
    btn_cont: {
        width: '100%',
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#E9EDF4',
        padding: '8%',
    },
    btn_stripe: {
        backgroundColor: '#6058F7',
        marginBottom: 20,
        width: '90%',
        alignSelf: 'center',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 22,
        borderRadius: 5
    },
    btn_paypal: {
        backgroundColor: '#FFC439',
        width: '90%',
        alignSelf: 'center',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 22,
        borderRadius: 5
    },
    img: {
        height: 30,
        width: 97
    },
    express_cont: {
        position: 'relative',
    }
})
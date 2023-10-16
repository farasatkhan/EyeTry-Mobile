
import * as React from 'react';
import { StyleSheet, Alert, Text, View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import PrimaryButtonOutline from '../../components/ui/PrimaryButtonOutline';
import Container from '../../components/ui/Container';
import { InputField } from '../../components/forms/InputField';
import HorizontalDivider from '../../components/ui/HorizontalDivider'

export default function AddPaymentMethod({ navigation }) {

    const [name, setName] = React.useState('')
    const [cardNo, setCardNo] = React.useState('')
    const [expDate, setExpDate] = React.useState('')
    const [cvv, setCVV] = React.useState('')

    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState(null)

    const validateInput = () => {
        if (name == '' || cardNo == '' || expDate == '' || cvv == '') {
            setErrorMessage("Please Fill out all the fields")
            setErrorVisible(true)
            return false
        }
        console.log(expDate.includes("-"))
        if (!expDate.includes("-")) {
            setErrorMessage("Invalid Date Entry, Date format is MM-YY")
            setErrorVisible(true)
            return false
        }
        return true

    }



    const next = () => {

        if (!validateInput()) {
            return
        }
        const paymentData = {
            paymentType: "Credit Card",
            nameOnCard: name,
            cardNumber: cardNo,
            expirationMonth: expDate.split('-')[0],
            expirationYear: expDate.split('-')[1],
            cvv: cvv,
        }
        console.log(paymentData)
        navigation.navigate("AddPaymentMethod2", paymentData)
    }


    return (
        <Container >
            <ScrollView contentContainerStyle={{ backgroundColor: "#fff", padding: '4%' }}  >
                <HorizontalDivider text={'Express Checkout'} lineStyle={{ backgroundColor: '#E9EDF4' }} style={styles.express_cont} />
                <View style={styles.btn_cont}>
                    <TouchableOpacity style={styles.btn_stripe}>
                        <Image source={require('../../assets/images/stripeLogo.png')} style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn_paypal}>
                        <Image source={require('../../assets/images/paypalLogo.png')} style={styles.img} />
                    </TouchableOpacity>
                </View>
                {
                    errorVisible &&
                    <Text style={{ color: 'red', fontSize: 16, alignSelf: 'flex-start', textAlign: 'center', alignSelf: 'center', paddingTop: '3%' }}>
                        {errorMessage}
                    </Text>
                }
                <Text style={styles.txt}>Credit Card Information</Text>
                <InputField style={styles.input} name='Legal Name on Credit Card' value={name} onChangeText={setName} />
                <InputField style={styles.input} name='Card Number' value={cardNo} onChangeText={setCardNo} />
                <View style={styles.row}>
                    <InputField style={styles.input2} name='CVV' value={cvv} onChangeText={setCVV} />
                    <InputField style={styles.input2} name='Expiry Date' value={expDate} onChangeText={setExpDate} />
                </View>
                <PrimaryButtonOutline title="Next" onPress={next} color={'#3056D3'} style={styles.btn} />
            </ScrollView>
        </Container>
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
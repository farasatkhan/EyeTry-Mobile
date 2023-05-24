
import * as React from 'react';
import {StyleSheet,Text, ScrollView,ActivityIndicator} from 'react-native';
import { getSpecificAddress } from '../../api/userapi';

import PrimaryButtonOutline from '../../components/ui/PrimaryButtonOutline';
import Container from '../../components/ui/Container';
import LabelledTextInput from '../../components/forms/LabelledTextInput';

export default function EditAddress({navigation,route}){
    const addressId = route.params.addressId
    
    const [fName,setFName] = React.useState('')
    const [lName,setLName] = React.useState('')
    const [address,setAddress] = React.useState('')
    const [state,setState] = React.useState('')
    const [city,setCity] = React.useState('')
    const [postalCode,setPostalCode] = React.useState('')
    const [phone,setPhone] = React.useState('')
    const [selectedCountry,setSelectedCountry] = React.useState(null)

    const [isDataFetched,setIsDataFetched] = React.useState(false)

    const [errorVisible,setErrorVisible] = React.useState(false)
    const [errorMsg,setErrorMsg] = React.useState('')

    // Fetching Address Data
    React.useEffect(()=>{
        const setData = async()=>{
            try{
                const address = await getSpecificAddress(addressId);
                console.log("Address inside component",address)
                setFName(address[0].firstName)
                setAddress(address[0].currentAddress)
                setState(address[0].state)
                setCity(address[0].city)
                setSelectedCountry(address[0].country)
                setPostalCode(address[0].zipCode)
                setPhone(address[0].phone)
                setIsDataFetched(true)
            }
            catch(e){
                throw e
            }
        }
        setData()
    },[])
    
    // form validation 
    const validateForm = () =>{
        if (!fName || !lName || !address || !state) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        return true
    }

    const next = () => {
        if (!validateForm()){
            return
        }
        const data = {
            addressId: addressId,
            firstName: fName,
            lastName: lName,
            currentAddress: address,
            state:state,
            city:city,
            phone: phone,
            country: selectedCountry,
            zipCode: postalCode
        }
        navigation.navigate("EditAddress2",data)
    }

    return(
        isDataFetched ? (
        <Container >
            <ScrollView contentContainerStyle={{padding:'5%',}} onFocus={()=>setErrorVisible(false)}>
            {errorVisible &&  
                <Text style={{color:'red',fontSize:16,alignSelf:'flex-start',paddingBottom:'2%'}}>
                        {errorMsg}
                </Text>
                } 
                <LabelledTextInput label="First Name" placeholder={fName} value={fName} onChangeText={setFName} style={styles.input}/>
                <LabelledTextInput label="Last Name" placeholder={lName} value={lName} onChangeText={setLName} style={styles.input}/>
                <LabelledTextInput label="Address" placeholder={address} value={address} onChangeText={setAddress} style={styles.input}/>
                <LabelledTextInput label="State" placeholder={state} value={state} onChangeText={setState} style={styles.input}/>
                <PrimaryButtonOutline title="Next" onPress={next} color={'#3056D3'} style={styles.btn}/>
            </ScrollView>
        </Container>
        ): <ActivityIndicator size="large" style={{marginTop:'50%'}}/>
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
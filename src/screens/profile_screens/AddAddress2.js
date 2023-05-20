
import * as React from 'react';
import { ScrollView,View, Text,StyleSheet,Alert,Image,  TouchableOpacity, ScrollScro, ScrollViewllView } from 'react-native';

import { addAddress } from '../../api/userapi';

// Importing Components
import PrimaryButton from '../../components/ui/PrimaryButton';
import Container from '../../components/ui/Container';
import LabelledTextInput from '../../components/forms/LabelledTextInput';
import SelectInput from '../../components/forms/SelectInput';

export default function AddAddress2({navigation,route}){
    console.log("ROute Data ",route.params)
    const {firstName, lastName, currentAddress,state} = route.params 
    const [city,setCity] = React.useState('')
    const [postalCode,setPostalCode] = React.useState('')
    const [phone,setPhone] = React.useState('')

    const [selectedCountry,setSelectedCountry] = React.useState(null)

    const countries = ['Pakistan','Afghanistan','UAE','USA','India','Bangladesh','Saudi-Arabia']

    const [errorVisible,setErrorVisible] = React.useState(false)
    const [errorMsg,setErrorMsg] = React.useState('')
    const [successVisible,setSuccessVisible] = React.useState(false)
    const [successMessage,setSuccessMessage] = React.useState(null)

    
    // form validation 
    const validateForm = () =>{
        if (!selectedCountry || !city || !postalCode || !phone) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        return true
    }


    const saveAddress =async () => {
        if(!validateForm()){
            return
        }
        const addressData = {
                firstName: firstName,
                lastname: lastName,
                phone: phone,
                currentAddress: currentAddress,
                city:city,
                state: state,
                country: selectedCountry,
                zipCode: postalCode
        }

        console.log("Address" ,addressData)
        try {
            const response = await addAddress(addressData)
            console.log("Response inside comp",response)
            if(response.status == 200){
                setSuccessMessage("Address Added Successfully. Redirecting to My Addresses Screen")
                setSuccessVisible(true)
                
                setTimeout(() => {
                    navigation.navigate('AddressBook')
                }, 3000);
                 
            }
        }
        catch (e){
            console.error(e)
        }
    }

    return(
        <Container >
            <ScrollView contentContainerStyle={{padding:'5%',}} onFocus={()=>setErrorVisible(false)}>
            {errorVisible &&  
                <Text style={{color:'red',fontSize:16,alignSelf:'flex-start',paddingBottom:'2%'}}>
                        {errorMsg}
                </Text>
                } 
             {successVisible &&  
                <Text style={{color:'green',fontSize:16,alignSelf:'flex-start',textAlign:'center',paddingBottom:'2%'}}>
                    {successMessage}
                </Text>
                    } 
                <LabelledTextInput label="City" placeholder="Islamabad" value={city} onChangeText={setCity} style={styles.input}/>
                <LabelledTextInput label="Postal Code" placeholder="11000" value={postalCode} onChangeText={setPostalCode} style={styles.input} keyboardType={'numeric'}/>
                <LabelledTextInput label="Phone" placeholder="+92300000000" value={phone} onChangeText={setPhone} style={styles.input}/>
                {/* <LabelledTextInput label="Country" placeholder="Pakistan" value={country} onChangeText={setCountry} style={styles.input}/> */}
                <SelectInput array={countries} label={'Select Country'} selectedValue={selectedCountry} setSelectedValue={setSelectedCountry} labelStyle={{alignSelf:'flex-start',}} pickerStyle={{width:'100%',height:'auto'}} style={{width:'100%',justifyContent:'center',height:57}} containerStyle={{width:'100%'}}/>
                <PrimaryButton title="Save" onPress={saveAddress} color={'#3056D3'} style={styles.btn}/>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    input:{
        width:'100%',
        marginBottom:'5%',
        height:'auto'
    },
    btn:{
        alignSelf:'center',
        marginVertical:'10%'
    }
})
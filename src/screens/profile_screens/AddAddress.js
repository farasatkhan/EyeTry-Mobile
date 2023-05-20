
import * as React from 'react';
import {StyleSheet,Alert,Text, ScrollView} from 'react-native';
import PrimaryButtonOutline from '../../components/ui/PrimaryButtonOutline';
import Container from '../../components/ui/Container';
import LabelledTextInput from '../../components/forms/LabelledTextInput';

export default function AddAddress({navigation}){

    const [fName,setFName] = React.useState('')
    const [lName,setLName] = React.useState('')
    const [address,setAddress] = React.useState('')
    const [state,setState] = React.useState('')

    const [errorVisible,setErrorVisible] = React.useState(false)
    const [errorMsg,setErrorMsg] = React.useState('')

    // methods
    
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
            firstName: fName,
            lastName: lName,
            currentAddress: address,
            state:state
        }
        navigation.navigate("AddAddress2",data)
    }
    return(
        <Container >
            <ScrollView contentContainerStyle={{padding:'5%',}} onFocus={()=>setErrorVisible(false)} >
                 {errorVisible &&  
                <Text style={{color:'red',fontSize:16,alignSelf:'flex-start',paddingBottom:'2%'}}>
                        {errorMsg}
                </Text>
                } 
                <LabelledTextInput label="First Name" placeholder="Abdul Sammi" value={fName} onChangeText={setFName} style={styles.input}/>
                <LabelledTextInput label="Last Name" placeholder="Gul" value={lName} onChangeText={setLName} style={styles.input}/>
                <LabelledTextInput label="Address" placeholder="City abc" value={address} onChangeText={setAddress} style={styles.input}/>
                <LabelledTextInput label="State" placeholder="Punjab" value={state} onChangeText={setState} style={styles.input}/>
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
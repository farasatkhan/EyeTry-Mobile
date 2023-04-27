import * as React from 'react';
import { View, Text,StyleSheet,Alert,Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../api/authapi';
import AsyncStorage from '@react-native-async-storage/async-storage';



// importing form components
import { InputField } from '../components/forms/InputField';
import PrimaryButton from '../components/ui/PrimaryButton';
import Container from '../components/ui/Container';
import Divider from '../components/ui/HorizontalDivider';
import SocialSignIn from '../components/forms/Social';
import MyCheckBox from '../components/forms/CheckBox';

const SignUpScreen = () =>{

    const navigation = useNavigation();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [errorVisible,setErrorVisible] = React.useState(false)
    const [errorMsg,setErrorMsg] = React.useState('')
    // handling checkbox 
    const [checked, setChecked] = React.useState(true);

    const handleCheckBoxChange = () => {
      setChecked(!checked);
    };

    // Form Validation
    const validateForm = () =>{
        // Validating user input
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorVisible(true)
            setErrorMsg('Please enter a valid email address.');
            return false;
        }
        if (password !== confirmPassword) {
            setErrorVisible(true)
            setErrorMsg('Passwords do not match');
            return false;
        }
        if (!checked) {
            setErrorVisible(true)
            setErrorMsg('Please agree to terms and conditions');
            return false;
        }
        return true
    }

    const handleSignUp = async () => {

    if (!validateForm()){
        return
    }
        // ApI Request const { user, accessToken, refreshToken,message }
    try {
        Alert.alert("Inside Try")
        const response = await registerUser(firstName, lastName, email, password, confirmPassword);
        
        const { user, accessToken, refreshToken } = response.data 

        // Saving to Async Storage
        AsyncStorage.setItem('user',JSON.stringify(user))
        AsyncStorage.setItem('accessToken',accessToken)
        AsyncStorage.setItem('refreshToken',refreshToken)

        console.log(user)
        console.log(accessToken)
        console.log(refreshToken)
        navigation.navigate('HomeTabScreen');
        } 
        catch (error) {
            console.error(error.response.status)
            if(error.response.status == 400){
                console.log("YOu May navigate to signin")
            }
            setErrorVisible(true)
            setErrorMsg(error.response.data.message)
            throw error
        }   
  };
    const goToSignIn= () =>{
        navigation.navigate('SignIn')
    }

    return(
        <Container >
            <ScrollView contentContainerStyle={sign_up_styles.sec_container} onFocus={()=>setErrorVisible(false)}>
                <Text style={sign_up_styles.title_txt}>
                    SignUp
                </Text>
               {errorVisible &&  
               <Text style={{color:'red',fontSize:16,alignSelf:'flex-start',padding:'4%'}}>
                    {errorMsg}
                </Text>
                }                    
                
                <InputField name={'First Name'} style={sign_up_styles.text_input}  onChangeText={setFirstName}/>
                <InputField name={'Last Name'} style={sign_up_styles.text_input} onChangeText={setLastName}/>
                <InputField name={'Email'} style={sign_up_styles.text_input} onChangeText={setEmail}/>
                <InputField name={'Password'} style={sign_up_styles.text_input} secureTextEntry={true} onChangeText={setPassword}/>
                <InputField name={'Confirm Password'} style={sign_up_styles.text_input} secureTextEntry={true} onChangeText={setConfirmPassword}/>
                <MyCheckBox
                label="Agree With"
                label1='Terms and Conditions'
                value={checked}
                onChange={handleCheckBoxChange}
                style={sign_up_styles.checkbox}
                />
                 
                <PrimaryButton title={'Sign Up'}  onPress={handleSignUp}/>

                <Divider text="SIGN UP WITH" style={sign_up_styles.divider_style}/>

                <SocialSignIn
                        onFacebookPress={()=>Alert.alert("FB")}
                        onTwitterPress={()=>Alert.alert("TWT")}
                        onGooglePress={()=>Alert.alert("G")}
                 />
                 <Text style={sign_up_styles.account_txt}>Already a member? <Text style={sign_up_styles.signin_txt} onPress={()=>goToSignIn()}>Sign In</Text></Text>

            </ScrollView>
        </Container>
    )

}

const sign_up_styles = StyleSheet.create({
    sec_container:{
        alignItems:'center',
        paddingHorizontal:(Dimensions.get('window').width*2/100),
    },
    title_txt:{
        marginVertical:Dimensions.get('window').height*2.5/100,
        fontWeight:'700',
        fontSize:26,
        color:'#000',
        fontFamily:'sans-serif'
    },
    text_input:{
        marginBottom:Dimensions.get('window').height*2.5/100,
        width:'100%'
    },
    divider_style:{
        marginVertical:Dimensions.get('window').height*3/100,
        width:'100%'
    },
    account_txt:{
        marginVertical:Dimensions.get('window').height*3/100,
        alignSelf:'flex-end',
        color:'#637381',
        fontSize:16
    },
    signin_txt:{
        color:'#3056D3',
        fontWeight:'500',
        fontSize:16
    },
    checkbox:{
        marginBottom:Dimensions.get('window').height*2.5/100,
        width:'100%'
    }

})

export default SignUpScreen;
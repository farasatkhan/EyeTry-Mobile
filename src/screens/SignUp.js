import * as React from 'react';
import { View, Text,StyleSheet,Alert,Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



// importing form components
import { InputField } from '../components/forms/InputField';
import PrimaryButton from '../components/ui/PrimaryButton';
import Container from '../components/ui/Container';
import Divider from '../components/ui/HorizontalDivider';
import SocialSignIn from '../components/forms/Social';
import MyCheckBox from '../components/forms/CheckBox';


const SignUpScreen = () =>{
    // const {height,width} = Dimensions.get('screen')

    // Alert.alert(height+" "+width)
    const navigation = useNavigation();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    // handling checkbox 
    const [checked, setChecked] = React.useState(true);

    const handleCheckBoxChange = () => {
      setChecked(!checked);
    };

    const handleSubmit = () => {
        // Validating user input
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
          Alert.alert('Please fill out all fields');
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          Alert.alert('Error', 'Please enter a valid email address.');
          return;
        }
        if (password !== confirmPassword) {
          Alert.alert('Passwords do not match');
          return;
        }
        if (!checked) {
          Alert.alert('Please agree to terms and conditions');
          return;
        }
    /*

    axios.post('http://localhost:3000/auth/register', {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        confirmpassword: confirmPassword,
    })
    .then(response => {
        Alert.alert("Inside Then")
        console.log('Success Sign up');
        console.log(response.data)
        navigation.navigate('HomeTabScreen');
      })
      .catch(error => {
        Alert.alert("Inside Catch")
        console.log(error.message)
        throw error;
    });
    */
      fetch('http://127.0.0.1:3000/auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                email: email,
                password: password,
                confirmpassword: confirmPassword,
            }),
        }).then(response => response.json())
        .then(response => {
            console.log('Success Sign up');
            console.log(response.data)
            navigation.navigate('HomeTabScreen');
        })
        .catch(error => {
            console.log(error.message);
            Alert.alert('Error', error.message);
        });
     
  };
    const goToSignIn= () =>{
        navigation.navigate('SignIn')
    }

    return(
        <Container>
            <ScrollView contentContainerStyle={sign_up_styles.sec_container}>
                <Text style={sign_up_styles.title_txt}>
                    SignUp
                </Text>
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
                 
                <PrimaryButton title={'Sign Up'}  onPress={handleSubmit}/>

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
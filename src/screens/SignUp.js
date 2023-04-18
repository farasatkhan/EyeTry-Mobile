import * as React from 'react';
import { View, Text,StyleSheet,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


// importing form components
import { InputField } from '../components/forms/InputField';
import PrimaryButton from '../components/ui/PrimaryButton';
import Container from '../components/ui/Container';
import Divider from '../components/ui/HorizontalDivider';
import SocialSignIn from '../components/forms/Social';
import MyCheckBox from '../components/forms/CheckBox';
import SignIn from './SignIn';

const SignUpScreen = () =>{
    const navigation = useNavigation();

    const [text,setText] = React.useState('');
    
    // handling checkbox 
    const [checked, setChecked] = React.useState(true);

    const handleCheckBoxChange = () => {
      setChecked(!checked);
    };

    const goToSignIn= () =>{
        navigation.navigate('SignIn')
    }

    return(
        <Container>
            <View style={sign_up_styles.sec_container}>
                <Text style={sign_up_styles.title_txt}>
                    SignUp
                </Text>
                <InputField name={'First Name'} style={sign_up_styles.text_input}  onChangeText={setText}/>
                <InputField name={'Last Name'} style={sign_up_styles.text_input} />
                <InputField name={'Email'} style={sign_up_styles.text_input}/>
                <InputField name={'Password'} style={sign_up_styles.text_input} secureTextEntry={true}/>
                <InputField name={'Confirm Password'} style={sign_up_styles.text_input} secureTextEntry={true}/>
                <MyCheckBox
                label="Agree With"
                label1='Terms and Conditions'
                value={checked}
                onChange={handleCheckBoxChange}
                style={sign_up_styles.checkbox}
                />
                 
                
                <PrimaryButton title={'Sign Up'}  onPress={()=>Alert.alert("Hi")}/>

                <Divider text="SIGN UP WITH" style={sign_up_styles.divider_style}/>

                <SocialSignIn
                        onFacebookPress={()=>Alert.alert("FB")}
                        onTwitterPress={()=>Alert.alert("TWT")}
                        onGooglePress={()=>Alert.alert("G")}
                 />
                 <Text style={sign_up_styles.account_txt}>Already a member? <Text style={sign_up_styles.signin_txt} onPress={()=>goToSignIn()}>Sign In</Text></Text>

            </View>
        </Container>
    )

}

const sign_up_styles = StyleSheet.create({
    sec_container:{
        alignItems:'center',
        paddingHorizontal:12
    },
    title_txt:{
        marginTop:30,
        marginBottom:35,
        fontWeight:'700',
        fontSize:26,
        color:'#000',
        fontFamily:'sans-serif'
    },
    text_input:{marginBottom:25},
    divider_style:{
        marginVertical:20,
    },
    account_txt:{
        marginTop:32,
        alignSelf:'flex-end',
        paddingRight:14,
        color:'#637381',
        fontSize:16
    },
    signin_txt:{
        color:'#3056D3',
        fontWeight:'500',
        fontSize:16
    },
    checkbox:{
        marginBottom:25
    }

})

export default SignUpScreen;
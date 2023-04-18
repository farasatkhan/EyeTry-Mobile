import * as React from 'react';
import { View, Text,StyleSheet,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// importing form components
import { InputField } from '../components/forms/InputField';
import PrimaryButton from '../components/ui/PrimaryButton';
import Container from '../components/ui/Container';

const ForgotPasswordScreen = () =>{
    const navigation = useNavigation();

    // Methods
    const goToSignIn= () =>{
        navigation.navigate('SignIn')
    }

    const sendResetLink = () => {
        navigation.navigate('ResetLink')
    }

    return(
        <Container>
            <View style={forgot_password_styles.sec_container}>
                <Text style={forgot_password_styles.title_txt}>
                    Forgot Password
                </Text>
                <Text style={forgot_password_styles.subtitle_txt}> 
                    Enter the email associated with your account.We’ll send an email with instructions to reset your password
                </Text>
                <InputField name={'Email'} on />
                <PrimaryButton title={'Send Password Reset Link'}  onPress={()=>sendResetLink()}/>
                 <Text style={forgot_password_styles.remember_txt}>Remember Password? <Text style={forgot_password_styles.login_txt} onPress={()=>goToSignIn()}>Back to Login</Text></Text>
            </View>
        </Container>
    )

}

const forgot_password_styles = StyleSheet.create({
    sec_container:{
        alignItems:'center',
        paddingHorizontal:12
    },
    title_txt:{
        marginTop:55,
        fontSize:26,
        color:'#000',
        fontWeight:'600'
    },
    subtitle_txt:{
        paddingHorizontal:7,
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        marginTop:23,
        marginBottom:30
    },

    remember_txt:{
        marginTop:32,
        alignSelf:'flex-end',
        paddingRight:14,
        color:'#637381',
        fontSize:16
    },
    login_txt:{
        color:'#3056D3',
        fontWeight:'500',
        fontSize:16
    },


})

export default ForgotPasswordScreen;
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

const SignInScreen = () =>{
    const navigation = useNavigation();
    const [text,setText] = React.useState('');
    
    // handling checkbox 
    const [checked, setChecked] = React.useState(true);

    const handleCheckBoxChange = () => {
      setChecked(!checked);
    };
    // Methods
    const goToSignUp= () =>{
        navigation.navigate('SignUp')
    }
    const goToForgotPassword = () =>{
        navigation.navigate('ForgotPassword')
    }
    const handleSignIn = () =>{
        navigation.navigate('HomeTabScreen')
    }
    return(
        <Container>
            <View style={sign_in_styles.sec_container}>
                <Text style={sign_in_styles.title_txt}>
                    Welcome to<Text style={sign_in_styles.title_txt1}> Eye</Text>Try
                </Text>
                <Text style={sign_in_styles.subtitle_txt}> 
                    Enjoy exclusive rewards and features by signing in
                </Text>
                <InputField name={'Email'}  onChangeText={setText}/>
                <InputField name={'Password'} value={text}/>
                <MyCheckBox
                label="Remember Me"
                value={checked}
                onChange={handleCheckBoxChange}
                style={sign_in_styles.checkbox}
                />
                 
                <PrimaryButton title={'Sign In'}  onPress={()=>handleSignIn()}/>

                <Text style={sign_in_styles.forgot_pass_txt} onPress={()=>goToForgotPassword()}>Forgot Password?</Text>

                <Divider text="SIGN IN WITH" style={sign_in_styles.divider_style}/>
                <SocialSignIn
                        onFacebookPress={()=>Alert.alert("FB")}
                        onTwitterPress={()=>Alert.alert("TWT")}
                        onGooglePress={()=>Alert.alert("G")}
                 />
                 <Text style={sign_in_styles.account_txt}>Don't have an account? <Text style={sign_in_styles.sigup_txt} onPress={()=>goToSignUp()}>Sign Up</Text></Text>

            </View>
        </Container>
    )

}

const sign_in_styles = StyleSheet.create({
    sec_container:{
        alignItems:'center',
        paddingHorizontal:12
    },
    title_txt:{
        marginTop:55,
        fontSize:26,
        color:'#000',
        fontFamily:'sans',
        fontFamily:''
    },
    title_txt1:{
        fontWeight:'700'
    },
    subtitle_txt:{
        marginVertical:32,
        fontSize:16,
        color:'#637381',
        textAlign:'center'
    },
    divider_style:{
        marginVertical:32,
    },
    forgot_pass_txt:{
        alignSelf:'flex-end',
        paddingRight:14,
        marginTop:32,
        fontSize:16,
        fontWeight:'500',
        color:'#000'
    },
    account_txt:{
        marginTop:32,
        alignSelf:'flex-end',
        paddingRight:14,
        color:'#637381',
        fontSize:16
    },
    sigup_txt:{
        color:'#3056D3',
        fontWeight:'500',
        fontSize:16
    },
    checkbox:{
        marginBottom:32
    }

})

export default SignInScreen;
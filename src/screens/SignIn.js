import * as React from 'react';
import { ScrollView, Text,StyleSheet,Alert,Dimensions } from 'react-native';
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
            <ScrollView contentContainerStyle={sign_in_styles.sec_container}>
                <Text style={sign_in_styles.title_txt}>
                    Welcome to<Text style={sign_in_styles.title_txt1}> Eye</Text>Try
                </Text>
                <Text style={sign_in_styles.subtitle_txt}> 
                    Enjoy exclusive rewards and features by signing in
                </Text>
                <InputField name={'Email'}  onChangeText={setText} style={sign_in_styles.input}/>
                <InputField name={'Password'} value={text} style={sign_in_styles.input}/>
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

            </ScrollView>
        </Container>
    )

}

const sign_in_styles = StyleSheet.create({
    sec_container:{
        alignItems:'center',
        paddingHorizontal:Dimensions.get('window').width*0.025,
        backgroundColor:"#fff"
    },
    title_txt:{
        marginTop:Dimensions.get('window').height*0.03,
        fontSize:26,
        color:'#000',
    },
    title_txt1:{
        fontWeight:'700'
    },
    input:{
        width:'100%',
        marginBottom:Dimensions.get('window').height*0.04,
    },
    subtitle_txt:{
        marginVertical:Dimensions.get('window').height*0.04,
        fontSize:16,
        color:'#637381',
        textAlign:'center'
    },
    divider_style:{
        marginVertical:Dimensions.get('window').height*0.04,
    },
    forgot_pass_txt:{
        alignSelf:'flex-end',
        paddingRight:14,
        marginTop:Dimensions.get('window').height*0.04,
        fontSize:16,
        fontWeight:'500',
        color:'#000'
    },
    account_txt:{
        marginTop:Dimensions.get('window').height*0.04,
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
        marginBottom:Dimensions.get('window').height*0.04,
    }

})

export default SignInScreen;
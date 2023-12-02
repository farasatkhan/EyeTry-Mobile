import * as React from 'react';
import { ScrollView, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { storeDataAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';
import { signInUser } from '../../services/Authentication/authapi';

// importing form components
import { InputField } from '../../components/forms/InputField';
import PrimaryButton from '../../components/ui/PrimaryButton';
import Container from '../../components/ui/Container';
import Divider from '../../components/ui/HorizontalDivider';
import SocialSignIn from '../../components/forms/Social';
import MyCheckBox from '../../components/forms/CheckBox';

const SignInScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('farasat@gmail.com');
    const [password, setPassword] = React.useState('pass123');
    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')

    // handling checkbox 
    const [checked, setChecked] = React.useState(true);

    const handleCheckBoxChange = () => {
        setChecked(!checked);
    };
    // Methods
    const goToSignUp = () => {
        navigation.navigate('SignUp')
    }
    const goToForgotPassword = () => {
        navigation.navigate('ForgotPassword')
    }

    const validateForm = () => {
        // Validating user input
        if (!email || !password) {
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
        return true
    }

    const handleSignIn = async () => {
        if (!validateForm()) {
            return
        }
        try {
            const response = await signInUser(email, password);
            const { user, accessToken, refreshToken } = response.data
            console.log("Access Token", accessToken)
            console.log("Refresf Token", refreshToken)
            AsyncStorage.setItem('user', JSON.stringify(user))
            AsyncStorage.setItem('accessToken', accessToken)
            AsyncStorage.setItem('refreshToken', refreshToken)
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HomeTabScreen' }],
                })
            );

        }
        catch (error) {
            setErrorVisible(true);
            setErrorMsg(error.response.data.message);
        }


    }

    return (
        <Container >
            <ScrollView contentContainerStyle={sign_in_styles.sec_container} onFocus={() => setErrorVisible(false)}>
                <Text style={sign_in_styles.title_txt}>
                    Welcome to<Text style={sign_in_styles.title_txt1}> Eye</Text>Try
                </Text>
                <Text style={sign_in_styles.subtitle_txt}>
                    Enjoy exclusive rewards & features by signing in
                </Text>
                {errorVisible &&
                    <Text style={{ color: 'red', fontSize: 16, alignSelf: 'flex-start', paddingBottom: '4%' }}>
                        {errorMsg}
                    </Text>
                }
                <InputField name={'Email'} value={email} onChangeText={setEmail} style={sign_in_styles.input} />
                <InputField name={'Password'} value={password} onChangeText={setPassword} secureTextEntry={true} style={sign_in_styles.input} />

                <MyCheckBox
                    label="Remember Me"
                    value={checked}
                    onChange={handleCheckBoxChange}
                    style={sign_in_styles.checkbox}
                />
                <Text style={sign_in_styles.forgot_pass_txt} onPress={() => goToForgotPassword()}>Forgot Password?</Text>

                <PrimaryButton title={'Sign In'} onPress={() => handleSignIn()} />


                {/* <Divider text="SIGN IN WITH" style={sign_in_styles.divider_style} /> */}
                {/* <SocialSignIn
                    onFacebookPress={() => Alert.alert("FB")}
                    onTwitterPress={() => Alert.alert("TWT")}
                    onGooglePress={() => Alert.alert("G")}
                /> */}
                <Text style={sign_in_styles.account_txt}>Don't have an account? <Text style={sign_in_styles.sigup_txt} onPress={() => goToSignUp()}>Sign Up</Text></Text>

            </ScrollView>
        </Container>
    )

}

const sign_in_styles = StyleSheet.create({
    sec_container: {
        alignItems: 'center',
        paddingHorizontal: '4%',
        backgroundColor: "#fff",
        paddingVertical:'18%', // comment this out incase of unhiding social signins

    },
    title_txt: {
        marginTop: Dimensions.get('window').height * 0.03,
        fontSize: 26,
        color: '#000',
    },
    title_txt1: {
        fontWeight: '700'
    },
    input: {
        width: '100%',
        marginBottom: Dimensions.get('window').height * 0.04,
    },
    subtitle_txt: {
        marginVertical: '7%',
        fontSize: 16,
        color: '#637381',
        textAlign: 'center'
    },
    divider_style: {
        marginVertical: Dimensions.get('window').height * 0.04,
    },
    forgot_pass_txt: {
        alignSelf: 'flex-end',
        paddingRight: 14,
        marginBottom: '7%',
        fontSize: 16,
        fontWeight: '500',
        color: '#000'
    },
    account_txt: {
        marginTop: Dimensions.get('window').height * 0.04,
        alignSelf: 'flex-end',
        paddingRight: 14,
        color: '#637381',
        fontSize: 16
    },
    sigup_txt: {
        color: '#3056D3',
        fontWeight: '500',
        fontSize: 16
    },
    checkbox: {
        marginBottom: '7%',
    }

})

export default SignInScreen;
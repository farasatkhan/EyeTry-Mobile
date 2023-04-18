import * as React from 'react';
import { View, Text,StyleSheet,Alert,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// importing form components
import PrimaryButton from '../components/ui/PrimaryButton';
import Container from '../components/ui/Container';

const ResetLinkScreen = () =>{
    const navigation = useNavigation();

    // Methods
    const goToSignIn= () =>{
        navigation.navigate('SignIn')
    }

    const resendResetLink = () => {
        Alert.alert('Re send reset link')
    }

    return(
        <Container>
            <View style={reset_link_styles.sec_container}>
                <Text style={reset_link_styles.title_txt}>
                    Email Sent !
                </Text>
                <Text style={reset_link_styles.subtitle_txt}> 
                    Check your inbox and open the received link to reset password
                </Text>
                <Image source={require('../assets/images/mailsent.png')} style={reset_link_styles.logo} />
                <PrimaryButton title={'Back to Login'}  onPress={()=>goToSignIn()}/>
                 <Text style={reset_link_styles.remember_txt}>Didn't Receive Email? <Text onPress={()=>resendResetLink()} style={reset_link_styles.login_txt} >Resend Email</Text></Text>
            </View>
        </Container>
    )

}

const reset_link_styles = StyleSheet.create({
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
        color:'#637381',
        paddingHorizontal:7,
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        marginTop:23,
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
    logo:{
        height:256,
        width:256,
        marginVertical:40
    }


})

export default ResetLinkScreen;
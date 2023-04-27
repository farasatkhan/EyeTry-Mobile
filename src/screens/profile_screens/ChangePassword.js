import * as React from 'react';
import { View,StyleSheet, Alert, ScrollView} from 'react-native';

// importing form components
import Container from '../../components/ui/Container';
import EditableUserDetailItem from '../../components/forms/EditableUserDetailItem';
import PrimaryButton from '../../components/ui/PrimaryButton';

const ChangePassword = ({navigation}) =>{
    const [pass,setPass] = React.useState('');
    const [newPass,setNewPass] = React.useState('');
    const [confirmNewPass,setConfirmNewPass] = React.useState('');

    // Methods
    
    handleChangePassword = () => {Alert.alert("Changed Password");navigation.navigate('ProfileScreenMain')};
    return(
        <Container >
            <ScrollView contentContainerStyle={styles.sec_cont}>
                <EditableUserDetailItem iconName="lock-closed" label="Current Password"  secureTextEntry={true}  onChangeText={setPass} value={pass}/>
                <EditableUserDetailItem iconName="lock-closed" label="New Password" secureTextEntry={true}  onChangeText={setNewPass} value={newPass}/>
                <EditableUserDetailItem iconName="lock-closed" label="Confirm Password" secureTextEntry={true}  onChangeText={setConfirmNewPass} value={confirmNewPass}/>
                <PrimaryButton title='Change Password' color='#3056D3'  onPress={handleChangePassword} style={styles.btn_style}/>
            </ScrollView>
        </Container>
    )

}

const styles = StyleSheet.create({
    btn_style:{alignSelf:'center',marginTop:32},
    sec_cont:{
        padding:'4%'
    }
})

export default ChangePassword;
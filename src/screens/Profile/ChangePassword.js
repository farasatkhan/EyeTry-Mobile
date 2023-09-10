import * as React from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';

// importing form components
import Container from '../../components/ui/Container';
import EditableUserDetailItem from '../../components/forms/EditableUserDetailItem';
import PrimaryButton from '../../components/ui/PrimaryButton';

import { changePassword } from '../../services/Profile/userapi';

const ChangePassword = ({ navigation }) => {
    const [pass, setPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [confirmNewPass, setConfirmNewPass] = React.useState('');
    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState(null)
    const [successVisible, setSuccessVisible] = React.useState(true)
    const [successMessage, setSuccessMessage] = React.useState(null)

    // Methods
    const handleChangePassword = async () => {
        try {
            const data = {
                "currentPassword": pass,
                "newPassword": newPass,
                "confirmPassword": confirmNewPass
            }
            const response = await changePassword(data);

            if (response.status == 204) {
                setSuccessMessage("Password Changed Successfully. Redirecting to Profile Screen")
                setSuccessVisible(true)

                setTimeout(() => {
                    navigation.navigate('MyDetails')
                }, 3000);

            }
        }
        catch (e) {
            setErrorVisible(true)
            setErrorMsg(e.response.data.message)
            console.error(e.response.data.message)
        }
    };

    return (
        <Container >
            <ScrollView contentContainerStyle={styles.sec_cont} onFocus={() => { setErrorVisible(false); setSuccessVisible(false) }}>
                {errorVisible &&
                    <Text style={{ color: 'red', fontSize: 16, alignSelf: 'flex-start', textAlign: 'center', paddingBottom: '3%' }}>
                        {errorMsg}
                    </Text>
                }
                {successVisible &&
                    <Text style={{ color: 'green', fontSize: 16, alignSelf: 'flex-start', textAlign: 'center', paddingBottom: '3%' }}>
                        {successMessage}
                    </Text>
                }
                <EditableUserDetailItem iconName="lock-closed" label="Current Password" secureTextEntry={true} onChangeText={setPass} value={pass} />
                <EditableUserDetailItem iconName="lock-closed" label="New Password" secureTextEntry={true} onChangeText={setNewPass} value={newPass} />
                <EditableUserDetailItem iconName="lock-closed" label="Confirm Password" secureTextEntry={true} onChangeText={setConfirmNewPass} value={confirmNewPass} />
                <PrimaryButton title='Change Password' color='#3056D3' onPress={handleChangePassword} style={styles.btn_style} />
            </ScrollView>
        </Container>
    )

}

const styles = StyleSheet.create({
    btn_style: { alignSelf: 'center', marginTop: 32 },
    sec_cont: {
        padding: '4%'
    }
})

export default ChangePassword;
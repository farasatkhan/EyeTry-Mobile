import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { deleteAccount } from '../../services/Profile/userapi';

// importing form components
import Container from '../../components/ui/Container';
import EditableUserDetailItem from '../../components/forms/EditableUserDetailItem';
import PrimaryButton from '../../components/ui/PrimaryButton';
import DeleteAccountModal from '../../components/ui/DeleteAccountModal';


const DeleteAccount = ({ navigation }) => {
  const [pass, setPass] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const handleConfirmDeleteAccount = async () => {
    // Handle the delete account logic here
    try {
      await deleteAccount(pass)
      setModalVisible(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        })
      );
    }
    catch (e) {
      throw e
    }


  };

  const handleCancelDeleteAccount = () => {
    setModalVisible(false);
  };



  return (
    <Container >
      <ScrollView contentContainerStyle={styles.sec_cont}>
        <Text style={styles.txt}>Account can not be recovered once deleted</Text>
        <EditableUserDetailItem iconName="lock-closed" label="Password" secureTextEntry={true} onChangeText={setPass} value={pass} />
        <PrimaryButton title='Delete Account' color='red' onPress={() => setModalVisible(true)} style={styles.btn_style} />
        <DeleteAccountModal visible={modalVisible} handleCancelDeleteAccount={handleCancelDeleteAccount} handleConfirmDeleteAccount={handleConfirmDeleteAccount} />
      </ScrollView>
    </Container>
  )

}

const styles = StyleSheet.create({
  btn_style: { alignSelf: 'center', marginTop: 32 },
  sec_cont: { marginTop: 25, padding: '4%' },
  txt: {
    fontSize: 16,
    color: "#637381",
    alignSelf: 'center',
    marginBottom: 36

  },
  alertContainer: {
    position: 'absolute',
    top: '50%',
    left: '46%',
    transform: [{ translateX: -150 }, { translateY: -100 }],
    width: 330,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset:
    {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.24,
    shadowRadius: 8
  },
  alertText: {
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: "#637381"
  },
  alertTextBold: {
    padding: 20,
    fontWeight: '600',
    fontSize: 24,
    color: '#000'
  },
  alertButtonsContainer: {
    flexDirection: 'row',

  },
})

export default DeleteAccount;
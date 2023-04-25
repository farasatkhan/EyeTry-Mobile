import React from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';

import MediumButtonOutline from '../../components/ui/MediumButtonOutline';
import MediumButton from '../../components/ui/MediumButton';

const DeleteAccountModal = ({
  visible,
  handleCancelDeleteAccount,
  handleConfirmDeleteAccount,
}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.alertContainer}>
          <Image
            source={require('../../assets/images/caution.png')}
            style={{ height: 60, width: 60 }}
          />
          <Text style={styles.alertTextBold}>Delete Your Account</Text>
          <Text style={styles.alertText}>
            Confirm Account Deletion! Once deleted, your account can’t be recovered?
          </Text>
          <View style={styles.alertButtonsContainer}>
            <MediumButtonOutline
              title="Cancel"
              color="black"
              style={{ marginRight: 20 }}
              onPress={handleCancelDeleteAccount}
            />
            <MediumButton
              title="Delete"
              color="red"
              onPress={handleConfirmDeleteAccount}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
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
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.24,
    shadowRadius: 8,
  },
  alertText: {
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#637381',
  },
  alertTextBold: {
    padding: 20,
    fontWeight: '600',
    fontSize: 24,
    color: '#000',
  },
  alertButtonsContainer: {
    flexDirection: 'row',
  },
});

export default DeleteAccountModal;

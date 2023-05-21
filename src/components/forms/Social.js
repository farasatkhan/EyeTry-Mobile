import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SocialSignIn = ({ onFacebookPress, onTwitterPress, onGooglePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={onFacebookPress}>
        <Image source={require('../../assets/images/facebook.png')} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity  onPress={onTwitterPress}>
        <Image source={require('../../assets/images/twitter.png')} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity  onPress={onGooglePress}>
        <Image source={require('../../assets/images/google.png')} style={[styles.logo,]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 85,
    height: 45,
  },
});

export default SocialSignIn;

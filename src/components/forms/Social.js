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
        <Image source={require('../../assets/images/google.png')} style={[styles.logo,{marginRight:0}]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 85,
    height: 45,
    marginRight:38
  },
});

export default SocialSignIn;

import React from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';

const Container = ({ children,style }) => {
  return (
    <View style={[styles.container,style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:'100%',
    paddingVertical: Dimensions.get('window').height*2/100,
    paddingHorizontal: Dimensions.get('window').width*2/100,
    backgroundColor: '#fff',
  },
});

export default Container;

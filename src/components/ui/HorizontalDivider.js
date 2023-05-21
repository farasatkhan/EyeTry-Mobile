import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Divider = ({ text,style,lineStyle }) => {
  return (
    <View style={[styles.container,style]}>
      <View style={[styles.line,lineStyle]} />
      <Text style={styles.text}>{text}</Text>
      <View style={[styles.line,lineStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ACB6BE',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 13,
    color: '#000',
  },
});

export default Divider;

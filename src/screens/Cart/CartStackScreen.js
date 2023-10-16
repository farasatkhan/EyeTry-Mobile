import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function CartStackScreen({ navigation }) {

  const goToProfile = () => {
    navigation.navigate('MyDetails')
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>CartScreen!</Text>
      <Button onPress={goToProfile} title='Go To Profile' />
    </View>
  );
}

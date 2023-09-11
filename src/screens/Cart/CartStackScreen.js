import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function CartStackScreen({ navigation }) {

  const goToProfile = () => {

  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>CartScreen!</Text>
      <Button onPress={goToProfile}>Go to profile</Button>
    </View>
  );
}

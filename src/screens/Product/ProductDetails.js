import * as React from 'react';
import { View, Text,StyleSheet,Alert,Image } from 'react-native';
import { useRoute } from '@react-navigation/native';



export default function ProductStackScreen() {
    const route = useRoute();
    const { id } = route.params;

    return (
      <View>
        <Text>Product Details</Text>
        <Text>Product ID: {id}</Text>
      </View>
    );
  }
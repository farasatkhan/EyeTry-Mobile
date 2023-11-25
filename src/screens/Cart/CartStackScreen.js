import * as React from 'react';
import { View, Text,StyleSheet,Alert,Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cart from '../../../src/screens/Order/Cart';


const ProductStack = createNativeStackNavigator();

export default function ProductStackScreen() {
    return (
      <ProductStack.Navigator screenOptions={{ headerTitleAlign: 'center' }} initialRouteName='cart'>
      <ProductStack.Screen name='Cart' component={Cart}/>
    </ProductStack.Navigator>
    );
  }
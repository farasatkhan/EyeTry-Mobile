import * as React from 'react';
import { View, Text,StyleSheet,Alert,Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTest from './HomeTest';
import ProductDetails from './ProductDetails';


const HomeTestStack = createNativeStackNavigator();

export default function ProductStackScreen() {
    return (
      <HomeTestStack.Navigator screenOptions={{ headerTitleAlign: 'center' }} initialRouteName='HomeTest'>
      <HomeTestStack.Screen name='HomeTest' component={HomeTest} options={{ title: "Test Home" }} />
      <HomeTestStack.Screen name='ProductDetails' component={ProductDetails} options={{ title: "Product Details" }} />
    </HomeTestStack.Navigator>
    );
  }
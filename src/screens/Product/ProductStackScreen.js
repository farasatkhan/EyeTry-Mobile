import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StripeProvider } from "@stripe/stripe-react-native";
import ShopScreen from '../ShopScreen';
import { getStripeApiKey } from '../../services/Orders/orderApi';

// Order Management Screens Imports
import LensCustomizationMain from '../../../src/screens/Order/SelectLensTypeComponent';
import WebView from '../../../src/screens/Order/WebView';
import SelectGlassesType from '../../../src/screens/Order/SelectGlassesType';
import Cart from '../../../src/screens/Order/Cart';
import StripeTest from '../../../src/screens/Order/StripeTest';

const ProductStack = createNativeStackNavigator();

export default function ProductStackScreen() {

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(() => {
    getStripeApiKeyData()
  }, [])

  const getStripeApiKeyData = async () => {
    const { data } = await getStripeApiKey()
    setStripeApiKey(data.stripeApiKey)
    console.log(data.stripeApiKey)
  }

  return (
    <StripeProvider publishableKey={stripeApiKey}>
      <ProductStack.Navigator screenOptions={{ headerTitleAlign: 'center' }} initialRouteName='ShopScreen'>
        <ProductStack.Screen name='ShopScreen' component={ShopScreen} />
        <ProductStack.Screen name='WebView' component={WebView} />
        <ProductStack.Screen name='LensCustomizationMain' component={LensCustomizationMain} options={{ title: "Lens Selection" }} />
        <ProductStack.Screen name='SelectGlassesType' component={SelectGlassesType} />
        <ProductStack.Screen name='Cart' component={Cart} />
        <ProductStack.Screen name='StripeTest' component={StripeTest} />
      </ProductStack.Navigator>
    </StripeProvider>
  );
}
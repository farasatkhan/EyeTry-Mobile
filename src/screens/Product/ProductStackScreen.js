import * as React from 'react';
import { View, Text,StyleSheet,Alert,Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShopScreen from '../ShopScreen';

// Order Management Screens Imports
import LensCustomizationMain from '../../../src/screens/Order/SelectLensTypeComponent';
import WebView from '../../../src/screens/Order/WebView';
import SelectGlassesType from '../../../src/screens/Order/SelectGlassesType';
import Cart from '../../../src/screens/Order/Cart';


const ProductStack = createNativeStackNavigator();

export default function ProductStackScreen() {
    return (
      <ProductStack.Navigator screenOptions={{ headerTitleAlign: 'center' }} initialRouteName='ShopScreen'>
      <ProductStack.Screen name='ShopScreen' component={ShopScreen} />
      <ProductStack.Screen name='WebView' component={WebView}/>
      <ProductStack.Screen name='LensCustomizationMain' component={LensCustomizationMain}/>
      <ProductStack.Screen name='SelectGlassesType' component={SelectGlassesType}/>
      <ProductStack.Screen name='Cart' component={Cart}/>
    </ProductStack.Navigator>
    );
  }
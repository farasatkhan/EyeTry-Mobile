import * as React from 'react';
import { View, Text,StyleSheet,Alert,Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importing Screens that are inside this WishListStack
import WishListsDetails from './WishListDetails';

const WishListStack = createNativeStackNavigator();
export default function WishListStackScreen() {
    return (
      <WishListStack.Navigator>
        <WishListStack.Screen name="WishListDetails" component={WishListsDetails} options={{title:"WishList",headerTitleAlign:'center', headerTitleStyle: {
            fontWeight: '700',fontSize:22
          },}} />
          
      </WishListStack.Navigator>
    );
  }


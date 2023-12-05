import React, {useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// importing screens
import HomeStackScreen from '../Home/HomeStackScreen';
import ProductStackScreen from '../Product/ProductStackScreen';
import CartStackScreen from '../Cart/CartStackScreen';
import ProfileStackScreen from '../Profile/ProfileStackScreen';
import WishListStackScreen from '../WishList/WishListStackScreen';

import HomeScreen from '../HomeScreen';
import ShopScreen from '../ShopScreen';
import Wishlist from '../WishList';

import { Button } from 'react-native-paper';

// stripe imports 
import { StripeProvider } from "@stripe/stripe-react-native";
import { getStripeApiKey } from '../../services/Orders/orderApi';

const Tab = createBottomTabNavigator();
const HomeTabScreen = () => {

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(() => {
    getStripeApiKeyData()
  }, [])

  const getStripeApiKeyData = async () => {
    const { data } = await getStripeApiKey()
    setStripeApiKey(data.stripeApiKey)
    // console.log(data.stripeApiKey)
  }

  return (
    <StripeProvider publishableKey={stripeApiKey}>
      <Tab.Navigator
        initialRouteName="HomeStackScreen"
        screenOptions={({ route }) => ({
          headerTitleAlign: 'center',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeStackScreen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'ProfileStackScreen') {
              iconName = focused ? 'person' : 'person-outline';
            }
            else if (route.name === 'ProductStackScreen') {
              iconName = focused ? 'glasses' : 'glasses-outline';
              return <Ionicons name={iconName} size={35} color={color} />;
            } else if (route.name === 'WishListStackScreen') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'CartStackScreen') {
              iconName = focused ? 'cart' : 'cart-outline';
              return <Ionicons name={iconName} size={30} color={color} />;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#7286D3',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="ProductStackScreen" component={ProductStackScreen} />
        <Tab.Screen name="WishListStackScreen" component={Wishlist} />
        <Tab.Screen name="HomeStackScreen" component={HomeScreen} />
        <Tab.Screen name="CartStackScreen" component={CartStackScreen} />
        <Tab.Screen name="ProfileStackScreen" component={ProfileStackScreen} />
      </Tab.Navigator>
    </StripeProvider>
  );
};
export default HomeTabScreen;

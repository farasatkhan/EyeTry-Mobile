import * as React from 'react';
import { Text, View ,StyleSheet,Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// importing screens
import HomeStackScreen from './home_screens/HomeStackScreen';
import ProductStackScreen from './product_screens/ProductStackScreen';
import CartStackScreen from './cart_screens/CartStackScreen';
import ProfileStackScreen from './profile_screens/ProfileStackScreen';
import WishListStackScreen from './wishlist_screens/WishListStackScreen';


const Tab = createBottomTabNavigator();
const HomeTabScreen = () =>{
    return(
        <Tab.Navigator  
        screenOptions={({ route }) => ({
            headerTitleAlign:'center',
            tabBarShowLabel:false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'HomeStackScreen') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'ProfileStackScreen') {
                iconName = focused ? 'person' : 'person-outline';
              }
              else if (route.name === 'ProductStackScreen') {
                iconName = focused ? 'md-glasses' : 'md-glasses';
                return <Ionicons name={iconName} size={35} color={color} />;
              }
              else if (route.name === 'WishListStackScreen') {
                iconName = focused ? 'heart' : 'heart-outline';
              }
              else if (route.name === 'CartStackScreen') {
                iconName = focused ? 'cart' : 'cart-outline';
                return <Ionicons name={iconName} size={30} color={color} />;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
              
            },
            tabBarActiveTintColor: '#7286D3',
            tabBarInactiveTintColor: 'gray',
          })}
        >
        <Tab.Screen name="ProductStackScreen" component={ProductStackScreen}  />
        <Tab.Screen name="WishListStackScreen" component={WishListStackScreen} />
        <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} />
        <Tab.Screen name="CartStackScreen" component={CartStackScreen} />
        <Tab.Screen name="ProfileStackScreen" component={ProfileStackScreen} />
        </Tab.Navigator>
    )

}
export default HomeTabScreen;
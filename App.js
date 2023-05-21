
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Importing Screens
import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import ResetLinkScreen from './src/screens/ResetLink';
import HomeTabScreen from './src/screens/HomeTabScreen'; {/* Home Component contains the tab navigation */}



const Stack = createNativeStackNavigator();



function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown:false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetLink" component={ResetLinkScreen} />
        <Stack.Screen name="HomeTabScreen" component={HomeTabScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';

import { getDataAsyncStorage } from './src/utils/AsynchronusStorage/asyncStorage';

// Importing Screens
import SignInScreen from './src/screens/Auth/SignIn';
import SignUpScreen from './src/screens/Auth/SignUp';
import ForgotPasswordScreen from './src/screens/Auth/ForgotPassword';
import ResetLinkScreen from './src/screens/Auth/ResetLink';
import HomeTabScreen from './src/screens/HomeTabNavigator/HomeTabScreen'; 
{/* Home Component contains the tab navigation */ }



const Stack = createNativeStackNavigator();




function App() {
  const [initialRouteName, setInitialRouteName] = React.useState('')
  const [loading, setIsLoading] = React.useState(true)




  React.useEffect(() => {
    const checkToken = async () => {
      const token = await getDataAsyncStorage("refreshToken")
      if (token === null) {
        setInitialRouteName('SignIn')
        setIsLoading(false)
      }
      else {
        setInitialRouteName('HomeTabScreen')
        setIsLoading(false)
      }
    }
    checkToken()
  }, [])

  return (
    loading ? <ActivityIndicator size="large" /> : (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetLink" component={ResetLinkScreen} />
          <Stack.Screen name="HomeTabScreen" component={HomeTabScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}

export default App;

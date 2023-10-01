
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

// Vission Assessments Screens
import VisionAssessmentHome from './src/screens/VisionAssessments/VisionAssessmentsHome';
import VisionAcuityInfo from './src/screens/VisionAssessments/VisionAcuityInfo';
import VisionAcuityTest from './src/screens/VisionAssessments/VisionAcuityTest';
import ColorBlindInfo from './src/screens/VisionAssessments/ColorBlindInfo';
import ColorBlindTest from './src/screens/VisionAssessments/ColorBlindTest';
import ContrastSensitivityInfo from './src/screens/VisionAssessments/ContrastSensitivityInfo';
import ContrastSensitivityTest from './src/screens/VisionAssessments/ContrastSensitivityTest';
import AstigmatismInfo from './src/screens/VisionAssessments/AstigmatismInfo';



const Stack = createNativeStackNavigator();


function App() {
  const [initialRouteName, setInitialRouteName] = React.useState('VisionAssessmentsHome')
  const [loading, setIsLoading] = React.useState(false)




  // React.useEffect(() => {
  //   const checkToken = async () => {
  //     const token = await getDataAsyncStorage("refreshToken")
  //     if (token === null) {
  //       setInitialRouteName('SignIn')
  //       setIsLoading(false)
  //     }
  //     else {
  //       setInitialRouteName('HomeTabScreen')
  //       setIsLoading(false)
  //     }
  //   }
  //   checkToken()
  // }, [])


  return (
    loading ? <ActivityIndicator size="large" /> : (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
          {/* Vission Assessments */}
          <Stack.Screen name="VisionAssessmentsHome" component={VisionAssessmentHome} />
          <Stack.Screen name="VisionAcuityInfo" component={VisionAcuityInfo} />
          <Stack.Screen name="VisionAcuityTest" component={VisionAcuityTest} />
          <Stack.Screen name="ColorBlindInfo" component={ColorBlindInfo} />
          <Stack.Screen name="ColorBlindTest" component={ColorBlindTest} />
          <Stack.Screen name="ContrastSensitivityInfo" component={ContrastSensitivityInfo} />
          <Stack.Screen name="ContrastSensitivityTest" component={ContrastSensitivityTest} />
          <Stack.Screen name="AstigmatismInfo" component={AstigmatismInfo} />
          
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

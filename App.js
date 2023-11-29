
import * as React from 'react';
import { View } from 'react-native';



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
import AstigmatismTest from './src/screens/VisionAssessments/AstigmatismTest';

import HomeScreen from './src/screens/HomeScreen';
import Glasses from './src/screens/Glasses';
import GlassesSearch from './src/screens/GlassesSearch';
import GlassesFilter from './src/screens/GlassesFilter';
import GlassesFilterFaceShape from './src/screens/GlassesFilterFaceShape';
import Product from './src/screens/Product';

import GlassesHeader from './src/components/ui/GlassesHeader';



const Stack = createNativeStackNavigator();

function App() {
  const [initialRouteName, setInitialRouteName] = React.useState('SignIn')
  const [loading, setIsLoading] = React.useState(false)

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
        <Stack.Navigator initialRouteName={'HomeTabScreen'}>
          {/* Vission Assessments */}
          <Stack.Screen name="VisionAssessmentsHome" component={VisionAssessmentHome} options={{ title: "Vision Assessments" }}/>
          <Stack.Screen name="VisionAcuityInfo" component={VisionAcuityInfo} options={{ title: "Vision Acuity Test" }}/>
          <Stack.Screen name="VisionAcuityTest" component={VisionAcuityTest} options={{ title: "Vision Acuity Test" }}/>
          <Stack.Screen name="ColorBlindInfo" component={ColorBlindInfo} options={{ title: "Color Blind Test" }}/>
          <Stack.Screen name="ColorBlindTest" component={ColorBlindTest} options={{ title: "Color Blind Test" }}/>
          <Stack.Screen name="ContrastSensitivityInfo" component={ContrastSensitivityInfo} options={{ title: "Contrast Sensitivity Test" }}/>
          <Stack.Screen name="ContrastSensitivityTest" component={ContrastSensitivityTest} options={{ title: "Contrast Sensitivity Test" }}/>
          <Stack.Screen name="AstigmatismInfo" component={AstigmatismInfo} options={{ title: "Astigmatism Test" }}/>
          <Stack.Screen name="AstigmatismTest" component={AstigmatismTest} options={{ title: "Astigmatism Test" }}/>
          
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ResetLink" component={ResetLinkScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeTabScreen" component={HomeTabScreen} options={{ headerShown: false }}/>
          
          <Stack.Screen name="Glasses" component={Glasses} options={{
            headerRight: () => <GlassesHeader/>,
          }}/>
          <Stack.Screen name='GlassesSearch' component={GlassesSearch} options={{headerShown: false}}/>
          <Stack.Screen name='GlassesFilter' component={GlassesFilter} options={{title: "Filters"}}/>
          <Stack.Screen name='GlassesFilterFaceShape' component={GlassesFilterFaceShape} options={{title: "Face Shape Detected"}}/>
          <Stack.Screen name='Product' component={Product}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}

export default App;

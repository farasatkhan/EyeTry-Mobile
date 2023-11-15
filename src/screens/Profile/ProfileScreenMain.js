import * as React from 'react';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../../services/Authentication/authapi';

import { uploadImageToServer, viewProfileImage } from '../../services/Profile/userapi';

// Importing UI Components
import Container from '../../components/ui/Container';
import ProfileItem from '../../components/ui/ProfileItem';
import ImageWithText from '../../components/ui/ImageWithText';
import { ScrollView, } from 'react-native';
import { storeDataAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';

import API_URL from '../../config/config';

export default function ProfileScreenMain({ navigation }) {

  const serverURL = API_URL;
  const [name, setName] = React.useState(null)
  const [img, setImg] = React.useState(null)

  const isFocused = useIsFocused()


  // Methods
  const handleUserImage = () => { navigation.navigate('UserImage') }
  const goToMyDetails = () => { navigation.navigate('MyDetails') }
  const goToMyPrescriptions = () => { navigation.navigate('PrescriptionsList') }
  const goToAddressBook = () => { navigation.navigate('AddressBook') }
  const goToPaymentMethods = () => { navigation.navigate('PaymentMethods') }
  const goToTryOnImages = () => { navigation.navigate("TryOnImages") }
  const goToGiftCard = () => { navigation.navigate("GiftCard") }

  const logout = async () => {
    try {
      await logoutUser()
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        })
      );
    } catch (e) {
      console.error("Some Error Occured while loggin user out ")
    }
  }


  React.useEffect(() => {
    getDataFromAsyncStorage = async () => {
      try {
        let user = await AsyncStorage.getItem('user')
        user = JSON.parse(user)
        setName(user.firstName)

        const img = await viewProfileImage();
        setImg(serverURL + img.location)
      }
      catch (e) {
        if (e?.response.status == 403) {
          console.log('Refreshing Token Failed')
          navigation.navigate('SignIn')
        }
        if (e?.response.status == 400) {
          console.log('No Image is present')
          setImg(null)
        }
      }
    }

    getDataFromAsyncStorage();
  }, [isFocused])


  return (
    name && (<Container >
      <ScrollView contentContainerStyle={{
        paddingHorizontal: '3%', flexDirection: 'column', flex: 1, justifyContent: 'space-evenly'
      }}>
        {
          img &&
          <ImageWithText name={name} onPress={handleUserImage} imageSource={img} />
        }{
          !img && <ImageWithText name={name} onPress={handleUserImage} />
        }
        <ProfileItem iconName={'cart'} name={'My Orders'} iconSize={24} />
        <ProfileItem iconName={'person-outline'} name={'My Details'} iconSize={24} onPress={goToMyDetails} />
        <ProfileItem iconName={'newspaper-outline'} name={'My Prescriptions'} iconSize={24} onPress={goToMyPrescriptions} />
        <ProfileItem iconName={'location-outline'} name={'Address Book'} iconSize={24} onPress={goToAddressBook} />
        <ProfileItem iconName={'cash-outline'} name={'Payment Methods'} iconSize={24} onPress={goToPaymentMethods} />
        <ProfileItem iconName={'image-outline'} name={'Try On Images'} iconSize={24} onPress={goToTryOnImages} />
        <ProfileItem iconName={'gift-outline'} name={'Gift Cards'} iconSize={24} onPress={goToGiftCard} />
        <ProfileItem iconName={'help'} name={'Help Center'} iconSize={24} />
        <ProfileItem iconName={'log-out-outline'} name={'Logout'} iconSize={24} onPress={logout} />
      </ScrollView>
    </Container>)
  );
}
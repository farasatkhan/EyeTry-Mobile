import * as React from 'react';
import { CommonActions,useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../../api/authapi';

import { uploadImageToServer, viewProfileImage } from '../../api/userapi';

// Importing UI Components
import Container from '../../components/ui/Container';
import ProfileItem from '../../components/ui/ProfileItem';
import ImageWithText from '../../components/ui/ImageWithText';
import { ScrollView, } from 'react-native';
import { storeDataAsyncStorage } from '../../utils/asyncStorage';



export default function ProfileScreenMain({navigation}) {
  
  const serverURL = 'http://localhost:3000'; 
  const [name,setName] = React.useState(null)
  const [img,setImg] = React.useState(null)

  const isFocused = useIsFocused()


  // Methods
  const handleUserImage = () => {navigation.navigate('UserImage')}
  const goToMyDetails = () => {navigation.navigate('MyDetails')}
  const goToMyPrescriptions = () => {navigation.navigate('PrescriptionsList')}
  const goToAddressBook = () => {navigation.navigate('AddressBook')}
  const goToPaymentMethods = () => {navigation.navigate('PaymentMethods')}
  const goToTryOnImages = () => {navigation.navigate("TryOnImages")}
  const goToGiftCard = () => {navigation.navigate("GiftCard")}

  const logout =async () => {
      await logoutUser()
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        })
      );
  }
  

  React.useEffect( ()=>{
    getDataFromAsyncStorage = async () => {
      try{
        let user = await AsyncStorage.getItem('user')
        user = JSON.parse(user)

        const img = await viewProfileImage();
        setImg(serverURL+img.location)
        setName(user.firstName)
        }
      catch (e){
        if (e.response.status == 400){
          console.log('No Image is present')
          setImg(null)
        }
        console.error(e)
      }
    }

    getDataFromAsyncStorage();
  },[isFocused])


    return (
      name && (<Container >
        <ScrollView contentContainerStyle={{paddingHorizontal:'3%',flexDirection:'column',flex:1,justifyContent:'space-evenly'
        }}>
          {
          img && 
            <ImageWithText name={name} onPress={handleUserImage} imageSource={img}/>
        }{
          !img && <ImageWithText name={name} onPress={handleUserImage}/>
        }
            <ProfileItem iconName={'md-cart'} name={'My Orders'} iconSize={24} />
            <ProfileItem iconName={'person-outline'} name={'My Details'} iconSize={24} onPress={goToMyDetails}/>
            <ProfileItem iconName={'ios-newspaper-outline'} name={'My Prescriptions'} iconSize={24} onPress={goToMyPrescriptions}/>
            <ProfileItem iconName={'location-outline'} name={'Address Book'} iconSize={24} onPress={goToAddressBook}/>
            <ProfileItem iconName={'md-cash-outline'} name={'Payment Methods'} iconSize={24} onPress={goToPaymentMethods}/>
            <ProfileItem iconName={'md-image-outline'} name={'Try On Images'} iconSize={24} onPress={goToTryOnImages}/>
            <ProfileItem iconName={'md-gift-outline'} name={'Gift Cards'} iconSize={24} onPress={goToGiftCard}/>
            <ProfileItem iconName={'md-help'} name={'Help Center'} iconSize={24}/>
            <ProfileItem iconName={'md-log-out-outline'} name={'Logout'} iconSize={24} onPress={logout}/>
        </ScrollView>
      </Container>)
    );
  }
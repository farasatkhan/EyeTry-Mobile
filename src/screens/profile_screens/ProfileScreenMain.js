import * as React from 'react';
// Importing UI Components
import Container from '../../components/ui/Container';
import ProfileItem from '../../components/ui/ProfileItem';
import ImageWithText from '../../components/ui/ImageWithText';
import { ScrollView,Dimensions } from 'react-native';


export default function ProfileScreenMain({navigation}) {

  // Methods
  const handleUserImage = () => {navigation.navigate('UserImage')}
  const goToMyDetails = () => {navigation.navigate('MyDetails')}
  const goToMyPrescriptions = () => {navigation.navigate('PrescriptionsList')}
  const goToAddressBook = () => {navigation.navigate('AddressBook')}
  const goToPaymentMethods = () => {navigation.navigate('PaymentMethods')}
  const goToTryOnImages = () => {navigation.navigate("TryOnImages")}
  const goToGiftCard = () => {navigation.navigate("GiftCard")}


    return (
      <Container >
        <ScrollView contentContainerStyle={{paddingHorizontal:'3%',flexDirection:'column',
        }}>
          <ImageWithText name='Abdul Sammi' onPress={handleUserImage}/>
          <ProfileItem iconName={'md-cart'} name={'My Orders'} iconSize={24} />
          <ProfileItem iconName={'person-outline'} name={'My Details'} iconSize={24} onPress={goToMyDetails}/>
          <ProfileItem iconName={'ios-newspaper-outline'} name={'My Prescriptions'} iconSize={24} onPress={goToMyPrescriptions}/>
          <ProfileItem iconName={'location-outline'} name={'Address Book'} iconSize={24} onPress={goToAddressBook}/>
          <ProfileItem iconName={'md-cash-outline'} name={'Payment Methods'} iconSize={24} onPress={goToPaymentMethods}/>
          <ProfileItem iconName={'md-image-outline'} name={'Try On Images'} iconSize={24} onPress={goToTryOnImages}/>
          <ProfileItem iconName={'md-gift-outline'} name={'Gift Cards'} iconSize={24} onPress={goToGiftCard}/>
          <ProfileItem iconName={'md-help'} name={'Help Center'} iconSize={24}/>
          <ProfileItem iconName={'md-log-out-outline'} name={'Logout'} iconSize={24}/>
        </ScrollView>
      </Container>
    );
  }
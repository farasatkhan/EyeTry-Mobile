import * as React from 'react';
// Importing UI Components
import Container from '../../components/ui/Container';
import ProfileItem from '../../components/ui/ProfileItem';
import ImageWithText from '../../components/ui/ImageWithText';


export default function ProfileScreenMain({navigation}) {

  // Methods
  const goToMyDetails = () => {navigation.navigate('MyDetails')}
  const goToMyPrescriptions = () => {navigation.navigate('PrescriptionsList')}
  const goToAddressBook = () => {navigation.navigate('AddressBook')}
  const goToPaymentMethods = () => {navigation.navigate('PaymentMethods')}
  const goToTryOnImages = () => {navigation.navigate("TryOnImages")}

    return (
      <Container >
        <ImageWithText name='Abdul Sammi'/>
        <ProfileItem iconName={'md-cart'} name={'My Orders'} iconSize={24} />
        <ProfileItem iconName={'person-outline'} name={'My Details'} iconSize={24} onPress={goToMyDetails}/>
        <ProfileItem iconName={'ios-newspaper-outline'} name={'My Prescriptions'} iconSize={24} onPress={goToMyPrescriptions}/>
        <ProfileItem iconName={'location-outline'} name={'Address Book'} iconSize={24} onPress={goToAddressBook}/>
        <ProfileItem iconName={'md-cash-outline'} name={'Payment Methods'} iconSize={24} onPress={goToPaymentMethods}/>
        <ProfileItem iconName={'md-image-outline'} name={'Try On Images'} iconSize={24} onPress={goToTryOnImages}/>
        <ProfileItem iconName={'md-gift-outline'} name={'Gift Cards'} iconSize={24}/>
        <ProfileItem iconName={'md-help'} name={'Help Center'} iconSize={24}/>
        <ProfileItem iconName={'md-log-out-outline'} name={'Logout'} iconSize={24}/>
      </Container>
    );
  }
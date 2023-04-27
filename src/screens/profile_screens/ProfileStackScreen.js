import * as React from 'react';
import { createNativeStackNavigator,HeaderBackButton } from '@react-navigation/native-stack';
// Importing Profile Screens
import ProfileScreenMain from './ProfileScreenMain';
import MyDetails from './MyDetails';
import EditDetails from './EditDetails';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

// Importing Prescription Related Screens
import PrescriptionsList from './PrescriptionsList';
import PrescriptionDetails from './PrescriptionDetails';
import EditPrescription from './EditPrescription';
import EditPrescription2 from './EditPrescription2';
import AddPrescription from './AddPrescription';
import AddPrescription2 from './AddPrescription2';

// Importing Address Book Screens
import AddressBook from './AddressBook';
import AddAddress from './AddAddress';
import AddAddress2 from './AddAddress2';
import EditAddress from './EditAddress';
import EditAddress2 from './EditAddress2';

// Payment Methods
import PaymentMethods from './PaymentMethods';
import AddPaymentMethod from './AddPaymentMethod';
import AddPaymentMethod2 from './AddPaymentMethod2';
import EditPaymentMethod from './EditPaymentMethod';
import EditPaymentMethod2 from './EditPaymentMethod2';

// TryOnImages
import TryOnImages from './TryOnImages';
import UploadTryOnImage from './UploadTryOnImage';
import EditTryOnImage from './EditTryOnImage';

// User Image
import UserImage from './UserImage';

// GiftCards
import GiftCard from './GiftCard';
import BuyGiftCard from './BuyGiftCard';
import ManageGiftCard from './ManageGiftCard';

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator screenOptions={{headerTitleAlign:'center'}} initialRouteName='ProfileScreenMain'>
        <ProfileStack.Screen name='ProfileScreenMain' component={ProfileScreenMain} options={{headerShown:false}}/>
        <ProfileStack.Screen name='MyDetails' component={MyDetails} />
        <ProfileStack.Screen name='EditDetails' component={EditDetails} />
        <ProfileStack.Screen name='DeleteAccount' component={DeleteAccount} />
        <ProfileStack.Screen name='ChangePassword' component={ChangePassword} />
        <ProfileStack.Screen name='PrescriptionsList' component={PrescriptionsList} />
        <ProfileStack.Screen name='PrescriptionDetails' component={PrescriptionDetails}  />
        <ProfileStack.Screen name='EditPrescription' component={EditPrescription} />
        <ProfileStack.Screen name='EditPrescription2' component={EditPrescription2} />
        <ProfileStack.Screen name='AddPrescription' component={AddPrescription} />
        <ProfileStack.Screen name='AddPrescription2' component={AddPrescription2} />
        <ProfileStack.Screen name='AddressBook' component={AddressBook} />
        <ProfileStack.Screen name='AddAddress' component={AddAddress} />
        <ProfileStack.Screen name='AddAddress2' component={AddAddress2} />
        <ProfileStack.Screen name='EditAddress' component={EditAddress} />
        <ProfileStack.Screen name='EditAddress2' component={EditAddress2} />
        <ProfileStack.Screen name='PaymentMethods' component={PaymentMethods} />
        <ProfileStack.Screen name='AddPaymentMethod' component={AddPaymentMethod} />
        <ProfileStack.Screen name='AddPaymentMethod2' component={AddPaymentMethod2} />
        <ProfileStack.Screen name='EditPaymentMethod' component={EditPaymentMethod} />
        <ProfileStack.Screen name='EditPaymentMethod2' component={EditPaymentMethod2} />
        <ProfileStack.Screen name='TryOnImages' component={TryOnImages} />
        <ProfileStack.Screen name='UploadTryOnImage' component={UploadTryOnImage} />
        <ProfileStack.Screen name='EditTryOnImage' component={EditTryOnImage} />
        <ProfileStack.Screen name='UserImage' component={UserImage} />
        <ProfileStack.Screen name='GiftCard' component={GiftCard} />
        <ProfileStack.Screen name='BuyGiftCard' component={BuyGiftCard} />
        <ProfileStack.Screen name='ManageGiftCard' component={ManageGiftCard} />
      </ProfileStack.Navigator>
    );
  }
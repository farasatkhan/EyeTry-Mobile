import * as React from 'react';
import { createNativeStackNavigator, HeaderBackButton } from '@react-navigation/native-stack';
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
import CheckIPD from './CheckIPD';

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerTitleAlign: 'center' }} initialRouteName='ProfileScreenMain'>
      <ProfileStack.Screen name='ProfileScreenMain' component={ProfileScreenMain} options={{ headerShown: false }} />

      <ProfileStack.Screen name='MyDetails' component={MyDetails} options={{ title: "My Details" }} />
      <ProfileStack.Screen name='EditDetails' component={EditDetails} options={{ title: "Edit Details" }} />

      <ProfileStack.Screen name='DeleteAccount' component={DeleteAccount} options={{ title: "Delete Account" }} />
      <ProfileStack.Screen name='ChangePassword' component={ChangePassword} options={{ title: "Change Password" }} />

      <ProfileStack.Screen name='PrescriptionsList' component={PrescriptionsList} options={{ title: "Prescriptions" }} />
      <ProfileStack.Screen name='PrescriptionDetails' component={PrescriptionDetails} options={{ title: "Prescription Details" }} />

      <ProfileStack.Screen name='EditPrescription' component={EditPrescription} options={{ title: "Edit Prescription" }} />
      <ProfileStack.Screen name='EditPrescription2' component={EditPrescription2} options={{ title: "Edit Prescription" }} />

      <ProfileStack.Screen name='AddPrescription' component={AddPrescription} options={{ title: "Add Prescription" }} />
      <ProfileStack.Screen name='AddPrescription2' component={AddPrescription2} options={{ title: "Add Prescription" }} />

      <ProfileStack.Screen name='AddressBook' component={AddressBook} options={{ title: "Address Book" }} />
      <ProfileStack.Screen name='AddAddress' component={AddAddress} options={{ title: "Add Address" }} />
      <ProfileStack.Screen name='AddAddress2' component={AddAddress2} options={{ title: "Add Address" }} />
      <ProfileStack.Screen name='EditAddress' component={EditAddress} options={{ title: "Edit Address" }} />
      <ProfileStack.Screen name='EditAddress2' component={EditAddress2} options={{ title: "Edit Address" }} />

      <ProfileStack.Screen name='PaymentMethods' component={PaymentMethods} options={{ title: "Payment Methods" }} />
      <ProfileStack.Screen name='AddPaymentMethod' component={AddPaymentMethod} options={{ title: "Add Payment Method" }} />
      <ProfileStack.Screen name='AddPaymentMethod2' component={AddPaymentMethod2} options={{ title: "Add Payment Method" }} />
      <ProfileStack.Screen name='EditPaymentMethod' component={EditPaymentMethod} options={{ title: "Edit Payment Method" }} />
      <ProfileStack.Screen name='EditPaymentMethod2' component={EditPaymentMethod2} options={{ title: "Edit Payment Method" }} />

      <ProfileStack.Screen name='TryOnImages' component={TryOnImages} options={{ title: "Try On Images" }} />
      <ProfileStack.Screen name='UploadTryOnImage' component={UploadTryOnImage} options={{ title: "Upload Try On Image" }} />
      <ProfileStack.Screen name='EditTryOnImage' component={EditTryOnImage} options={{ title: "Edit Try On Image" }} />

      <ProfileStack.Screen name='UserImage' component={UserImage} options={{ title: "Profile Image" }} />

      <ProfileStack.Screen name='GiftCard' component={GiftCard} options={{ title: "Gift Cards" }} />
      <ProfileStack.Screen name='BuyGiftCard' component={BuyGiftCard} options={{ title: "Buy Gift Cards" }} />
      <ProfileStack.Screen name='ManageGiftCard' component={ManageGiftCard} options={{ title: "Buy Gift Cards" }} />

      <ProfileStack.Screen name='CheckIPD' component={CheckIPD} options={{ title: "Check Your IPD" }} />
    </ProfileStack.Navigator>
  );
}
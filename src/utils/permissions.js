import {Linking,Platform,PermissionsAndroid} from 'react-native';

// Open Settings
const openAppSettings = () => {
    Linking.openSettings();
};

  
  // Requesting Camera Permissions
 export const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'EyeTry needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

// Request Files Permission
export const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'EyeTry needs write permission',
          },
          );
          // If WRITE_EXTERNAL_STORAGE Permission is granted
          // if (granted === 'never_ask_again'){
          //   Alert.alert("Please Give Storage Permissions")
          //   openAppSettings()
          // }
          const granted1 = 'granted'  // Setting permissions to true for testin
        // Need to check this on mobile phones, in emulators this permissions is automatically being set to never_ask_again
        return granted1 === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        Alert.alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

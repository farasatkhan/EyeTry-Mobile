import {
    launchCamera,
    launchImageLibrary
  } from 'react-native-image-picker';

import { requestCameraPermission } from './permissions';
import { requestExternalWritePermission } from './permissions'; 

// Capturing Image
export const captureImage = async (type) => {
let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    videoQuality: 'low',
    durationLimit: 30, //Video max duration in seconds
    saveToPhotos: true,
};
let isCameraPermitted = await requestCameraPermission();
let isStoragePermitted = await requestExternalWritePermission();
console.log("camera",isCameraPermitted)
console.log("storage",isStoragePermitted)
if (isCameraPermitted && isStoragePermitted) {
    console.log("Inside ")
    const res = await launchCamera(options, (response) => {
        console.log('Camera Response = ', response);
        if (response.didCancel) {
            console.log('User cancelled Camera');
            return;
        } else if (response.errorCode == 'camera_unavailable') {
            console.log('Camera not available on device');
            return;
        } else if (response.errorCode == 'permission') {
            console.log('Permission not satisfied');
            return;
        } else if (response.errorCode == 'others') {
            console.log(response.errorMessage);
            return;
        }
        else{
            console.log('uri -> ', response.assets[0].uri);
            return response
        }
    });
    return res
}
};

// Selecting Image from gallery
export const chooseFile =async (type) => {
let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
};
try {
    const res = await launchImageLibrary(options, (response) => {
        console.log('Gallery Response = ', response);
    
        if (response.didCancel) {
        console.log('User cancelled the image selection');
        return;
        } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
        return;
        } else if (response.errorCode == 'permission') {
        console.log('Permissions not satisfied');
        return;
        } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
        return;
        }
            console.log('uri -> ', response.assets[0].uri);
            return response
    });
    console.log("res",res)
    return res
}catch(e) {
    throw e
}
};
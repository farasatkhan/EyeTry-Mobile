import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';

import { requestCameraPermission } from '../Permissions/permissions';
import { requestExternalWritePermission } from '../Permissions/permissions';

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
    if (isCameraPermitted && isStoragePermitted) {
        const res = await launchCamera(options, (response) => {
            console.log('Camera Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled Camera');
                return null;
            } else if (response.errorCode == 'camera_unavailable') {
                console.log('Camera not available on device');
                return null;
            } else if (response.errorCode == 'permission') {
                console.log('Permission not satisfied');
                return null;
            } else if (response.errorCode == 'others') {
                console.log(response.errorMessage);
                return null;
            }
            else {
                console.log('uri -> ', response.assets[0].uri);
                return response
            }
        });
        return res
    }
};
/*
Selecting Image from gallery
returning null incase user cancels tha camera or image upload or some 
other error occurs , may change it later and handle it more effectively
null is having no effect it .. incase of cancel or error that specific respnonse is returned
*/
export const chooseFile = async (type) => {
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
                return null;
            } else if (response.errorCode == 'camera_unavailable') {
                console.log('Camera not available on device');
                return null;
            } else if (response.errorCode == 'permission') {
                console.log('Permissions not satisfied');
                return null;
            } else if (response.errorCode == 'others') {
                console.log(response.errorMessage);
                return null;
            }
            console.log('uri -> ', response.assets[0].uri);
            return response
        });
        console.log("res", res)
        return res
    } catch (e) {
        throw e
    }
};
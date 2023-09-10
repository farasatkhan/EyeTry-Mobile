import * as React from 'react';
import {
  ScrollView, Image, View, Text, StyleSheet, Alert, TouchableOpacity,
} from 'react-native';

import { getDataAsyncStorage, storeDataAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';
import { captureImage } from '../../utils/Camera/imageCapture';
import { chooseFile } from '../../utils/Camera/imageCapture';

// importing form components
import Container from '../../components/ui/Container';
import PrimaryButton from '../../components/ui/PrimaryButton';
import MediumButtonOutlineIcon from '../../components/ui/MediumButtonOutlineIcon';
import HorizontalDivider from '../../components/ui/HorizontalDivider';
import { uploadImageToServer, viewProfileImage } from '../../services/Profile/userapi';


const UserImage = ({ navigation }) => {

  const serverURL = 'http://localhost:3000';

  const [filePath, setFilePath] = React.useState({})
  const [isImageSet, setIsImageSet] = React.useState(false)
  const [localImage, setLocalImage] = React.useState(false)
  const [triggerRerender, setTriggerRerender] = React.useState(false)
  const [imageUri, setImageUri] = React.useState(null)
  const [successVisible, setSuccessVisible] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState(null)

  const handleImageCapture = async () => {
    try {
      const response = await captureImage('photo')
      console.log("capture res", response)
      if (!response?.didCancel && response?.errorCode == undefined) {
        setFilePath(response);
        setLocalImage(true)
      }
    }
    catch (e) {
      throw e
    }
  }
  const handleImageUpload = async () => {
    try {
      const response = await chooseFile('photo')
      if (!response?.didCancel && response?.errorCode == undefined) {
        console.log('URI', response.assets[0].uri)
        setFilePath(response);
        setLocalImage(true)
      }
    } catch (e) {
      throw e
    }

  };

  React.useEffect(() => {
    const setData = async () => {
      try {

        const img = await viewProfileImage();
        console.log(img.location)
        setImageUri(serverURL + img.location)
        setIsImageSet(true)

      }
      catch (e) {
        console.log('Error here')
        if (e.response.status == 400) {
          console.log('No User Image Present')
        }
        // Refresh token also expired so logout the user
        if (e.response.status == 403) {
          navigation.navigate("SignIn")
        }
        // throw e
      }
    }
    setData()
  }, [triggerRerender])

  const uploadImageToDB = async () => {
    try {
      const uploadedImg = await uploadImageToServer(filePath)
      await storeDataAsyncStorage('userimage', 'true')
      setSuccessMessage(uploadedImg)
      setSuccessVisible(true)
      setTriggerRerender(!triggerRerender)
      setLocalImage(false)
      setTimeout(() => {
        setSuccessVisible(false)
      }, 5000);
    }
    catch (err) {
      throw err
    }
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.sec_container}>
        {successVisible &&
          <Text style={{ color: 'green', fontSize: 16, alignSelf: 'flex-start', textAlign: 'center', alignSelf: 'center', paddingBottom: '2%' }}>
            {successMessage}
          </Text>
        }
        {localImage && (<Image source={{ uri: filePath.assets[0].uri }} style={styles.img} />)
        }

        {
          isImageSet && !localImage && <Image source={{ uri: imageUri }} style={styles.img} />
        }

        <MediumButtonOutlineIcon icon={'camera'} title={'Capture Image'} color={'#000'} style={{ width: '100%' }} onPress={() => handleImageCapture()} />
        <HorizontalDivider text={'OR'} lineStyle={{ color: '#ddd' }} style={{ marginVertical: 20 }} />
        <View style={styles.upload_container}>
          <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => handleImageUpload()}>
            <Image source={require('../../assets/images/upload.png')} style={styles.icon} />
            <Text style={styles.blue_txt}>Tap to upload image</Text>
          </TouchableOpacity>
        </View>
        <PrimaryButton title={'Save'} color={'#3056D3'} onPress={uploadImageToDB} />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  sec_container: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 17
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    marginVertical: 28
  },
  icon: {
    width: 45,
    height: 45
  },
  blue_txt: {
    color: '#3056D3',
    paddingTop: 15,
    textAlign: 'center'
  },
  upload_container: {
    borderWidth: 1.5,
    borderColor: '#3056D3',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderStyle: 'dashed',
    borderRadius: 6,
    marginBottom: 28
  },
  med_btn: {
    width: '100%',
    marginVertical: 20
  },


});

export default UserImage;

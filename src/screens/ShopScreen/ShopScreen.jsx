import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import {useNavigation} from '@react-navigation/native';

import Pressable from '../../wrapper_components/Pressable';

import {frameFinderPrediction} from '../../services/FrameFinder/FrameFinder';

const ShopScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen, options) => {
    navigation.navigate(screen, options);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const selectAndUploadImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage(response);
        uploadImage(response);
      }
    });
  };

  const uploadImage = async photo => {
    try {
      const formData = new FormData();

      const image = photo.assets[0];

      formData.append('file', {
        uri:
          Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
        name: image.fileName,
        type: image.type,
      });

      const response = await frameFinderPrediction(formData);

      if (response.status !== 200) {
        throw new Error('Failed to upload image!');
      }

      const faceShape = response.data.prediction;

      Alert.alert('Your Face Shape is: ', faceShape);

      handleNavigation('GlassesFilterFaceShape', {faceShape: faceShape});
    } catch (error) {
      Alert.alert('Error Occured while uploading image', error.message);
    }
  };

  const handleIPDMeasurement = () => {
    Alert.alert(
      'IPD Measurement',
      'Please take a picture of your face with a card or ruler placed on your forehead. Make sure that the card or ruler is parallel to the ground.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('CheckIPD'),
        },
      ],
    );
  }

  return (
    <SafeAreaView className="bg-white">
      <ScrollView>
        <Pressable
          onPress={() =>
            handleNavigation('Glasses', {glassesType: 'Eyeglasses'})
          }
          className="flex flex-row justify-between items-center mx-5 mt-5 bg-sky-100 rounded-lg shadow-lg shadow-black/40">
          <View className="pl-5">
            <Text className="text-black text-xl">Eyeglasses</Text>
          </View>
          <Image
            className="w-48 h-48 object-cover"
            resizeMode="contain"
            source={require('../../assets/shop_screen/eyeglasses.png')}
          />
        </Pressable>
        <Pressable
          onPress={() =>
            handleNavigation('Glasses', {glassesType: 'Sunglasses'})
          }
          className="flex flex-row justify-between items-center mx-5 mt-5 bg-sky-200 rounded-lg shadow-lg shadow-black/40">
          <View className="pl-5">
            <Text className="text-black text-xl">Sunglasses</Text>
          </View>
          <Image
            className="w-48 h-48 object-cover"
            resizeMode="contain"
            source={require('../../assets/shop_screen/sunglasses.png')}
          />
        </Pressable>
        <Pressable
          onPress={() => handleNavigation('VisionAssessmentsHome')}
          className={`flex flex-row justify-between items-center mx-5 mt-5 bg-sky-300 rounded-lg shadow-lg shadow-black/40`}>
          <View className="pl-5">
            <Text className="text-black text-xl">Vision</Text>
            <Text className="text-black text-xl">Assessment</Text>
          </View>
          <Image
            className="w-48 h-48 object-cover"
            source={require('../../assets/shop_screen/vision_assessment_2.png')}
          />
        </Pressable>
        <Pressable onPress={handleIPDMeasurement} className="flex flex-row justify-between items-center mx-5 mt-5 bg-sky-400 rounded-lg shadow-lg shadow-black/40">
          <View className="pl-5">
            <Text className="text-black text-xl">IPD</Text>
          </View>
          <Image
            className="w-48 h-48 object-cover"
            resizeMode="contain"
            source={require('../../assets/shop_screen/ipd.png')}
          />
        </Pressable>
        <Pressable
          onPress={selectAndUploadImage}
          className="flex flex-row justify-between items-center mx-5 mt-5 mb-5 bg-sky-500 rounded-lg shadow-lg shadow-black/40">
          <View className="pl-5">
            <Text className="text-black text-xl">Frame Finder</Text>
          </View>
          <Image
            className="w-48 h-48 object-cover"
            source={require('../../assets/shop_screen/frame_finder.png')}
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;

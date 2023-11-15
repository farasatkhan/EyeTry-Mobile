import React, {useState} from 'react';
import {View, Text, Image, SafeAreaView, ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Pressable from '../../wrapper_components/Pressable';

const ShopScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = screen => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView className="bg-white">
      <ScrollView>
        <Pressable className="flex flex-row justify-between items-center mx-5 mt-5 px-5 py-5 bg-blue-100 rounded-lg shadow-lg shadow-black/40">
          <Text className="text-black text-base">Eyeglasses</Text>
          <Image
            className="w-48 h-48 "
            source={require('../../assets/shop_screen/eyeglasses.png')}
          />
        </Pressable>
        <Pressable className="flex flex-row justify-between items-center mx-5 mt-5 px-5 py-5 bg-blue-100 rounded-lg shadow-lg shadow-black/40">
          <Text className="text-black text-base">Sunglasses</Text>
          <Image
            className="w-48 h-48 "
            source={require('../../assets/shop_screen/sunglasses.png')}
          />
        </Pressable>
        <Pressable
          onPress={() => handleNavigation('VisionAssessmentsHome')}
          className={`flex flex-row justify-between items-center mx-5 mt-5 px-5 py-5 bg-blue-100 rounded-lg shadow-lg shadow-black/40`}>
          <Text className="text-black text-base">Vision Assessment</Text>
          <Image
            className="w-48 h-48 object-cover"
            source={require('../../assets/shop_screen/vision_assessment_2.png')}
          />
        </Pressable>
        <Pressable className="flex flex-row justify-between items-center mx-5 mt-5 mb-5 px-5 py-5 bg-blue-100 rounded-lg shadow-lg shadow-black/40">
          <Text className="text-black text-base">IPD</Text>
          <Image
            className="w-48 h-48"
            source={require('../../assets/shop_screen/ipd.png')}
          />
        </Pressable>
        <Pressable className="flex flex-row justify-between items-center mx-5 mt-5 mb-5 px-5 py-5 bg-blue-100 rounded-lg shadow-lg shadow-black/40">
          <Text className="text-black text-base">Frame Finder</Text>
          <Image
            className="w-48 h-48"
            source={require('../../assets/shop_screen/frame_finder.png')}
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;

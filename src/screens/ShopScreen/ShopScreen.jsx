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
        <Pressable
          onPress={() => handleNavigation('Glasses')}
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
        <Pressable className="flex flex-row justify-between items-center mx-5 mt-5 bg-sky-200 rounded-lg shadow-lg shadow-black/40">
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
        <Pressable className="flex flex-row justify-between items-center mx-5 mt-5 bg-sky-400 rounded-lg shadow-lg shadow-black/40">
          <View className="pl-5">
            <Text className="text-black text-xl">IPD</Text>
          </View>
          <Image
            className="w-48 h-48 object-cover"
            resizeMode="contain"
            source={require('../../assets/shop_screen/ipd.png')}
          />
        </Pressable>
        <Pressable className="flex flex-row justify-between items-center mx-5 mt-5 mb-5 bg-sky-500 rounded-lg shadow-lg shadow-black/40">
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

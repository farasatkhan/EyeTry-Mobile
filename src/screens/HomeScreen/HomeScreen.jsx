import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Pressable from '../../wrapper_components/Pressable';

const raybanImages = [
  {
    key: 1,
    image: require('../../assets/home_screen/raybans/image_1.webp'),
  },
  {
    key: 2,
    image: require('../../assets/home_screen/raybans/image_2.webp'),
  },
  {
    key: 3,
    image: require('../../assets/home_screen/raybans/image_3.webp'),
  },
  {
    key: 4,
    image: require('../../assets/home_screen/raybans/image_4.webp'),
  },
  {
    key: 5,
    image: require('../../assets/home_screen/raybans/image_5.webp'),
  },
  {
    key: 6,
    image: require('../../assets/home_screen/raybans/image_6.webp'),
  },
];

const oakleyImages = [
  {
    key: 1,
    image: require('../../assets/home_screen/oakley/image_1.webp'),
  },
  {
    key: 2,
    image: require('../../assets/home_screen/oakley/image_2.webp'),
  },
  {
    key: 3,
    image: require('../../assets/home_screen/oakley/image_3.webp'),
  },
  {
    key: 4,
    image: require('../../assets/home_screen/oakley/image_4.webp'),
  },
  {
    key: 5,
    image: require('../../assets/home_screen/oakley/image_5.webp'),
  },
  {
    key: 6,
    image: require('../../assets/home_screen/oakley/image_6.webp'),
  },
];

const exclusiveCollectionImage = [
  {
    key: 1,
    image: require('../../assets/home_screen/exclusive/image_1.webp'),
  },
  {
    key: 2,
    image: require('../../assets/home_screen/exclusive/image_2.webp'),
  },
  {
    key: 3,
    image: require('../../assets/home_screen/exclusive/image_3.webp'),
  },
  {
    key: 4,
    image: require('../../assets/home_screen/exclusive/image_3.webp'),
  },
];

const homeScreenPeopleImages = [
  {
    key: 1,
    image: require('../../assets/home_screen/person_7.png'),
  },
  {
    key: 2,
    image: require('../../assets/home_screen/person_8.png'),
  },
];

const rimData = [
  {
    key: 1,
    image: require('../../assets/home_screen/person_1.png'),
  },
  {
    key: 2,
    image: require('../../assets/home_screen/person_2.png'),
  },
  {
    key: 3,
    image: require('../../assets/home_screen/person_3.png'),
  },
];

const headerCollection = [
  {
    key: 1,
    image: require('../../assets/home_screen/header/image_1.webp'),
  },
  {
    key: 2,
    image: require('../../assets/home_screen/header/image_2.webp'),
  },
];

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="">
          <View className="flex flex-row gap-10">
            <FlatList
              data={headerCollection}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <View
                  style={{width: width}}
                  className="flex flex-col justify-center items-center bg-white h-52">
                  {/* <Text className="text-xl text-white pt-10">{item.text}</Text> */}
                  <Image
                    style={{width: width}}
                    className="h-60 object-cover"
                    resizeMode="contain"
                    source={item.image}
                  />
                </View>
              )}
            />
          </View>
        </View>
        <View className="flex flex-row justify-evenly items-center mt-5">
          <Pressable className="flex flex-row justify-center items-center border px-10 py-3 rounded-lg">
            <Text className="text-black">Men</Text>
          </Pressable>
          <Pressable className="flex flex-row justify-center items-center border px-10 py-3 rounded-lg">
            <Text className="text-black">Women</Text>
          </Pressable>
          <Pressable className="flex flex-row justify-center items-center border px-10 py-3 rounded-lg">
            <Text className="text-black">Kids</Text>
          </Pressable>
        </View>
        {/* <View>
          <View className="flex flex-row justify-center items-center gap-5 pt-5">
            <View
              style={{width: width / 2.3}}
              className="flex flex-col justify-center items-center h-48 bg-orange-600 rounded-lg shadow-lg shadow-black/50">
              <Text className="text-xl text-white pt-10">Eyeglasses</Text>
              <Image
                className="w-28 h-28 object-cover"
                resizeMode="contain"
                source={require('../../assets/home_screen/person_1.png')}
              />
            </View>
            <View
              style={{width: width / 2.3}}
              className="flex flex-col justify-center items-center h-48 bg-orange-600 rounded-lg shadow-lg shadow-black/50">
              <Text className="text-xl text-white pt-10">Sunglasses</Text>
              <Image
                className="w-28 h-28 object-cover"
                resizeMode="contain"
                source={require('../../assets/home_screen/person_1.png')}
              />
            </View>
          </View>
          <View className="flex flex-row justify-center items-center gap-5 pt-5">
            <View
              style={{width: width / 2.3}}
              className="flex flex-col justify-center items-center h-48 bg-orange-600 rounded-lg shadow-lg shadow-black/50">
              <Text className="text-xl text-white pt-10">Eyeglasses</Text>
              <Image
                className="w-28 h-28 object-cover"
                resizeMode="contain"
                source={require('../../assets/home_screen/person_1.png')}
              />
            </View>
            <View
              style={{width: width / 2.3}}
              className="flex flex-col justify-center items-center h-48 bg-orange-600 rounded-lg shadow-lg shadow-black/50">
              <Text className="text-xl text-white pt-10">Sunglasses</Text>
              <Image
                className="w-28 h-28 object-cover"
                resizeMode="contain"
                source={require('../../assets/home_screen/person_1.png')}
              />
            </View>
          </View>
        </View> */}
        <View className="mt-5">
          <Text className="text-black pl-5 mb-2 text-2xl font-semibold uppercase">
            Raybans Collections
          </Text>
          <View className="flex flex-row gap-10">
            <FlatList
              data={raybanImages}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.key}
              contentContainerStyle={{paddingLeft: 10, paddingRight: 10}}
              renderItem={({item}) => (
                <View className="flex flex-col justify-center items-center w-52 h-64 mr-5 rounded-lg shadow-lg shadow-black/50">
                  <Image
                    className="w-52 h-64 object-cover rounded-md"
                    resizeMode="cover"
                    source={item.image}
                  />
                </View>
              )}
            />
          </View>
        </View>
        <View className="mt-5">
          <Text className="text-black pl-5 mb-2 text-2xl font-semibold uppercase">
            Exclusive
          </Text>
          <View className="flex flex-row gap-10">
            <FlatList
              data={exclusiveCollectionImage}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.key}
              contentContainerStyle={{paddingLeft: 10, paddingRight: 10}}
              renderItem={({item}) => (
                <View
                  style={{width: width - 20}}
                  className="flex flex-col justify-center items-center rounded-lg mr-5 shadow-lg shadow-black/50">
                  {/* <Text className="text-xl text-white pt-10">{item.text}</Text> */}
                  <Image
                    style={{width: width - 20}}
                    className="h-80 object-cover rounded-md"
                    resizeMode="contain"
                    source={item.image}
                  />
                </View>
              )}
            />
          </View>
        </View>
        <View className="my-5">
          <Text className="text-black pl-5 mb-2 text-2xl font-bold uppercase">
            Oakley Collections
          </Text>
          <View className="flex flex-row gap-10">
            <FlatList
              data={oakleyImages}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.key}
              contentContainerStyle={{paddingLeft: 10, paddingRight: 10}}
              renderItem={({item}) => (
                <View className="flex flex-col justify-center items-center w-52 h-64 mr-5 rounded-lg shadow-lg shadow-black/50">
                  <Image
                    className="w-52 h-64 object-cover rounded-md"
                    resizeMode="cover"
                    source={item.image}
                  />
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

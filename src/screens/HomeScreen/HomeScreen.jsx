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

const rimData = [
  {
    key: 1,
    text: 'Full Rim',
    image: require('../../assets/home_screen/person.png'),
  },
  {
    key: 2,
    text: 'Semi Rim',
    image: require('../../assets/home_screen/person_1.png'),
  },
  {
    key: 3,
    text: 'Rim Less',
    image: require('../../assets/home_screen/person.png'),
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
              data={rimData}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <View
                  style={{width: width}}
                  className="flex flex-col justify-center items-center bg-orange-600">
                  <Text className="text-xl text-white pt-10">{item.text}</Text>
                  <Image
                    className="w-60 h-40 object-cover"
                    resizeMode="contain"
                    source={item.image}
                  />
                </View>
              )}
            />
          </View>
        </View>
        <View className="flex flex-row justify-evenly items-center mt-5">
          <View className="flex flex-row justify-center items-center border px-10 py-3 rounded-lg">
            <Text className="text-black">Men</Text>
          </View>
          <View className="flex flex-row justify-center items-center border px-10 py-3 rounded-lg">
            <Text className="text-black">Women</Text>
          </View>
          <View className="flex flex-row justify-center items-center border px-10 py-3 rounded-lg">
            <Text className="text-black">Kids</Text>
          </View>
        </View>
        <View>
          <View className="flex flex-row justify-center items-center gap-5 pt-5">
            <View
              style={{width: width / 2.3}}
              className="flex flex-col justify-center items-center h-48 bg-orange-600 rounded-lg shadow-lg shadow-black/50">
              <Text className="text-xl text-white pt-10">Eyeglasses</Text>
              <Image
                className="w-28 h-28 object-cover"
                resizeMode="contain"
                source={require('../../assets/home_screen/person.png')}
              />
            </View>
            <View
              style={{width: width / 2.3}}
              className="flex flex-col justify-center items-center h-48 bg-orange-600 rounded-lg shadow-lg shadow-black/50">
              <Text className="text-xl text-white pt-10">Sunglasses</Text>
              <Image
                className="w-28 h-28 object-cover"
                resizeMode="contain"
                source={require('../../assets/home_screen/person.png')}
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
                source={require('../../assets/home_screen/person.png')}
              />
            </View>
            <View
              style={{width: width / 2.3}}
              className="flex flex-col justify-center items-center h-48 bg-orange-600 rounded-lg shadow-lg shadow-black/50">
              <Text className="text-xl text-white pt-10">Sunglasses</Text>
              <Image
                className="w-28 h-28 object-cover"
                resizeMode="contain"
                source={require('../../assets/home_screen/person.png')}
              />
            </View>
          </View>
        </View>
        <View className="mt-5">
          <Text className="text-black pl-5 mb-2 text-lg font-semibold">
            Collections
          </Text>
          <View className="flex flex-row gap-10">
            <FlatList
              data={rimData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.key}
              contentContainerStyle={{paddingLeft: 10, paddingRight: 10}}
              renderItem={({item}) => (
                <View className="flex flex-col justify-center items-center w-52 h-64 bg-orange-600 mr-5 rounded-lg shadow-lg shadow-black/50">
                  <Text className="text-xl text-white pt-10">{item.text}</Text>
                  <Image
                    className="w-60 h-60 object-cover"
                    resizeMode="contain"
                    source={item.image}
                  />
                </View>
              )}
            />
          </View>
        </View>
        <View className="mt-5">
          <Text className="text-black pl-5 mb-2 text-lg font-semibold">
            Collections
          </Text>
          <View className="flex flex-row gap-10">
            <FlatList
              data={rimData}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.key}
              contentContainerStyle={{paddingLeft: 10, paddingRight: 10}}
              renderItem={({item}) => (
                <View
                  style={{width: width - 20}}
                  className="flex flex-col justify-center items-center bg-orange-600 rounded-lg mr-5 shadow-lg shadow-black/50">
                  <Text className="text-xl text-white pt-10">{item.text}</Text>
                  <Image
                    className="w-60 h-60 object-cover"
                    resizeMode="contain"
                    source={item.image}
                  />
                </View>
              )}
            />
          </View>
        </View>
        <View className="my-5">
          <Text className="text-black pl-5 mb-2 text-lg font-semibold">
            Trending Collections
          </Text>
          <View className="flex flex-row gap-10">
            <FlatList
              data={rimData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.key}
              contentContainerStyle={{paddingLeft: 10, paddingRight: 10}}
              renderItem={({item}) => (
                <View className="flex flex-col justify-center items-center w-52 h-64 bg-orange-600 mr-5 rounded-lg shadow-lg shadow-black/50">
                  <Text className="text-xl text-white pt-10">{item.text}</Text>
                  <Image
                    className="w-60 h-60 object-cover"
                    resizeMode="contain"
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

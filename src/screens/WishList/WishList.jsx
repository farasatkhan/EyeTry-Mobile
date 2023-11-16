import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {Dimensions} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const wishlistData = [
  {
    key: 1,
    name: 'Browline Glasses',
    sku: 1111,
    price: 'PKR. 159.99',
    image: require('../../assets/glasses/glasses_1.jpg'),
  },
  {
    key: 2,
    name: 'Browline Glasses',
    sku: 2222,
    price: 'PKR. 159.99',
    image: require('../../assets/glasses/glasses_1.jpg'),
  },
  {
    key: 3,
    name: 'Browline Glasses',
    sku: 3333,
    price: 'PKR. 159.99',
    image: require('../../assets/glasses/glasses_1.jpg'),
  },
];

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Wishlist = () => {
  const navigation = useNavigation();

  const handleNavigation = screen => {
    navigation.navigate(screen);
  };

  //   return (
  //     <SafeAreaView className="flex-1 justify-end items-center bg-white pb-32">
  //       <View className="flex flex-col justify-center items-center gap-5">
  //         <Text className="text-xl text-black">No Favorites Yet!</Text>
  //         <Text className="text-black">
  //           Browse our frames and save the one you like the most..
  //         </Text>
  //       </View>
  //     </SafeAreaView>
  //   );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row justify-center items-center h-16 shadow-sm shadow-black/50">
        <Text className="text-black text-xl">Your Favorites</Text>
      </View>
      <ScrollView className="mb-5">
        <FlatList
          data={wishlistData}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <View>
              <View className="flex flex-row justify-center items-center">
                <Image
                  style={{width: width}}
                  className="h-80 object-cover"
                  resizeMode="contain"
                  source={item.image}
                />
              </View>
              <View className="flex flex-row justify-between mx-5">
                <View className="flex flex-col gap-1">
                  <Text className="text-black text-xl">{item.name}</Text>
                  <Text className="text-black">{item.sku}</Text>
                </View>
                <View>
                  <Text className="text-black text-xl">{item.price}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wishlist;

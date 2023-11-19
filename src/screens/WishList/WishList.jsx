import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {Dimensions} from 'react-native';

import Pressable from '../../wrapper_components/Pressable';

import Icon from 'react-native-vector-icons/AntDesign';

import {useNavigation, useFocusEffect} from '@react-navigation/native';

import API_URL from '../../config/config';

import {
  viewAllWishlistsProducts,
  removeWishlistProduct,
} from '../../services/Wishlist/Wishlist';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Wishlist = () => {
  useFocusEffect(() => {
    fetchWishlistGlassess();
  });

  const navigation = useNavigation();

  const handleNavigation = screen => {
    navigation.navigate(screen);
  };

  const [wishlistGlasses, setWishlistGlasses] = useState({});

  const fetchWishlistGlassess = async () => {
    try {
      const fetchAllWishlistGlasses = await viewAllWishlistsProducts();
      setWishlistGlasses(fetchAllWishlistGlasses.wishlist);
    } catch (error) {
      console.error('Error fetching glasses', error);
    }
  };

  const handleRemoveFavorite = async productId => {
    try {
      const response = await removeWishlistProduct(productId);
      fetchWishlistGlassess();
    } catch (error) {
      console.error('Error removing favorite', error);
    }
  };

  const [selectedVariants, setSelectedVariants] = useState({});

  const handleVariantPress = (itemId, variantIndex) => {
    setSelectedVariants({...selectedVariants, [itemId]: variantIndex});
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {wishlistGlasses.length === 0 ? (
        <View className="flex-1 justify-end items-center bg-white pb-32">
          <View className="flex flex-col justify-center items-center gap-5">
            <Text className="text-xl text-black">No Favorites Yet!</Text>
            <Text className="text-black">
              Browse our frames and save the one you like the most..
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={wishlistGlasses}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            const selectedVariantIndex = selectedVariants[item._id] || 0;
            const selectedVariant =
              item.frame_information.frame_variants[selectedVariantIndex];

            return (
              <View className="">
                <View className="flex">
                  <Pressable onPress={() => handleRemoveFavorite(item._id)}>
                    <View className="flex flex-row justify-end mr-10 mt-10">
                      <Icon name="heart" size={30} color="#9f1239" />
                    </View>
                  </Pressable>

                  {item.frame_information.frame_variants.length > 0 && (
                    <View className="flex flex-row justify-center items-center">
                      <Image
                        style={{width: width}}
                        className="h-60 object-cover"
                        resizeMode="contain"
                        source={{
                          uri: API_URL + selectedVariant.images[0],
                        }}
                      />
                    </View>
                  )}
                </View>
                <View className="flex flex-row justify-end mb-2 pr-5 gap-5">
                  {item.frame_information.frame_variants.map(
                    (variant, index) => (
                      <View
                        style={{borderColor: variant.color_code}}
                        className="flex justify-center items-center w-10 h-10 border rounded-full">
                        <Pressable
                          key={index}
                          onPress={() => handleVariantPress(item._id, index)}
                          style={{backgroundColor: variant.color_code}}
                          className="w-7 h-7 rounded-full bg-black"></Pressable>
                      </View>
                    ),
                  )}
                </View>
                <View className="flex flex-row justify-between mx-5">
                  <View className="flex flex-col">
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      className="text-black text-[18px]">
                      {item.name}
                    </Text>
                    <Text className="text-black">{item.sku}</Text>
                  </View>
                  {/* <View className="flex flex-row">
                <Text className="text-black text-[18px]">
                  {item.priceInfo.currency + ' ' + item.priceInfo.price}
                </Text>
              </View> */}
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Wishlist;

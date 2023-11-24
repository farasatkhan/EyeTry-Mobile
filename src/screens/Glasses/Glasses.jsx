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

import {useNavigation} from '@react-navigation/native';

import API_URL from '../../config/config';

import {
  viewAllGlasses,
  viewAllEyeGlassesList,
  viewAllSunGlassesList,
} from '../../services/Glasses/Glasses';
import {
  viewAllWishlistsProducts,
  createWishlistProduct,
  removeWishlistProduct,
} from '../../services/Wishlist/Wishlist';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Glasses = ({route}) => {
  const {glassesType} = route.params;

  const navigation = useNavigation();

  const handleNavigation = (screen, options) => {
    navigation.navigate(screen, options);
  };

  const [glasses, setGlasses] = useState([]);
  const [wishlists, setWishlists] = useState({});

  const fetchGlassess = async () => {
    try {
      let fetchAllGlasses;
      if (glassesType === 'Eyeglasses') {
        fetchAllGlasses = await viewAllEyeGlassesList();
      } else if (glassesType === 'Sunglasses') {
        fetchAllGlasses = await viewAllSunGlassesList();
      } else {
        fetchAllGlasses = await viewAllGlasses();
      }
      setGlasses(fetchAllGlasses);
    } catch (error) {
      console.error('Error fetching glasses', error);
    }
  };

  const fetchAllWishlistProducts = async () => {
    try {
      const fetchAllWishlists = await viewAllWishlistsProducts();
      setWishlists(fetchAllWishlists);
    } catch (error) {
      console.error('Error fetching wishlist', error);
    }
  };

  const handleAddFavorite = async productId => {
    try {
      const response = await createWishlistProduct(productId);
      fetchAllWishlistProducts();
    } catch (error) {
      console.error('Error adding favorites', error);
    }
  };

  const handleRemoveFavorite = async productId => {
    try {
      const response = await removeWishlistProduct(productId);
      fetchAllWishlistProducts();
    } catch (error) {
      console.error('Error removing favorite', error);
    }
  };

  useEffect(() => {
    fetchGlassess();
    fetchAllWishlistProducts();
    navigation.setOptions({
      title: glassesType,
    });
  }, []);

  const [colorSelected, setColorSelected] = useState('');
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleVariantPress = (itemId, variantIndex, color) => {
    setSelectedVariants({...selectedVariants, [itemId]: variantIndex});
    setColorSelected(color);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {glasses.length > 0 ? (
        <FlatList
          data={glasses}
          keyExtractor={item => item.key}
          renderItem={({item}) => {
            const selectedVariantIndex = selectedVariants[item._id] || 0;
            const selectedVariant =
              item.frame_information.frame_variants[selectedVariantIndex];

            const isFavorite =
              wishlists.wishlist &&
              wishlists.wishlist.some(product => product._id === item._id);

            return (
              <View
                className="my-5"
                onPress={() => handleNavigation('Product')}>
                <View className="flex">
                  {isFavorite ? (
                    <Pressable onPress={() => handleRemoveFavorite(item._id)}>
                      <View className="flex flex-row justify-end mr-10 mt-10">
                        <Icon name="heart" size={30} color="#9f1239" />
                      </View>
                    </Pressable>
                  ) : (
                    <Pressable onPress={() => handleAddFavorite(item._id)}>
                      <View className="flex flex-row justify-end mr-10 mt-10">
                        <Icon name="hearto" size={30} color="#fecaca" />
                      </View>
                    </Pressable>
                  )}

                  {item.frame_information.frame_variants.length > 0 && (
                    <Pressable
                      onPress={() =>
                        handleNavigation('Product', {productId: item._id})
                      }
                      className="flex flex-row justify-center items-center">
                      <Image
                        style={{width: width}}
                        className="h-60 object-cover"
                        resizeMode="contain"
                        source={{
                          uri: API_URL + selectedVariant.images[0],
                        }}
                      />
                    </Pressable>
                  )}
                </View>
                <View className="flex flex-row justify-end mb-2 pr-5 gap-x-5">
                  {item.frame_information.frame_variants.map(
                    (variant, index) => (
                      <View
                        style={
                          selectedVariantIndex === index
                            ? {borderColor: variant.color_code}
                            : {borderColor: '#fff'}
                        }
                        className="flex justify-center items-center w-10 h-10 border rounded-full">
                        <Pressable
                          key={index}
                          onPress={() =>
                            handleVariantPress(item._id, index, variant.color)
                          }
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
      ) : (
        <View className="flex-1 justify-end items-center bg-white pb-32">
          <View className="flex flex-col justify-center items-center gap-y-5 mx-5">
            <Text className="text-xl text-black">No Glasses Yet!</Text>
            <Text className="text-black">
              Glasses will appear once they are added by Mr. Aaliyan Alvi Sahib
              and Mr. Sammi Gul Sahib.
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Glasses;

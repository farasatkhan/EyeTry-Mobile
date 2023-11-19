import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import API_URL from '../../config/config';

import {viewSingleProduct} from '../../services/Glasses/Glasses';

import {
  viewAllWishlistsProducts,
  createWishlistProduct,
  removeWishlistProduct,
} from '../../services/Wishlist/Wishlist';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import Pressable from '../../wrapper_components/Pressable';

const Product = ({route}) => {
  const navigation = useNavigation();

  const handleNavigation = (screen, options) => {
    navigation.navigate(screen, options);
  };

  const {productId} = route.params;

  const [product, setProduct] = useState(null);
  const [wishlists, setWishlists] = useState({});

  const fetchSingleProduct = async productId => {
    try {
      const fetchProduct = await viewSingleProduct(productId);
      setProduct(fetchProduct);
      navigation.setOptions({title: fetchProduct.name});
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
    fetchSingleProduct(productId);
    fetchAllWishlistProducts();
  }, []);

  const [selectedVariants, setSelectedVariants] = useState(0);

  const handleVariantPress = variantIndex => {
    setSelectedVariants(variantIndex);
  };

  function calculateAverageRating(reviews) {
    if (reviews.total_reviews === 0) {
      return 0;
    }

    const totalStars = reviews.user_reviews.reduce(
      (sum, review) => sum + review.stars,
      0,
    );

    const averageRating = totalStars / reviews.total_reviews;
    return averageRating.toFixed(1);
  }

  const isFavorite =
    product &&
    wishlists.wishlist &&
    wishlists.wishlist.some(
      wishlistProduct => wishlistProduct._id === product._id,
    );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {product && (
        <ScrollView className="">
          <View className="">
            <FlatList
              key={selectedVariants}
              horizontal
              pagingEnabled
              data={
                product.frame_information.frame_variants[selectedVariants]
                  .images
              }
              keyExtractor={(imageURL, index) => index.toString()}
              renderItem={({item}) => (
                <View>
                  <Image
                    style={{width: width}}
                    className="h-60 object-cover"
                    resizeMode="contain"
                    source={{
                      uri: API_URL + item,
                    }}
                  />
                </View>
              )}
            />
            <View className="flex flex-row justify-start p-5 gap-x-5">
              {product.frame_information.frame_variants.map(
                (variant, index) => (
                  <Pressable
                    onPress={() => handleVariantPress(index)}
                    key={index}
                    style={
                      selectedVariants === index
                        ? {borderColor: variant.color_code}
                        : {borderColor: '#fff'}
                    }
                    className="flex justify-center items-center w-12 h-12 border rounded-full">
                    <View
                      style={{backgroundColor: variant.color_code}}
                      className="w-10 h-10 rounded-full bg-black"></View>
                  </Pressable>
                ),
              )}
            </View>
            <View className="flex flex-row gap-x-[10]">
              <View className="flex flex-col flex-grow my-2">
                <View className="flex flex-row justify-between mx-5">
                  <View className="flex flex-col">
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      className="text-black text-[18px]">
                      {product.name}
                    </Text>
                    <Text className="text-black">{product.sku}</Text>
                  </View>
                  {isFavorite ? (
                    <Pressable
                      onPress={() => handleRemoveFavorite(product._id)}>
                      <View className="flex flex-row justify-end">
                        <Icon name="heart" size={40} color="#9f1239" />
                      </View>
                    </Pressable>
                  ) : (
                    <Pressable onPress={() => handleAddFavorite(product._id)}>
                      <View className="flex flex-row justify-end">
                        <Icon name="hearto" size={40} color="#fecaca" />
                      </View>
                    </Pressable>
                  )}
                </View>
                <View className="flex flex-row justify-between items-center mx-5 my-2">
                  <View>
                    <Text className="text-black text-3xl">
                      {product.priceInfo.currency === 'USD'
                        ? '$ ' + product.priceInfo.price
                        : 'PKR.' + product.priceInfo.price}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="mx-5">
              <View className="">
                <View className="mb-5">
                  <Text className="text-xl text-black mb-2">
                    Product Details
                  </Text>
                  <View className="flex flex-row gap-x-10">
                    <View className="flex flex-col">
                      <Text className="text-gray-500 text-[16px]">
                        Manufacturer:
                      </Text>
                      <Text className="text-gray-500 text-[16px] ">
                        Frame Shape:
                      </Text>
                      <Text className="text-gray-500 text-[16px]">
                        Rim Shape:
                      </Text>
                      <Text className="text-gray-500 text-[16px]">Type:</Text>
                    </View>
                    <View className="flex flex-col">
                      <Text className="text-black text-[16px]">
                        {product.manufacturer}
                      </Text>
                      <Text className="text-black text-[16px]">
                        {product.frame_shape}
                      </Text>
                      <Text className="text-black text-[16px]">
                        {product.rim_shape}
                      </Text>
                      <Text className="text-black text-[16px]">
                        {product.type}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="">
                  <Text className="text-xl text-black mb-2">
                    Lens Information
                  </Text>
                  <View className="flex flex-row gap-x-10">
                    <View className="flex flex-col">
                      <Text className="text-gray-500 text-[16px]">
                        Lens Width:
                      </Text>
                      <Text className="text-gray-500 text-[16px] ">
                        Lens Height:
                      </Text>
                      <Text className="text-gray-500 text-[16px]">
                        Total Width:
                      </Text>
                      <Text className="text-gray-500 text-[16px]">
                        Bridge Width:
                      </Text>
                      <Text className="text-gray-500 text-[16px]">
                        Temple Length:
                      </Text>
                    </View>
                    <View className="flex flex-col">
                      <Text className="text-black text-[16px]">
                        {product.lens_information.lens_width +
                          ' ' +
                          product.lens_information.measurement_type}
                      </Text>
                      <Text className="text-black text-[16px]">
                        {product.lens_information.lens_height +
                          ' ' +
                          product.lens_information.measurement_type}
                      </Text>
                      <Text className="text-black text-[16px]">
                        {product.lens_information.total_width +
                          ' ' +
                          product.lens_information.measurement_type}
                      </Text>
                      <Text className="text-black text-[16px]">
                        {product.lens_information.bridge_width +
                          ' ' +
                          product.lens_information.measurement_type}
                      </Text>
                      <Text className="text-black text-[16px]">
                        {product.lens_information.temple_length +
                          ' ' +
                          product.lens_information.measurement_type}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="my-5 mx-5">
              <View className="flex flex-row flex-grow justify-between gap-x-[40]">
                <View>
                  <Text className="text-black text-xl">Reviews & Ratings</Text>
                  {product.reviewsInformation.user_reviews.length > 0 && (
                    <View className="flex flex-row gap-x-3 my-2">
                      <Text className="text-black text-2xl">
                        {calculateAverageRating(product.reviewsInformation)}
                      </Text>
                      <View>
                        <Icon name="star" size={30} color="#facc15" />
                      </View>
                    </View>
                  )}
                </View>
                {/* <Pressable className="flex flex-row justify-center items-center flex-1 h-10 border rounded-md">
                  <Text className="text-[16px] text-black">Write a Review</Text>
                </Pressable> */}
              </View>
              {product.reviewsInformation.user_reviews.length > 0 ? (
                product.reviewsInformation.user_reviews.map((review, index) => {
                  const originalDateString = review.date;
                  const originalDate = new Date(originalDateString);

                  const options = {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  };
                  const formattedDate = originalDate.toLocaleDateString(
                    'en-US',
                    options,
                  );

                  return (
                    <View className="border-b py-4 border-gray-300">
                      <View className="flex flex-row justify-between">
                        <Text className="text-blue-700 text-[16px] font-semibold">
                          {review.user.firstName + ' ' + review.user.lastName} (
                          {review.stars} Stars)
                        </Text>
                        <Text className="text-black text-[16px]">
                          {formattedDate}
                        </Text>
                      </View>
                      <View className="flex flex-col my-2">
                        <Text className="text-black text-[16px] font-semibold">
                          {review.user_review_title}
                        </Text>
                        <Text className="text-black text-[14px]">
                          {review.user_review_description}
                        </Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View className="flex flex-row justify-center items-center mt-4">
                  <Text className="text-black text-[16px]">
                    0 Reviews are available
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View className="flex flex-col gap-y-5 px-5 my-5">
            {/* Change the handleNavigation to Try-On Screen */}
            <Pressable
              onPress={() => handleNavigation('HomeTabScreen')}
              className="flex flex-row justify-center items-center h-16 bg-blue-200 rounded-lg">
              <Text className="text-blue-600 text-xl font-semibold">
                Virtual Try-On
              </Text>
            </Pressable>
            {/* Change the handleNavigation to Orderflow Screen */}
            <Pressable
              onPress={() => handleNavigation('HomeTabScreen')}
              className="flex flex-row justify-center items-center h-16 bg-blue-600 rounded-lg">
              <Text className="text-white text-xl font-semibold">
                Select Lens
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Product;

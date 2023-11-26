import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';

import sunIcon from '../../../assets/images/orders/lensSvgs/sun.png';
import moonIcon from '../../../assets/images/orders/lensSvgs/Moon.png';

const ProductView = ({ customization }) => {
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
  const [isLight, setIsLight] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle between light and dark transitions
      const toValue = isLight ? 0.4 : 1;

      Animated.timing(fadeAnim, {
        toValue,
        duration: 2000,
        useNativeDriver: true,
      }).start();

      setIsLight(!isLight); // Toggle the state for the next iteration
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [fadeAnim, isLight]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <View className='flex flex-col'>
      {/* <Button
        title="Back to frame"
        onPress={() => {}}
        className='ml-10 mt-10 w-1/5 text-base font-bold mb-2 hover:text-blue-400 cursor-pointer'
      /> */}
      <View className='flex items-center transform mt-2'>
        <Animated.Image
          source={customization.image}
          style={{ width: 120, height: 120, opacity: fadeAnim}}
          resizeMode="contain"
        />

          
        {/* <Image source={customization.image} style={{width: 50, height: 50}} /> */}

        <Text className='text-center text-sm font-semibold '>{customization.name}</Text>
        <View className='flex flex-row items-center justify-center mr-10 ml-10'>
          
          <View className='w-full flex items-center justify-between flex-row mx-auto'>
            <Text className='text-sm font-sans font-bold text-gray-500 mr-2'>Indoor</Text>
            <View className='w-16 border-t border-gray-300 h-0 my-0 mx-2' />
            <View style={{ paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center' }}>
            <Animated.Image
              source={isLight ? moonIcon : sunIcon}
              style={{
                width: 35,
                height: 35,
                opacity: fadeAnim, // Bind opacity to the animated value
              }}
            />
          </View>
            <View className='w-16 border-t border-gray-300 h-0 my-0 mx-2' />
            <Text className='ml-2 text-sm font-sans font-bold text-gray-500'>Outdoor</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductView;

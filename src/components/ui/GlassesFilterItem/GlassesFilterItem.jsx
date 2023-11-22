import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Pressable from '../../../wrapper_components/Pressable';

const GlassesFilterItem = ({title, itemsSelectedCount, property}) => {
  const [filteredItem, setFilteredItem] = useState([]);

  const toggleFilteredItem = item => {
    const itemIndex = filteredItem.indexOf(item);
    let newfilteredItem = [...filteredItem];

    if (itemIndex === -1) {
      newfilteredItem = [...newfilteredItem, item];
    } else {
      newfilteredItem.splice(itemIndex, 1);
    }

    setFilteredItem(newfilteredItem);
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mb-5 gap-x-3">
        <Text className="text-black text-xl font-semibold">{title}</Text>
        <View className="flex flex-row justify-center items-center w-8 h-8 rounded-full bg-gray-200">
          <Text className="text-black text-xs">{itemsSelectedCount}</Text>
        </View>
      </View>
      <View className="flex flex-row flex-wrap justify-center items-center mx-5 gap-4">
        {property.map((item, index) => {
          const isSelected = filteredItem.includes(item);

          return (
            <Pressable
              onPress={() => toggleFilteredItem(item)}
              style={{
                backgroundColor: isSelected ? '#0ea5e9' : '#ffff',
              }}
              key={index}
              className="flex flex-row justify-center items-center basis-2/5 p-5 border rounded-md mb-5">
              <Text
                style={{
                  color: isSelected ? '#ffff' : '#000',
                }}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default GlassesFilterItem;

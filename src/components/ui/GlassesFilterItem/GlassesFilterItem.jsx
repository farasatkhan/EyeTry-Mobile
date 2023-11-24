import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Pressable from '../../../wrapper_components/Pressable';

const GlassesFilterItem = ({title, property, onFilterChange}) => {
  const [filteredItem, setFilteredItem] = useState(['All']);

  const toggleFilteredItem = item => {
    const itemIndex = filteredItem.indexOf(item);
    let newFilteredItem;

    if (itemIndex === -1) {
      newFilteredItem = item === 'All' ? [item] : [...filteredItem, item];
    } else {
      newFilteredItem = [...filteredItem];
      newFilteredItem.splice(itemIndex, 1);
    }

    if (newFilteredItem.length > 1 && newFilteredItem.includes('All')) {
      const allIndex = newFilteredItem.indexOf('All');
      newFilteredItem.splice(allIndex, 1);
    }

    setFilteredItem(newFilteredItem);
    onFilterChange(newFilteredItem);
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mb-5 gap-x-3">
        <Text className="text-black text-xl font-semibold">{title}</Text>
        <View className="flex flex-row justify-center items-center w-8 h-8 rounded-full bg-gray-200">
          <Text className="text-black text-xs">{filteredItem.length}</Text>
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

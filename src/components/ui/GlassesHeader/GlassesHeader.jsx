import React from 'react';
import {View, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const GlassesHeader = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen, option) => {
    navigation.navigate(screen, option);
  };

  return (
    <View className="flex flex-row gap-10">
      <FeatherIcons
        name="search"
        size={30}
        color="#0ea5e9"
        onPress={() => handleNavigation('GlassesSearch')}
      />
      <MaterialIcons
        name="filter-list"
        size={30}
        color="#0ea5e9"
        onPress={() => handleNavigation('GlassesFilter')}
      />
    </View>
  );
};

export default GlassesHeader;

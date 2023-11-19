import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  FlatList,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';

import Pressable from '../../wrapper_components/Pressable';

import {viewAllGlasses} from '../../services/Glasses/Glasses';

const GlassesSearch = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen, options) => {
    navigation.navigate(screen, options);
  };

  const [glasses, setGlasses] = useState([]);
  const [filteredGlasses, setFilteredGlasses] = useState([]);

  const fetchGlassess = async () => {
    try {
      const fetchAllGlasses = await viewAllGlasses();
      setGlasses(fetchAllGlasses);
    } catch (error) {
      console.error('Error fetching glasses', error);
    }
  };

  useEffect(() => {
    fetchGlassess();
  }, []);

  const [search, setSearch] = useState('');

  const handleSearch = text => {
    setSearch(text);

    const filteredGlassesList = glasses.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredGlasses(filteredGlassesList);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row justify-between items-center mx-5 px-4 mt-5 border rounded-full">
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <TextInput
          className="flex-grow text-black text-xl"
          placeholder="What are you looking for?"
          value={search}
          onChangeText={handleSearch}
        />
        <AntDesign name="search1" size={30} color="#000" />
      </View>
      <View className="flex flex-row justify-start mt-10 mx-1">
        <FlatList
          data={filteredGlasses}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() =>
                  handleNavigation('Product', {productId: item._id})
                }
                className="flex flex-row mx-5 my-2 h-14">
                <View className="flex flex-row items-center flex-grow gap-x-4">
                  <Ionicons name="glasses-outline" size={40} color="#000" />
                  <Text className="text-black text-xl">{item.name}</Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default GlassesSearch;

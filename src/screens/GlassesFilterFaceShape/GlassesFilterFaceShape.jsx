import React, {useState, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {viewAllGlasses} from '../../services/Glasses/Glasses';

import Pressable from '../../wrapper_components/Pressable';

import GlassesFilterItem from '../../components/ui/GlassesFilterItem';

import properties from '../../data/GlassesFilterProperties';

const GlassesFilterFaceShape = ({route}) => {
  const faceShape = route.params?.faceShape;

  const navigation = useNavigation();

  const handleNavigation = (screen, options) => {
    navigation.navigate(screen, options);
  };

  const [glasses, setGlasses] = useState([]);

  const fetchGlassess = async () => {
    try {
      const fetchAllGlasses = await viewAllGlasses();
      setGlasses(fetchAllGlasses);
    } catch (error) {
      console.error('Error fetching glasses', error);
    }
  };

  const filteredItemsRef = useRef({
    faceShape: ['All'],
  });

  const applyFilter = (filter, key) => {
    filteredItemsRef.current = {
      ...filteredItemsRef.current,
      [key]: Array.from(filter),
    };
  };

  useEffect(() => {
    fetchGlassess();
  }, []);

  const SearchFiltered = () => {
    const filteredGlasses = glasses.filter(glass => {
      const filteredfaceShape =
        filteredItemsRef.current.faceShape &&
        filteredItemsRef.current.faceShape.includes('All')
          ? glass
          : filteredItemsRef.current.faceShape &&
            glass.person_information.face_shape.some(shape =>
              filteredItemsRef.current.faceShape.includes(shape),
            );

      return filteredfaceShape;
    });

    console.log(glasses.length + ' ' + filteredGlasses.length);

    console.log(filteredGlasses.length);
    handleNavigation('Glasses', {filteredGlasses: filteredGlasses});
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="my-10">
          <GlassesFilterItem
            title="Face Shape"
            property={properties.face_shape}
            onFilterChange={filter => applyFilter(filter, 'faceShape')}
            addNewFilteredItem={faceShape}
          />
        </View>
        <View className="my-10">
          <Pressable
            onPress={() => SearchFiltered()}
            className="flex flex-row justify-center items-center mx-10 h-16
            border rounded-md">
            <Text className="text-black text-xl font-bold">Search Filter</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GlassesFilterFaceShape;

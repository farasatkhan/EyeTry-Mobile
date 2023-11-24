import React, {useState, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {viewAllGlasses} from '../../services/Glasses/Glasses';

import Pressable from '../../wrapper_components/Pressable';

import GlassesFilterItem from '../../components/ui/GlassesFilterItem';

import properties from '../../data/GlassesFilterProperties';

const GlassesFilter = ({route}) => {
  // const {glassesType} = route.params;

  // const [glassesType, setGlassesType] = useState('Eyeglasses');

  const navigation = useNavigation();

  const handleNavigation = (screen, options) => {
    navigation.navigate(screen, options);
  };

  const [glasses, setGlasses] = useState([]);
  // const [filteredGlasses, setFilteredGlasses] = useState([]);

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

  const filteredItemsRef = useRef({
    categories: ['All'],
    materials: ['All'],
    faceShape: ['All'],
    genders: ['All'],
    sizes: ['All'],
    frameShape: ['All'],
    rims: ['All'],
  });

  const applyFilter = (filter, key) => {
    filteredItemsRef.current = {
      ...filteredItemsRef.current,
      [key]: Array.from(filter),
    };
  };

  const SearchFiltered = () => {
    const filteredGlasses = glasses.filter(glass => {
      // const filteredGlassesType = glass.type === glassesType;

      const filteredCategories =
        filteredItemsRef.current.categories &&
        filteredItemsRef.current.categories.includes('All')
          ? glass
          : filteredItemsRef.current.categories &&
            glass.categories.some(category =>
              filteredItemsRef.current.categories.includes(category),
            );

      const filteredFrameMaterials =
        filteredItemsRef.current.materials &&
        filteredItemsRef.current.materials.includes('All')
          ? glass
          : filteredItemsRef.current.materials &&
            glass.frame_information.frame_material.some(material =>
              filteredItemsRef.current.materials.includes(material),
            );

      const filteredfaceShape =
        filteredItemsRef.current.faceShape &&
        filteredItemsRef.current.faceShape.includes('All')
          ? glass
          : filteredItemsRef.current.faceShape &&
            glass.person_information.face_shape.some(shape =>
              filteredItemsRef.current.faceShape.includes(shape),
            );

      const filteredGenders =
        filteredItemsRef.current.genders &&
        filteredItemsRef.current.genders.includes('All')
          ? glass
          : filteredItemsRef.current.genders &&
            glass.person_information.genders.some(gender =>
              filteredItemsRef.current.genders.includes(gender),
            );

      const filteredSizes =
        filteredItemsRef.current.sizes &&
        filteredItemsRef.current.sizes.includes('All')
          ? glass
          : filteredItemsRef.current.sizes &&
            glass.frame_information.frame_size.some(size =>
              filteredItemsRef.current.sizes.includes(size),
            );

      const filteredFrameShape =
        filteredItemsRef.current.frameShape &&
        filteredItemsRef.current.frameShape.includes('All')
          ? glass
          : filteredItemsRef.current.frameShape &&
            filteredItemsRef.current.frameShape.includes(glass.frame_shape);

      const filteredRims =
        filteredItemsRef.current.rims &&
        filteredItemsRef.current.rims.includes('All')
          ? glass
          : filteredItemsRef.current.rims &&
            filteredItemsRef.current.rims.includes(glass.rim_shape);

      return (
        // filteredGlassesType &&
        filteredCategories &&
        filteredFrameMaterials &&
        filteredfaceShape &&
        filteredGenders &&
        filteredSizes &&
        filteredFrameShape &&
        filteredRims
      );
    });

    // setFilteredGlasses(filteredGlasses);
    // console.log(filteredGlasses.length);
    handleNavigation('Glasses', {filteredGlasses: filteredGlasses});
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="my-10">
          <GlassesFilterItem
            title="Categories"
            property={properties.categories}
            onFilterChange={filter => applyFilter(filter, 'categories')}
          />
          {/* <GlassesFilterItem
            title="Colors"
            property={properties.colors}
            onFilterChange={filter => applyFilter(filter, 'colors')}
          /> */}
          <GlassesFilterItem
            title="Materials"
            property={properties.material}
            onFilterChange={filter => applyFilter(filter, 'materials')}
          />
          <GlassesFilterItem
            title="Frame Shape"
            property={properties.frame_shape}
            onFilterChange={filter => applyFilter(filter, 'frameShape')}
          />
          <GlassesFilterItem
            title="Face Shape"
            property={properties.face_shape}
            onFilterChange={filter => applyFilter(filter, 'faceShape')}
          />
          <GlassesFilterItem
            title="Gender"
            property={properties.gender}
            onFilterChange={filter => applyFilter(filter, 'genders')}
          />
          <GlassesFilterItem
            title="Rim"
            property={properties.rim}
            onFilterChange={filter => applyFilter(filter, 'rims')}
          />
          <GlassesFilterItem
            title="Size"
            property={properties.size}
            onFilterChange={filter => applyFilter(filter, 'sizes')}
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

export default GlassesFilter;

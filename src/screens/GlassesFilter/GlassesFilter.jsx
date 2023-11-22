import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {viewAllGlasses} from '../../services/Glasses/Glasses';

import Pressable from '../../wrapper_components/Pressable';

import GlassesFilterItem from '../../components/ui/GlassesFilterItem';

import properties from '../../data/GlassesFilterProperties';

const GlassesFilter = () => {
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

  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    materials: [],
    frameShape: [],
    faceShape: [],
    gender: [],
    rim: [],
    size: [],
  });

  const applyFilter = (filter, type) => {
    switch (type) {
      case 'Categories':
        setFilters(prevFilters => ({...prevFilters, categories: filter}));
        break;
      case 'Colors':
        setFilters(prevFilters => ({...prevFilters, colors: filter}));
        break;
      case 'Materials':
        setFilters(prevFilters => ({...prevFilters, materials: filter}));
        break;
      case 'Frame Shape':
        setFilters(prevFilters => ({...prevFilters, frameShape: filter}));
        break;
      case 'Face Shape':
        setFilters(prevFilters => ({...prevFilters, faceShape: filter}));
        break;
      case 'Gender':
        setFilters(prevFilters => ({...prevFilters, gender: filter}));
        break;
      case 'Rim':
        setFilters(prevFilters => ({...prevFilters, rim: filter}));
        break;
      case 'Size':
        setFilters(prevFilters => ({...prevFilters, size: filter}));
        break;
    }
  };

  const SearchFiltered = () => {
    // apply filters and search it
    console.log(filters);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="my-10">
          <GlassesFilterItem
            title="Categories"
            property={properties.categories}
            onFilterChange={filter => applyFilter(filter, 'Categories')}
          />
          <GlassesFilterItem
            title="Colors"
            property={properties.colors}
            onFilterChange={filter => applyFilter(filter, 'Colors')}
          />
          <GlassesFilterItem
            title="Materials"
            property={properties.material}
            onFilterChange={filter => applyFilter(filter, 'Materials')}
          />
          <GlassesFilterItem
            title="Frame Shape"
            property={properties.frame_shape}
            onFilterChange={filter => applyFilter(filter, 'Frame Shape')}
          />
          <GlassesFilterItem
            title="Face Shape"
            property={properties.face_shape}
            onFilterChange={filter => applyFilter(filter, 'Face Shape')}
          />
          <GlassesFilterItem
            title="Gender"
            property={properties.gender}
            onFilterChange={filter => applyFilter(filter, 'Gender')}
          />
          <GlassesFilterItem
            title="Rim"
            property={properties.rim}
            onFilterChange={filter => applyFilter(filter, 'Rim')}
          />
          <GlassesFilterItem
            title="Size"
            property={properties.size}
            onFilterChange={filter => applyFilter(filter, 'Size')}
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

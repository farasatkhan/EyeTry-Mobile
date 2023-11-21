import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewProductsList } from '../../services/Orders/orderApi';

export default function HomeTest() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    fetchProductsList();
  }, []);

  const fetchProductsList = async () => {
    try {
      const fetchedProductsList = await viewProductsList();
      setProductsList(fetchedProductsList);
    } catch (error) {
      console.error("Error fetching products list", error);
    }
  };

  // Corrected the variable name to 'navigation'
  const navigation = useNavigation();

  const handleNavigation = (id) => {
    console.log(id);
    navigation.navigate('ProductDetails', { id });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView style={{ marginTop: 20, marginBottom: 20 }}>
        {productsList.map((product) => (
          // Corrected the View to TouchableOpacity for touchable behavior
          <TouchableOpacity
            key={product._id}
            onPress={() => handleNavigation(product._id)}
            style={{
              width: 300,
              height: 70,
              backgroundColor: 'green',
              marginBottom: 5,
              padding: 10,
            }}
          >
            <Text style={{ color: 'white' }}>{product.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedOptions } from '../../redux/actions/orderSelectionAction';
import { viewParticularProduct } from '../../services/Orders/orderApi';
import { useNavigation } from '@react-navigation/native';
import { getDataAsyncStorage, storeDataAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';
import reviewFrame from '../../assets/images/orders/reviewFrame.png'
import reviewLens from '../../assets/images/orders/reviewLens.png'
import reviewUpgrades from '../../assets/images/orders/reviewUpgrades.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectLensTypeComponentProp = ({ selectedOptions, onConfirmSelection, route }) => {
  const orderSelections = useSelector((state) => state.selectedOptions);
  const lens = orderSelections.selectedOptions.lensProperties;

  const navigation = useNavigation();

  const [customizedProductId, setCustomizedProductId] = useState("null");
  useEffect(() => {
    const fetchCustomizedProductId = async () => {
      try {
        const id = await getDataAsyncStorage("customizedProductId");
        setCustomizedProductId(id);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchCustomizedProductId();
  }, []);


  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  const handleAddToCart = async () => {
    dispatch(updateSelectedOptions({
      id: customizedProductId,
    }));
  
    try {
      const productData = await viewParticularProduct(customizedProductId);
  
      if (productData) {
        console.log("Review screen fetched product data", JSON.stringify(productData, null, 2));
  
        // Use await when calling asynchronous functions
        // const existingCartString = await AsyncStorage.getItem('cart');
        // const existingCart = existingCartString ? JSON.parse(existingCartString) : [];
        const existingCartJson = await AsyncStorage.getItem('cart') || '[]'; 
        const existingCart = JSON.parse(existingCartJson);

        const combinedObject = {
          orderSelections: orderSelections,
          productData: productData
        };
  
        existingCart.push(combinedObject);
  
        // Use await when calling asynchronous functions
        const existingCartString = JSON.stringify(existingCart)
        await storeDataAsyncStorage('cart', existingCartString);
        
        console.log("Added to cart");
        // console.log("Updated cart data in local storage:", JSON.stringify(existingCart, null, 2));
        // console.log("test cart: " ,await AsyncStorage.getItem('cart'))
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  
    navigation.navigate('Cart'); 
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Review Your Selections</Text>

      <View style={styles.mainContainer}>
        <View style={styles.cardContainer}>

          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <Image source={reviewFrame} style={styles.icon} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Frame</Text>
              <Text style={styles.description}>Prada PR 10YV, Brown / Tortoise, Medium  (<Text style={styles.strikeThrough}>+$468</Text> +$421)</Text>
            </View>
          </View>
          <View className="h-[0.5px] bg-gray-400 w-full"></View>

          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <Image source={reviewLens} style={styles.icon} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Lens</Text>
              <Text style={styles.description}>Prada PR 10YV, Brown / Tortoise, Medium (<Text style={styles.strikeThrough}>+$468</Text> +$421)</Text>
              <Text style={styles.detail}><Text style={styles.bold}>Package:</Text> {lens.package}</Text>
              <Text style={styles.detail}><Text style={styles.bold}>Coatings:</Text> {lens.coatings} (+$48)</Text>
            </View>
          </View>
          <View className="h-[0.5px] bg-gray-400 w-full"></View>

          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <Image source={reviewUpgrades} style={styles.icon} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Upgrades</Text>
              <Text style={styles.description}>Prada PR 10YV, Brown / Tortoise, Medium (<Text style={styles.strikeThrough}>+$468</Text> +$421)</Text>
              <Text style={styles.detail}><Text style={styles.bold}>Upgrades:</Text> {lens.upgrades} (+$14)</Text>
            </View>
          </View>
        </View>
      </View>
      
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleAddToCart}
            style={styles.button}>
            <Text style={styles.buttonText}>Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={[styles.button, { backgroundColor: '#4B5563' }]}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 5,
    alignSelf:'center',
    marginBottom: 5,
    color: "#4B5563"
  },
  subtitle: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    marginBottom: 10,
    alignSelf:'center'
  },
  mainContainer: {
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignSelf: "center"
  },
  cardContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 10,
  },
  iconContainer: {
    borderRadius: 5,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
  },
  infoContainer: {
    borderRadius: 5,
    width: '80%',
    padding: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
  detail: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf:'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#B91C1C',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 4,
    height: 35
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SelectLensTypeComponentProp;

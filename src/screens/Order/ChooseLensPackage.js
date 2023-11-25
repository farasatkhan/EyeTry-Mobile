import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import silverLens from '../../assets/images/orders/silver.png';
import goldLens from '../../assets/images/orders/gold.png';
import platinumLens from '../../assets/images/orders/platinum.png';
import diamondLens from '../../assets/images/orders/diamond.png';
import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../redux/actions/orderSelectionAction';

export default function ChooseLensPackage({ onNextStep }) {
  const dispatch = useDispatch();

  const handlePackageAndCoatingsSelect = (packageType, coatingsType) => {
    // Dispatch an action to update selected package and coatings
    dispatch(
      updateSelectedOptions({
        lensProperties: {
          package: packageType,
          coatings: coatingsType,
        },
      })
    );

    // Call the parent's handleNextStep function when the element is clicked
    onNextStep();
  };

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
        {/* <Text>jsdbfh</Text> */}
      <Text className="mx-auto mb-3 text-gray-600" style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 5 }}>Choose Lens Package</Text>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <TouchableOpacity
          onPress={() => {
            handlePackageAndCoatingsSelect('Silver', '1.5 index ClearViz©️ Lenses, Lens Protective');
          }}
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 8,
          }}>
          <View style={{ width: '25%', backgroundColor: 'white', borderRadius: 8, alignItems:'center', justifyContent:'center' }}>
            <Image source={silverLens} style={{ height: 80, width: "100%", resizeMode: 'cover', borderRadius: 8 }} />
          </View>
          <View style={{ width: '75%', padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Silver (Free)</Text>
            <Text style={{ fontSize: 14, fontFamily: 'sans-serif' }}>1.5 index ClearViz©️ Lenses</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handlePackageAndCoatingsSelect(
              'Gold',
              '1.5 index ClearViz©️ Lenses, Anti-scratch coating, 100% UV-Block coating, Anti-reflective coating'
            );
          }}
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 8,
          }}>
          <View style={{ width: '25%', backgroundColor: 'white', borderRadius: 8, alignItems:'center', justifyContent:'center' }}>
            <Image source={goldLens} style={{ height: 80, width: "100%", resizeMode: 'cover', borderRadius: 8 }} />
          </View>
          <View style={{ width: '75%', padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Gold</Text>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <Text style={{ fontSize: 12, color: 'blue', fontWeight: 'bold', marginRight: 5 }}>Lens Protective</Text>
            </View>
            <Text style={{ fontSize: 14, fontFamily: 'sans-serif' }}>
              1.5 index ClearViz©️ Lenses, Anti-scratch coating, 100% UV-Block coating, Anti-reflective coating
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handlePackageAndCoatingsSelect(
              'Platinum',
              '1.61 index featherweight G-vision©️ Lenses, up to 30% thinner, Anti-scratch coating, 100% UV-block coating, Anti-reflective coating'
            );
          }}
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 8,
          }}>
          <View style={{ width: '25%', backgroundColor: 'white', borderRadius: 8, alignItems:'center', justifyContent:'center' }}>
            <Image source={platinumLens} style={{ height: 80, width: "100%", resizeMode: 'cover', borderRadius: 8 }} />
          </View>
          <View style={{ width: '75%', padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Platinum</Text>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <Text style={{ fontSize: 12, color: 'blue', fontWeight: 'bold', marginRight: 5 }}>Lens Protective</Text>
              <Text style={{ fontSize: 12, color: 'green', fontWeight: 'bold', marginRight: 5 }}>Super Thin Lenses</Text>
            </View>
            <Text style={{ fontSize: 14, fontFamily: 'sans-serif' }}>
              1.61 index featherweight G-vision©️ Lenses, up to 30% thinner, Anti-scratch coating, 100% UV-block coating, Anti-reflective coating
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handlePackageAndCoatingsSelect(
              'Diamond',
              '1.67 index G-vision©️ ultra-thin lenses, up to 40% thinner, Anti-scratch coating, 100% UV-Block coating (UVA + UVB), Enhanced Anti-reflective coating'
            );
          }}
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 8,
          }}>
          <View style={{ width: '25%', backgroundColor: 'white', borderRadius: 8, alignItems:'center', justifyContent:'center' }}>
            <Image source={diamondLens} style={{ height: 80, width: "100%", resizeMode: 'cover', borderRadius: 8 }} />
          </View>
          <View style={{ width: '75%', padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Diamond</Text>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <Text style={{ fontSize: 12, color: 'blue', fontWeight: 'bold', marginRight: 5 }}>Lens Protective</Text>
              <Text style={{ fontSize: 12, color: 'green', fontWeight: 'bold', marginRight: 5 }}>Super Thin Lenses</Text>
              <Text style={{ fontSize: 12, color: 'yellow', fontWeight: 'bold' }}>Premium coatings</Text>
            </View>
            <Text style={{ fontSize: 14, fontFamily: 'sans-serif' }}>
              1.67 index G-vision©️ ultra-thin lenses, up to 40% thinner, Anti-scratch coating, 100% UV-Block coating (UVA + UVB), Enhanced Anti-reflective coating, Free Prescription Card (15% off your next purchase)
            </Text>
          </View>
        </TouchableOpacity>

        
      </View>
    </ScrollView>
  );
}

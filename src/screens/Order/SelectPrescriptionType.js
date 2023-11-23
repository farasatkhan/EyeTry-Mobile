import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../redux/actions/orderSelectionAction';

export default function SelectLensTypeComponent({ onNextStep }) {
  const dispatch = useDispatch();

  const handleSelections = (type) => {
    // Dispatch an action to update the selectedOptions state in Redux
    dispatch(updateSelectedOptions({
      "lensProperties": {
        "prescriptionType": type
      }
    }));
  };

  const handleNext = () => {
    onNextStep();
  };

  return (
    <View>
      <Text style={styles.heading}>Select a prescription type</Text>

      <TouchableOpacity
        onPress={() => { handleSelections("Single Vision"); handleNext() }}
        style={styles.optionContainer}
      >
        <Text style={styles.optionHeading}>Single Vision</Text>
        <Text style={styles.optionText}>Most common prescription lenses, used for either distance or near vision</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { handleSelections("Progressive"); handleNext() }}
        style={styles.optionContainer}
      >
        <Text style={styles.optionHeading}>Progressive</Text>
        <Text style={styles.optionText}>No-line lenses with visual field options, including combinations of distance, intermediate, and near vision.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { handleSelections("Bifocal"); handleNext() }}
        style={styles.optionContainer}
      >
        <Text style={styles.optionHeading}>Bifocal</Text>
        <Text style={styles.optionText}>Lenses with two fields of vision (distance and near) separated by a visible line.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "sans-serif",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign:"center"
  },
  optionContainer: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    padding: 16,
  },
  optionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333", // Adjust color as needed
  },
  optionText: {
    fontSize: 16,
    fontFamily: "sans-serif",
    color: "#555", // Adjust color as needed
  },
});

import React from "react";
import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../redux/actions/orderSelectionAction';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SelectGlassesType({ onNextStep }) {
  const dispatch = useDispatch();

  const handleGlassesTypeSelect = (type) => {
    // Dispatch an action to update the selectedOptions state in Redux
    dispatch(updateSelectedOptions({
      "lensProperties": {
        "lensType": type
      }
    }));
  };

  const handleNext = () => {
    onNextStep();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a prescription type</Text>

      <TouchableOpacity
        onPress={() => { handleGlassesTypeSelect("Prescription"); handleNext(); }}
        style={styles.optionContainer}
      >
        <Text style={styles.optionHeading}>Prescription</Text>
        <Text style={styles.optionText}>Lens with vision correction.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { handleGlassesTypeSelect("Non-Prescription"); handleNext(); }}
        style={styles.optionContainer}
      >
        <Text style={styles.optionHeading}>Non-Prescription</Text>
        <Text style={styles.optionText}>Lens with no vision correction.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { handleGlassesTypeSelect("Readers"); handleNext(); }}
        style={styles.optionContainer}
      >
        <Text style={styles.optionHeading}>Readers</Text>
        <Text style={styles.optionText}>One magnification field for reading. No prescription necessary.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  heading: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 16,
  },
  optionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'sans-serif',
  },
});

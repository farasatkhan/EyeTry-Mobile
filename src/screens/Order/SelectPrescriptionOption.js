import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SelectLensTypeComponent({ onNextStep }) {
  const handleNext = () => {
    onNextStep();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose prescription Option</Text>

      <TouchableOpacity
        onPress={() => handleNext()}
        style={styles.optionContainer}
      >
        <Text style={styles.optionHeading}>
          New Customer or New Prescription?
        </Text>
        <Text style={styles.optionText}>
          You will need your current prescription and pupillary distance (PD).
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNext()}
        style={styles.optionContainer}
      >
        <Text style={styles.optionHeading}>Select from my Account</Text>
        <Text style={styles.optionText}>
          Choose a saved prescription or select one from a previous order.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  heading: {
    fontFamily: "sans-serif",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4B5563", 
  },
  optionContainer: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#4B5563",
    borderRadius: 8,
    padding: 16,
  },
  optionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#4B5563", 
  },
  optionText: {
    fontSize: 16,
    fontFamily: "sans-serif",
    color: "rgb(100 116 139)"
  },
});

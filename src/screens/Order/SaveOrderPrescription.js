import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SelectLensTypeComponent({ onNextStep }) {
  const handleNext = () => {
    onNextStep();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Simplify your next purchase.</Text>
      
      <TouchableOpacity
        onPress={() => handleNext()}
        style={styles.optionContainer}
      >
        <Text style={styles.optionTitle}>Save Prescription</Text>
        <Text style={styles.optionDescription}>
          Get the next pair in no time by saving this prescription to your profile.
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => handleNext()}
        style={[styles.optionContainer, styles.secondOptionContainer]}
      >
        <Text style={styles.optionTitle}>Skip Saving Prescription</Text>
        <Text style={styles.optionDescription}>
          Skip saving prescription this time.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#4B5563"
  },
  optionContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#4B5563",
    borderRadius: 10,
  },
  secondOptionContainer: {
    borderColor: "#4B5563", 
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4B5563"
  },
  optionDescription: {
    fontSize: 16,
    color: "rgb(100 116 139)"
  },
});

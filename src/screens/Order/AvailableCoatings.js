import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { CheckBox, Icon } from '@rneui/themed';
import superHydrophobic from '../../assets/images/orders/superHydrophobic.png';
import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../redux/actions/orderSelectionAction';

export default function SelectLensTypeComponent({ onNextStep, onSelectedOptions }) {
    const handleNext = (step) => {
        onNextStep(step);
    };

    const [isClicked, setIsClicked] = useState(false);
    // Create a ref for the checkbox
    const checkboxRef = useRef(null);
    const [check1, setCheck1] = useState(false);


    const handleClickOtherElement = () => {
        if (checkboxRef.current) {
            checkboxRef.current.toggle();
            setIsClicked(!isClicked);
        }
    };

    // handling data and sending to parent component
    const dispatch = useDispatch();

    const handleSelectedOptions = (upgrades) => {
        // Dispatch an action to update selected package and coatings
        dispatch(updateSelectedOptions({
            "lensProperties": {
                "upgrades": upgrades
            }
        }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Available coatings</Text>
            <Text style={styles.description}>You can select more than one.</Text>

            <TouchableOpacity
                onPress={() => {
                    handleClickOtherElement();
                    handleSelectedOptions("Super Hydrophobic");
                    setCheck1(!check1);
                }}
                style={[styles.optionContainer, isClicked && styles.selectedOption]}
            >
                <View style={styles.imageContainer}>
                    <Image source={superHydrophobic} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.optionTitle}>Super Hydrophobic</Text>
                    <Text style={styles.optionDescription}>Easy to clean. Keep water, fingerprints, and debris away from your lenses.</Text>
                </View>
                {/* <CheckBox

                    containerStyle={styles.checkboxContainer}
                    checkedIcon={<View style={styles.checkbox} />}
                /> */}
                <CheckBox
                    ref={checkboxRef}
                    checked={check1}
                    onPress={() => {
                        handleClickOtherElement();
                        handleSelectedOptions("Super Hydrophobic");
                        setCheck1(!check1)
                    }}
                />

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleNext(11)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 2,
        color: "#4B5563"
    },
    description: {
        marginBottom: 10,
        fontSize: 14,
        color: "rgb(100 116 139)",
        textAlign: "center",
    },
    optionContainer: {
        flexDirection: "row",
        marginVertical: 10,
        padding: 20,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 10,
    },
    selectedOption: {
        backgroundColor: "#f0f0f0",
    },
    imageContainer: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: 70,
        width: "100%",
        borderRadius: 10,
    },
    textContainer: {
        width: "55%",
        paddingLeft: 10,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#4B5563"
    },
    optionDescription: {
        fontSize: 14,
        color: "#666",
    },
    checkboxContainer: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
    },

    button: {
        marginTop: 12,
        width: "100%",
        backgroundColor: "#4B5563",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
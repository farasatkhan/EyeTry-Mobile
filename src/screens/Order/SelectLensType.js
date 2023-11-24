import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import clear from '../../assets/images/orders/clear.png';
import bluelight from '../../assets/images/orders/bluelight.png';
import transition from '../../assets/images/orders/transition.png';
import sunglasses from '../../assets/images/orders/sunglasses.png';
import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../redux/actions/orderSelectionAction';

export default function SelectLensTypeComponent({ onNextStep }) {
    const dispatch = useDispatch();

    const handleSelections = (value) => {
        // Dispatch an action to update selected package and coatings
        dispatch(updateSelectedOptions({
            "lensProperties": {
                "glassesType": value
            }
        }));
    };

    const handleNext = (step) => {
        onNextStep(step);
    };

    return (
        <View>
            <Text style={styles.header}>Select Glasses Type</Text>

            <TouchableOpacity
                onPress={() => {
                    handleNext(10);
                    handleSelections("Clear");
                }}
                style={styles.optionContainer}
            >
                <View style={styles.imageContainer}>
                    <Image source={clear} style={styles.image} />
                 

                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.optionTitle}>Clear</Text>
                    <Text style={styles.optionDescription}>Lenses for everyday use</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    handleNext(10);
                    handleSelections("Blue Light Lenses");
                }}
                style={styles.optionContainer}
            >
                <View style={styles.imageContainer}>
                    <Image source={bluelight} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.optionTitle}>Blue Light Lenses (+$39 +$19.50)</Text>
                    <Text style={styles.optionDescription}>Protect your eyes from the emissions of digital devices</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    handleNext(8);
                    handleSelections("Transition / Photochromic");
                }}
                style={styles.optionContainer}
            >
                <View style={styles.imageContainer}>
                    <Image source={transition} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.optionTitle}>Transition / Photochromic (From +$69 +$34.50)</Text>
                    <Text style={styles.optionDescription}>Darken when outdoors, fade back to clear indoors</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    handleNext(9);
                    handleSelections("Sunglasses");
                }}
                style={styles.optionContainer}
            >
                <View style={styles.imageContainer}>
                    <Image source={sunglasses} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.optionTitle}>Sunglasses (From +$29 +$14.50)</Text>
                    <Text style={styles.optionDescription}>Tints, Mirrored or Polarized</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    optionContainer: {
        marginVertical: 10,
        padding: 20,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 10,
        flexDirection: "row",
    },
    imageContainer: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    image: {
        height: 60,
        width: "100%",
        borderRadius: 10,
    },
    textContainer: {
        width: "75%",
        paddingLeft: 10,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    optionDescription: {
        fontSize: 16,
        color: "#666",
    },
});

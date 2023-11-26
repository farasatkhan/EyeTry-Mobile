import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import transitions from '../../assets/images/orders/transitions.png';
import signature from '../../assets/images/orders/signature.png';
import gen8 from '../../assets/images/orders/gen8.png';
import xtractive from '../../assets/images/orders/xtractive.png';
import polarized from '../../assets/images/orders/polarized.png';
// lens svgs - png
import graysvg from '../../assets/images/orders/lensSvgs/gray.png'
import bluesvg from '../../assets/images/orders/lensSvgs/blue.png'
import brownsvg from '../../assets/images/orders/lensSvgs/brown.png'
import greensvg from '../../assets/images/orders/lensSvgs/green.png'
import yellowsvg from '../../assets/images/orders/lensSvgs/yellow.png'
import redMirroredSvg from '../../assets/images/orders/lensSvgs/redMirrored.png'
import blueMirroredSvg from '../../assets/images/orders/lensSvgs/blueMirrored.png'
import goldMirroredSvg from '../../assets/images/orders/lensSvgs/goldMirrored.png'
import greenMirroredSvg from '../../assets/images/orders/lensSvgs/greenMirrored.png'
import SilverMirroredSvg from '../../assets/images/orders/lensSvgs/SilverMirrored.png'
import transitionGray from '../../assets/images/orders/lensSvgs/transitionGray.png'

import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../redux/actions/orderSelectionAction';

const SelectLensTypeComponent = ({ onUpdate, onNextStep, onPreviousState }) => {
    const [selectedColor, setSelectedColor] = useState("Gray Polarized");

    // Handle user input and update the product
    const handleFrameColorChange = (color) => {
        onUpdate(color);
        setSelectedColor(color.name)
    };

    // navigation
    const handleNext = (step) => {
        onNextStep(step)
    }

    // handling data, sending from child to parent
    // handling sunglasses type

    const dispatch = useDispatch();

    const handleSunglassesTypeAndColor = (sunglassesType, color) => {
        dispatch(updateSelectedOptions({
            "lensProperties": {
                "sunglassesLens": {
                    "sunglassesType": sunglassesType,
                    "color": color
                }
            }
        }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sunglasses Lens Selection</Text>

            {/* Transitions™ Signature® GEN 8™" */}
            <View style={styles.rowContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.iconRow}>
                        <View className='flex-row items-center'>
                            <Text className='text-black font-bold font-sans text-lg'>Polarized (</Text> 
                            <Text className="font-bold text-green-700 font-sans"> +$99 </Text>
                            <Text className='line-through font-bold text-red-700 font-sans'> +$49.50</Text>
                            <Text className='font-bold text-black font-sans text-lg'> )</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>Reduce glare and haze for clearer vision.</Text>
                </View>
                <View className="space-x-4" style={styles.rightContainer}>
                    <TouchableOpacity style={selectedColor === "Gray Polarized" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: graysvg, name: "Gray Polarized" });
                                handleSunglassesTypeAndColor("Polarized", "Gray");
                            }}
                            style={[styles.colorButton, { backgroundColor: 'gray' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Blue Polarized" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: bluesvg, name: "Blue Polarized" })
                                handleSunglassesTypeAndColor("Polarized", "Blue");
                            }}
                            style={[styles.colorButton, { backgroundColor: '#1E40AF' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Transition Xtractive */}
            <View style={styles.rowContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.iconRow}>
                    <View className='flex-row items-center'>
                            <Text className='text-black font-bold font-sans text-lg'>Color Tint (</Text> 
                            <Text className="font-bold text-green-700 font-sans"> +$29 </Text>
                            <Text className='line-through font-bold text-red-700 font-sans'> +$14.50</Text>
                            <Text className='font-bold text-black font-sans text-lg'> )</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>Sun protection basic lenses</Text>
                </View>
                <View className="space-x-4" style={styles.rightContainer}>
                    <TouchableOpacity style={selectedColor === "Gray Tint" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: graysvg, name: "Gray Tint" })
                                handleSunglassesTypeAndColor("Tint", "Gray");
                            }}
                            style={[styles.colorButton, { backgroundColor: 'gray' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Brown Tint" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: brownsvg, name: "Brown Tint" })
                                handleSunglassesTypeAndColor("Tint", "Brown");
                            }}
                            style={[styles.colorButton, { backgroundColor: 'brown' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Green Tint" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: greensvg, name: "Green Tint" })
                                handleSunglassesTypeAndColor("Tint", "Green");
                            }}
                            style={[styles.colorButton, { backgroundColor: 'green' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Blue Tint" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: bluesvg, name: "Blue Tint" })
                                handleSunglassesTypeAndColor("Tint", "Blue");
                            }}
                            style={[styles.colorButton, { backgroundColor: '#1E40AF' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Yellow Tint" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: yellowsvg, name: "Yellow Tint" })
                                handleSunglassesTypeAndColor("Tint", "Yellow");
                            }}
                            style={[styles.colorButton, { backgroundColor: '#FACC15' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Transition Xtractive Polarized*/}
            <View style={styles.rowContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.iconRow}>
                    <View className='flex-row items-center'>
                            <Text className='text-black font-bold font-sans text-lg'>Mirrored (</Text> 
                            <Text className="font-bold text-green-700 font-sans"> +$49 </Text>
                            <Text className='line-through font-bold text-red-700 font-sans'> +$24.50</Text>
                            <Text className='font-bold text-black font-sans text-lg'> )</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>High fashionable reflective color</Text>
                </View>
                <View className="space-x-4" style={styles.rightContainer}>
                    <TouchableOpacity style={selectedColor === "Red Mirrored" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: redMirroredSvg, name: "Red Mirrored" })
                                handleSunglassesTypeAndColor("Mirrored", "Red");
                            }}
                            style={[styles.colorButton, { backgroundColor: '#B91C1C' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Blue Mirrored" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: blueMirroredSvg, name: "Blue Mirrored" })
                                handleSunglassesTypeAndColor("Mirrored", "Blue");
                            }}
                            style={[styles.colorButton, { backgroundColor: '#1E40AF' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Gold Mirrored" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: goldMirroredSvg, name: "Gold Mirrored" })
                                handleSunglassesTypeAndColor("Mirrored", "Gold");
                            }}
                            style={[styles.colorButton, { backgroundColor: '#A16207' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Green Mirrored" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: greenMirroredSvg, name: "Green Mirrored" })
                                handleSunglassesTypeAndColor("Mirrored", "Green");
                            }}
                            style={[styles.colorButton, { backgroundColor: 'green' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Silver Mirrored" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: SilverMirroredSvg, name: "Silver Mirrored" })
                                handleSunglassesTypeAndColor("Mirrored", "Silver");
                            }}
                            style={[styles.colorButton, { backgroundColor: '#9CA3AF' }]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { handleNext(10) }} style={styles.selectButton}>
                    <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 16,
        marginTop: -5
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        marginTop:5
    },
    rowContainer: {
        flexDirection: "column",
        marginBottom: 10,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingBottom: 5
    },
    leftContainer: {
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 10,
        paddingBottom: 10,
    },
    iconRow: {
        flexDirection: "row",
        marginBottom: 5,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    description: {
        fontSize: 12,
        fontFamily: 'sans-serif',
        marginTop: -5
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: 'white',
        borderRadius: 8,
        paddingLeft: 15
    },
    selectedColor: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 50,
    },
    colorButton: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 4,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // ... Add styles for other components
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        marginTop: 20,
    },
    selectButton: {
        backgroundColor: '#991B1B',
        borderRadius: 8,
        padding: 10,
        marginTop: -15
    },
    selectButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SelectLensTypeComponent;

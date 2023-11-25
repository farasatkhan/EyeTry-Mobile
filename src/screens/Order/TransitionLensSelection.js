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
    const [selectedColor, setSelectedColor] = useState("Gray");
    const dispatch = useDispatch();

    const handleTransitionTypeAndColor = (transitionType, transitionColor) => {
        dispatch(updateSelectedOptions({
            "lensProperties": {
                "transitionLens": {
                    "transitionType": transitionType,
                    "transitionColor": transitionColor
                }
            }
        }));
    };

    const handleFrameColorChange = (color) => {
        onUpdate(color);
        setSelectedColor(color.name);
    };

    const handleNext = (step) => {
        onNextStep(step);
    };

    const handleChildToParentPrevState = (state) => {
        onPreviousState(state);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transition Lens Selection</Text>

            {/* Transitions™ Signature® GEN 8™" */}
            <View style={styles.rowContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.iconRow}>
                        <Image source={transitions} className="w-[85px] h-[25px] object-contain " />
                        <Image source={signature} resizeMode="contain" className="w-[80px] h-[17px] mt-[3px] ml-1"  />
                        <Image source={gen8} resizeMode="contain" className="w-[40px] h-[20px] mt-[2px] ml-1" />
                    </View>
                    <Text style={styles.description}>Rapid light-adaptive technology.</Text>
                </View>
                <View className="space-x-4" style={styles.rightContainer}>
                    <TouchableOpacity style={selectedColor === "Transition Gray" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: transitionGray, color: "Gray", name: "Transition Gray" })
                                handleTransitionTypeAndColor("Transitions Signature Gen8", "Gray")
                            }}
                            style={[styles.colorButton, {backgroundColor: 'gray'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Transition Blue" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: bluesvg, name: "Transition Blue" })
                                handleTransitionTypeAndColor("Transitions Signature Gen8", "Blue")
                            }}
                            style={[styles.colorButton, {backgroundColor: '#1E40AF'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Transition Xtractive */}
            <View style={styles.rowContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.iconRow}>
                        <Image source={transitions} className="w-[85px] h-[25px] object-contain " />
                        <Image source={xtractive} resizeMode="contain" className="w-[85px] h-[20px] mt-[3px] ml-1"  />
                    </View>
                    <Text style={styles.description}>Ultimate adaptability in varying light conditions.</Text>
                </View>
                <View className="space-x-4" style={styles.rightContainer}>
                    <TouchableOpacity style={selectedColor === "Gray Tint" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: graysvg, name: "Gray Tint" })
                                handleTransitionTypeAndColor("Transitions Xtractive", "Gray")
                            }}
                            style={[styles.colorButton, {backgroundColor: 'gray'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Brown Tint" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: brownsvg, name: "Brown Tint" })
                                handleTransitionTypeAndColor("Transitions Xtractive", "Brown")
                            }}
                            style={[styles.colorButton, {backgroundColor: 'brown'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Green Tint" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: greensvg, name: "Green Tint" })
                                handleTransitionTypeAndColor("Transitions Xtractive", "Green")
                            }}
                            style={[styles.colorButton, {backgroundColor: 'green'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Blue Tint" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: bluesvg, name: "Blue Tint" })
                                handleTransitionTypeAndColor("Transitions Xtractive", "Blue")
                            }}
                            style={[styles.colorButton, {backgroundColor: '#1E40AF'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Yellow Tint" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: yellowsvg, name: "Yellow Tint" })
                                handleTransitionTypeAndColor("Transitions Xtractive", "Yellow")
                            }}
                            style={[styles.colorButton, {backgroundColor: '#FACC15'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* Transition Xtractive Polarized*/}
            <View style={styles.rowContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.iconRow}>
                        <Image source={transitions} className="w-[85px] h-[25px] object-contain " />
                        <Image source={xtractive} resizeMode="contain" className="w-[85px] h-[20px] mt-[3px] ml-1"  />
                        <Image source={polarized} resizeMode="contain" className="w-[85px] h-[20px] mt-[2.5px] ml-1"  />
                    </View>
                    <Text style={styles.description}>Versatile protection with polarization.</Text>
                </View>
                <View className="space-x-4" style={styles.rightContainer}>
                    <TouchableOpacity style={selectedColor === "Red Mirrored" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: redMirroredSvg, name: "Red Mirrored" })
                                handleTransitionTypeAndColor("Transitions Xtractive Polarized", "Red")
                            }}
                            style={[styles.colorButton, {backgroundColor: '#B91C1C'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Blue Mirrored" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: blueMirroredSvg, name: "Blue Mirrored" })
                                handleTransitionTypeAndColor("Transitions Xtractive Polarized", "Blue")
                            }}
                            style={[styles.colorButton, {backgroundColor: '#1E40AF'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Gold Mirrored" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: goldMirroredSvg, name: "Gold Mirrored" })
                                handleTransitionTypeAndColor("Transitions Xtractive Polarized", "Gold")
                            }}
                            style={[styles.colorButton, {backgroundColor: '#A16207'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Green Mirrored" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: greenMirroredSvg, name: "Green Mirrored" })
                                handleTransitionTypeAndColor("Transitions Xtractive Polarized", "Green")
                            }}
                            style={[styles.colorButton, {backgroundColor: 'green'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedColor === "Silver Mirrored" ? styles.selectedColor : {}}>
                        <TouchableOpacity
                            onPress={() => {
                                handleFrameColorChange({ image: SilverMirroredSvg, name: "Silver Mirrored" })
                                handleTransitionTypeAndColor("Transitions Xtractive Polarized", "Silver")
                            }}
                            style={[styles.colorButton, {backgroundColor: '#9CA3AF'}]}
                        ></TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>

            
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { handleNext(10); handleChildToParentPrevState(8); }} style={styles.selectButton}>
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
        textAlign: "center"
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

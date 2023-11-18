import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const AstigmatismTestScreen = () => {

    const [status, setStatus] = useState(false);
    const images = [
        { path: require('../../assets/images/visionAssessments/astigmatism1.gif'), answer: true },
        { path: require('../../assets/images/visionAssessments/astigmatism2.gif'), answer: false },
        { path: require('../../assets/images/visionAssessments/astigmatism3.gif'), answer: true },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [shuffledImages, setShuffledImages] = useState([]);

    useEffect(() => {
        shuffleImages();
    }, []);

    const shuffleImages = () => {
        const shuffledImages = [...images].sort(() => Math.random() - 0.5);
        setCurrentIndex(0);
        setAnswers([]);
        setShowResults(false);
        setShuffledImages(shuffledImages);
    };

    const handleAnswer = (answer) => {
        setAnswers([...answers, answer]);
        if (currentIndex === shuffledImages.length - 1) {
            const pass = answers.every((answer, index) => answer === shuffledImages[index].answer);
            setStatus(pass);
            setShowResults(true);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const renderImage = () => {
        if (shuffledImages.length === 0) {
            return null;
        }

        const currentImage = shuffledImages[currentIndex];
        return (
            <View>
                <View style={{ alignItems: 'center' }}>
                    <Image source={currentImage.path} style={{ width: 250, height: 250 }} resizeMode="contain" />
                </View>

                <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 40,
                            backgroundColor: '#0F97B1',
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                        onPress={() => handleAnswer(true)}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 40,
                            backgroundColor: '#0F97B1',
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                        onPress={() => handleAnswer(false)}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderResults = () => {
        const pass = answers.every((answer, index) => answer === shuffledImages[index].answer);
        return (
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 20, marginTop: 20 }}>Test Results</Text>
                {pass ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', color: 'green' }}>
                        <Icon name="checkcircleo" size={18} color="green" />

                        <Text> You passed the Astigmatism Test!</Text>
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center', color: 'red' }}>
                        <Icon name="closecircleo" size={18} color="red" />

                        <Text style={{fontSize: 16 }}> You failed the Astigmatism Test.</Text>
                    </View>
                )}
                <View style={{ flexDirection: 'row', marginTop: 50, alignSelf:'center' }}>
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 40,
                            backgroundColor: '#0F97B1',
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                        onPress={shuffleImages}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Retake Test</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 40,
                            backgroundColor: 'gray',
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 10,
                        }}
                        onPress={() => { Alert.alert('Result Saved Successfuly!') }}
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Save Results</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ alignItems: 'center', marginTop: 20, width: "80%", justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#374151', marginBottom: 20 }}>Astigmatism Test</Text>
                <Text style={{ fontSize: 16, fontFamily: 'sans-serif', marginTop: 2, marginBottom: 8 }}>
                    Find out if you have a contrast sensitivity problem in less than 2 minutes!
                </Text>

            </View>
            <View style={{}}>
                <View style={{ width: '80%', marginTop: 10, alignSelf: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'sans-serif', fontWeight: 'bold', marginBottom: 10, marginTop: 10, textAlign: 'justify', }}>
                            Do you see the lines equally clear and with the same thickness? If Yes, then click the YES button, otherwise click the NO button below the image.
                        </Text>
                        <View>
                            {showResults ? renderResults() : renderImage()}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AstigmatismTestScreen;

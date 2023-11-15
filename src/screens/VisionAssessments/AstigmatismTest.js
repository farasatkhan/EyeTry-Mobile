import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
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
                    <Image source={currentImage.path} style={{ width: 250, height: 250}} resizeMode="contain" />
                </View>

                <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Button title="Yes" onPress={() => handleAnswer(true)} />
                    <Button title="No" onPress={() => handleAnswer(false)} />
                </View>
            </View>
        );
    };

    const renderResults = () => {
        const pass = answers.every((answer, index) => answer === shuffledImages[index].answer);
        return (
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 5 }}>Test Results</Text>
                {pass ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', color: 'green' }}>
                        <Icon name="checkcircleo" size={14} color="green" />

                        <Text>You passed the Astigmatism Test!</Text>
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center', color: 'red' }}>
                        <Icon name="closecircleo" size={14} color="red" />

                        <Text>You failed the Astigmatism Test.</Text>
                    </View>
                )}
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Button title="Retake Test" onPress={shuffleImages} />
                    <Button title="Save Results" onPress={() => {Alert.alert('Result Saved Successfuly!')}} />
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ alignItems: 'center', marginTop: 20, width: "90%", justifyContent:'center', alignItems:'center', alignSelf:'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#374151' }}>Astigmatism Test</Text>
                <Text style={{ fontSize: 16, fontFamily: 'sans-serif', marginTop: 2, marginBottom: 8 }}>
                    Find out if you have a contrast sensitivity problem in less than 2 minutes!
                </Text>

            </View>
            <View style={{  }}>
                <View style={{ width: '90%', marginTop: 10, alignSelf: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'sans-serif', fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>
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

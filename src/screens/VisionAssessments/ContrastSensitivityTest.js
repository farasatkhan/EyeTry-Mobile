import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    FlatList,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

const ContrastSensitivityTestScreen = () => {
    // const [status, setStatus] = useState(false);
    // const baseURL = 'http://localhost:3000';

    //   const submitVisionAssessmentResult = async () => {
    //     const data = {
    //       testType: 'Contrast Sensitivity Test',
    //       status: status,
    //     };

    //     try {
    //       const accessToken = await localStorage.getItem('accessToken');
    //       const response = await axios.post(
    //         `${baseURL}/users/submit_vision_assessment_result/`,
    //         data,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         }
    //       );

    //       console.log('Response:', response);
    //       return response;
    //     } catch (error) {
    //       // Server is returning 403 for an expired token
    //       if (error.response && error.response.status === 403) {
    //         try {
    //           console.log('Error Caught');
    //           await reGenerateAccessToken();
    //           return submitVisionAssessmentResult();
    //         } catch (e) {
    //           console.error('Error while refreshing token', e);
    //           throw e;
    //         }
    //       }
    //       throw error;
    //     }
    //   };

    const imageLetters = [
        ['D', 'P', 'X', 'H', 'C', 'B'],
        ['Y', 'P', 'T', 'U', 'A', 'G'],
        ['A', 'E', 'L', 'S', 'O', 'I'],
        ['O', 'C', 'R', 'M', 'E', 'U'],
        ['K', 'T', 'I', 'E', 'D', 'L'],
        ['X', 'R', 'P', 'O', 'K', 'A'],
        ['H', 'Q', 'D', 'Y', 'T', 'N'],
        ['G', 'A', 'U', 'N', 'P', 'S'],
    ];
    const [userInput, setUserInput] = useState('');
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [testCompleted, setTestCompleted] = useState(false);
    const [testResults, setTestResults] = useState([]);

    const handleInputChange = (text) => {
        setUserInput(text.toUpperCase());
    };

    const handleNextLetter = () => {
        if(userInput == ''){
            Alert.alert("Please Enter a Character!")
        }
        else{
            const letter = imageLetters.flat()[currentLetterIndex];
            const result = {
                letter,
                userInput,
                correct: userInput === letter,
            };
    
            setTestResults((prevResults) => [...prevResults, result]);
            setCurrentLetterIndex((prevIndex) => prevIndex + 1);
            setUserInput('');
    
            if (currentLetterIndex === imageLetters.flat().length - 1) {
                setTestCompleted(true);
            }
        }
    };

    const handleReset = () => {
        setUserInput('');
        setCurrentLetterIndex(0);
        setTestCompleted(false);
        setTestResults([]);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Contrast Sensitivity Test</Text>
                <Text style={styles.subHeaderText}>
                    Find out if you have contrast sensitivity problem in less than 2 minutes!
                </Text>

            </View>

            <View style={styles.testContainer}>
                {!testCompleted ? (
                    <View style={styles.testInProgressContainer}>
                        {/* Test in progress */}
                        <Image
                            source={require('../../assets/images/visionAssessments/contrast-sensitivity-test.jpg')}
                            style={styles.testImage}
                        />
                        {/* <View style={styles.imageChart}>
                            {imageLetters.map((row, rowIndex) => (
                                <View key={rowIndex} style={styles.imageChartRow}>
                                {row.map((letter, columnIndex) => (
                                    <Text
                                    key={columnIndex}
                                    style={[
                                        styles.imageChartLetter,
                                        currentLetterIndex === rowIndex * row.length + columnIndex
                                        ? styles.activeLetter
                                        : {},
                                    ]}
                                    >
                                    {letter}
                                    </Text>
                                ))}
                                </View>
                            ))}
                            </View> */}
                        <Text style={styles.enterLetterText}>Enter the letter you see in the image. (Capital Letters)</Text>
                        <TextInput
                            style={styles.textInput}
                            value={userInput}
                            onChangeText={handleInputChange}
                        />
                        <TouchableOpacity
                            style={styles.nextButton}
                            onPress={handleNextLetter}
                        >
                            <Text style={styles.nextButtonText}>Next Letter</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.testCompletedContainer}>
                        {/* Test completed */}
                        <Text style={styles.testResultsTitle}>Test Results:</Text>
                        <FlatList
                            data={testResults}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.testResultRow}>
                                    <Text style={styles.resultItem}>Letter: {item.letter}</Text>
                                    <Text style={styles.resultItem}>User Input: {item.userInput}</Text>
                                    <Text style={styles.resultItem}>
                                        Result: {item.correct ? <Icon name="checkcircleo" size={14} color="green" /> : <Icon name="closecircleo" size={14} color="red" />}
                                    </Text>
                                </View>
                            )}
                        />
                        <Text style={styles.overallResultText}>
                            Overall Result: {testResults.every((result) => result.correct) ? 'Congratulations! You passed the test.' : 'Sorry, you did not pass the test. Please try again.'}
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.restartButton} onPress={handleReset}>
                                <Text style={styles.buttonText}>Restart Test</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveResultsButton} onPress={() => { Alert.alert('Result Saved Successfully!') }}>
                                <Text style={styles.buttonText}>Save Results</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color:  '#0F97B1'
    },
    subHeaderText: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
    },
    testImage: {
        width: "80%",
        height: "60%",
        marginTop: 10,
        resizeMode: 'contain', 
      },
      
    testInfo: {
        marginTop: 10,
    },
    infoText: {
        fontSize: 16,
        marginTop: 10,
    },
    testContainer: {
        marginTop: 10,
    },
    testTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    testInProgressContainer: {
        alignItems: 'center',
    },
    testImageInProgress: {
        width: 300,
        height: 300,
        marginBottom: 36,
    },
    imageChart: {
        flexDirection: 'row',
    },
    imageChartRow: {
        flexDirection: 'row',
    },
    imageChartLetter: {
        fontSize: 24,
        marginRight: 10,
    },
    activeLetter: {
        fontWeight: 'bold',
    },
    enterLetterText: {
        fontSize: 16,
        marginTop: 20,
    },
    textInput: {
        width: 250,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 10,
        fontSize: 16,
        marginTop: 10,
    },
    nextButton: {
        backgroundColor: '#0F97B1',
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 4,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
    },
    testCompletedContainer: {
        marginTop: 10,
        width: "85%",
        alignSelf: 'center'
    },
    testResultsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    testResultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    resultItem: {
        fontSize: 16,
    },
    checkIcon: {
        color: 'green',
    },
    closeIcon: {
        color: 'red',
    },
    overallResultText: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    restartButton: {
        backgroundColor:  '#0F97B1',
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginRight: 5
    },
    saveResultsButton: {
        backgroundColor: 'gray',
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginLeft: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ContrastSensitivityTestScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const TumblingETestScreen = () => {
    const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [moves, setMoves] = useState([]);
    let status;
    const baseURL = 'http://localhost:3000';


    // to save results
    // const submitVisionAssessmentResult = async () => {
    //     const data = {
    //       testType: "Vision Acuity Test",
    //       status: status
    //     };
      
    //     try {
    //       const accessToken = await localStorage.getItem('accessToken');
    //       const response = await axios.post(`${baseURL}/users/submit_vision_assessment_result/`, data, {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`
    //         }
    //       });
      
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

    useEffect(() => {
        generateMoves();
    }, []);

    const generateMoves = () => {
        const directions = shuffleArray(['up', 'right', 'down', 'left']);
        const sizes = [100, 80, 60, 40, 20, 16, 12, 8, 6, 4];
        const shuffledMoves = [];

        for (let i = 0; i < 8; i++) {
            const direction = directions[i % 4];
            const size = sizes[i];
            shuffledMoves.push({ direction, size });
        }

        setMoves(shuffledMoves);
    };

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handleButtonClick = (selectedDirection) => {
        const currentMove = moves[currentMoveIndex];
        const isCorrect = selectedDirection === currentMove.direction;
        const result = { direction: currentMove.direction, isCorrect };
        setResults([...results, result]);

        if (currentMoveIndex < moves.length - 1) {
            setCurrentMoveIndex(currentMoveIndex + 1);
        } else {
            // Test completed
            setCurrentMoveIndex(-1); // Set to -1 to show results
        }
    };

    const getCurrentDirectionSymbol = () => {
        const currentMove = moves[currentMoveIndex];
        if (!currentMove) {
            return null;
        }
        const { direction, size } = currentMove;
        const arrowSize = size / 2; // Reduce the size by 2

        const rotationStyle = {
            transform: [{ rotate: `${getRotationValue(direction)}` }],
            width: arrowSize,
            height: arrowSize,
            alignItems: 'center', // To center the rotated content
            justifyContent: 'center', // To center the rotated content
        };

        return (
            <View style={rotationStyle}>
                {/* Your content goes here */}
                <Image source={require('../../assets/images/visionAssessments/E.png')} style={{ width: '100%', height: '100%' }} />
            </View>
        );
    };
    

    const getRotationValue = (direction) => {
        switch (direction) {
            case 'right':
                return '0deg';
            case 'down':
                return '90deg';
            case 'left':
                return '180deg';
            case 'up':
                return '270deg';
            default:
                return '0deg';
        }
    };

    const renderResults = () => {
        return results.map((result, index) => (
            <View key={index} style={styles.tableRow}>
                <Text>{index + 1}</Text>
                <Text style={result.isCorrect ? styles.greenText : styles.redText}>
                    {result.isCorrect ? 'Correct' : 'Incorrect'}
                {result.isCorrect ? (
                    <View style={styles.resultIcon}>
                        <Icon name="checkcircleo" size={14} color="green" />
                    </View>
                ) : (
                    <View style={styles.resultIcon}>
                        <Icon name="closecircleo" size={14} color="red" />
                    </View>
                )}
                </Text>
            </View>
        ));
    };

    const getTotalIncorrectResults = () => {
        const incorrectNumbers = results.filter(result => !result.isCorrect).length;
        incorrectNumbers == 0 ? status = true : status = false;
        return incorrectNumbers;
    };

    const getTestResultMessage = () => {
        const totalIncorrectResults = getTotalIncorrectResults();

        if (totalIncorrectResults === 0) {
            return (
                <Text style={{ color: 'green' }}>Congrats! Your Eye Sight Is Perfect :)</Text>
            );
        } else if (totalIncorrectResults === 1) {
            return (
                <Text style={{ color: '#E49B0F' }}>
                    You have passed the test, but I suggest that you retake the test to ensure that your eyesight is not weak.
                </Text>
            );
        } else if (totalIncorrectResults >= 2 && totalIncorrectResults < 4) {
            return (
                <Text style={{ color: '#E49B0F' }}>
                    I suggest that you visit a doctor as it appears that you may be experiencing issues with your vision acuity.
                </Text>
            );
        } else if (totalIncorrectResults >= 4) {
            return (
                <Text style={{ color: 'red' }}>
                    Your test results indicate a significant number of incorrect answers. It is strongly advised to consult with an eye care specialist immediately.
                </Text>
            );
        }

        return null;
    };

    const retakeTest = () => {
        generateMoves();
        setResults([]);
        setCurrentMoveIndex(0);
    };


          const renderProgressBar = () => {
            const progress = ((currentMoveIndex + 1) / moves.length) * 100;
            return (
              <View>
                <Text style={{ fontSize: 16, marginTop: 10 }}>Test Progress</Text>
                <View style={{ width: '100%', backgroundColor: '#ccc', borderRadius: 10 }}>
                  <View style={{ width: `${progress}%`, backgroundColor: '#374151', height: 12, borderRadius: 10 }} />
                </View>
              </View>
            );
          };
      

    return (
        <View style={styles.container}>
            {currentMoveIndex !== -1 ? (
                <View>
                    <Text style={styles.header}>Tumbling E Eye Test</Text>
                    <Text style={styles.directionText}>Which direction is the E pointing?</Text>
                    <View style={styles.directionSymbol}>{getCurrentDirectionSymbol()}</View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleButtonClick('up')} style={styles.directionButton}>
                            <Text style={styles.buttonText}>&uarr;</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleButtonClick('right')} style={styles.directionButton}>
                            <Text style={styles.buttonText}>&rarr;</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleButtonClick('down')} style={styles.directionButton}>
                            <Text style={styles.buttonText}>&darr;</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleButtonClick('left')} style={styles.directionButton}>
                            <Text style={styles.buttonText}>&larr;</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{}}>
                    {renderProgressBar()}
                    </View>
                </View>
            ) : (
                <View style={styles.resultsContainer}>
                    <Text style={styles.header}>Test Results</Text>
                    <View style={styles.resultsTable}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Move</Text>
                            <Text style={styles.tableHeaderText}>Result</Text>
                            <Text style={styles.tableHeaderText}>Status</Text>
                        </View>
                        {renderResults()}
                    </View>
                    <View style={styles.resultMessageContainer}>
                        {getTestResultMessage()}
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={retakeTest} style={styles.button}>
                            <Text style={styles.buttonText}>Retake Test</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text onPress={() => Alert.alert('Result Saved Successfully!')} style={styles.buttonText}>Save Results</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    directionText: {
        fontSize: 18,
        marginBottom: 10,
    },
    directionSymbol: {
        alignItems: 'center',
        marginBottom: 20,
    },
    directionButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    progressContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#ccc', // Add a background color to the container
        borderRadius: 10, // Optional: add border radius to match your design
      },
      progressBar: {
        height: 10,
        backgroundColor: '#374151', // Add a background color to the progress bar
        borderRadius: 10, // Optional: add border radius to match your design
      },
    resultsContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    resultsTable: {
        width: '100%',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    tableHeaderText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        alignItems: 'center',
    },
    greenText: {
        color: 'green',
    },
    redText: {
        color: 'red',
    },
    resultMessageContainer: {
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
});

export default TumblingETestScreen;

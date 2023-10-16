import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

// Import your images here
import Image1 from '../../assets/images/visionAssessments/colorblind-test-image1.webp';
import Image2 from '../../assets/images/visionAssessments/colorblind-test-image2.webp';
import Image3 from '../../assets/images/visionAssessments/colorblind-test-image3.webp';
import Image4 from '../../assets/images/visionAssessments/colorblind-test-image4.webp';
import Image5 from '../../assets/images/visionAssessments/colorblind-test-image5.webp';
import Image6 from '../../assets/images/visionAssessments/colorblind-test-image6.webp';
import Image7 from '../../assets/images/visionAssessments/colorblind-test-image7.webp';
import Image8 from '../../assets/images/visionAssessments/colorblind-test-image8.webp';
import Image9 from '../../assets/images/visionAssessments/colorblind-test-image9.webp';
import Image10 from '../../assets/images/visionAssessments/colorblind-test-image10.webp';
import Image11 from '../../assets/images/visionAssessments/colorblind-test-image11.webp';
import Image12 from '../../assets/images/visionAssessments/colorblind-test-image12.webp';
// Import other images similarly

const ColorBlindTest = () => {
  let status;
  // const baseURL = 'http://localhost:3000';

  // const submitVisionAssessmentResult = async () => {
  //   // Your submitVisionAssessmentResult code remains the same
  //   const data = {
  //     testType: "Color Blind Test",
  //     status: status
  //   };

  //   try {
  //     const accessToken = await localStorage.getItem('accessToken');
  //     const response = await axios.post(`${baseURL}/users/submit_vision_assessment_result/`, data, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     });

  //     console.log('Response:', response);
  //     return response;
  //   } catch (error) {
  //     // Server is returning 403 for an expired token
  //     if (error.response && error.response.status === 403) {
  //       try {
  //         console.log('Error Caught');
  //         await reGenerateAccessToken();
  //         return submitVisionAssessmentResult();
  //       } catch (e) {
  //         console.error('Error while refreshing token', e);
  //         throw e;
  //       }
  //     }
  //     throw error;
  //   }
  // };

  const [images, setImages] = useState([
    { id: 1, src: Image1, number: 7 },
    { id: 2, src: Image2, number: 6 },
    { id: 3, src: Image3, number: 26 },
    { id: 4, src: Image4, number: 15 },
    { id: 5, src: Image5, number: 6 },
    { id: 6, src: Image6, number: 73 },
    { id: 7, src: Image7, number: 5 },
    { id: 8, src: Image8, number: 16 },
    { id: 9, src: Image9, number: 45 },
    { id: 10, src: Image10, number: 12 },
    { id: 11, src: Image11, number: 29 },
    { id: 12, src: Image12, number: 8 },
    // Add more images as needed
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    shuffleImages();
  }, []);

  useEffect(() => {
    setUserInput('');
  }, [currentImageIndex]);

  const shuffleImages = () => {
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    setImages(shuffledImages);
  };

  const handleNext = () => {
    if (currentImageIndex === images.length - 1) {
      setShowResults(true);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleUserInput = (text) => {
    setUserInput(text);
  };

  const handleNumberButtonClick = (number) => {
    setUserInput((prevInput) => prevInput + number.toString());
  };

  const handleSubmit = () => {
    if (userInput == ''){
      Alert.alert('Please Enter The Number!')
    }
    else {
      const currentImage = images[currentImageIndex];
      const isCorrect = parseInt(userInput, 10) === currentImage.number;
      setResults((prevResults) => [
        ...prevResults,
        { imageId: currentImage.id, isCorrect },
      ]);
      handleNext();
    }
  };

  const renderImage = () => {
    const currentImage = images[currentImageIndex];
    const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
      <Button key={number} title={number.toString()} onPress={() => handleNumberButtonClick(number)} />
    ));

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View>
          <Image source={currentImage.src} style={{ width: 200, height: 200 }} />
        </View>
        <View>
          <View>
            <Text style={{ marginTop: 20, marginBottom: 20 }} >What number do you see in the image?</Text>
            <TextInput
              style={{
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: 10,
                paddingRight: 3,
                borderWidth: 2,
                borderColor: '#0F97B1',
                borderRadius: 5,
                marginBottom: 10,
                height: 45
              }}
              placeholder="Enter Number"
              value={userInput}
              onChangeText={handleUserInput}
              keyboardType="numeric"
            />
            <View style={{ marginTop: 10 }} >
              <TouchableOpacity style={{justifyContent:'center', alignItems:'center', 
              backgroundColor: '#0F97B1', height: 40, borderRadius: 5 }} title="Submit" onPress={handleSubmit}>
                <Text style={{color: 'white', fontSize: 16}} >Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderProgressBar = () => {
    const progress = ((currentImageIndex + 1) / images.length) * 100;
    return (
      <View>
        <Text style={{ fontSize: 16, marginTop: 30 }}>Test Progress</Text>
        <View style={{ width: '100%', backgroundColor: '#ccc', borderRadius: 10 }}>
          <View style={{ width: `${progress}%`, backgroundColor: '#374151', height: 12, borderRadius: 10 }} />
        </View>
      </View>
    );
  };

  const getTotalIncorrectResults = () => {
    const incorrectNumbers = results.filter((result) => !result.isCorrect).length;
    incorrectNumbers == 0 ? (status = true) : (status = false);
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
        <Text style={result.isCorrect ? styles.greenText : styles.redText} >{result.isCorrect ? 'Pass' : 'Fail'}</Text>
      </View>
    ));
  };


  const DisplayResults = () => {
    return (
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Test Results</Text>
        <ScrollView>
          {renderResults()}
        </ScrollView>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5 }}>
          {getTestResultMessage()}
        </Text>
      </View>
    );
  };

  const handleRetakeTest = () => {
    shuffleImages();
    setCurrentImageIndex(0);
    setUserInput('');
    setResults([]);
    setShowResults(false);
  };

  const renderRetakeButton = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
        <Button
          title="Retake Test"
          onPress={handleRetakeTest}
          style={{ backgroundColor: 'red', color: 'white' }}
        />
        <Button
          title="Save Results"
          onPress={() => Alert.alert('Result Saved Successfully!')}
          style={{ backgroundColor: 'gray', color: 'white' }}
        />
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: '90%' }}>
        {showResults ? (
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
            <Text style={styles.resultMessageContainer}>
              {getTestResultMessage()}
            </Text>
            {renderRetakeButton()}
          </View>
        ) : (
          <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#374151', marginTop: 20 }}>Take Test Now</Text>
            <Text style={{ marginTop: 5, fontWeight: 'bold', marginBottom: 10 }}>Note: this test is based on the standard Ishihara color plate test</Text>
            <View style={{ marginBottom: 20 }}>
              {renderImage()}
              {renderProgressBar()}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  greenText: {
    color: 'green',
  },
  redText: {
    color: 'red',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  resultsContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  resultsTable: {
    width: '90%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    alignItems: 'center',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center align the text in headers
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    alignItems: 'center',
  },

  resultMessageContainer: {
    marginBottom: 5,
  },


});

export default ColorBlindTest;




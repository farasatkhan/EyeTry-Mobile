import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-native-vector-icons/AntDesign'; // Make sure you have the appropriate icons package installed
import axios from 'axios';
import { reGenerateAccessToken } from '../../../api/authapi';

// importing images
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

const ColorBlindnessTestScreen = () => {
  let status;
  const baseURL = 'http://localhost:3000'; // Replace with your actual API endpoint

//   const submitVisionAssessmentResult = async () => {
//     const data = {
//       testType: 'Color Blind Test',
//       status: status,
//     };

//     try {
//       const accessToken = await AsyncStorage.getItem('accessToken'); // Import AsyncStorage from 'react-native' and use it to get the access token
//       const response = await axios.post(`${baseURL}/users/submit_vision_assessment_result/`, data, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
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
    const currentImage = images[currentImageIndex];
    const isCorrect = parseInt(userInput, 10) === currentImage.number;
    setResults((prevResults) => [
      ...prevResults,
      { imageId: currentImage.id, isCorrect },
    ]);
    handleNext();
  };

  const renderImage = () => {
    const currentImage = images[currentImageIndex];
    const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
      <TouchableOpacity
        key={number}
        style={styles.numberButton}
        onPress={() => handleNumberButtonClick(number)}
      >
        <Text style={styles.numberButtonText}>{number}</Text>
      </TouchableOpacity>
    ));

    return (
      <View style={styles.imageContainer}>
<Image source={{ uri: Image1 }} style={styles.image} />

        <View style={styles.textBox}>
          <Text style={styles.question}>What number do you see in the image?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter prescription name"
            value={userInput}
            editable={false}
          />

          <View style={styles.numberButtonsContainer}>{numberButtons}</View>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderProgressBar = () => {
    const progress = ((currentImageIndex + 1) / images.length) * 100;
    return (
      <View>
        <Text style={styles.textBase}>Test Progress</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={{
              width: `${progress}%`,
              backgroundColor: '#374151',
              height: 12,
              borderRadius: 10,
            }}
          />
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
      return <Text style={styles.greenText}>Congrats! Your Eye Sight Is Perfect :)</Text>;
    } else if (totalIncorrectResults === 1) {
      return (
        <Text style={styles.orangeText}>
          You have passed the test, but I suggest that you retake the test to ensure that your eyesight is not weak.
        </Text>
      );
    } else if (totalIncorrectResults >= 2 && totalIncorrectResults < 4) {
      return (
        <Text style={styles.orangeText}>
          I suggest that you visit a doctor as it appears that you may be experiencing issues with your vision acuity.
        </Text>
      );
    } else if (totalIncorrectResults >= 4) {
      return (
        <Text style={styles.redText}>
          Your test results indicate a significant number of incorrect answers. It is strongly advised to consult with an eye care specialist immediately.
        </Text>
      );
    }

    return null;
  };

  const renderResults = () => {
    return results.map((result, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.cell}>{index + 1}</Text>
        <View style={styles.cell}>
          {result.isCorrect ? (
            <AiOutlineCheckCircle style={styles.icon} />
          ) : (
            <AiOutlineCloseCircle style={styles.icon} />
          )}
        </View>
        <Text style={styles.cell}>
          {result.isCorrect ? 'Correct' : 'Incorrect'}
        </Text>
      </View>
    ));
  };

  const DisplayResults = () => {
    return (
      <View>
        <Text style={styles.heading}>Test Results</Text>
        <ScrollView style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cell}>Move</Text>
              <Text style={styles.cell}>Result</Text>
              <Text style={styles.cell}>Status</Text>
            </View>
            {renderResults()}
          </View>
        </ScrollView>
        <Text style={styles.resultMessage}>{getTestResultMessage()}</Text>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleRetakeTest} style={styles.retakeButton}>
          <Text style={styles.buttonText}>Retake Test</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.saveButton}>
          <Text style={styles.buttonText}>Save Results</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Color Blind Test</Text>
      <Text style={styles.subtitle}>Find out if you're color blind in less than 2 minutes!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Take Test Now</Text>
        <Text style={styles.cardNote}>Note: this test is based on the standard Ishihara color plate test</Text>

        {showResults ? (
          <View>
            {DisplayResults()}
            {renderRetakeButton()}
          </View>
        ) : (
          <View style={styles.imageContainer}>
            {renderImage()}
            {renderProgressBar()}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: 'center',
  },

  card: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    width: '90%',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardNote: {
    marginTop: 5,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 20,
  },
  textBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '92%',
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  numberButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  numberButton: {
    width: '30%',
    padding: 10,
    backgroundColor: '#374151',
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 10,
    margin: 5,
  },
  numberButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  submitButton: {
    width: '100%',
    backgroundColor: 'red',
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  textBase: {
    fontSize: 16,
    marginTop: 10,
  },
  greenText: {
    color: 'green',
  },
  orangeText: {
    color: '#E49B0F',
  },
  redText: {
    color: 'red',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tableContainer: {
    maxHeight: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  table: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    padding: 4,
    textAlign: 'left',
  },
  icon: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  retakeButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#444444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
};

export default ColorBlindnessTestScreen;

import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { updateSelectedOptions } from "../../redux/actions/orderSelectionAction";
import { Picker } from "@react-native-picker/picker";

export default function EnterPrescription({ onSelectedOptions, onNextStep }) {
  const [pdType, setPDType] = useState('oneNumber');
  const [pdOneNumber, setPDOneNumber] = useState(null);
  const [pdLeftNumber, setPDLeftNumber] = useState(null);
  const [pdRightNumber, setPDRightNumber] = useState(null);
  const [birthYear, setBirthYear] = useState(null);
      // form validation
      const [errorVisible, setErrorVisible] = React.useState(false)
      const [errorMsg, setErrorMsg] = React.useState('')
      const validateForm = () => {
        // Validating user input
        if ((pdType == 'oneNumber' && !pdOneNumber) 
            || !birthYear || rightEye.SPH == "" || rightEye.CYL == "" || rightEye.Axis == ""
            || rightEye.Prism == "" || rightEye.Base == "" || leftEye.SPH == "" || leftEye.CYL == ""
            || leftEye.Axis == "" || leftEye.Prism == "" || leftEye.Base == "") {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields!');
            return false;
        }

         if (pdType === 'twoNumbers' && (pdLeftNumber === null || pdRightNumber === null)) {
                setErrorVisible(true);
                setErrorMsg('Please fill out both Left and Right Pupillary Distance values!');
                return false;
            } 

        return true
    }

    const [rightEye, setRightEye] = useState({
        SPH: "",
        CYL: "",
        Axis: "",
        Prism: "",
        Base: "",
    });

    const [leftEye, setLeftEye] = useState({
        SPH: "",
        CYL: "",
        Axis: "",
        Prism: "",
        Base: "",
    });

    const handleRightEyeChange = (field, value) => {
        setRightEye((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleLeftEyeChange = (field, value) => {
        setLeftEye((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };



    const handlePDTypeChange = (event) => {
        setPDType(event.target.value);
    };

    const dispatch = useDispatch();

    const handleSelections = () => {
        dispatch(updateSelectedOptions({
            "prescription": {
                pdType: pdType,
                pdOneNumber: pdOneNumber,
                pdLeftNumber: pdLeftNumber,
                pdRightNumber: pdRightNumber,
                leftEyeOS: leftEye,
                rightEyeOD: rightEye,
                birthYear: birthYear
            }
        }));
    }

    const handleNext = () => {
        onNextStep();
    }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Prescription Details</Text>
      <View style={styles.errorContainer}>
        {errorVisible && (
          <Text style={styles.errorText}>{errorMsg}</Text>
        )}
      </View>

      <View style={styles.scrollContainer}>
        <View style={styles.pdTypeContainer}>
          <Text style={styles.pdTypeLabel}>Pupillary Distance</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={pdType === 'oneNumber' ? styles.radioButtonSelected : styles.radioButton}
              onPress={() => setPDType('oneNumber')}
            >
              <Text>One Number</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={pdType === 'twoNumbers' ? styles.radioButtonSelected : styles.radioButton}
              onPress={() => setPDType('twoNumbers')}
            >
              <Text>Two Numbers</Text>
            </TouchableOpacity>
          </View>

          {pdType === 'oneNumber' && (
            <View style={styles.pdInputContainer}>
              <Text style={styles.pdInputLabel}>Enter Your Pupillary Distance (One Number)</Text>
              <TextInput
                style={styles.pdInput}
                keyboardType="numeric"
                value={pdOneNumber ? pdOneNumber.toString() : ''}
                onChangeText={(text) => setPDOneNumber(parseFloat(text))}
              />
            </View>
          )}

          {pdType === 'twoNumbers' && (
            <View style={styles.pdInputContainer}>
              <Text style={styles.pdInputLabel}>Left Pupillary Distance</Text>
              <TextInput
                style={styles.pdInput}
                keyboardType="numeric"
                value={pdLeftNumber ? pdLeftNumber.toString() : ''}
                onChangeText={(text) => setPDLeftNumber(parseFloat(text))}
              />
              <Text style={styles.pdInputLabel}>Right Pupillary Distance</Text>
              <TextInput
                style={styles.pdInput}
                keyboardType="numeric"
                value={pdRightNumber ? pdRightNumber.toString() : ''}
                onChangeText={(text) => setPDRightNumber(parseFloat(text))}
              />
            </View>
          )}
        </View>

        <View style={styles.container2}>
      <View style={styles.eyeContainer}>
        <Text style={styles.eyeLabel}>Right Eye - OD</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="SPH"
            keyboardType="numeric"
            value={rightEye.SPH}
            onChangeText={(value) => handleRightEyeChange("SPH", value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="CYL"
            keyboardType="numeric"
            value={rightEye.CYL}
            onChangeText={(value) => handleRightEyeChange("CYL", value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Axis"
            keyboardType="numeric"
            value={rightEye.Axis}
            onChangeText={(value) => handleRightEyeChange("Axis", value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Prism"
            keyboardType="numeric"
            value={rightEye.Prism}
            onChangeText={(value) => handleRightEyeChange("Prism", value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Base"
            keyboardType="numeric"
            value={rightEye.Base}
            onChangeText={(value) => handleRightEyeChange("Base", value)}
          />
        </View>
      </View>

      <View style={styles.eyeContainer}>
        <Text style={styles.eyeLabel}>Left Eye - OS</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="SPH"
            keyboardType="numeric"
            value={leftEye.SPH}
            onChangeText={(value) => handleLeftEyeChange("SPH", value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="CYL"
            keyboardType="numeric"
            value={leftEye.CYL}
            onChangeText={(value) => handleLeftEyeChange("CYL", value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Axis"
            keyboardType="numeric"
            value={leftEye.Axis}
            onChangeText={(value) => handleLeftEyeChange("Axis", value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Prism"
            keyboardType="numeric"
            value={leftEye.Prism}
            onChangeText={(value) => handleLeftEyeChange("Prism", value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Base"
            keyboardType="numeric"
            value={leftEye.Base}
            onChangeText={(value) => handleLeftEyeChange("Base", value)}
          />
        </View>
      </View>

      <View style={styles.birthYearContainer}>
        <Text style={styles.birthYearLabel}>Select Your Birth Year</Text>
        <Picker
          style={styles.picker}
          selectedValue={birthYear}
          onValueChange={(value) => setBirthYear(parseInt(value))}
        >
          {Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index).map((year) => (
            <Picker.Item key={year} label={year.toString()} value={year} />
          ))}
        </Picker>
      </View>
    </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            // if (!validateForm()) {
            //   return;
            // } else {
              handleSelections();
              handleNext();
            // }
          }}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    marginHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  errorContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  pdTypeContainer: {
    width: '85%',
    alignSelf: 'center',
  },
  pdTypeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  radioButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  radioButtonSelected: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  pdInputContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  pdInputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pdInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  eyeContainer: {
    marginBottom: 20,
  },
  eyeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '18%',
    paddingLeft: 10,
  },
  birthYearContainer: {
    marginTop: 20,
  },
  birthYearLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

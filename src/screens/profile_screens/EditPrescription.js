import * as React from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

// importing form components
import Container from '../../components/ui/Container';
import { InputField } from '../../components/forms/InputField';
import LabelledTextInput from '../../components/forms/LabelledTextInput';
import SelectInput from '../../components/forms/SelectInput';
import LabelledRadioBtn from '../../components/forms/LabelledRadioBtn';
import MediumButtonOutline from '../../components/ui/MediumButtonOutline';

const EditPrescription = ({ navigation }) => {
  // State Variables
    const [prescriptionName, setPrescriptionName] = React.useState('');
    const [issueDate, setIssueDate] = React.useState('12-2-22');
    const [selectedYear, setSelectedYear] = React.useState('');

    const years = Array.from(new Array(50), (val, index) => `${new Date().getFullYear() - index}`);
    const [selectedValue, setSelectedValue] = React.useState('singleNumber');

    // Puppillary Distance
    const [pupillaryDistance,setPupillaryDistance] = React.useState(null) //Single
    const [rightPD,setRightPD] = React.useState(null) //double
    const [leftPD,setLeftPD] = React.useState(null)


  // Methods
  const calculateIPD = () => {
    Alert.alert("Calculate User's IPD");
  };
  const next = () => {
    navigation.navigate('EditPrescription2');
  };

  return (
<Container >
    <KeyboardAvoidingView style={{ flex:1 }} behavior="height">
    <ScrollView contentContainerStyle={styles.sec_container}>
            <LabelledTextInput
                label={'Prescription Name'}
                onChangeText={setPrescriptionName}
                value={prescriptionName}
                placeholder="My Prescription"
                style={[styles.labelledInput]}
            />
            <View style={styles.row}>
            <LabelledTextInput
                label={'Issue Date'}
                onChangeText={setIssueDate}
                value={issueDate}
                placeholder="DD-MM-YY"
                style={[styles.issueDate,styles.labelledInput]}
            />
            <SelectInput
                label="Birth Year"
                array={years}
                selectedValue={selectedYear}
                setSelectedValue={setSelectedYear}
                style={styles.yearSelect}
                labelStyle={{ alignSelf:'flex-start'}}
           />
            </View>
            <Text style={styles.txt}>
                Pupillary Distance
            </Text>
            <View style={styles.row}>
                <LabelledRadioBtn
                    style={styles.radioBtn1}
                    label="Single Number"
                    value="singleNumber"
                    checked={selectedValue === 'singleNumber'}
                    setChecked={setSelectedValue}
                />
                <LabelledRadioBtn
                    label="Two Numbers"
                    value="twoNumber"
                    checked={selectedValue === 'twoNumber'}
                    setChecked={setSelectedValue}
                />
            </View>
            {/* Conditional Rendering based on user's choice of PD  */}
            {selectedValue==='singleNumber' && <InputField name='Enter you pupillary distance' value={pupillaryDistance} onChangeText={setPupillaryDistance} style={styles.pd}/>}
            {selectedValue === 'twoNumber' && 
                <View style={styles.row}>
                    <InputField name='Right PD' value={rightPD} onChangeText={setRightPD} style={styles.rightPD} />
                    <InputField name='Left PD' value={leftPD} onChangeText={setLeftPD} style={styles.leftPD} />
                </View>}
            <Text style={styles.med_txt}>
                Don't know your Pupillary Distance (PD)?
            </Text>
            <View style={styles.btn_container}>
                <MediumButtonOutline title='Find your IPD' onPress={calculateIPD} color={'#000'} style={styles.btn1}/>
                <MediumButtonOutline title='Next' onPress={next} />
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
</Container>
  );
};

const styles = StyleSheet.create({
  sec_container: {
    alignItems: 'center',
    // paddingVertical:20,
    paddingHorizontal:17
  },
  row: {
      width:'100%',
      justifyContent:'space-between',
      alignItems:'baseline',
      flexDirection: 'row',
      marginBottom:10
  },
  radioBtn1:{
    marginRight:40,
  },
  issueDate: {
    height: 55,
    width: 120,
  },
  yearSelect: {
    // marginLeft: 75,
  },
  labelledInput:{
    marginBottom:15
},
  txt:{ 
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#000',
    paddingBottom:15,
    fontWeight: '500' 
},
btn_container:{
  flexDirection:'row',
  width:'100%',
  justifyContent:'space-between',
  paddingHorizontal:10,
  marginVertical:25
},
btn1:{marginRight:30},
rightPD:{
    width:136,
    marginRight:20,
    marginTop:15,
    marginBottom:15
},
leftPD:{
    width:136,
    marginLeft:20,
    marginTop:15,
    marginBottom:20
},
med_txt:{
    fontSize:16,
    color:"#000",
    alignSelf:'flex-start',
    paddingLeft:20},
pd:{
    marginBottom:30,
    marginTop:15
}
});

export default EditPrescription;

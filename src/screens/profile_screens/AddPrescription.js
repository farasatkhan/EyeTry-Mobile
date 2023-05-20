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

const AddPrescription = ({ navigation }) => {
  // State Variables
    const [prescriptionName, setPrescriptionName] = React.useState('');
    const [issueDate, setIssueDate] = React.useState('12-2-22');
    const [renewalReminder, setRenewalReminder] = React.useState('12-2-22');

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
    navigation.navigate('AddPrescription2');
  };

  return (
<Container>
    <ScrollView contentContainerStyle={styles.sec_container}>
            <LabelledTextInput
                label={'Prescription Name'}
                onChangeText={setPrescriptionName}
                value={prescriptionName}
                placeholder="My Prescription"
                style={[styles.labelledInput]}
                containerStyle={{width:'100%'}}
            />
            <View style={styles.row}>
            <LabelledTextInput
                label={'Issue Date'}
                onChangeText={setIssueDate}
                value={issueDate}
                placeholder="DD-MM-YY"
                style={[styles.issueDate,styles.labelledInput1]}
                containerStyle={{width:'45%'}}
            />
            <LabelledTextInput
                label={'Renewal Reminder'}
                onChangeText={setRenewalReminder}
                value={renewalReminder}
                placeholder="DD-MM-YY"
                style={[styles.issueDate,styles.labelledInput1]}
                containerStyle={{width:'45%'}}
            />
            {/* <SelectInput
                label="Birth Year"
                array={years}
                selectedValue={selectedYear}
                setSelectedValue={setSelectedYear}
                style={styles.yearSelect}
                pickerStyle={{width:'100%'}}
                containerStyle={{width:'45%'}}
                labelStyle={{ alignSelf:'flex-start'}}
           /> */}
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
            {selectedValue==='singleNumber' && <InputField name='Enter you pupillary distance' keyboardType={"numeric"} value={pupillaryDistance} onChangeText={setPupillaryDistance} style={styles.pd}/>}
            {selectedValue === 'twoNumber' && 
                <View style={styles.row}>
                    <InputField name='Right PD' value={rightPD} onChangeText={setRightPD} style={styles.rightPD} keyboardType={"numeric"}/>
                    <InputField name='Left PD' value={leftPD} onChangeText={setLeftPD} style={styles.leftPD} keyboardType={"numeric"}/>
                </View>}
            <Text style={styles.med_txt}>
                Don't know your Pupillary Distance (PD)?
            </Text>
            <View style={styles.btn_container}>
                <MediumButtonOutline title='Find your IPD' onPress={calculateIPD} color={'#000'} style={{width:'45%'}}/>
                <MediumButtonOutline title='Next' onPress={next} style={{width:'45%'}}/>
            </View>
        </ScrollView>
</Container>
  );
};

const styles = StyleSheet.create({
  sec_container: {
    alignItems: 'center',
    padding:'4%'
  },
  row: {
      width:'100%',
      justifyContent:'space-between',
      alignItems:'baseline',
      flexDirection: 'row',
      marginBottom:'5%'
  },
  radioBtn1:{
    marginRight:40,
  },
  issueDate: {
    height: 55,
    width:'100%'
  },
  yearSelect: {
    width:'100%',
    height:55
  },
  labelledInput:{
    marginBottom:'5%',
    width:'100%'
},
  labelledInput1:{
    marginBottom:'5%'
},
  txt:{ 
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#000',
    paddingBottom:'5%',
    fontWeight: '500' 
},
btn_container:{
  flexDirection:'row',
  width:'100%',
  justifyContent:'space-between',
  paddingHorizontal:10,
  marginVertical:'8%'
},
rightPD:{
    width:'45%',
    marginTop:'3%',
},
leftPD:{
    width:'45%',
    marginTop:'3%',
},
med_txt:{
    fontSize:16,
    color:"#000",
    alignSelf:'center',
  },

pd:{
    width:'100%',
    marginTop:'3%',
    marginBottom:'5%',
}
});

export default AddPrescription;

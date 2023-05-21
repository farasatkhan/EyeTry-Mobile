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
import MediumButton from '../../components/ui/MediumButton';
import SelectInput from '../../components/forms/SelectInput';
import LabelledRadioBtn from '../../components/forms/LabelledRadioBtn';
import MediumButtonOutline from '../../components/ui/MediumButtonOutline';

const EditPrescription2 = ({ navigation }) => {
    //presc type 
    const [selectedType, setSelectedType] = React.useState('Single Vision');
    // Right Eye OD Values
    const [REsph,setREsph] = React.useState(null)
    const [REcyl,setREcyl] = React.useState(null)
    const [REaxis,setREaxis] = React.useState(null)
    // Left Eye OS Values
    const [LEsph,setLEsph] = React.useState(null)
    const [LEcyl,setLEcyl] = React.useState(null)
    const [LEaxis,setLEaxis] = React.useState(null)

    // Prism Values
    const [REph,setREph]= React.useState(null)
    const [REphBase,setREphBase]= React.useState(null)
    const [LEph,setLEph]= React.useState(null)
    const [LEphBase,setLEphBase]= React.useState(null)

    // Radio Btns Selected Value
    const [selectedValue, setSelectedValue] = React.useState('no');


    // 
    const prescriptionTypes = ["Single Vision","Bifocal","Progressive"]
    const points = ['0.25','0.5','0.75']

  // Methods
  const cancel = () => {
    Alert.alert("Cancel the ADD Prescription Process");
  };
  const savePrescription = () => {
    Alert.alert("Prescription Added Success")
    navigation.navigate('PrescriptionsList');
  };

  return (
<Container>
    <ScrollView contentContainerStyle={styles.sec_container}>
      <SelectInput
        label="Prescription Type"
        array={prescriptionTypes}
        selectedValue={selectedType}
        setSelectedValue={setSelectedType}
        labelStyle={{ alignSelf:'flex-start' }}
        pickerStyle={{width:'100%'}}
        style={{width:'100%',height:57}}
        containerStyle={{width:'100%'}}
      />
      {/* Righ Eye OD Sections */}
      <Text style={styles.txt}>
        Righ Eye-OD 
      </Text> 
      <View style={styles.row}>
        <SelectInput
          label="SPH"
          array={points}
          selectedValue={REsph}
          setSelectedValue={setREsph}
          labelStyle={styles.label2}
          style={{width:'100%',height:57}}
          pickerStyle={{width:99}}
          containerStyle={{width:'30%'}}
        />
        <SelectInput
          label="CYL"
          array={points}
          selectedValue={REcyl}
          setSelectedValue={setREcyl}
          labelStyle={styles.label2}
          style={{width:'100%',height:57}}
          pickerStyle={{width:99}}
          containerStyle={{width:'30%'}}
        />
        <SelectInput
          label="Axis"
          array={points}
          selectedValue={REaxis}
          setSelectedValue={setREaxis}
          labelStyle={styles.label2}
          style={{width:'100%',height:57}}
          pickerStyle={{width:99}}
          containerStyle={{width:'30%'}}
        />
      </View>
      {/* Left Eye OS Sections */}
      <Text style={styles.txt}>
        Left Eye-OS 
      </Text> 
      <View style={styles.row}>
        <SelectInput
          label="SPH"
          array={points}
          selectedValue={LEsph}
          setSelectedValue={setLEsph}
          labelStyle={styles.label2}
          style={{width:'100%',height:57}}
          pickerStyle={{width:99}}
          containerStyle={{width:'30%'}}
        />
        <SelectInput
          label="CYL"
          array={points}
          selectedValue={LEcyl}
          setSelectedValue={setLEcyl}
          labelStyle={styles.label2}
          style={{width:'100%',height:57}}
          pickerStyle={{width:99}}
          containerStyle={{width:'30%'}}
        />
        <SelectInput
          label="Axis"
          array={points}
          selectedValue={LEaxis}
          setSelectedValue={setLEaxis}
          labelStyle={styles.label2}
          style={{width:'100%',height:57}}
          pickerStyle={{width:99}}
          containerStyle={{width:'30%'}}
        />
      </View>

      {selectedType === "Single Vision" && 
      <>
        <Text style={styles.txt}>
         Prism Values
       </Text>
        <View style={[styles.row,{paddingTop:20,paddingHorizontal:20}]}>
            <LabelledRadioBtn
                style={{flex:1}}
                label="Yes"
                value="yes"
                checked={selectedValue === 'yes'}
                setChecked={setSelectedValue}
            />
            <LabelledRadioBtn
                style={{flex:1}}
                label="No"
                value="no"
                checked={selectedValue === 'no'}
                setChecked={setSelectedValue}
            />
        </View>
      </>
    } 

      {selectedValue === 'yes' && selectedType === "Single Vision" &&
        <>
          <Text style={styles.txt}>
            Rigt Eye-OD 
          </Text>
          <View style={styles.row}>
            <SelectInput
              label="Prism Horizontal"
              array={points}
              selectedValue={REph}
              setSelectedValue={setREph}
              labelStyle={styles.label2}
              style={{width:'100%',height:57}}
              pickerStyle={{width:'100%'}}
              containerStyle={{width:'45%'}}
            />
            <SelectInput
              label="Base Direction"
              array={points}
              selectedValue={REphBase}
              setSelectedValue={setREphBase}
              labelStyle={styles.label2}
              style={{width:'100%',height:57}}
              pickerStyle={{width:'100%'}}
              containerStyle={{width:'45%'}}
            />
          </View>
          <View style={styles.row}>
            <SelectInput
              label="Prism Vertical"
              array={points}
              selectedValue={LEph}
              setSelectedValue={setLEph}
              labelStyle={styles.label2}
              style={{width:'100%',height:57}}
              pickerStyle={{width:'100%'}}
              containerStyle={{width:'45%'}}
            />
            <SelectInput
              label="Base Direction"
              array={points}
              selectedValue={LEphBase}
              setSelectedValue={setLEphBase}
              labelStyle={styles.label2}
              style={{width:'100%',height:57}}
              pickerStyle={{width:'100%'}}
              containerStyle={{width:'45%'}}
            />
          </View>
        </>
      }
    
      <View style={styles.btn_container}>
          <MediumButtonOutline title='Cancel' onPress={cancel} color={'#000'} style={{width:'45%'}}/>
          <MediumButton title='Save' onPress={savePrescription} style={{width:'45%'}}/>
      </View>
    </ScrollView>
</Container>
  );
};

const styles = StyleSheet.create({
  sec_container: {
    paddingHorizontal:'4%',
    alignItems:'center',
  },
  row: {
      flexDirection: 'row',
      width:'100%',
      paddingHorizontal:'2%',
      justifyContent:'space-between',
      alignItems:'center',
  },
  label2:{
    fontWeight:'400'
  },
  txt:{ 
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#000',
    paddingTop:'6%',
    paddingHorizontal:'1%',
    paddingVertical:'1%',
    fontWeight: '500',
},
btn_container:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    paddingHorizontal:20,
    marginVertical:25
},


});

export default EditPrescription2;

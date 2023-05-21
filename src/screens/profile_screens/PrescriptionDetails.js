import * as React from 'react';
import { View, Text,StyleSheet,Alert, Touchable, TouchableOpacity,Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// importing form components
import Container from '../../components/ui/Container';
import RowText from '../../components/ui/RowText';
import PrescriptionDetailsRow from '../../components/ui/PrescriptionDetailsRow';
import MediumButton from '../../components/ui/MediumButton';
const PrescriptionDetails = () =>{
    const navigation = useNavigation();

    // Methods
    const deletePrescription = () =>{
        Alert.alert("Deleted Success")
        navigation.navigate('PrescriptionsList')
    }

    const editPrescription = () => {
        Alert.alert("Edit")
        navigation.navigate('EditPrescription')
    }

    return(
    <Container >
        <ScrollView style={styles.sec_container}>
            <RowText label='Prescription Name' value='MyPrescription' />
            <RowText label='Prescription Type' value='Single Vision' />
            <RowText label='PD-Right' value='35' />
            <RowText label='PD-Left' value='35' />
            <RowText label='Puppilary Distance' value='60' style={{marginBottom:30}}/>
            <PrescriptionDetailsRow value1='SPH' value2='CYL' value3='Axis'/>
            <PrescriptionDetailsRow label='OD-Right' value1='-0.25' value2='+0.25' value3='1.0'/>
            <PrescriptionDetailsRow label='OS-Left' value1='0.25' value2='-0.25' value3='1.0'/>
            <View style={styles.btn_container}>
                <MediumButton title='Delete' onPress={deletePrescription} color={'#ff0000'} style={{width:'45%'}} />
                <MediumButton title='Edit' onPress={editPrescription} style={{width:'45%'}}/>
            </View>
        </ScrollView>
    </Container>
    )
}

const styles = StyleSheet.create({
    sec_container:{
        flex:1,
        backgroundColor:"#fff",
        padding:'3%'
    },
    row:{
        flexDirection:'row',
        alignItems:"center",
        borderWidth:1,
        borderColor:"#000",
        padding:10,
        justifyContent:'space-between'
    },
    bld_txt:{
        fontWeight:'700',
        fontSize:16,
        color:'#000'
    },
    med_txt:{
        fontWeight:'400',
        fontSize:16,
        color:'#000'
    },
    btn_container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:'2%',
        marginVertical:25
    },

})

export default PrescriptionDetails;
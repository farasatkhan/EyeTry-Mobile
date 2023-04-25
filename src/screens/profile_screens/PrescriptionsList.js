import * as React from 'react';
import {ScrollView, View, Text,StyleSheet,Alert, Touchable, TouchableOpacity,Image } from 'react-native';


// importing form components
import Container from '../../components/ui/Container';
import PrimaryButton from '../../components/ui/PrimaryButton';

const PrescriptionsList = ({navigation}) =>{

    // Methods
    const goToPresciptionDetails= () =>{
        navigation.navigate('PrescriptionDetails')
    }
    const goToEditPrescription= () =>{
        navigation.navigate('EditPrescription')
    }
    const handleDeletePrescription= () =>{
        Alert.alert('Delete Prescription Success')
    }
    const handleAddNewPrescription= () =>{
        navigation.navigate("AddPrescription")
    }

    return(
    <Container>
        <ScrollView contentContainerStyle={styles.sec_container}>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.header}>Name</Text>
                    <Text style={styles.header1}>  Date</Text>
                    <Text style={styles.header1}></Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell} onPress={goToPresciptionDetails}>PrescriptionName</Text>
                    <Text style={styles.cell1}>12-Feb-22</Text>
                    <View style={styles.btnCell}>
                        <TouchableOpacity onPress={goToEditPrescription}>
                            <Image source={require('../../assets/images/EditIcon.png')} style={styles.image} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeletePrescription}>
                            <Image source={require('../../assets/images/cross.png')} style={styles.image1} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <PrimaryButton title='Add new Prescription' onPress={handleAddNewPrescription} style={{marginVertical:27}} />
        </ScrollView>
    </Container>
    )

}

const styles = StyleSheet.create({
    sec_container:{
        alignItems:'center',
    },
    table: {
        width:'100%',
        borderRadius: 5,
        margin: 10,
      },
      row: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth: 1,
        borderColor: 'gray',
        padding: 10,
      },
      header: {
        fontWeight: 'bold',
        flex: 2,
        textAlign: 'left',
        fontSize:16,
        color:'#212B36'
      },
      header1: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
        fontSize:16,
        color:'#212B36',
      },
      cell: {
        flex: 2,
        textAlign: 'left',
        fontSize:16,
        color:'#212B36',
        textDecorationLine:'underline'
      },
      cell1: {
        flex: 1,
        textAlign: 'left',
        fontSize:16,
        color:'#212B36'
      },
      btnCell: {
        flexDirection:'row',
        flex: 1,
        textAlign: 'center',
        padding: 7,
      },
      image: {
        width: 18,
        height: 18,
        margin: 5,
        marginLeft:10
      },
      image1: {
        width: 18,
        height: 18,
        margin: 5,
        marginLeft:30
      },


})

export default PrescriptionsList;
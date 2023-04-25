
import * as React from 'react';
import { View, Image,StyleSheet,Alert,  ScrollView } from 'react-native';
import Container from '../../components/ui/Container';
import MediumButtonOutline from '../../components/ui/MediumButtonOutline';
import TryOnImageItem from '../../components/ui/TryOnImageItem';
import PrimaryButton from '../../components/ui/PrimaryButton';


export default function TryOnImages({navigation}){

    // Methods
    const handeEdit = () => {Alert.alert('Edit Image')}
    const handleRemove = (imgSource) => {Alert.alert(`Edit Image ${imgSource}`)}
    const goToUploadNewTryOnImage=()=>{
        Alert.alert("Upload new Try On Image")
        navigation.navigate("UploadTryOnImage")
    }

    imgSource = require('../../assets/images/persons/person.png');

    return(
    <Container style={styles.container_style}>
        <ScrollView>
            <TryOnImageItem imgSource={imgSource} handeRemove={()=>handleRemove(imgSource)} handleEdit={handeEdit}/>
            <PrimaryButton title='Upload New Try-On Image' onPress={goToUploadNewTryOnImage}/>
        </ScrollView>

            
    </Container>
    )
}

const styles = StyleSheet.create({
    container_style:{
        alignItems:'center'
    },
})
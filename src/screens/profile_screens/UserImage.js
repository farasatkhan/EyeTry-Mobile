import * as React from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  TouchableOpacity
} from 'react-native';

// importing form components
import Container from '../../components/ui/Container';
import PrimaryButton from '../../components/ui/PrimaryButton';
import MediumButtonOutlineIcon from '../../components/ui/MediumButtonOutlineIcon';
import HorizontalDivider from '../../components/ui/HorizontalDivider';


const UserImage = ({ navigation }) => {

  
  const handleImageCapture = () => {
    Alert.alert("Image Capture")
  }
  const handleImageUpload = () => {
    Alert.alert('Upload Image')
  };

  const uploadImageToDB = () => {
    Alert.alert("Uploading Image to DB");
    navigation.navigate("ProfileScreenMain")
  }

  return (
<Container>
    <ScrollView contentContainerStyle={styles.sec_container}>
        <Image source={require('../../assets/images/persons/person.png')} style={styles.img}/>
        <MediumButtonOutlineIcon icon={'camera'} title={'Capture Image'} color={'#000'} style={{width:'100%'}} onPress={handleImageCapture}/>
        <HorizontalDivider text={'OR'} lineStyle={{color:'#ddd'}} style={{marginVertical:20}}/>
        <View style={styles.upload_container}>
            <TouchableOpacity style={{alignItems:'center',}} onPress={handleImageUpload}>
                <Image source={require('../../assets/images/upload.png')} style={styles.icon}/>
                <Text style={styles.blue_txt}>Tap to upload image</Text>
            </TouchableOpacity>
        </View>
        <PrimaryButton title={'Save'} color={'#3056D3'} onPress={uploadImageToDB}/>
    </ScrollView>
</Container>
  );
};

const styles = StyleSheet.create({
  sec_container: {
    alignItems: 'center',
    paddingVertical:15,
    paddingHorizontal:17
  },
  img:{
    height:200,
    width:200,
    borderRadius:200/2,
    marginVertical:28
  },
  icon:{
    width:45,
    height:45  
},
blue_txt:{
    color:'#3056D3',
    paddingTop:15,
    textAlign:'center'
},
upload_container:{
    borderWidth:1.5,
    borderColor:'#3056D3',
    alignItems:'center',
    width:'100%',
    padding:15,
    borderStyle:'dashed',
    borderRadius:6,
    marginBottom:28
},
med_btn:{
    width:'100%',
    marginVertical:20
},


});

export default UserImage;

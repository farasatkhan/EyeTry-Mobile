import * as React from 'react';
import {
  ScrollView,Image,View,Text,StyleSheet,Alert,TouchableOpacity,
} from 'react-native';

import { captureImage } from '../../utils/imageCapture';
import { chooseFile } from '../../utils/imageCapture';

// importing form components
import Container from '../../components/ui/Container';
import PrimaryButton from '../../components/ui/PrimaryButton';
import MediumButtonOutlineIcon from '../../components/ui/MediumButtonOutlineIcon';
import HorizontalDivider from '../../components/ui/HorizontalDivider';


const UserImage = ({ navigation }) => {
  const [filePath,setFilePath] = React.useState({})
  const [isImageSet,setIsImageSet] = React.useState(false)

  const handleImageCapture =async () => {
    try{
      const response = await captureImage('photo')
      console.log("capture res",response)
      if (response){
        setFilePath(response);
        setIsImageSet(true)
      }
    }
    catch (e){
      throw e
    }
  }
  const handleImageUpload =async () => {
    try{
      const response = await chooseFile('photo')
        if (response){
          setFilePath(response);
          setIsImageSet(true)
        }
    }catch (e){
      throw e
    }

  };

  const uploadImageToDB = () => {
    Alert.alert("Uploading Image to DB");
    navigation.navigate("ProfileScreenMain")
  }

  return (
<Container>
    <ScrollView contentContainerStyle={styles.sec_container}>
      {
        !isImageSet ? (<Image source={require('../../assets/images/persons/person.png')} style={styles.img}/>) 
        : (<Image source={{uri:filePath.assets[0].uri}} style={styles.img}/>)
      }
        <MediumButtonOutlineIcon icon={'camera'} title={'Capture Image'} color={'#000'} style={{width:'100%'}} onPress={()=>handleImageCapture()}/>
        <HorizontalDivider text={'OR'} lineStyle={{color:'#ddd'}} style={{marginVertical:20}}/>
        <View style={styles.upload_container}>
            <TouchableOpacity style={{alignItems:'center',}} onPress={()=>handleImageUpload()}>
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

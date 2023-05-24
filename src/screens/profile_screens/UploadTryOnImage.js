import * as React from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';

import { captureImage } from '../../utils/imageCapture';
import { chooseFile } from '../../utils/imageCapture';
import { uploadTryOnImageToServer } from '../../api/userapi';

// importing form components
import Container from '../../components/ui/Container';
import { InputField } from '../../components/forms/InputField';
import LabelledRadioBtn from '../../components/forms/LabelledRadioBtn';
import MediumButtonOutline from '../../components/ui/MediumButtonOutline';
import PrimaryButton from '../../components/ui/PrimaryButton';
import MediumButtonOutlineIcon from '../../components/ui/MediumButtonOutlineIcon';
import HorizontalDivider from '../../components/ui/HorizontalDivider';


const UploadTryOnImage = ({ navigation,route }) => {
  const serverURL = 'http://localhost:3000'; 
  let tryOnImageId = route.params?.imgId
  console.log('id undefined ',tryOnImageId == undefined)
  const [existingTryOnImage,setExistingTryOnImage] = React.useState(!(tryOnImageId == undefined))
   
  // State Variables
     const [selectedValue, setSelectedValue] = React.useState('singleNumber');

    // Puppillary Distance
    const [pupillaryDistance,setPupillaryDistance] = React.useState(null) //Single
    const [rightPD,setRightPD] = React.useState(null) //double
    const [leftPD,setLeftPD] = React.useState(null)
    // for image
    const [filePath,setFilePath] = React.useState({})
    const [isImageSet,setIsImageSet] = React.useState(false)
    const [successVisible,setSuccessVisible] = React.useState(false)
    const [successMessage,setSuccessMessage] = React.useState(null)
   

    // Methods
    const handleImageCapture =async () => {
        try{
          const response = await captureImage('photo')
          console.log("capture res",response)
          if (!response?.didCancel && response?.errorCode == undefined){
            setFilePath(response);
            setExistingTryOnImage(false)
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
            console.log("Cancel Response ", response)  
          if (!response?.didCancel && response?.errorCode == undefined ){
              setFilePath(response);
              setExistingTryOnImage(false) 
              setIsImageSet(true)
            }
        }catch (e){
          throw e
        }
      };

  const calculateIPD = () => {
    Alert.alert("Calculate User's IPD");
  };

  const uploadImageToDB = async () => {
    try{
      const uploadedImg = await uploadTryOnImageToServer(filePath)
      setSuccessMessage(uploadedImg)
      setSuccessVisible(true)
      setTimeout(() => {
        setSuccessVisible(false)
      }, 5000);
      navigation.navigate("TryOnImages")
    }
    catch (err){
      throw err
    }
  }

  return (
<Container>
    <ScrollView contentContainerStyle={styles.sec_container}>
    {successVisible &&  
                <Text style={{color:'green',fontSize:16,alignSelf:'flex-start',textAlign:'center',alignSelf:'center',paddingBottom:'2%'}}>
                    {successMessage}
                </Text>
                    } 

        {
          filePath &&  isImageSet && (<Image source={{uri:filePath?.assets[0].uri}} style={styles.img1}/>) 
        }
        {
          existingTryOnImage &&  tryOnImageId && (<Image source={{uri:serverURL + tryOnImageId}} style={styles.img1}/>) 
        }
        {
            !existingTryOnImage && !isImageSet &&  (<>
            <Text style={styles.bld_txt}>
                Step 1: Select Your PD 
            </Text>
            <Text style={styles.txt}>
                Pupillary Distance
            </Text>
            <View style={[styles.row,{justifyContent:'space-evenly'}]}>
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
            {selectedValue==='singleNumber' && <InputField name='Enter you pupillary distance' value={pupillaryDistance} onChangeText={setPupillaryDistance} style={styles.pd}/>}
            {selectedValue === 'twoNumber' && 
                <View style={[styles.row,]}>
                    <InputField name='Right PD' value={rightPD} onChangeText={setRightPD} style={styles.rightPD} />
                    <InputField name='Left PD' value={leftPD} onChangeText={setLeftPD} style={styles.leftPD} />
                </View>}
            <Text style={styles.med_txt}>
                Don't know your Pupillary Distance (PD)?
            </Text>
            <MediumButtonOutline  style={styles.med_btn} title='Find your IPD' onPress={calculateIPD} color={'#000'} />
            </>)
        }
            <Text style={styles.bld_txt}>
                Step 2: Add an Image {existingTryOnImage}
            </Text>
            <MediumButtonOutlineIcon icon={'camera'} title={'Capture Image'} color={'#000'} style={styles.med_btn2} onPress={handleImageCapture}/>
            <HorizontalDivider text={'OR'} lineStyle={{color:'#ddd'}} style={{marginVertical:20}}/>
            <View style={styles.upload_container}>
                <TouchableOpacity style={{alignItems:'center',}} onPress={handleImageUpload}>
                    <Image source={require('../../assets/images/upload.png')} style={styles.img}/>
                    <Text style={styles.blue_txt}>Tap to upload image</Text>
                </TouchableOpacity>
            </View>
            <PrimaryButton title={'Upload Image'} color={'#3056D3'} onPress={uploadImageToDB} style={{alignSelf:'center',marginTop:'3%'}}/>
        </ScrollView>
</Container>
  );
};

const styles = StyleSheet.create({
  sec_container: {
    paddingHorizontal:'4%',
    paddingVertical:'2%'
  },
  img1:{
    alignSelf:'center',
    height:200,
    width:200,
    borderRadius:200/2,
    marginBottom:'5%'
  },
  row: {
      width:'100%',
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems:'baseline',
  },
  img:{
    width:45,
    height:45  
},
blue_txt:{
    color:'#3056D3',
    paddingTop:'4%',
    textAlign:'center'
},
upload_container:{
    borderWidth:1.5,
    borderColor:'#3056D3',
    alignItems:'center',
    width:'100%',
    padding:'3.5%',
    borderStyle:'dashed',
    borderRadius:6,
    marginBottom:'5%'
},
med_btn:{
    width:'100%',
    marginTop:'4%',
    marginBottom:'5%'
},
med_btn2:{
    width:'100%',
    marginTop:'3%',

},
    radioBtn1:{
        marginRight:'10%',
    },
    bld_txt:{
        fontSize:16,
        fontWeight:'bold',
        color:'#000',
        alignSelf:'flex-start',
        paddingBottom:'3%'
},
  txt:{ 
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#000',
    paddingBottom:'2%',
},
rightPD:{
    width:'45%',
    marginTop:15,
    marginBottom:15
},
leftPD:{
    width:'45%',
    marginTop:15,
    marginBottom:20
},
med_txt:{
    fontSize:16,
    color:"#000",
    alignSelf:'flex-start',
    paddingLeft:20
},
pd:{
    width:'100%',
    marginBottom:20,
    marginTop:15
}
});

export default UploadTryOnImage;

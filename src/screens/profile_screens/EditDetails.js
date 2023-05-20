import * as React from 'react';
import { View,StyleSheet, Alert,ScrollView,ActivityIndicator,Text} from 'react-native';

// importing form components
import Container from '../../components/ui/Container';
import ImageWithDetails from '../../components/ui/ImageWithDetails';
import PrimaryButton from '../../components/ui/PrimaryButton';
import HorizontalDivider from   '../../components/ui/HorizontalDivider';
import MediumButtonOutline from '../../components/ui/MediumButtonOutline';
import EditableUserDetailItem from '../../components/forms/EditableUserDetailItem';

// Helper methods to fetch retrieve data from API
import { getUserData } from '../../api/userapi';
import { updateUserData } from '../../api/userapi';
import { chooseFile } from '../../utils/imageCapture';

const EditDetails = ({navigation}) =>{
    // State Vars
    const [firstName,setFirstName] = React.useState(null);
    const [lastName,setLastName] = React.useState(null);
    const [email,setEmai] = React.useState(null);
    const [isDataFetched,setIsDataFetched] = React.useState(false)
    const [errorVisible,setErrorVisible] = React.useState(false)

    const [errorMsg,setErrorMsg] = React.useState('')
    const [user,setUser] = React.useState(null)
    
    const [successVisible,setSuccessVisible] = React.useState(false)
    const [successMessage,setSuccessMessage] = React.useState(null)

    const [filePath,setFilePath] = React.useState({})
    const [isImageSet,setIsImageSet] = React.useState(false)
  

    // Fetching User Data from the API
    React.useEffect(()=>{
        const setData = async()=>{
            try{
                const user = await getUserData();
                setUser(user)
                setIsDataFetched(true)
            }
            catch(e){
                throw e
            }
        }
        setData()
    },[])

    // form validation 
    const validateForm = () =>{
        // Validating user input
        console.log(
        "Inside validation"
        )
        if (!email || !firstName || !lastName) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorVisible(true)
            setErrorMsg('Please enter a valid email address.');
            return false;
        }
        console.log("Returning from validation")
        return true

    }

    // Update User Data 
    const handleUpdate =async () => {

        if (!validateForm()){
            return
        }

        const data = {
            "firstName":firstName,
            "lastName":lastName,
            "email":email
        }
        try{
            const response =await updateUserData(data)
            if(response == 200){
                setSuccessMessage("Profile Updated Successfully. Redirecting to Profile Screen")
                setSuccessVisible(true)
                
                setTimeout(() => {
                    navigation.navigate('MyDetails')
                }, 3000);
                 
            }
        }
        catch (e){
            throw e
        }
    } 

    // Image Upload
    const handleImageUpload =async () => {
        console.log("INside Handle UImage")
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

    const handleImageUpdate = () => {
        navigation.navigate('UserImage')
    }

    const handleImageDelete = () => {
        Alert.alert("Delete User Image")
        setIsImageSet(false)
    }

    
    
    // Methods
    handleDeleteAccount = () => {navigation.navigate('DeleteAccount')}
    handleChangePassword = () => {navigation.navigate('ChangePassword')}

    return(
        isDataFetched ? (
            <Container >
                <ScrollView contentContainerStyle={styles.sec_cont} onFocus={()=>setErrorVisible(false)}>
                    {errorVisible &&  
                    <Text style={{color:'red',fontSize:16,alignSelf:'flex-start',paddingBottom:'2%'}}>
                            {errorMsg}
                    </Text>
                    } 
                     {successVisible &&  
                    <Text style={{color:'green',fontSize:16,alignSelf:'flex-start',textAlign:'center',paddingBottom:'2%'}}>
                        {successMessage}
                    </Text>
                    } 
                    <EditableUserDetailItem iconName="person" label="First Name"  secureTextEntry={false} placeholder={user.firstName} onChangeText={setFirstName} value={firstName}/>
                    <EditableUserDetailItem iconName="person" label="Last Name" secureTextEntry={false} placeholder={user.lastName} onChangeText={setLastName} value={lastName}/>
                    <EditableUserDetailItem iconName="mail" label="Email" secureTextEntry={false} placeholder={user.email} onChangeText={setEmai} value={email}/>
                    {
                    !isImageSet ? 
                    <ImageWithDetails
                        label="Your Photo"
                        imageSource={require('../../assets/images/persons/person.png')} 
                        iconSource={require('../../assets/images/upload.png')} 
                        title="Edit your photo"
                        subtitle1="Update"
                        subtitle2="Delete"
                        onDeletePress={handleImageDelete}
                        onUpdatePress={handleImageUpdate}
                        onUploadPress={handleImageUpload}
                    />:<ImageWithDetails
                        label="Your Photo"
                        imageSource={{uri:filePath.assets[0].uri}} 
                        iconSource={require('../../assets/images/upload.png')} 
                        title="Edit your photo"
                        subtitle1="Update"
                        subtitle2="Delete"
                        onDeletePress={handleImageDelete}
                        onUpdatePress={handleImageUpdate}
                        onUploadPress={handleImageUpload}
                    />
                    }
                    <PrimaryButton title='Save' color='#3056D3' style={{alignSelf:'center',marginVertical:'5%'}} onPress={handleUpdate}/>
                    <HorizontalDivider text='OR'/>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:'4%'}}>
                        <MediumButtonOutline title='Change Password' color='#000' style={{width:'45%'}} onPress={handleChangePassword}/>
                        <MediumButtonOutline title='Delete Account' color='red' style={{width:'45%'}} onPress={handleDeleteAccount}/>
                    </View>
                </ScrollView>
            </Container>
        ) : <ActivityIndicator size="large" style={{marginTop:'50%'}}/>
    )

}

const styles = StyleSheet.create({
    btn_style:{alignSelf:'center',marginTop:10},
    sec_cont:{padding:'4%',}
})

export default EditDetails;
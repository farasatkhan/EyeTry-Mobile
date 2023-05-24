
import * as React from 'react';
import { View,Text, Image,StyleSheet,Alert,  ScrollView ,ActivityIndicator} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Container from '../../components/ui/Container';
import TryOnImageItem from '../../components/ui/TryOnImageItem';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { deleteTryOnImageFromServer, viewTryOnImages } from '../../api/userapi';



export default function TryOnImages({navigation}){
    
    const serverURL = 'http://localhost:3000'; 

    const [imageIds,setImageIds] = React.useState([]) // image address
    const [noImagePresent,setNoImagePresent] = React.useState(false)
    const [isDataFetched,setIsDataFetched] = React.useState(false)
    const isFocused = useIsFocused()
    const [changed,setChanged] = React.useState(false)


    React.useEffect(()=>{
        const getAllTryonImages= async () =>{
            try {
                const response = await viewTryOnImages()
                setImageIds(response.locations)
                console.log("imageId ",imageIds)
                setIsDataFetched(true)
                setNoImagePresent(false)
            }
            catch (e){
                if (e.response.status == 400 ){
                    setIsDataFetched(false)
                    setNoImagePresent(true)
                }
            }
        }
        getAllTryonImages()
    }
    ,[isFocused,changed])

    // Methods
    const handeEdit = (tryOnImageID) => { navigation.navigate('UploadTryOnImage',{
        imgId:tryOnImageID
    })}
    const handleRemove =async (tryOnImageID) => {
        try{
            const response = await deleteTryOnImageFromServer(tryOnImageID.split("tryon_images/")[1])
            console.log(response)
            setChanged(!changed)
        }
        catch(error){
            console.log(error)
        }

    }

    const goToUploadNewTryOnImage=()=>{
        navigation.navigate("UploadTryOnImage")
    }


    return(
        <Container >
            <ScrollView contentContainerStyle={styles.container_style}>
                {isDataFetched &&    
                    imageIds.map((image,index)=>{
                    return(<TryOnImageItem key={image}  imgSource={serverURL+image} handeRemove={()=>handleRemove(image)} handleEdit={()=>handeEdit(image)}/>
                    )
                })
                    
                }
                {
                    noImagePresent && (<Text style={{fontWeight:'500',color:"#000" ,fontSize:16,alignSelf:'center',paddingVertical:'3%'}}>You have no Try On Images </Text>)
                }
                <PrimaryButton title='Upload New Try-On Image' onPress={goToUploadNewTryOnImage} style={{alignSelf:'center',marginVertical:'5%'}}/>
            </ScrollView>  
        </Container>
    )
}

const styles = StyleSheet.create({
    container_style:{
        padding:'4%'
    },
})
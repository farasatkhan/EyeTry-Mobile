
import * as React from 'react';
import { View, Image,StyleSheet,Alert,  ScrollView } from 'react-native';
import MediumButtonOutline from '../../components/ui/MediumButtonOutline';

export default function TryOnImageItem({imgSource,handleEdit,handeRemove,}){
    return(     
            <View style={styles.sec_cont}>
                <Image source={{uri:imgSource}} style={styles.img}/>
                <View style={styles.btn_cont}>
                    <MediumButtonOutline title='Edit' color='#3056D3'  onPress={handleEdit} style={{width:'42%'}}/>
                    <MediumButtonOutline  title='Remove' color='red'  onPress={handeRemove} style={{width:'42%'}}/>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    sec_cont:{
        alignItems:'center'
    },
    img:{
        height:315,
        width:315
    },
    btn_cont:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-evenly',
        marginVertical:15
    }
})
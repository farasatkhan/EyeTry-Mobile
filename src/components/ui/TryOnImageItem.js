
import * as React from 'react';
import { View, Image,StyleSheet,Alert,  ScrollView } from 'react-native';
import MediumButtonOutline from '../../components/ui/MediumButtonOutline';

export default function TryOnImageItem({imgSource,handleEdit,handeRemove,}){
    return(     
            <View style={styles.sec_cont}>
                <Image source={imgSource} style={styles.img}/>
                <View style={styles.btn_cont}>
                    <MediumButtonOutline title='Edit' color='#3056D3'  onPress={handleEdit}/>
                    <MediumButtonOutline  title='Remove' color='red'  onPress={handeRemove}/>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    sec_cont:{
        marginVertical:10
    },
    img:{
        height:315,
        width:315
    },
    btn_cont:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:15
    }
})
import * as React from 'react';
import { View, Text,StyleSheet } from 'react-native';

const RowText = ({label,value,style}) =>{
    return(
                <View style={[styles.row,style]}>
                    <Text style={styles.bld_txt}>{label}</Text>
                    <Text style={styles.med_txt}>{value}</Text>
                </View>
    )

}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        alignItems:"center",
        padding:10,
        justifyContent:'space-between',
        marginBottom:5
    },
    bld_txt:{
        fontWeight:'700',
        fontSize:16,
        color:'#000',
        flex:3
    },
    med_txt:{
        fontWeight:'400',
        fontSize:16,
        color:'#000',
        textAlign:'left',
        flex:2
    }

})

export default RowText;
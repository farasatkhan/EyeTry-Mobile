import * as React from 'react';
import { View, Text,StyleSheet } from 'react-native';

const PrescriptionDetailsRow = ({label,value1,value2,value3}) =>{
    return(
    <View style={styles.row}>
        <Text style={styles.bld_txt}>
            {label}
        </Text>
        <Text style={styles.med_txt}>
            {value1}
        </Text>
        <Text style={styles.med_txt}>
            {value2}
        </Text>
        <Text style={styles.med_txt}>
            {value3}
        </Text>
    </View>
    )

}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10
    },
    bld_txt:{
        fontWeight:'700',
        fontSize:16,
        color:'#000',
        flex:1,
    },
    med_txt:{
        fontWeight:'400',
        fontSize:16,
        color:'#000',
        textAlign:'right',
        flex:1
    }

})

export default PrescriptionDetailsRow;
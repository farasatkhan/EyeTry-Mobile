import * as React from 'react';
import { useIsFocused } from '@react-navigation/native';

import { deletePaymentMethod, viewAllPayments } from '../../api/userapi';

import { ScrollView,View, Text,StyleSheet,Alert,Image,ActivityIndicator,  TouchableOpacity, ScrollScro, ScrollViewllView } from 'react-native';
import PrimaryButton from '../../components/ui/PrimaryButton';
import Container from '../../components/ui/Container';
import PaymentMethodItem from '../../components/ui/PaymentMethodItem';

export default function PaymentMethods({navigation}){
    const [paymentMethods,setPaymentMethods] = React.useState([])
    const [isDataFetched,setIsDataFetched] = React.useState(false)
    const isFocused = useIsFocused()
    const [changed,setChanged] = React.useState(false)


    React.useEffect(()=>{
        const getAllPaymentMethods= async () =>{
            try {
                const response = await viewAllPayments()
                setPaymentMethods(response)
                setIsDataFetched(true)
            }
            catch (e){
                throw e
            }
        }
        getAllPaymentMethods()
    }
    ,[isFocused,changed])



    // methods


    const handleAddNewPaymentMethod = () => {
        navigation.navigate('AddPaymentMethod')
    }
    const handleEditPaymentMethod = (paymentId) => {
        navigation.navigate('EditPaymentMethod',{
            paymentId:paymentId
        })
    }
    const handleDeletePaymentMethod =async (paymentId) => {
        try{
            await deletePaymentMethod(paymentId);
            setChanged(!changed)
        }
        catch(e){
            console.log("Error while deleting Payment Method")
            throw e
        }
    }

    return(
        isDataFetched ? (<Container>
            <ScrollView contentContainerStyle={styles.sec_container}>
                {
                    paymentMethods.map((pMethod)=>{
                        return(
                            <PaymentMethodItem key={pMethod._id} name={pMethod.nameOnCard} cardType={pMethod.paymentType} cardNo={pMethod.cardNumber} expDate={pMethod.expirationYear.split('T')[0]} cvv={pMethod.cvv} 
                                handleEditPaymentMethod={()=>handleEditPaymentMethod(pMethod._id)} handleDeletePaymentMethod={()=>handleDeletePaymentMethod(pMethod._id)}/>
                        )
                    })
                }
                  {
                paymentMethods.length == 0 && (<Text style={{fontWeight:'500',color:'#000',textAlign:'center' ,fontSize:20,alignSelf:'center',paddingVertical:'3%'}}>No Payment Methods were added </Text>)
                }
                <PrimaryButton title='Add New Payment Method' onPress={handleAddNewPaymentMethod} style={styles.primary_btn}/>
            </ScrollView>
        </Container>
        ) : <ActivityIndicator size="large" style={{marginTop:'50%'}}/>
    )
}

const styles = StyleSheet.create({
    sec_container:{
        padding:'4%'
    },
    primary_btn:{
        marginVertical:'5%',
        alignSelf:'center'
    }
})
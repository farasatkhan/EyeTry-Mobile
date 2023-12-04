import * as React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

// importing form components
import Container from '../../components/ui/Container';
import { InputField } from '../../components/forms/InputField';
import LabelledTextInput from '../../components/forms/LabelledTextInput';
import SelectInput from '../../components/forms/SelectInput';
import MediumButtonOutline from '../../components/ui/MediumButtonOutline';

import { createSupportTicket } from '../../services/SupportTickets/supportTickets';
import { getUserChats,createChat } from '../../services/Chat/chat';
import { getDataAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';

const CreateTicket = ({ navigation }) => {
  // State Variables
    const [orderNo, setOrderNo] = React.useState('');
    const [selectedType, setSelectedType] = React.useState('Product Inquiry');
    const [selectedPrioriy, setSelectedPriority] = React.useState('Low');
    const [description,setDescription] = React.useState('') 



    
    const ticketTypes = ["Product Inquiry","Product Return","Order Inquiry"]
    const ticketPriority = ["Low","Medium","High"]


    const handleTicketCreation = async () => {
        const ticketData = {
            type: selectedType,
            priority: selectedPrioriy,
            description: description,
            orderNumber: orderNo,
        }
        try{
            const res = await createSupportTicket(ticketData)
            console.log(res)
            console.log("Ticket Created")
            Alert.alert("Your Ticket Has Been Created Successfully, Redirecting to Tickets Page .. ")
            setTimeout(() => {
                navigation.navigate('TicketsList')
            }, 3000);
        }
        catch(error){
            console.log(error)
        }
        
    }



    // Methods
    const goToChats =async () => {
        try{
            let user = await getDataAsyncStorage('user')
            user =await JSON.parse(user)
            const userId = user._id
            const chats = await getUserChats(userId);
            if (chats?.length === 0 ){
                Alert.alert("No Chats Exists for this user")
                return
            }
            navigation.navigate('Chat',{userId:userId})
        }catch(e){
            console.log(e)
        }
    };


  return (
<Container>
    <ScrollView contentContainerStyle={styles.sec_container}>
            <LabelledTextInput
                label={'Order Number'}
                onChangeText={setOrderNo}
                value={orderNo}
                placeholder="Enter your order no. if applicable"
                style={[styles.labelledInput]}
                containerStyle={{width:'100%'}}
            />
            <SelectInput
                label="Ticket Type"
                array={ticketTypes}
                selectedValue={selectedType}
                setSelectedValue={setSelectedType}
                labelStyle={{ alignSelf:'flex-start' }}
                pickerStyle={{width:'100%'}}
                style={{width:'100%',height:57,marginBottom:'5%'}}
                containerStyle={{width:'100%'}}
             />
            <SelectInput
                label="Ticket Priority"
                array={ticketPriority}
                selectedValue={selectedPrioriy}
                setSelectedValue={setSelectedPriority}
                labelStyle={{ alignSelf:'flex-start' }}
                pickerStyle={{width:'100%'}}
                style={{width:'100%',height:57,marginBottom:'5%'}}
                containerStyle={{width:'100%'}}
             />
            <Text style={styles.txt}>
                Issue Description
            </Text>
            <InputField isMultiline={true} noOfLines={3} name='Enter your Issue Description' value={description} onChangeText={setDescription} style={styles.pd}/>
            <Text style={styles.med_txt}>
                Want to chat with customer support?
            </Text>
            <View style={styles.btn_container}>
                <MediumButtonOutline title='Live Chat' onPress={goToChats} color={'#000'} style={{width:'45%'}}/>
                <MediumButtonOutline title='Create Ticket' onPress={handleTicketCreation} style={{width:'45%'}}/>
            </View>
        </ScrollView>
</Container>
  );
};

const styles = StyleSheet.create({
  sec_container: {
    alignItems: 'center',
    padding:'4%'
  },
  row: {
      width:'100%',
      justifyContent:'space-between',
      alignItems:'baseline',
      flexDirection: 'row',
      marginBottom:'5%'
  },
  radioBtn1:{
    marginRight:40,
  },
  issueDate: {
    height: 55,
    width:'100%'
  },
  yearSelect: {
    width:'100%',
    height:55
  },
  labelledInput:{
    marginBottom:'5%',
    width:'100%'
},
  labelledInput1:{
    marginBottom:'5%'
},
  txt:{ 
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginTop:'3%'
},
btn_container:{
  flexDirection:'row',
  width:'100%',
  justifyContent:'space-between',
  paddingHorizontal:10,
  marginVertical:'8%'
},
rightPD:{
    width:'45%',
    marginTop:'3%',
},
leftPD:{
    width:'45%',
    marginTop:'3%',
},
med_txt:{
    fontSize:16,
    color:"#000",
    alignSelf:'center',
  },

pd:{
    width:'100%',
    marginTop:'3%',
    marginBottom:'10%',
    height:'10%'
}
});

export default CreateTicket;

import * as React from 'react';
import { View, Text,StyleSheet,Alert, Touchable, TouchableOpacity,Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// importing form components
import Container from '../../components/ui/Container';
import RowText from '../../components/ui/RowText';
import MediumButton from '../../components/ui/MediumButton';

import { getSupportTicketById } from '../../services/SupportTickets/supportTickets';
import { createChat } from '../../services/Chat/chat';
import { getDataAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';

const TicketDetails = ({route}) =>{
    const ticketId = route.params?.ticketId
    
    const [supportTicket, setSupportTicket] = React.useState({
        customerName: '',
        dateIssued: '',
        type: '',
        priority: '',
        description: '',
        orderNumber: '',
        status: '',
    });


    const navigation = useNavigation();

    const fetchSupportTicket = async () => {
        try {
            const data = await getSupportTicketById(ticketId);
            setSupportTicket(data);
            console.log("Ticket",data)
        } catch (error) {
            console.error('Error fetching support ticket: ', error);
        }
    };


    React.useEffect(() => {
        fetchSupportTicket();
        
    }, [ticketId]);

    // Methods
    const handleDeleteTicket = () =>{
        Alert.alert("Deleted Success")
        // navigation.navigate('PrescriptionsList')
    }



    

    const handleChat =async () => {
        try{
            let user = await getDataAsyncStorage('user')
            user =await JSON.parse(user)
            var userId = user._id

            if (supportTicket?.supportAgentResponses.length === 0){
                Alert.alert("No agent has responded yet")
                return
            }
            const agentID = supportTicket?.supportAgentResponses[0]?.agentId;
            console.log("Agent ID",agentID)
            const data = {
                "senderId": userId, 
                "receiverId": agentID
            }
            const res = await createChat(data)
            if (res.status === 200){
                navigation.navigate('Chat',{userId:userId})
            }
        }
        catch(e){
            if(e.response.status === 400 && e.response.data.message === "Chat already exists"){
                Alert.alert("Chat already exists")
                navigation.navigate('Chat',{userId:userId})
            }
        }

    }

    return(
    <Container >
        <ScrollView style={styles.sec_container}>
            <RowText label='Customer Name' value={supportTicket.customerName} />
            <RowText label='Ticket Type' value={supportTicket.type} />
            <RowText label='Ticket Priority' value={supportTicket.priority} />
            <RowText label='Order Number' value={supportTicket?.orderNumber || "Not Provided"} />
            <RowText label='Status' value={supportTicket.status} />

            <View style={styles.col}>
                    <Text style={styles.bld_txt}>Issue Description</Text>
                    <Text style={styles.med_txt}>{supportTicket?.description || "No Description Provided"}</Text>
            </View>

            <View style={{padding:10}}>
                <Text style={styles.bld_txt}>Support Agent Responses</Text>
                {   
                    supportTicket?.supportAgentResponses?.length === 0 ? (<Text style={styles.med_txt}>
                        No Response Yet
                    </Text>) : (
                        supportTicket?.supportAgentResponses?.map(response => {
                            return (
                            <View style={[styles.shadow]} key={response._id} className="p-2 border-l-2  rounded border-slate-700 mb-4 ">
                                <Text style={styles.med_txt}>
                                    {response.message}
                                </Text>
                                <Text className="text-zinc-500 self-end pr-1">
                                    {(response.dateTime + '').split('T')[0]}
                                </Text>
                            </View>
                            )
                        })
                    )

                }
                
           </View>

           <View style={styles.btn_container}>
                <MediumButton title='Delete' onPress={handleDeleteTicket} color={'#ff0000'} style={{width:'45%'}} />
                <MediumButton title='Chat' onPress={handleChat} style={{width:'45%'}}/>
            </View>
        </ScrollView>
    </Container>
    )
}

const styles = StyleSheet.create({
    sec_container:{
        flex:1,
        backgroundColor:"#fff",
        padding:'3%'
    },
    btn_container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:'2%',
        marginVertical:25
    },
    col:{
        flexDirection:'column',
        // alignItems:"center",
        padding:10,
        justifyContent:'space-between',
        marginBottom:5
    },
    bld_txt:{
        fontWeight:'700',
        fontSize:16,
        color:'#000',
        flex:3,
        paddingBottom:'4%'
    },
    med_txt:{
        fontWeight:'400',
        fontSize:16,
        color:'#000',
        textAlign:'left',
        flex:2
    },
    shadow:{
        // Shadow
        backgroundColor: '#fff',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset:
        {
        width: 0,
        height: 3
        },
        shadowOpacity: 0.24,
        shadowRadius: 8
    }

})

export default TicketDetails;
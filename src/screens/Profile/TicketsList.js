import * as React from 'react';
import {ScrollView, View, Text,StyleSheet,ActivityIndicator } from 'react-native';
import { getSupportTickets } from '../../services/SupportTickets/supportTickets';
import { useIsFocused } from '@react-navigation/native';

// importing form components
import Container from '../../components/ui/Container';
import PrimaryButton from '../../components/ui/PrimaryButton';

const TicketsList = ({navigation}) =>{
    const [supportTickets, setSupportTickets] = React.useState([]);
    const [isDataFetched, setIsDataFetched] = React.useState(false)
    const isFocused = useIsFocused()
    // Methods
    const goToTicketDetails= (id) =>{
        navigation.navigate('TicketDetails',{
            ticketId : id
        })
    }
    const handleAddNewTicket= () =>{
        navigation.navigate("CreateTicket")
    }

    // Function to fetch support ticket data from the server
    const fetchSupportTickets = async () => {
        try {
            const data = await getSupportTickets();
            setSupportTickets(data);
            setIsDataFetched(true)
            console.log(data)
        } catch (error) {
            console.error('Error fetching support tickets:', error);
        }
    };
    
        React.useEffect(() => {
            fetchSupportTickets();
        }, [isFocused]);

    return(
    <Container>
        {
        isDataFetched ? (
            <ScrollView contentContainerStyle={styles.sec_container}>
                {
                    supportTickets.length == 0 ? (
                        <Text style={{ fontWeight: '500', color: '#000', textAlign: 'center', fontSize: 20, alignSelf: 'center', paddingVertical: '3%' }}>No Support Ticket are added yet </Text>
                        ):(

                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.header}>Ticket Type</Text>
                            <Text style={styles.header}>Date</Text>
                            <Text style={[styles.header,{alignSelf:'flex-start'}]}>  Status</Text>
                        </View>
                        {
                            supportTickets?.map((ticket)=>{
                                return(
                                    <View style={styles.row} key={ticket._id}>
                                        <Text style={styles.cell} onPress={()=>goToTicketDetails(ticket._id)}>{ticket.type}</Text>
                                        <Text style={styles.cell1}>{(ticket.dateIssued + '').split('T')[0]}</Text>
                                        <Text style={[styles.cell1]}>{ticket.status}</Text>
                                    </View>
                                )
                            })
                        }
                        
                    </View>
                    )
                }
                    <PrimaryButton title='Create New Ticket' onPress={handleAddNewTicket} style={{marginVertical:27}} />
                </ScrollView>
        
        
        ): <ActivityIndicator size="large" style={{ marginTop: '50%' }} />

        }
    </Container>
    )

}

const styles = StyleSheet.create({
    sec_container:{
        alignItems:'center',
        padding:'2%'
    },
    table: {
        width:'100%',
        borderRadius: 5,
        margin: 10,
      },
      row: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth: 1,
        borderColor: 'gray',
        padding: 10,
      },
      header: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
        fontSize:16,
        color:'#212B36'
      },
      header1: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
        fontSize:16,
        color:'#212B36',
      },
      cell: {
        flex: 1,
        textAlign: 'left',
        fontSize:16,
        color:'#212B36',
        textDecorationLine:'underline'
      },
      cell1: {
        flex: 1,
        textAlign: 'left',
        fontSize:16,
        color:'#212B36'
      },
      btnCell: {
        flexDirection:'row',
        flex: 1,
        textAlign: 'center',
        padding: 7,
      },
      image: {
        width: 18,
        height: 18,
        margin: 5,
        marginLeft:10
      },
      image1: {
        width: 18,
        height: 18,
        margin: 5,
        marginLeft:30
      },


})

export default TicketsList;
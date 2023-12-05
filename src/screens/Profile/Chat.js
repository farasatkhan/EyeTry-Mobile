
import {io} from 'socket.io-client'
import React, { useState,useRef,useEffect} from 'react';
import { View,ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Conversation from '../../components/ui/Conversation';
import ChatBox from '../../components/ui/ChatBox';
import ConversationsHeader from '../../components/ui/ConversationsHeader';
import ImageWithText from '../../components/ui/ImageWithText';
import Divider from '../../components/ui/HorizontalDivider';
import API_URL from '../../config/config';

import { getDataAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';
import { getMessages, getUserChats } from '../../services/Chat/chat';
import { getUser } from '../../services/Chat/chat';



const Chat = ({route}) => {
    const userId = route.params.userId

    const [chats,setChats] = React.useState([])
    const [currentChat,setCurrentChat] = React.useState(null)
    const [onlineUsers,SetOnlineUsers] = React.useState([])
    const [sendMessage,setSendMessage] = React.useState(null)
    const [receiveMessage,setReceivedMessage] = React.useState(null)
    const [isChatSelected,setIsChatSelected] = useState(false)

    const navigation = useNavigation();
  
    // const [userId,setUserId] = React.useState(null)
    const [isDataFetched,setIsDataFetched] = React.useState(false)
    const socket = useRef()


    // Getting User Id
    /*
        const getUserId = async () => {
            try{
                let user = await getDataAsyncStorage('user')
                user =await JSON.parse(user)
                setUserId(user._id)
                setIsDataFetched(true)
            }catch(e){
                console.log("Error while fetching ID",e)
            }
        }

        React.useEffect(()=>{
            getUserId()
        },[userId])

    */
    
    
    // Sending Message to the socket server
    React.useEffect(()=>{
        if(sendMessage !== null){
        socket.current.emit('send-message',sendMessage)
        }
    },[sendMessage])


    
    // Connecting to socket.io server and setting online users
    React.useEffect(()=>{
        const connectServer = async () => {
            socket.current = io(API_URL)
            socket.current.emit("new-user-add",userId)
            socket.current.on('get-users',(users)=>{
            SetOnlineUsers(users)
            })
        }
        
        connectServer()

        // on unmouting disconnect the socket
        return () => {
            socket.current.disconnect()
        }

        
    },[])


    // Receiving Message to the socket server
    React.useEffect(()=>{
        socket.current.on('receive-message',(data)=>{
            console.log("Socket Recevice Message",data)
            setReceivedMessage(data)
        })
    },[])

    // Retrieve all chats
    const getChats = async()=>{
        try{
        const res = await getUserChats(userId)
        res.reverse()  // latest chat will be at the top
        setChats(res)
        setIsDataFetched(true)
        console.log("Chats",res)
        }catch(e){
        console.log(e)
        }
    }

    React.useEffect(()=>{
        getChats()
    },[userId])
    

    // If user taps on a chat set it to selected chat
    const handleChatPress = (chat) =>{
        setCurrentChat(chat)
        setIsChatSelected(true)
    }


    const checkOnlineStatus = (chat) =>{
        const chatMember = chat.members.find((member)=> member !== userId)
        const online = onlineUsers.find((user)=>user.userId === chatMember)
        return online ? true : false
      }




  return (
    isDataFetched ? (
        isChatSelected ? (
            <ChatBox chat={currentChat} currentUser={userId} setSendMessage={setSendMessage} receivedMessage={receiveMessage} setCurrentChat={setCurrentChat} setIsChatSelected={setIsChatSelected}
            />
        ) : 
        (
            <>
                <ConversationsHeader onPressBack={()=>navigation.goBack()} />
                    <ScrollView View style={{flex:1,backgroundColor:"#fff",paddingTop:'2%',paddingHorizontal:'1%'}}>
                        {
                            chats.map((ind_chat)=> {
                            return (
                                <Conversation key={ind_chat._id} data={ind_chat} currentUser={userId} online={checkOnlineStatus(ind_chat)} onPress={()=>{handleChatPress(ind_chat)}}/>
                                )
                            })
                        }
                    </ScrollView>
            </>
    )
    ):(<ActivityIndicator size="large" style={{ marginTop: '50%' }} />)
   
)
};
export default Chat
import React, { useState ,useEffect,useRef} from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { API_PUBLIC_DIR_URL } from '../../config/config';

import { getUser } from '../../services/Chat/chat';
import { getMessages } from '../../services/Chat/chat';
import { addMessage } from '../../services/Chat/chat';
import ChatHeader from './ChatHeader';


const ChatBox = ({chat, currentUser, setSendMessage,  receivedMessage,setCurrentChat,setIsChatSelected}) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");


    
    
    // for chatbox header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
            const data  = await getUser(userId);
            setUserData(data);
            } catch (error) {
            console.log(error);
            }
    };
        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    // fetching messages
    useEffect(() => {
        const fetchMessages = async () => {
        try {
            const  data  = await getMessages(chat._id);
            setMessages(data);
        } catch (error) {
            console.log(error);
        }
        };
        console.log(chat)
        if (chat !== null) fetchMessages();
    }, [chat]);

   
    // const flatListRef = useRef();

    
    // useEffect(() => {
    //     if (flatListRef.current) {
    //       flatListRef.current.scrollToEnd({ animated: true });
    //     }
    //   }, [messages]);

    // Send Message
    const handleSend = async(e)=> {
        const message = {
        senderId : currentUser,
        text: newMessage,
        chatId: chat._id,
    }
    const receiverId = chat.members.find((id)=>id!==currentUser);
    // send message to socket server
    setSendMessage({...message, receiverId})
    // send message to database
    try {
        const data = await addMessage(message);
        setMessages([...messages, data]);
        setNewMessage("");
        console.log(messages)
    }
    catch(error)
    {
        console.log(error)
    }
    }

    // Receive Message from parent component
    useEffect(()=> {
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            console.log("Message Receiver",receivedMessage)
            setMessages([...messages, receivedMessage]);
        }
    },[receivedMessage])

  
  
    const onPressBack = () =>{
        setCurrentChat(null)
        setIsChatSelected(false)
    }

    
    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    };
    
    const renderItem = ({ item }) => {
        console.log("Message",item)
        console.log("messages",messages)
        const messageStyle = item?.senderId === currentUser ? styles.sentMessage : styles.receivedMessage;
        const textStyle = item?.senderId === currentUser ? styles.sentText : styles.receivedText;
      
        return (
          <View style={styles.messageContainer} >
            <View style={[styles.messageBubble, messageStyle]} className='px-2 py-1 rounded-md'>
                <Text style={textStyle} className='pt-1 text-left'> {item?.text}</Text>
                <Text style={styles.timestamp} className='py-1'>{formatTimestamp(item?.createdAt)}</Text>
            </View>
          </View>
        );
      };

  return (
      <>
        <ChatHeader imageUrl={userData?.profilePicture && API_PUBLIC_DIR_URL + userData.profilePicture } title={userData?.firstName + ' '+ userData?.lastName} onPressBack={onPressBack}/>
        <View style={styles.container}>
        <FlatList
            
            // ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            
        />
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
        </View>
        </View>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  messageContainer: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: '100%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRightColor:'green',
    borderRightWidth:2
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderLeftColor:'#000',
    borderLeftWidth:2
  },
  sentText: {
    color: '#000000',
  },
  receivedText: {
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 10,
    padding: 8,
  },
  sendButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
    alignSelf: 'flex-end',
    marginTop: 4,
  },

  
});

export default ChatBox;

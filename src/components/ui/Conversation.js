import Reac,{useEffect,useState} from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { API_PUBLIC_DIR_URL } from '../../config/config';


 import { getUser } from '../../services/Chat/chat';

const Conversation = ({ data, currentUser, online,onPress }) => {
  const [userData, setUserData] = useState(null) // Receiver of message


  useEffect(()=> {

    /*
    Getting id of the other user in chat , this user is the one whom current 
    logged in user is chatting to ... 
    */
    const userId = data.members.find((id)=>id!==currentUser) 

    const getUserData = async ()=> {
      try
      {
        const res =await getUser(userId)
        console.log("Receiver",res)
         setUserData(res)
      }
      catch(error)
      {
        if(error.response.status === 400 && error.response.data.message == "Agent account not found." ){
          console.log("User-User Chat Found ")
        }
      }
    }

    getUserData();
  }, [])
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} className=" rounded-md shadow-sm">
      <View style={styles.innerContainer}>
        <View style={styles.userDetails}>
          {
            userData?.profilePicture ? (
              <Image
                source={{ uri: API_PUBLIC_DIR_URL + userData.profilePicture }}
                style={styles.image}
              />
            ) : (
              <Image
                source={require('../../assets/images/persons/person.png')}
                style={styles.image}
              />
            )
          }
          <View style={styles.textContainer}>
            <Text style={styles.name}>{userData?.firstName} {userData?.lastName}</Text>
            <Text style={[styles.status, { color: online ? '#51e200' : 'white' }]}>
              {online ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderBottomColor:'#f1f1f1'
  },
  innerContainer: {
    paddingHorizontal: 16,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 65/2,
  },
  textContainer: {
    marginLeft: 16,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  status: {
    fontSize: 14,
  },
  separator: {
    // height: 1,
    // backgroundColor: 'grey',
  },
});

export default Conversation;
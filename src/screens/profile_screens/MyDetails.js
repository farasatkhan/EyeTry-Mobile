import * as React from 'react';
import { View,StyleSheet} from 'react-native';

// importing form components
import Container from '../../components/ui/Container';
import UserDetailItem from '../../components/ui/UserDetailItem';
import PrimaryButtonOutline from '../../components/ui/PrimaryButtonOutline';

const MyDetails = ({navigation}) =>{

    // Methods 
    const goToEditDetails = () => {navigation.navigate('EditDetails')}
    return(
        <Container >
            <View style={styles.sec_cont}>
                <UserDetailItem iconName="person" label="First Name" details="Abdul Sammi"/>
                <UserDetailItem iconName="person" label="Last Name" details="Gul"/>
                <UserDetailItem iconName="mail" label="Email Address" details="gulsammi@protonmail.com"/>
                <PrimaryButtonOutline title='Edit' color='#3056D3' onPress={goToEditDetails} style={styles.btn_style}/>
            </View>
        </Container>
    )

}

const styles = StyleSheet.create({
    btn_style:{alignSelf:'center',marginTop:39},
    sec_cont:{marginTop:42}
})
export default MyDetails;
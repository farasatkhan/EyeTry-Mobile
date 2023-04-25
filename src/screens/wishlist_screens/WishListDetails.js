
import * as React from 'react';
import { ScrollView,View, Text,StyleSheet,Alert,Image,  TouchableOpacity, ScrollScro, ScrollViewllView } from 'react-native';
import MediumButton from '../../components/ui/MediumButton';
import MediumButtonOutline from '../../components/ui/MediumButtonOutline';
import PrimaryButton from '../../components/ui/PrimaryButton';
import PrimaryButtonOutline from '../../components/ui/PrimaryButtonOutline';
import Container from '../../components/ui/Container';
import MediumButtonOutlineIcon from '../../components/ui/MediumButtonOutlineIcon';
import WishListItem from '../../components/ui/WishListItem';
export default function WishListsDetails(){

    // methods
    const handleAddToCart = () => {
        Alert.alert('Added to cart')
    }
    const handleDelete = () => {
        Alert.alert('Item Removed from cart')
    }

    const showItemDetails = () => {Alert.alert('Show Details')}
    return(
        <Container>
            <ScrollView contentContainerStyle={styles.sec_container}>
                <WishListItem name='Wincell'  description='black tortoise' price='300' showItemDetails={showItemDetails} handleAddToCart={handleAddToCart} handleDelete={handleDelete}/>
                <WishListItem name='Wincell'  description='black tortoise' price='300' showItemDetails={showItemDetails} handleAddToCart={handleAddToCart} handleDelete={handleDelete}/>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    sec_container:{
        alignItems:'center',
        marginVertical:30
    },
})
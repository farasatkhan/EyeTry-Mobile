import * as React from 'react';
import { ScrollView, StyleSheet, Alert, } from 'react-native';
import Container from '../../components/ui/Container';
import WishListItem from '../../components/ui/WishListItem';
export default function WishListsDetails() {

    // methods
    const handleAddToCart = () => {
        Alert.alert('Added to cart')
    }
    const handleDelete = () => {
        Alert.alert('Item Removed from WishList')
    }

    const showItemDetails = () => { Alert.alert('Show Details') }
    return (
        <Container>
            <ScrollView contentContainerStyle={styles.sec_container}>
                <WishListItem name='Wincell' description='black tortoise' price='300' showItemDetails={showItemDetails} handleAddToCart={handleAddToCart} handleDelete={handleDelete} />
                <WishListItem name='Wincell' description='black tortoise' price='300' showItemDetails={showItemDetails} handleAddToCart={handleAddToCart} handleDelete={handleDelete} />
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    sec_container: {
        alignItems: 'center',
        paddingVertical: 30
    },
})
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { getUserData, deleteAddress, checkout } from '../../services/Orders/orderApi';
import { getDataAsyncStorage } from '../../utils/AsynchronusStorage/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../config/config';
import DeleteIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useStripe } from "@stripe/stripe-react-native";
import { reGenerateAccessToken } from "../../services/Authentication/authapi";

const Cart = () => {

  const navigation = useNavigation();
  // getting payment and address data
  const [addresses, setAddresses] = React.useState([])
  const [payments, setPayments] = useState([])
  const [uid, setUid] = useState(null)
  const [isDeleted, setDeleted] = useState(false)
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
  const [hasShippingAddress, setHasShippingAddress] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('paymentMethod');
  const [productQuantities, setProductQuantities] = useState({});
  const [productData, setProductData] = useState({});
  const [shippingPrice, setShippingPrice] = useState(4.99);
  const [userName, setUserName] = useState('');


  // getting address book
  useEffect(() => {
    initializeCart();
    getProfileData();
    //   getPaymentData()
  }, [])

  const initializeCart = async () => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');

      if (existingCart === null) {
        await AsyncStorage.setItem('cart', JSON.stringify([]));
        console.log('Cart initialized with an empty array');
      } else {
        console.log('Cart already exists');
      }
    } catch (error) {
      console.error('Error initializing cart:', error);
    }
  };


  const getProfileData = async () => {
    try {
      const response = await getUserData()
      setAddresses(response.addressBook)
      setUid(response._id)
      setHasShippingAddress(response.addressBook.length > 0);
      setUserName(`${response.firstName}, ${response.lastName}`)
    }
    catch (e) {
      throw e
    }
  }

  // delete address
  const deleteSpecificAddress = async (id) => {
    try {
      await deleteAddress(id)
      getProfileData()
    }
    catch (e) {
      throw e
    }
  }


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  // getting localstorage cart items

  useEffect(() => {
    getLocalStorageCartItems();
  }, [isDeleted]);


  const getLocalStorageCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cart');
      if (storedCartItems) {
        const parsedCartItems = JSON.parse(storedCartItems);
  
        setCartItems(parsedCartItems);
        console.log("Cart screen data:", parsedCartItems);
        if (parsedCartItems.length === 0 || parsedCartItems.length === '0') {
          setShippingPrice(0);
        }
      } else {
        console.log("No cart data found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error retrieving cart data:", error);
    }
  };

  useEffect(() => {
    const initialProductQuantities = {};
    for (const item of cartItems) {
      // Initialize the quantity based on the available quantity of the variant
      const variantId = item.productData.frame_information.frame_variants.find(
        (variant) =>
          variant.color === item.orderSelections.selectedOptions.frameProperties.frameColor
      )._id;

      initialProductQuantities[`${item.productData._id}_${variantId}_${item.orderSelections.selectedOptions.cartItemId}`] = 1;
    }
    setProductQuantities(initialProductQuantities);
  }, [cartItems]);

  // handling stripe payment and order
  const stripe = useStripe();

  const placeOrder = async (event) => {

    // // Handling payment
    // event.preventDefault();

    if(addresses.length === 0){
      Alert.alert('Add Shipping Address First!')
      return
    }

    try {
      const accessToken = await getDataAsyncStorage("accessToken")
      const response = await fetch("http://localhost:3000/payment/process_payment", {
        method: "POST",
        body: JSON.stringify({ amount: (calculateTotalPrice() + shippingPrice).toFixed(2) }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.client_secret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Merchant Name',
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);

      // saving to db
      if (hasShippingAddress) {
        // Construct the items array by mapping over the cartItems
        const items = cartItems.map((item, index) => {
          return {
            frame: item.productData._id,
            quantity: Object.values(productQuantities)[index],
            frameProperties: {
              frameSize: item.orderSelections.selectedOptions.frameProperties.frameSize,
              frameColor: item.orderSelections.selectedOptions.frameProperties.frameColor,
            },
            lensProperties: {
              lensType: item.orderSelections.selectedOptions.lensProperties.lensType,
              prescriptionType: item.orderSelections.selectedOptions.lensProperties.prescriptionType,
              package: item.orderSelections.selectedOptions.lensProperties.package,
              coatings: item.orderSelections.selectedOptions.lensProperties.coatings,
              glassesType: item.orderSelections.selectedOptions.lensProperties.glassesType,
              upgrades: item.orderSelections.selectedOptions.lensProperties.upgrades,
              transitionLens: {
                transitionType: item.orderSelections.selectedOptions.lensProperties.transitionLens.transitionType,
                color: item.orderSelections.selectedOptions.lensProperties.transitionLens.transitionColor,
              },
              sunglassesLens: {
                sunglassesType: item.orderSelections.selectedOptions.lensProperties.sunglassesLens.sunglassesType,
                color: item.orderSelections.selectedOptions.lensProperties.sunglassesLens.color,
              },
            },
            prescription: {
              pdType: item.orderSelections.selectedOptions.prescription.pdType,
              pdOneNumber: item.orderSelections.selectedOptions.prescription.pdOneNumber,
              pdLeftNumber: item.orderSelections.selectedOptions.prescription.pdLeftNumber,
              pdRightNumber: item.orderSelections.selectedOptions.prescription.pdRightNumber,
              birthYear: item.orderSelections.selectedOptions.prescription.birthYear,
              leftEyeOS: {
                Axis: item.orderSelections.selectedOptions.prescription.leftEyeOS.Axis,
                Base: item.orderSelections.selectedOptions.prescription.leftEyeOS.Base,
                CYL: item.orderSelections.selectedOptions.prescription.leftEyeOS.CYL,
                Prism: item.orderSelections.selectedOptions.prescription.leftEyeOS.Prism,
                SPH: item.orderSelections.selectedOptions.prescription.leftEyeOS.SPH,
              },
              rightEyeOD: {
                Axis: item.orderSelections.selectedOptions.prescription.rightEyeOD.Axis,
                Base: item.orderSelections.selectedOptions.prescription.rightEyeOD.Base,
                CYL: item.orderSelections.selectedOptions.prescription.rightEyeOD.CYL,
                Prism: item.orderSelections.selectedOptions.prescription.rightEyeOD.Prism,
                SPH: item.orderSelections.selectedOptions.prescription.rightEyeOD.SPH,
              },
            },
          };
        });

        // Create the order object with items and totalPrice
        const order = {
          user: uid,
          items: items,
          totalPrice: (calculateTotalPrice() + shippingPrice).toFixed(2),
          paymentMethod: "6560b7973b71da193967480d",
          // paymentMethod: payments[0]._id,
          shippingAddress: {
            name: addresses[0].firstName,
            phone: addresses[0].phone,
            address: addresses[0].currentAddress,
            city: addresses[0].city,
            country: addresses[0].country,
            zipCode: addresses[0].zipCode,
          },
        };

        console.log("Order sent Data: ", order);

        try {
          const response = await checkout(order); // Sending the entire order as one request
          console.log("Order Placed Successfully!", response.data);
        } catch (e) {
          console.error(e);
        }
      } else {
        Alert.alert("Add Payment Method and Shipping Address First!");
      }
      Alert.alert("Payment complete, thank you!");
    } catch (err) {
      // Server is returning 403 for expired token
      if (err.response && err.response.status == 403) {
        try {
          console.log("Error Catched")
          await reGenerateAccessToken()
          return subscribe()
        }
        catch (e) {
          console.error("Error while refreshing token", e)
          throw e
        }
      }
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };


  // // managing payment method
  // const paymentRoute = payments.length > 0 ? `/user/edit_payment/${payments[0]._id}` : '/user/add_payment';
  // const paymentBtnText = payments.length > 0 ? 'Edit' : 'Add Payment Method';

  // // managing shipping address
  // const addressRoute = addresses.length > 0 ? `/user/edit_address/${addresses[0]._id}` : '/user/add_address';
  // const addressBtnText = addresses.length > 0 ? 'Edit' : 'Add Shipment Address';

  // handleIncrement
  const [counter, setCounter] = useState(1)
  const handleIncrement = () => {
    setCounter(counter + 1)
  }


  useEffect(() => {
    const getCartData = async () => {
      const storedProductData = await getDataAsyncStorage('productData');
      if (storedProductData) {
        setProductData(storedProductData);
      }
      console.log("product data", (productData, null, 2));
    }
    getCartData();
  }, []);


  // Function to handle incrementing the quantity
  const handleIncrementQuantity = (productId, variantId, cartItemId) => {
    const updatedQuantities = { ...productQuantities };
    const product = cartItems.find(
      (item) =>
        item.productData._id === productId &&
        item.productData.frame_information.frame_variants.some(
          (variant) => variant._id === variantId
        ) &&
        item.orderSelections.selectedOptions.cartItemId
    );

    if (product) {
      const selectedVariant = product.productData.frame_information.frame_variants.find(
        (variant) => variant._id === variantId
      );

      if (selectedVariant) {
        const availableQuantity = selectedVariant.quantity;

        console.log(
          `Product: ${productId}, Variant: ${variantId}, cartItemId: ${cartItemId}, Available Quantity: ${availableQuantity}`
        );

        if (updatedQuantities[`${productId}_${variantId}_${cartItemId}`] < availableQuantity) {
          updatedQuantities[`${productId}_${variantId}_${cartItemId}`]++;
          setProductQuantities(updatedQuantities); // Update the state
        } else {
          // Show an alert if quantity exceeds available quantity
          alert('Quantity cannot exceed available quantity.');
        }
      }
    }
  };


  // Function to handle decrementing the quantity
  const handleDecrementQuantity = (productId, variantId, cartItemId) => {
    const updatedQuantities = { ...productQuantities };
    if (updatedQuantities[`${productId}_${variantId}_${cartItemId}`] > 1) {
      updatedQuantities[`${productId}_${variantId}_${cartItemId}`]--;
      setProductQuantities(updatedQuantities); // Update the state
    }
  };


  const calculateTotalPrice = () => {
    let totalCalculatedPrice = 0;

    for (const productId in productQuantities) {
      const keyParts = productId.split('_');
      if (keyParts.length === 3) {
        const product = cartItems.find(
          (item) =>
            item.productData._id === keyParts[0] &&
            item.productData.frame_information.frame_variants.some(
              (variant) => variant._id === keyParts[1]
            ) &&
            item.orderSelections.selectedOptions.cartItemId == keyParts[2]
        );

        if (product) {
          const productPrice = product.productData.priceInfo.price;
          totalCalculatedPrice = totalCalculatedPrice += productPrice * productQuantities[productId];
        }
      }
    }

    return totalCalculatedPrice;
  };

  const removeFromCart = async (productId, variantId, cartItemId) => {
    // Filter out the item to be removed from the cartItems state
    const updatedCartItems = cartItems.filter((item) => {
      const sameProductId = item.productData._id === productId;
      const sameVariantId = item.productData.frame_information.frame_variants.some(
        (variant) => variant._id === variantId
      );
      const sameCartItemId = item.orderSelections.selectedOptions.cartItemId === cartItemId
      return !(sameProductId && sameVariantId && sameCartItemId);
    });

    // Updating the cartItems state
    setCartItems(updatedCartItems);
    // Updating the async storage to reflect the changes
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setDeleted(!isDeleted)
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cart Items</Text>

      <View style={styles.cartContainer}>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <View key={index} style={styles.cartItemContainer}>
              <Image
                source={{ uri: API_URL + item.productData.frame_information.frame_variants[0].images[0] }}
                style={styles.productImage}
                resizeMode="contain"
              />

              <View style={styles.itemDetailsContainer}>

                <Text style={styles.productName}>{item.productData.name}</Text>
                {/* Additional item details */}
                <Text style={styles.price}>{`${item.productData.priceInfo.price} - ${item.productData.priceInfo.currency}`}</Text>

                <View style={styles.quantityContainer}>
                  {/* Quantity controls */}
                  <TouchableOpacity
                    onPress={() => handleDecrementQuantity(item.productData._id, item.productData.frame_information.frame_variants[0]._id, item.orderSelections.selectedOptions.cartItemId)}
                    style={styles.quantityButton}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>

                  <Text className="pl-3 pr-3 mr-1" style={styles.quantityText}>{productQuantities[`${item.productData._id}_${item.productData.frame_information.frame_variants[0]._id}_${item.orderSelections.selectedOptions.cartItemId}`]}</Text>

                  <TouchableOpacity
                    onPress={() => handleIncrementQuantity(item.productData._id, item.productData.frame_information.frame_variants[0]._id, item.orderSelections.selectedOptions.cartItemId)}
                    style={styles.quantityButton}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="ml-auto mr-1" onPress={() => removeFromCart(item.productData._id, item.productData.frame_information.frame_variants[0]._id, item.orderSelections.selectedOptions.cartItemId)}>
                    {/* <Text style={styles.removeButton}>X</Text> */}
                    <DeleteIcon name="trash" size={25} color="red" />
                  </TouchableOpacity>
                </View>

                {/* Remove from cart button */}

              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>Cart is empty</Text>
        )}
      </View>

      {/* Summary and checkout section */}
      <View style={styles.summaryContainer}>
        {/* Subtotal */}
        <View style={styles.summaryRow}>
          <Text>Subtotal</Text>
          <Text>${calculateTotalPrice().toFixed(2)}</Text>
        </View>

        {/* Shipping */}
        <View style={styles.summaryRow}>
          <Text>Shipping</Text>
          <Text>${shippingPrice}</Text>
        </View>

        <View style={styles.separator} />

        {/* Total */}
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <View>
            <Text style={styles.totalAmount}>${(calculateTotalPrice() + shippingPrice).toFixed(2)} USD</Text>
            <Text style={styles.totalNote}>including VAT</Text>
          </View>
        </View>

        {/* Checkout button */}
        <TouchableOpacity
          onPress={placeOrder}
          disabled={cartItems && cartItems.length < 1}
          style={[styles.checkoutButton, { backgroundColor: cartItems && cartItems.length < 1 ? '#ccc' : '#3498db' }]}
        >
          <Text style={styles.checkoutButtonText}>Check out</Text>
        </TouchableOpacity>

      </View>

      {/* Address Container */}
      <View className="bg-gray-50 rounded-md mt-10 p-10 shadow">
        <Text style={{ fontWeight: 'bold', color: '#4B5563', fontSize: 14 }}>
          {addresses.length > 0 ? "This is your default delivery address" : "No Shipping Address Added!"}
        </Text>

        {addresses.length > 0 ? (
          <>
            <Text style={{ fontWeight: '400', color: '#4B5563', marginBottom: 2 }}>Name: {addresses[0].firstName}</Text>
            <Text>{addresses[0].currentAddress}, {addresses[0].city}, {addresses[0].zipCode},</Text>
            <Text>{addresses[0].country},</Text>
            <Text>{addresses[0].phone}</Text>
          </>
        ) : (
          <Text>No Shipping Address Added!</Text>
        )}

        {/* <View style={{ paddingVertical: 4, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => console.log('Edit button pressed')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 2 }}>Edit</Text>
            </View>
          </TouchableOpacity>

          {addresses.length > 0 && (
            <TouchableOpacity onPress={() => deleteSpecificAddress(addresses[0]._id)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                <Text style={{ marginRight: 2 }}>Delete</Text>
              </View>
            </TouchableOpacity>
          )}
        </View> */}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: "#4B5563"
  },
  cartContainer: {
    marginTop: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#e0e0e0',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantityText: {
    fontSize: 16,
  },
  removeButton: {
    color: 'red',
    marginTop: 5,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 16,
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addressContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalNote: {
    fontSize: 12,
    color: 'gray',
  },
  checkoutButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default Cart;

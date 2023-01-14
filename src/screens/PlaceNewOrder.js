import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import {Colors} from '../constants/Colors';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from './URL';
import PushNotification from 'react-native-push-notification';

export default function PlaceNewOrder({navigation}) {
  const [value, setValue] = useState([]);
  const [labelinCart, setLabelinCart] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [dropdownBottles, setDropdownBottles] = useState();
  const [discount, setDiscount] = useState();
  const [dataToCreateInvoice, setDataToCreateInvoice] = useState();
  const [amount, setAmount] = useState();
  const [totalDiscount, setTotalDiscount] = useState();
  const [totalDueAmount, setTotalDueAmount] = useState();
  const [cartCounter, setCartCounter] = useState(0);

  const renderDropdownLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: Colors.primary}]}>
          Items List
        </Text>
      );
    }
    return null;
  };

  const getItemsList = async () => {
    try {
      const tokenGot = await AsyncStorage.getItem('token');
      const res = await axios.get(`${baseURL}products`, {
        headers: {
          Authorization: `Bearer ${tokenGot}`,
        },
      });
      // console.log(' list of', res.data);
      var dummyArray = res.data.product.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        product_id: p.id,
      }));

      // console.log('dataBottles', dataBottles);
      const dropDownValue = [];
      dummyArray.map((d, i) => {
        return dropDownValue.push({
          label: d.name,
          value: d.id,
          price: d.price,
          product_id: d.id,
        });
      });
      await setDropdownBottles(dropDownValue);
    } catch (error) {
      console.log(' Error while getting list of Items', error);
    }
  };

  const addToCart = item => {
    var dummydata = labelinCart.map(cartItem =>
      cartItem.product_id === item.product_id
        ? {
            product_id: cartItem.product_id,
            price: cartItem.price,
            label: cartItem.label,
            quantity: cartItem.quantity + 1,
            discount:
              ((cartItem.quantity + 1) * item.discount) / cartItem.quantity,
            total: (cartItem.quantity + 1) * cartItem.price,
          }
        : cartItem,
    );
    setLabelinCart(dummydata);

    var grandQuantity = 0;
    var grandAmount = 0;
    var grandDiscount = 0;

    dummydata.map(i => {
      grandQuantity = grandQuantity + i.quantity;
      grandAmount = grandAmount + i.quantity * i.price;
      grandDiscount = grandDiscount + i.discount;
    });
    setCartCounter(grandQuantity);
    setAmount(grandAmount);
    setTotalDiscount(grandDiscount);
    dueAmount(grandAmount, grandDiscount);

    // console.log(' data to sent  i am in addtoCard', dummydata);
    setDataToCreateInvoice(dummydata);
  };

  const removeFromCart = item => {
    // console.log('remove data from cart', item);
    var dummydata = labelinCart.map(cartItem =>
      cartItem.product_id === item.product_id
        ? {
            product_id: cartItem.product_id,
            price: cartItem.price,
            label: cartItem.label,
            quantity: cartItem.quantity - 1,
            discount:
              ((cartItem.quantity - 1) * item.discount) / cartItem.quantity,
            total: (cartItem.quantity - 1) * cartItem.price,
          }
        : cartItem,
    );
    setLabelinCart(dummydata);

    setLabelinCart(dummydata);

    var grandQuantity = 0;
    var grandAmount = 0;
    var grandDiscount = 0;

    dummydata.map(i => {
      grandQuantity = grandQuantity + i.quantity;
      grandAmount = grandAmount + i.quantity * i.price;
      grandDiscount = grandDiscount + i.discount;
    });
    setCartCounter(grandQuantity);
    setAmount(grandAmount);
    setTotalDiscount(grandDiscount);
    dueAmount(grandAmount, grandDiscount);

    // console.log(' data to sent  i am in remove from cart', dummydata);
    setDataToCreateInvoice(dummydata);
  };

  const getDiscount = async (x, y) => {
    let formData = new FormData();

    formData.append('product_id', x);
    formData.append('quantity', y);

    try {
      const tokenGot = await AsyncStorage.getItem('token');
      // console.log(' tken', tokenGot);
      const res = await axios.post(`${baseURL}product-discount`, formData, {
        headers: {
          Authorization: `Bearer ${tokenGot}`,
          'content-type': 'multipart/form-data',
        },
      });

      // console.log('ress in discount', res);

      await setDiscount(res.data.discount);
      return res.data.discount;
    } catch (error) {
      console.log(' Error while geting discount', error);
    }
  };

  const getTotalAmount = async () => {
    try {
      const tokenGot = await AsyncStorage.getItem('token');

      let formData = new FormData(); //formdata object

      const dataToSend = JSON.stringify(dataToCreateInvoice);
      // console.log('datatosend', dataToSend);

      formData.append('entries', dataToSend);

      //append the values with key, value pair
      console.log('formData', formData);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${tokenGot}`,
        },
      };
      const res = await axios.post(`${baseURL}order-invoice`, formData, config);

      console.log('responded', res);
    } catch (error) {
      console.log(' Error while calculating total', error);
    }
  };

  const dueAmount = (a, b) => {
    var total = a - b;
    setTotalDueAmount(total);
  };

  useEffect(() => {
    getItemsList();
  }, []);

  const handleNotifications = item => {
    PushNotification.localNotification({
      channelId: 'placeOrder-channel',
      title: 'Order Confirmation',
      message: 'Your order has been created successfully',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paymentTitle}>Place New Order</Text>
      <View style={styles.cartContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cartTitleView}>
            <Text style={styles.cartTitle}>My Cart</Text>
            <Image
              source={require('../constants/Images/cart.png')}
              style={{
                height: 40,
                width: 40,
                borderRadius: 25,
              }}
            />
          </View>
          <View style={styles.containerDropdown}>
            {renderDropdownLabel()}

            {/* {console.log('data', dropdownBottles)} */}
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {borderColor: Colors.primary},
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={dropdownBottles}
              search
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Items' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={async item => {
                // console.log('items ', item.product_id);
                const dis = await getDiscount(item.product_id, 1);
                var arrayIndex = dropdownBottles.indexOf(item);
                if (arrayIndex > -1) {
                  // only splice array when item is found
                  dropdownBottles.splice(arrayIndex, 1); // 2nd parameter means remove one item
                }

                setDropdownBottles(dropdownBottles);

                setIsFocus(false);

                //start of the array that has to be sent for create invoice
                // labelinCart is the name of that array that we received at first when first item is created
                //dummydata is the array that has to be manipulated for many times

                //labelinCart is initially null. so that's why else case will run at first
                var dummydata = labelinCart;
                const existingCartItem = labelinCart.find(
                  cartItem => cartItem.value === item.value,
                );

                if (existingCartItem) {
                  dummydata = labelinCart.map(async cartItem =>
                    cartItem.value === item.value
                      ? {
                          product_id: cartItem.productId,
                          label: cartItem.label,
                          price: cartItem.price,
                          quantity: cartItem.quantity + 1,
                          discount: cartItem.quantity * dis,
                          total: (cartItem.quantity + 1) * cartItem.price,
                        }
                      : cartItem,
                  );
                } else {
                  dummydata = [
                    ...labelinCart,
                    {
                      product_id: item.product_id,
                      label: item.label,
                      price: item.price,
                      quantity: 1,
                      discount: dis,
                      total: item.price,
                    },
                  ];
                }

                setLabelinCart(dummydata);

                console.log(' data to sent  i am in onChange', dummydata);
                var grandQuantity = 0;
                var grandAmount = 0;
                var grandDiscount = 0;

                dummydata.map(i => {
                  setCartCounter((grandQuantity = grandQuantity + i.quantity));
                  setAmount((grandAmount = grandAmount + i.quantity * i.price));
                  setTotalDiscount(
                    (grandDiscount = grandDiscount + i.discount),
                  );
                });
                dueAmount(grandAmount, grandDiscount);

                setDataToCreateInvoice(dummydata);
              }}
            />
          </View>
        </ScrollView>
        {/* {console.log(' data in array', labelinCart)} */}
        {labelinCart.length > 0 ? (
          <>
            {labelinCart.map(d => (
              // console.log(' data in d', d),
              <View style={styles.bottomCartContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: Colors.primary,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    {d.label}
                  </Text>
                  <Text style={{marginLeft: 130}}>
                    /R.S {d.quantity === 1 ? d.price : d.total}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginLeft: 5,
                  }}>
                  <Text> Discount</Text>
                  <Text style={{marginLeft: 10}}>
                    {d.discount ? d.discount : 0}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                      marginRight: 30,
                      // marginTop: 20,
                    }}>
                    {d.quantity > 1 ? (
                      <Pressable
                        style={styles.iconContainer}
                        onPress={() => removeFromCart(d)}>
                        <Image
                          source={require('../constants/Images/minus.png')}
                          style={{height: 20, width: 20, marginTop: 5}}
                        />
                      </Pressable>
                    ) : (
                      <Pressable
                        disabled={true}
                        style={styles.iconContainer}
                        // onPress={() => removeFromCart(d)}
                      >
                        <Image
                          source={require('../constants/Images/minus.png')}
                          style={{height: 20, width: 20, marginTop: 5}}
                        />
                      </Pressable>
                    )}
                    <View>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        {' '}
                        {d.quantity}{' '}
                      </Text>
                    </View>
                    <Pressable
                      style={styles.iconContainer}
                      onPress={() => addToCart(d)}>
                      <Image
                        source={require('../constants/Images/plus.png')}
                        style={{height: 20, width: 20, marginTop: 5}}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
            <View style={styles.bottomData}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 90}}>Total Items in cart :</Text>
                <Text>{cartCounter}</Text>
              </View>
            </View>
            <View style={styles.bottomData}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 110}}>Total Amount :</Text>
                <Text>{amount}</Text>
              </View>
            </View>
            <View style={styles.bottomData}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 140}}>Discount : </Text>
                <Text>{totalDiscount}</Text>
              </View>
            </View>
            <View style={styles.bottomData}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 40}}>Due Amount : </Text>
                <Text style={{marginLeft: 80}}> {totalDueAmount} </Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.bottomCartContainer}>
            <Text
              style={{
                color: Colors.primary,
                fontWeight: 'bold',
                marginLeft: 20,
              }}>
              Please select an item
            </Text>
          </View>
        )}
        <Pressable
          style={styles.btn}
          onPress={async () => {
            await getTotalAmount();
            handleNotifications();
          }}>
          <Text
            style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
            {' '}
            Check Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: 40,
  },
  header: {
    alignItems: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    paddingHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  cartTitleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartTitle: {
    fontSize: 25,
    fontWeight: '700',
    marginLeft: 10,
    marginRight: '60%',
  },
  containerDropdown: {
    backgroundColor: 'white',
    padding: 26,
  },
  dropdown: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.primary,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  bottomCartContainer: {
    flex: 1,
    backgroundColor: Colors.dim,
    paddingVertical: 20,
    borderRadius: 10,
    // flexDirection: 'row',
    borderBottomColor: Colors.dom,
    marginBottom: 5,
    elevation: 3,
  },
  iconContainer: {
    // flex: 1,
    // width: 15,
    // height: 15,
    // marginLeft: 20,
    justifyContent: 'flex-end',
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    margin: 40,
  },
  bottomData: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderColor: Colors.dim,
    borderRadius: 10,
  },
});

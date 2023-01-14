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
  // const [valuePost, setValuePost] = useState([]);
  const [labelinCart, setLabelinCart] = useState([]);
  // const [labelinCartPost, setLabelinCartPost] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [dataBottles, setDataBottles] = useState([]);
  const [dropdownBottles, setDropdownBottles] = useState();
  const [cartCounter, setCartCounter] = useState(0);
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [dataToCreateInvoice, setDataToCreateInvoice] = useState();
  const [amount, setAmount] = useState();
  const [discountAsQuantity, setDiscountAsQuantity] = useState();

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
      console.log(' list of', res.data);
      var dummyArray = res.data.product.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        product_id: p.id,
      }));
      // console.log('dummyArray in get items list', dummyArray);
      await setDataBottles(dummyArray);

      // console.log('dataBottles', dataBottles);
      const dropDownValue = [];
      {
      }
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
    console.log('data to add', labelinCart);
    var dummydata = labelinCart.map(cartItem =>
      cartItem.product_id === item.product_id
        ? {
            product_id: cartItem.product_id,
            price: cartItem.price,
            quantity: cartItem.quantity + 1,
            // discount: 0,
            total: 0,
            // total: (cartItem.quantity + 1) * cartItem.price,
          }
        : cartItem,
    );
    setLabelinCart(dummydata);
    var sumItems = 0;
    // var totalDiscount = 0;
    dummydata.map(i => {
      sumItems = sumItems + i.quantity * i.price;
      totalPricePerItem = sumItems;
      // totalDiscount = totalDiscount + i.quantity * discount;
      // discountOnQuantity = totalDiscount;
    });

    var totalQuantities = 0;
    var totalPricePerItem;
    let productId;
    dummydata.map(i => {
      totalQuantities = totalQuantities + i.quantity;
      productId = i.value;
    });

    setCartCounter(totalQuantities);
    setPrice(totalPricePerItem);
    setValue(productId);
    // setDiscountAsQuantity(totalDiscount);
    getDiscount(item.value, totalQuantities);
    // console.log('dummyDatasum', cartCounter);
    // console.log(' Vale id', productId);
    console.log(' data to create invoic in add to cart', dummydata);

    setDataToCreateInvoice(dummydata);
  };

  const removeFromCart = item => {
    console.log('remove data from cart', item);
    var dummydata = labelinCart.map(cartItem =>
      cartItem.product_id === item.product_id
        ? {
            product_id: cartItem.product_id,
            price: cartItem.price,

            quantity: cartItem.quantity - 1,
            // discount: 0,
            total: 0,
            // total: (cartItem.quantity - 1) * cartItem.price,
          }
        : cartItem,
    );
    setLabelinCart(dummydata);

    var subItems = 0;
    // var totalDiscount = 0;
    dummydata.map(i => {
      subItems = subItems + i.quantity * i.price;
      totalPricePerItem = subItems;
      // totalDiscount = totalDiscount + i.quantity * discount;
      // discountOnQuantity = totalDiscount;
    });

    var totalQuantities = 0;
    var totalPricePerItem;
    let productId;
    dummydata.map(i => {
      totalQuantities = totalQuantities + i.quantity;
      productId = i.value;
    });

    setCartCounter(totalQuantities);
    setPrice(totalPricePerItem);
    setValue(productId);
    // setDiscountAsQuantity(totalDiscount);
    getDiscount(item.value, totalQuantities);

    // console.log('dummyDatasubtraction', cartCounter);
    // console.log('remove data', dummydata);
    // console.log(' Vale id', productId);
    console.log(' data to create invoic in remove to cart', dummydata);

    setDataToCreateInvoice(dummydata);
  };

  const getDiscount = async (x, y) => {
    let formData = new FormData();

    formData.append('product_id', x);
    formData.append('quantity', y);

    const postData = {
      product_id: x,
      quantity: y,
    };
    try {
      const tokenGot = await AsyncStorage.getItem('token');
      // console.log(' tken', tokenGot);
      const res = await axios.post(`${baseURL}product-discount`, formData, {
        headers: {
          Authorization: `Bearer ${tokenGot}`,
          'content-type': 'multipart/form-data',
        },
      });

      console.log('ress', res);

      await setDiscount(res.data.discount);
      // var discountValue = () => discount;
      // console.log('discount aftr promis', discount);
      // console.log('discount aftr promis', discountValue);

      // console.log(' Discount value ', res.data.discount);
    } catch (error) {
      console.log(' Error while geting discount', error);
    }
  };

  const getTotalAmount = async () => {
    try {
      const tokenGot = await AsyncStorage.getItem('token');

      let formData = new FormData(); //formdata object

      // console.log(dataToCreateInvoice);
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

      // axios.post(url, formData, config)
      //     .then(response => {
      //         console.log(response);
      //     })
      //     .catch(error => {
      //         console.log(error);
      //     });
      const res = await axios.post(`${baseURL}order-invoice`, formData, config);

      console.log('responded', res);

      // setDiscount(res.data.invoice.entries.map(i => i.discount_amount));
    } catch (error) {
      console.log(' Error while calculating total', error);
    }
  };

  useEffect(() => {
    getItemsList();
  }, []);

  let amountTobePaid =
    price - (discountAsQuantity ? discountAsQuantity : discount);

  const handleNotifications = item => {
    PushNotification.localNotification({
      channelId: 'placeOrder-channel',
      title: 'Order Confirmation',
      message: 'Your order has been created successfully',
    });
  };

  // console.log('Data', dropdownBottles)
  // console.log(' Label in cart', labelinCart.quantity * price);
  // console.log('cart counter', cartCounter);
  // console.log('cart items id', value);

  // console.log('Data items', dataBottles);
  // console.log(' price of item', price);
  // console.log(' Value ', value);
  // console.log(' discount on quanity', discountAsQuantity);
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
                // console.log('items ', item);
                // console.log('id befor discount', item.value);
                // discount ? discount : await getDiscount(item.value, 1);

                var valueArray = [];
                valueArray.push(item.value);
                await setValue(valueArray);
                setIsFocus(false);

                var dummydata = labelinCart;
                // console.log(' Dummy data', dummydata);
                console.log(' discount at first time', discount);

                const existingCartItem = labelinCart.find(
                  cartItem => cartItem.value === item.value,
                );

                if (existingCartItem) {
                  dummydata = labelinCart.map(async cartItem =>
                    cartItem.value === item.value
                      ? {
                          product_id: cartItem.productId,
                          price: cartItem.price,
                          quantity: cartItem.quantity + 1,
                          total: 0,
                          // total: (cartItem.quantity + 1) * cartItem.price,
                        }
                      : cartItem,
                  );
                } else {
                  // console.log('labelincart', dummydata);
                  // dummydata &&
                  //   dummydata.map(
                  //     async i => await getDiscount(i.product_id, i.quantity),
                  //     console.log('discount in map', discount),
                  //   ),
                  console.log(' discount in else case', discount);
                  dummydata = [
                    ...labelinCart,
                    {
                      product_id: item.product_id,
                      price: item.price,
                      quantity: 1,
                      total: 0,
                      // total: item.price,
                    },
                  ];
                }

                setLabelinCart(dummydata);
                // console.log('dummy data in item', dummydata);
                var tempSum = 0;
                let pricePerItem;
                // var totalDiscount = 0;
                dummydata.map(i => {
                  // console.log('i in array', i.price);
                  // console.log('i in quanitity', i.quantity);
                  tempSum = tempSum + i.quantity * i.price;
                  pricePerItem = tempSum;
                  // totalDiscount = totalDiscount + i.quantity * discount;
                });

                var totalQuantities = 0;
                let productId;
                dummydata.map(i => {
                  totalQuantities = totalQuantities + i.quantity;
                  productId = i.value;
                });

                await setCartCounter(totalQuantities);
                setPrice(pricePerItem);
                await setValue(productId);
                // setDiscountAsQuantity(totalDiscount);
                await getDiscount(item.value, totalQuantities);

                // const finalReceipt = [];
                // dummydata.map(i => {
                //   // console.log('data recv', i.price);
                //   return finalReceipt.push(
                //     // price= i.price* i.quantity,
                //     // product_id = i.product_id
                //     (discount = 10),
                //     (total = 500),
                //   );
                // });
                console.log(' data to sent ', dummydata);
                // console.log(' data of final receipt', finalReceipt);
                await setDataToCreateInvoice(dummydata);
              }}
            />
          </View>
        </ScrollView>
        {/* {console.log(' data in array', labelinCart)} */}
        {labelinCart.length > 0 ? (
          <>
            {labelinCart.map(d => (
              //  console.log(' data in d', cart),
              <View style={styles.bottomCartContainer}>
                <Text
                  style={{
                    color: Colors.primary,
                    fontWeight: 'bold',
                    marginLeft: 10,
                  }}>
                  {d.label}
                </Text>
                <Text style={{marginRight: 40}}>/R.S {d.price}</Text>
                <Pressable
                  style={styles.iconContainer}
                  onPress={() => removeFromCart(d)}>
                  <Image
                    source={require('../constants/Images/minus.png')}
                    style={{height: 20, width: 20, marginTop: 5}}
                  />
                </Pressable>
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
                <Text>{price}</Text>
              </View>
            </View>
            <View style={styles.bottomData}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 140}}>Discount : </Text>
                {console.log('discount', discount)}
                {console.log('discount As quantity', discountAsQuantity)}
                <Text>
                  {discountAsQuantity ? discountAsQuantity : discount}
                </Text>
              </View>
            </View>
            <View style={styles.bottomData}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 40}}>
                  Total Amount to be paid :{' '}
                </Text>
                <Text>{amountTobePaid} </Text>
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
            // console.log('Navgigation COmp', navigation.navigate);
            // navigation.goBack();
            // console.log(' data to sent', valuePost, labelinCartPost);
            // console.log(' value to post', valuePost, labelinCartPost);
            // getDiscount(dataToCreateInvoice);
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
    flexDirection: 'row',
  },
  iconContainer: {
    flex: 1,
    width: 15,
    height: 15,
    // marginLeft: 20,
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

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import baseURL from '../../core/URL';
import Moment from 'moment';

Moment.locale('en');
export default function OrdersHistory(navigation) {
  const [orderHistory, setOrderHistory] = useState();

  // console.log('orderhistorynav', navigation.navigation);
  // console.log('Tokam rcvd', props.tokenSent);

  const getOrderHistory = async () => {
    try {
      const tokenGot = await AsyncStorage.getItem('token');
      const res = await axios.get(`${baseURL}transaction`, {
        headers: {
          Authorization: `Bearer ${tokenGot}`,
        },
      });
      setOrderHistory(res.data.transaction);
      // console.log(' get Data in token', res.data);
      // console.log(' response', res.data.transaction);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getOrderHistory();
  }, []);
  // console.log(' Async Data', await AsyncStorage.getItem('token'));
  // console.log(' To print quantity', navigation);
  // console.log('Order History', OrdersHistory);
  return (
    <View style={styles.container}>
      {orderHistory &&
        orderHistory.map((i, d) => {
          return (
            <View style={styles.cardContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigation.navigate('OrderInvoice', {
                    dataToSent: i,
                    nav: navigation,
                  })
                }>
                <Text
                  style={{
                    padding: 10,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Invoice # : {i.invoice_no}
                </Text>
                <View style={styles.cardInner}>
                  <Text style={styles.textTitle}>Order Date :</Text>
                  <Text style={{marginLeft: '2%', marginRight: '5%'}}>
                    {Moment(i.order_date).format('DD MMM YYYY')}
                  </Text>
                  <Text style={[styles.textTitle, {marginLeft: 30}]}>
                    Total Amount :
                  </Text>
                  <Text style={{marginLeft: '2%'}}>{i.sum_invoice_amount}</Text>
                </View>
                <View style={styles.cardInner}>
                  <Text style={styles.textTitle}>Schedule Date :</Text>
                  <Text style={{marginLeft: '2%', marginRight: '5%'}}>
                    {Moment(i.schedule_datetime).format('DD MMM YYYY')}
                  </Text>
                  <Text style={[styles.textTitle, {marginLeft: 10}]}>
                    Paid Amount :
                  </Text>
                  <Text style={{marginLeft: '2%'}}>{i.cash_received}</Text>
                </View>
                <View style={styles.cardInner}>
                  <Text style={styles.textTitle}>Delivered Date :</Text>
                  <Text style={{marginLeft: '2%', marginRight: '5%'}}>
                    {Moment(i.delivery_date).format('DD MMM YYYY')}
                  </Text>
                  <Text style={[styles.textTitle, {marginLeft: 10}]}>
                    Bottle Returned :
                  </Text>
                  <Text style={{marginRight: '2%'}}>{i.bottle_returned}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cardContainer: {
    flex: 1,
    width: '95%',
    borderColor: Colors.border,
    // borderWidth: 1,
    borderRadius: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: Colors.dim,
  },
  textTitle: {
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft: 5,
    // marginBottom: 5,
  },
  cardInner: {
    flexDirection: 'row',
    // margin: 5,
    marginBottom: 5,
  },
});

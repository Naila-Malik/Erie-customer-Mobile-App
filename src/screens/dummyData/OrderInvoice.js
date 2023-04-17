import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';
import Moment from 'moment';

Moment.locale('en');
export default function OrderInvoice({navigation, route}) {
  const {dataToSent, nav} = route.params;

  // console.log(' data rcvd', dataToSent.customer_branch.branch_name);

  // console.log(' data dummy', dataToSent);
  // console.log('navigation rcvd', nav);
  return (
    <View style={styles.containerMain}>
      <View style={styles.InnerContainer}>
        <View style={styles.dataContainerHeader}>
          <Text style={styles.InnerHeader}>
            Invoice # {dataToSent.invoice_no}
          </Text>
        </View>
        <View style={styles.dataHeaderPart}>
          <Text style={styles.dataContainerCard}>Customer : </Text>
          <Text style={{marginLeft: '40%'}}>
            {' '}
            {dataToSent.customer_branch.branch_name}{' '}
          </Text>
        </View>
        <View style={styles.dataHeaderPart}>
          <Text style={styles.dataContainerCard}>Phone # : </Text>
          <Text style={{marginLeft: '50%'}}>
            {' '}
            {dataToSent.customer_branch.contact_no}{' '}
          </Text>
        </View>
        <View style={styles.dataHeaderPart}>
          <Text style={styles.dataContainerCard}>Address : </Text>
          <Text style={{marginLeft: '50%'}}>
            {' '}
            {dataToSent.customer_branch.new_address}{' '}
          </Text>
        </View>
        <View style={styles.dataHeaderPart}>
          <Text style={styles.dataContainerCard}>Order Date : </Text>
          <Text style={{marginLeft: '40%'}}>
            {' '}
            {Moment(dataToSent.order_date).format('DD MMM YYYY')}{' '}
          </Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.textHeader}>Item</Text>
            <Text style={styles.textHeader}>Qty</Text>
            <Text style={styles.textHeader}>Price </Text>
          </View>
          <View style={styles.textBody}>
            <Text> {dataToSent.entries.map(i => i.product.name)}</Text>
            <Text> {dataToSent.entries.map(i => i.quantity)}</Text>
            <Text> {dataToSent.entries.map(i => i.product_price)}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Total Amount : </Text>
          <Text style={styles.bottomText}>
            {' '}
            {dataToSent.entries.map(i => i.amount)}{' '}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Discount : </Text>
          <Text style={styles.bottomText}>
            {' '}
            {dataToSent.entries.map(i => i.discount_amount)}{' '}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Due Price : </Text>
          <Text style={styles.bottomText}>0</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Invoice Balance : </Text>
          <Text style={styles.bottomText}>0</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Arrears : </Text>
          <Text style={styles.bottomText}>0</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate('UserHomePage')}>
            <Text style={{color: 'white', fontWeight: 'bold'}}> Close</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: Colors.dim,
  },

  InnerContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
    marginBottom: 30,
    width: '90%',
    marginLeft: 20,
    borderRadius: 3,
  },
  InnerHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },

  dataContainerHeader: {
    flexDirection: 'row',
    margin: 10,
    paddingVertical: 10,
    marginTop: 5,
  },
  data: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dim,
    width: '80%',
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  dataContainerCard: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 20,
  },
  dataHeaderPart: {
    marginBottom: 10,
    width: '80%',
    flexDirection: 'row',
  },
  tableContainer: {
    width: '90%',
    margin: 20,
    marginTop: 50,
    marginBottom: 50,
    borderBottomColor: Colors.dim,
    borderBottomWidth: 1,
  },
  tableHeader: {
    backgroundColor: Colors.dim,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.dim,
  },
  tableBody: {
    backgroundColor: 'white',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  bottomContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dim,
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomText: {
    margin: 5,
    fontWeight: 'bold',
  },
});

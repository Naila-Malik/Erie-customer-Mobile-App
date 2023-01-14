
import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar, Image, PermissionsAndroid, Alert
} from 'react-native';
import { theme } from '../core/theme'
import { Text, Paragraph, Dialog, ToggleButton, Subheading, Button, Divider, Portal, Headline } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Geolocation from 'react-native-geolocation-service'
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown'

const OrderDelivery = ({ route, navigation }) => {
  // const { id, customer_branch, items } = route.params

  const [actualBottle, setActualBottle] = useState(items.reduce((carry, item) => carry = carry + item.bottle_qty, 0));
  const [bottle, setBottle] = useState(items.reduce((carry, item) => carry = carry + item.bottle_qty, 0));
  const [returnedBottle, setReturnedBottle] = useState(0);
  const [amount, setAmount] = useState(actualBottle * items[0].bottle_rate);
  const [remarks, setRemarks] = useState('');
  const [visible, setVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [snack, setSnack] = useState(false);
  const [snackmsg, setSnackmsg] = useState();
  const [status, setStatus] = useState(1);
  const [reasons, setReasons] = useState([]);
  const [reason, setReason] = useState('');
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')

  useEffect(() => {

    navigation.addListener('focus', () => {
      getLiveLocation();
      getReasons()
    });
    setAmount(actualBottle * items[0].bottle_rate)

  }, [status, actualBottle]);

  const getReasons = async () => {
    setVisible(true)
    await axios.post(`reasons`)
      .then(({ data }) => {
        setVisible(false)
        // console.log('your data is', data.data.reasons)
        setReasons(data.data.reasons)
      })
      .catch(error => {
        setVisible(false)
        console.error(error)
      })
  }
  const showDialog = () => setShowPopup(true);

  const hideDialog = () => setShowPopup(false);

  const deliverOrder = async () => {
    // console.log('updated value is ', reason)
    hideDialog()
    if (!lat) {
      setSnack(true)
      setSnackmsg('Please check location permission')
      return
    }
    if (status == 1) {
      if (!actualBottle) {
        setSnack(true)
        setSnackmsg('enter actual bottle')
        return
      }
      if (!returnedBottle) {
        setSnack(true)
        setSnackmsg('Please check returned bottles')
        return
      }
      if (!amount && amount >= 0) {
        setSnack(true)
        setSnackmsg('Please enter amount')
        return
      }

    } else {
      if (reason == undefined || reason == null || reason == '') {
        setSnack(true)
        setSnackmsg('Please check reason')
        return
      }


    }

    setVisible(true)
    await axios.post(`complete-delivery-order/${id}`, {
      status: status,
      actual_bottle_qty: status == 1 ? actualBottle : null,
      returned_bottle_qty: status == 1 ? returnedBottle : null,
      cash_received: status == 1 ? amount : null,
      latitude: String(lat),
      longitude: String(long),
      reason: status == 1 ? null : reason,
      remarks: status == 1 ? null : remarks
    })
      .then(({ data }) => {
        setVisible(false)

        // console.log('your data is', data.data)
        // if (data.data.status == 4) {
        navigation.navigate('Orders')
        // }
      })
      .catch(error => {
        hideDialog()
        setVisible(false)
        // console.error(error.response.data.errors)
        setSnack(true)
        setSnackmsg('Please enter vailed amount')
      })
  }

  const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const cords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(cords);
        },
        error => {
          reject(alert('Fetching location failed please check your location is on?'));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });

  const locationPermission = () =>
    new Promise(async (resolve, reject) => {
      if (Platform.OS === 'ios') {
        try {
          const permissionStatus = await Geolocation.requestAuthorization(
            'whenInUse'
          );
          if (permissionStatus === 'granted') {
            return resolve('granted');
          }
          reject('Permission not granted');
        } catch (error) {
          return reject(error);
        }
      }
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted');
          }
          return reject('Location Permission denied');
        })
        .catch(error => {
          console.log('Ask Location permission error: ', error);
          return reject(error);
        });
    });


  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      setVisible(true)
      const { latitude, longitude } = await getCurrentLocation();
      setVisible(false)
      setLat(latitude)
      setLong(longitude)

    }
  };

  return (
    <View style={styles.container}>

      <View style={{ backgroundColor: '#fff', padding: 20 }}>
        {/* <View >
          <Text style={styles.nameTxt}>{customer_branch.complete_name.toUpperCase()}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="location-pin" color={theme.colors.secondry} size={15} />
            <Text style={styles.locationTxt}>{customer_branch.new_address || null}, {customer_branch.town.name || null}</Text>
          </View>
        </View> */}

        {/* <View style={{ flexDirection: 'row', marginVertical: 15 }}>
          <TouchableOpacity onPress={() => setStatus(1)} style={status == 1 ? styles.activeBtn : styles.inActiveBtn}>
            <Text style={status == 1 ? styles.activeButtonTxt : styles.inActiveBtnTxt}>DELIVERED</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStatus(0)} style={status == 0 ? styles.activeBtn : styles.inActiveBtn}>
            <Text style={status == 0 ? styles.activeButtonTxt : styles.inActiveBtnTxt}>NOT DELIVERED</Text>
          </TouchableOpacity>
        </View> */}
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.order}>
            <Text style={styles.orderTxtHadding}>Receiveable</Text>
            <Text style={styles.orderTxt}> {customer_branch.sum_sale - customer_branch.sum_receipts}</Text>
          </View>
          <View style={styles.order}>
            <Text style={styles.orderTxtHadding}>Schedule Quantity</Text>
            <Text style={styles.orderTxt}>{items[0].bottle_qty}</Text>
          </View>
        </View> */}


        <View>
          <View style={{
            marginVertical: 15,
            justifyContent: 'center',
          }}>
            <View style={styles.bottleSection}>
              <Text style={styles.tripOverViewHadding}>Acutal Bottle</Text>
              <Text style={styles.tripOverViewTxt}>{actualBottle}</Text>
            </View>
            <View style={styles.bottleSection}>
              <Text style={styles.tripOverViewHadding}>Returned Bottle</Text>
              <Text style={styles.tripOverViewTxt}>{returnedBottle}</Text>
            </View>
            <View style={styles.bottleSection}>
              <Text style={styles.tripOverViewHadding}>Net Amount</Text>
              <Text style={styles.tripOverViewTxt}>{`${actualBottle * (items[0].bottle_rate)}`}</Text>
            </View>
            <View style={styles.amountSection}>
              <Text style={styles.tripOverViewHadding}>Paid Amount</Text>
              <TextInput style={styles.action}
                keyboardType={'numeric'}
                defaultValue={`${actualBottle * (items[0].bottle_rate)}`}
                onChangeText={val => setAmount(val)}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
            <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.secondry, fontWeight: 'bold', paddingBottom: 5 }}>Actual Bottle</Text>
              <TouchableOpacity onPress={() => setActualBottle(actualBottle + 1)}>
                <Entypo name="squared-plus" color={theme.colors.primary} size={50} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActualBottle(actualBottle > 0 ? actualBottle - 1 : 0)}>
                <Entypo name="squared-minus" color={theme.colors.primary} size={50} />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', }}>
              <Image style={{ width: 70, height: 110, alignSelf: 'center' }}
                source={require('../assets/bottle-2.png')} /></View>
            <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: theme.colors.secondry, fontWeight: 'bold', paddingBottom: 5 }}>Return Bottle</Text>
              <TouchableOpacity onPress={() => setReturnedBottle(returnedBottle + 1)}>
                <Entypo name="squared-plus" color={theme.colors.primary} size={50} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setReturnedBottle(returnedBottle > 0 ? returnedBottle - 1 : 0)}>
                <Entypo name="squared-minus" color={theme.colors.primary} size={50} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={deliverOrder}
          style={styles.signInBtn}>
          <Text style={styles.textSignBtn}>COMPLETE  ORDER</Text>
        </TouchableOpacity>
      </View>
      <Dialog visible={visible}>
        <Dialog.Content>
          <Paragraph>Please wait...</Paragraph>
        </Dialog.Content>
      </Dialog>
      <Portal>
        <Dialog visible={showPopup} >
          <Dialog.Title>Do you want to complete your order?</Dialog.Title>
          <Dialog.Content>
            <Subheading>Paid amount <Headline>{amount || 0}</Headline></Subheading>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>CANCEL</Button>
            <Button onPress={deliverOrder}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar
        visible={snack}
        onDismiss={() => setSnack(false)}
        duration={1000}>
        {snackmsg}
      </Snackbar>
    </View>
  );
};

export default OrderDelivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  lable: {
    paddingVertical: 20,
    fontWeight: 'bold'
  },
  action: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    width: 60,
    height: 40,
    borderRadius: 2,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'right',
    color: theme.colors.primary,
  },
  actionArea: {
    borderWidth: 1,
    paddingBottom: 5,
    borderRadius: 5,
    textAlignVertical: 'top',
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },

  signInBtn: {
    height: 40,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  textSignBtn: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  nameTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.colors.primary,
  },
  locationTxt: {
    fontSize: 11,
  },
  bottleSection: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 2,
    elevation: 1,
    marginBottom: 5
  },
  amountSection: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 10,
    borderRadius: 2,
    elevation: 1,
  },
  tripOverViewHadding: {
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: theme.colors.black,
    // paddingRight: 20,
  },
  tripOverViewTxt: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    fontSize: 18,
    textAlign: 'right',
    color: theme.colors.primary
  },
  headerTxt: {
    fontSize: 18,
    color: '#fff',
  },
  order: {
    flex: 1,
    margin: 2,
    padding: 10,
    // backgroundColor: theme.colors.secondry,
    borderRadius: 5
  },
  orderTxtHadding: {
    fontSize: 11,
    textAlign: 'center',
    color: theme.colors.black,
    paddingRight: 20,
  },
  orderTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingRight: 20,
    color: theme.colors.primary
  },
  activeBtn: {
    flex: 1,
    height: 45,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
  },
  inActiveBtn: {
    flex: 1,
    height: 45,
    backgroundColor: theme.colors.background_Light,
    justifyContent: 'center',
  },
  activeButtonTxt: {
    color: theme.colors.default,
    textAlign: 'center',
    fontSize: 14,
  },
  inActiveBtnTxt: {
    color: theme.colors.black,
    textAlign: 'center',
    fontSize: 10,
  },

  dropdownButton: {
    width: '89%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.secondry,
    width: '100%',
  },
  buttonTextStyle: {
    color: theme.colors.default,
  },
});

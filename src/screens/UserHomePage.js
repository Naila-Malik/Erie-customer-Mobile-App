import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Colors} from '../constants/Colors';
import Slideshow from 'react-native-image-slider-show';
import PlaceNewOrder from './PlaceNewOrder';
import OrdersHistory from './OrdersHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dataSource = [
  {
    url: 'https://cdn.pixabay.com/photo/2012/03/01/00/31/water-19659_960_720.jpg',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2014/12/24/05/02/drop-of-water-578897_960_720.jpg',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2013/07/19/00/18/splashing-165192_960_720.jpg',
  },
];
export default function UserHomePage({navigation}) {
  const [customerName, setCustomerName] = useState();
  const [position, setPosition] = useState(0);

  // console.log('navigation', navigation);
  const [visible, setVisible] = useState(false);

  // console.log(" data while verify otp", data);
  const name = async () => {
    const nameUser = await AsyncStorage.getItem('userName');
    setCustomerName(nameUser);
  };
  useEffect(() => {
    name();
    const toggle = setInterval(() => {
      setPosition(position === dataSource.length - 1 ? 0 : position + 1);
    }, 3000);

    return () => clearInterval(toggle);
  }, []);

  console.log('posssssitionnon', position);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, backgroundColor: Colors.background_Light}}>
      <View style={styles.header}>
        <View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Image
              source={require('../constants/Images/avatarUser.png')}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
            <View style={{marginLeft: '78%'}}>
              <Image
                source={require('../constants/Images/bell.png')}
                style={{height: 26, width: 26, borderRadius: 25}}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}> Greetings! </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
              {customerName}
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 20, color: Colors.primary}}>
            {' '}
            Have a nice day!{' '}
          </Text>
        </View>
      </View>
      <View style={styles.slider}>
        <Slideshow
          position={position}
          dataSource={dataSource}
          onPositionChanged={position => setPosition(position)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 20,
          }}>
          <Button
            // icon="camera"
            style={{marginRight: 10, marginLeft: 3}}
            mode="contained"
            buttonColor={Colors.primary}
            onPress={() => setVisible('order')}>
            Place Order
          </Button>
          <Button
            // icon="camera"
            mode="contained"
            style={{paddingHorizontal: 20}}
            buttonColor={Colors.primary}
            onPress={() => setVisible('history')}>
            History
          </Button>
        </View>
      </View>
      <View style={{flex: 1}}>
        {visible === 'history' ? (
          <OrdersHistory navigation={navigation} />
        ) : visible === 'order' ? (
          <PlaceNewOrder navigation={navigation} />
        ) : (
          <View style={styles.container}>
            <View style={styles.boxContainer}>
              <View style={styles.innerBox}>
                <Text style={styles.data}> Bottle Cap </Text>
                <Image
                  source={require('../constants/Images/bottle-Capped.png')}
                  style={{height: 30, width: 30, marginLeft: '30%'}}
                />
                <Text style={styles.bottomData}> 2 </Text>
              </View>
              <View style={styles.innerBox}>
                <Text style={styles.data}>Last Transaction Date</Text>
                <Image
                  source={require('../constants/Images/arrows.png')}
                  style={{height: 30, width: 30, marginLeft: '35%'}}
                />
                <Text style={styles.bottomData}> 22, Dec </Text>
              </View>
              <View style={styles.innerBox}>
                <Text style={styles.data}> Schedule Days</Text>
                <Image
                  source={require('../constants/Images/calendar.png')}
                  style={{height: 30, width: 30, marginLeft: '30%'}}
                />
                <Text style={styles.bottomData}> Fri, Sat</Text>
              </View>
            </View>
            <View style={styles.boxContainer}>
              <View style={styles.innerBox}>
                <Text style={styles.data}> Payable </Text>
                <Image
                  source={require('../constants/Images/cash.png')}
                  style={{height: 30, width: 50, marginLeft: '30%'}}
                />
                <Text style={styles.bottomData}> 2 </Text>
              </View>
              <View style={styles.innerBox}>
                <Text style={styles.data}> Last Transaction Amount </Text>
                <Image
                  source={require('../constants/Images/cashPaid.png')}
                  style={{height: 30, width: 40, marginLeft: '30%'}}
                />
                <Text style={styles.bottomData}> 2 </Text>
              </View>
              <View style={styles.innerBox}>
                <Text style={styles.data}> .... </Text>
                <Image
                  source={require('../constants/Images/bottle-Capped.png')}
                  style={{height: 30, width: 30, marginLeft: '30%'}}
                />
                <Text style={styles.bottomData}> 2 </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: Colors.background_Light,
    paddingHorizontal: 20,
  },
  slider: {
    flex: 1,
    marginTop: 20,
    marginBottom: 5,
  },
  buttonContainer: {
    flex: 1,
    borderBottomWidth: 1,
    marginBottom: 40,
    borderBottomColor: Colors.dim,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  boxContainer: {
    width: '80%',
    height: '40%',
    // borderWidth: 1,
    marginLeft: 20,
    flexDirection: 'row',
  },
  innerBox: {
    width: '35%',
    backgroundColor: Colors.primary,
    marginRight: 10,
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 3,
    paddingVertical: 20,
    // height: '100%',
  },
  data: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bottomData: {
    marginLeft: '30%',
    color: 'white',
    marginTop: 10,
  },
});

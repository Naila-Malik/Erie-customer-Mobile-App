import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {theme} from '../core/theme';
import {Searchbar} from 'react-native-paper';
import {Pressable} from 'react-native';

export default function UserHomePage({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.tinyLogo} source={require('../assets/logo.png')} />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={require('../assets/heart.png')}
            style={{width: 25, height: 25}}
          />
          <Image
            source={require('../assets/bell.png')}
            style={{width: 25, height: 25}}
          />
        </View>
      </View>
      <View style={styles.title}>
        <Text style={{fontWeight: 'bold'}}>Hello , Dear Customer!</Text>
        <View>
          <Image
            source={require('../assets/hand.png')}
            style={{width: 20, height: 20, marginLeft: 10}}
          />
        </View>
      </View>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 24,
          fontWeight: '500',
          marginBottom: hp('4%'),
          marginTop: 15,
        }}>
        {' '}
        Seeing is believing
      </Text>
      <Searchbar
        style={{
          borderRadius: 20,
          borderColor: theme.colors.primary,
          borderWidth: 1,
        }}
        placeholder="Search your product here"
        icon={() => (
          <Image
            source={require('../assets/search.png')}
            style={{width: 25, height: 25, marginLeft: 10}}
          />
        )}
      />
      <View style={styles.banner}>
        <Image
          source={require('../assets/mainAdd.png')}
          style={{width: wp('87%'), height: hp('20%'), borderRadius: 15}}
        />
      </View>
      <View style={styles.body}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{color: theme.colors.primary, fontWeight: '500'}}>
              Products :{' '}
            </Text>
          </View>
          <Pressable
            style={{flexDirection: 'row'}}
            onPress={() => navigation.navigate('AllProducts')}>
            <Text style={{color: theme.colors.primary, fontWeight: '500'}}>
              See all
            </Text>
            <Image
              source={require('../assets/arrow.png')}
              style={{width: 15, height: 15, marginLeft: 5}}
            />
          </Pressable>
        </View>
        <View style={{margin: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate('SmallPack', {value: 1})}>
              <Image
                source={require('../assets/0.5ltr.png')}
                style={styles.img}
              />
              <Text> 0.5 Ltr</Text>
            </Pressable>
            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate('SmallPack', {value: 2})}>
              <Image
                source={require('../assets/1.5ltr.png')}
                style={styles.img}
              />
              <Text> 1.5 Ltr</Text>
            </Pressable>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate('SmallPack', {value: 3})}>
              <Image
                source={require('../assets/06ltr.png')}
                style={styles.img}
              />
              <Text> 06 Ltr</Text>
            </Pressable>
            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate('SmallPack', {value: 4})}>
              <Image
                source={require('../assets/19ltr.png')}
                style={styles.img}
              />
              <Text> 19 Ltr</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 30,
  },
  header: {
    // flex: 1,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flexDirection: 'row',
  },
  banner: {
    marginTop: 20,
  },
  body: {
    marginTop: 20,
  },
  tinyLogo: {
    width: 80,
    height: 35,
    marginBottom: 30,
  },
  card: {
    // backgroundColor: theme.colors.background_Light,
    // borderRadius: 10,
    // width: wp('30%'),
    // height: hp('15%'),
    // justifyContent: 'space-between',
    marginLeft: 25,
    marginRight: 35,
  },
  img: {
    width: 100,
    height: 150,
  },
});

// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {Button} from 'react-native-paper';
// import {Colors} from '../constants/Colors';
// import Slideshow from 'react-native-image-slider-show';
// import PlaceNewOrder from './PlaceNewOrder';
// import OrdersHistory from './OrdersHistory';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PushNotification from 'react-native-push-notification';
// // import BackgroundFetch from 'react-native-background-fetch';
// import baseURL from '../core/URL';
// import axios from 'axios';

// const dataSource = [
//   {
//     url: 'https://cdn.pixabay.com/photo/2012/03/01/00/31/water-19659_960_720.jpg',
//   },
//   {
//     url: 'https://cdn.pixabay.com/photo/2014/12/24/05/02/drop-of-water-578897_960_720.jpg',
//   },
//   {
//     url: 'https://cdn.pixabay.com/photo/2013/07/19/00/18/splashing-165192_960_720.jpg',
//   },
// ];
// export default function UserHomePage({navigation}) {
//   const [customerName, setCustomerName] = useState();
//   const [position, setPosition] = useState(0);

//   // console.log('navigation', navigation);
//   const [visible, setVisible] = useState(false);

//   const getOrderStatus = async () => {
//     try {
//       const tokenGot = await AsyncStorage.getItem('token');
//       const res = await axios.get(`${baseURL}order-notification`, {
//         headers: {
//           Authorization: `Bearer ${tokenGot}`,
//         },
//       });
//       // setStatus(res.data.status);
//       handleServerStatusChange(res.data.status);
//     } catch (error) {
//       console.log(' Error while updating status of order', error);
//     }
//   };

//   // console.log(" data while verify otp", data);
//   const name = async () => {
//     const nameUser = await AsyncStorage.getItem('userName');
//     setCustomerName(nameUser);
//   };

//   useEffect(() => {
//     // BackgroundFetch.configure(
//     //   {
//     //     minimumFetchInterval: 1, // fetch every 15 minutes
//     //     stopOnTerminate: false, // continue fetching when app is closed
//     //     startOnBoot: true, // start fetching when app is booted
//     //   },
//     //   () => {
//     //     getOrderStatus();
//     //   },
//     //   error => {
//     //     console.log(' RNBackgroundFetch failed to start', error);
//     //   },
//     // );
//     getOrderStatus();
//     name();
//     const toggle = setInterval(() => {
//       setPosition(position === dataSource.length - 1 ? 0 : position + 1);
//     }, 3000);

//     return () => clearInterval(toggle);
//   }, []);

//   console.log('posssssitionnon', position);

//   const handleServerStatusChange = status => {
//     if (status === 'Pending') {
//       PushNotification.localNotification({
//         channelId: 'Pending',
//         title: 'Order is Pending',
//         message: 'Your Order against id # ---- has been pending',
//         playSound: true,
//         soundName: 'default',
//       });
//     } else if (status === 'Out for Delivery') {
//       PushNotification.localNotification({
//         channelId: 'Out-for-Delivery',
//         title: 'Out for Delivery',
//         message: 'Your Order against id # ---- is out for delivery',
//         playSound: true,
//         soundName: 'default',
//       });
//     } else if (status === 'Delivered') {
//       PushNotification.localNotification({
//         channelId: 'Delivered',
//         title: 'Delivered',
//         message: 'Your Order against id # --- has been delivered successfully',
//         playSound: true,
//         soundName: 'default',
//       });
//     } else if (status === 'Canceled') {
//       PushNotification.localNotification({
//         channelId: 'Canceled',
//         title: 'Cancelled',
//         message:
//           'Your Order against id # --- has been cancelled due to some inconvenience',
//         playSound: true,
//         soundName: 'default',
//       });
//     } else if (status === 'Invalid') {
//       PushNotification.localNotification({
//         channelId: 'Invalid',
//         title: 'Invalid',
//         message: 'Your Order seems to be invalid',
//         playSound: true,
//         soundName: 'default',
//       });
//     }
//     // else BackgroundFetch.finish();
//   };
//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       style={{flex: 1, backgroundColor: Colors.background_Light}}>
//       <View style={styles.header}>
//         <View>
//           <Pressable
//             style={{flexDirection: 'row', marginBottom: 10}}
//             onPress={() => navigation.navigate('UserProfile')}>
//             <Image
//               source={require('../constants/Images/avatarUser.png')}
//               style={{height: 50, width: 50, borderRadius: 25}}
//             />
//             <View style={{marginLeft: '78%'}}>
//               <Image
//                 source={require('../constants/Images/bell.png')}
//                 style={{height: 26, width: 26, borderRadius: 25}}
//               />
//             </View>
//           </Pressable>
//           <View style={{flexDirection: 'row'}}>
//             <Text style={{fontSize: 20}}> Greetings! </Text>
//             <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
//               {customerName}
//             </Text>
//           </View>
//           <Text style={{marginTop: 5, fontSize: 20, color: Colors.primary}}>
//             {' '}
//             Have a nice day!{' '}
//           </Text>
//         </View>
//       </View>
//       <View style={styles.slider}>
//         <Slideshow
//           position={position}
//           dataSource={dataSource}
//           onPositionChanged={position => setPosition(position)}
//         />
//       </View>
//       <View style={styles.buttonContainer}>
//         <View
//           style={{
//             flexDirection: 'row',
//             marginTop: 10,
//             marginBottom: 20,
//           }}>
//           <Button
//             // icon="camera"
//             style={{marginRight: 10, marginLeft: 3}}
//             mode="contained"
//             buttonColor={Colors.primary}
//             onPress={() => setVisible('order')}>
//             Place Order
//           </Button>
//           <Button
//             // icon="camera"
//             mode="contained"
//             style={{paddingHorizontal: 20}}
//             buttonColor={Colors.primary}
//             onPress={() => setVisible('history')}>
//             History
//           </Button>
//         </View>
//       </View>
//       <View style={{flex: 1}}>
//         {visible === 'history' ? (
//           <OrdersHistory navigation={navigation} />
//         ) : visible === 'order' ? (
//           <PlaceNewOrder navigation={navigation} />
//         ) : (
//           <View style={styles.container}>
//             <View style={styles.boxContainer}>
//               <View style={styles.innerBox}>
//                 <Text style={styles.data}> Bottle Cap </Text>
//                 <Image
//                   source={require('../constants/Images/bottle-Capped.png')}
//                   style={{height: 30, width: 30, marginLeft: '30%'}}
//                 />
//                 <Text style={styles.bottomData}> 2 </Text>
//               </View>
//               <View style={styles.innerBox}>
//                 <Text style={styles.data}>Last Transaction Date</Text>
//                 <Image
//                   source={require('../constants/Images/arrows.png')}
//                   style={{height: 30, width: 30, marginLeft: '35%'}}
//                 />
//                 <Text
//                   style={{marginLeft: '25%', color: 'white', marginTop: 10}}>
//                   {' '}
//                   22, Dec{' '}
//                 </Text>
//               </View>
//               <View style={styles.innerBox}>
//                 <Text style={styles.data}> Schedule Days</Text>
//                 <Image
//                   source={require('../constants/Images/calendar.png')}
//                   style={{height: 30, width: 30, marginLeft: '30%'}}
//                 />
//                 <Text
//                   style={{marginLeft: '25%', color: 'white', marginTop: 10}}>
//                   {' '}
//                   Fri, Sat
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.boxContainer}>
//               <View style={styles.innerBox}>
//                 <Text style={styles.data}> Payable </Text>
//                 <Image
//                   source={require('../constants/Images/cash.png')}
//                   style={{height: 30, width: 50, marginLeft: '30%'}}
//                 />
//                 <Text style={styles.bottomData}> 2 </Text>
//               </View>
//               <View style={styles.innerBox}>
//                 <Text style={styles.data}> Last Transaction Amount </Text>
//                 <Image
//                   source={require('../constants/Images/cashPaid.png')}
//                   style={{height: 30, width: 40, marginLeft: '30%'}}
//                 />
//                 <Text style={styles.bottomData}> 2 </Text>
//               </View>
//               <View style={styles.innerBox}>
//                 <Text style={styles.data}> User Profile </Text>
//                 <Image
//                   source={require('../constants/Images/male-user.png')}
//                   style={{height: 35, width: 35, marginLeft: '35%'}}
//                 />
//                 <Text style={styles.bottomData}> 2 </Text>
//               </View>
//             </View>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     marginTop: 30,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginBottom: 5,
//   },
//   inputContainer: {
//     flex: 1,
//     height: 50,
//     borderRadius: 10,
//     flexDirection: 'row',
//     backgroundColor: Colors.background_Light,
//     paddingHorizontal: 20,
//   },
//   slider: {
//     flex: 1,
//     marginTop: 20,
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flex: 1,
//     borderBottomWidth: 1,
//     marginBottom: 40,
//     borderBottomColor: Colors.dim,
//     alignItems: 'center',
//   },
//   container: {
//     flex: 1,
//   },
//   boxContainer: {
//     width: '80%',
//     height: '40%',
//     // borderWidth: 1,
//     marginLeft: 20,
//     flexDirection: 'row',
//   },
//   innerBox: {
//     width: '35%',
//     backgroundColor: Colors.primary,
//     marginRight: 10,
//     marginBottom: 20,
//     justifyContent: 'center',
//     borderRadius: 3,
//     paddingVertical: 20,
//     // height: '100%',
//   },
//   data: {
//     textAlign: 'center',
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   bottomData: {
//     marginLeft: '40%',
//     color: 'white',
//     marginTop: 10,
//   },
// });

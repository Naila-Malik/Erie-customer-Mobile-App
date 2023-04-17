import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {theme} from '../core/theme';

export default function CustomerProfile({navigation}) {
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
      <View style={styles.titleContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Your Account</Text>
      </View>
      <View style={styles.titleContainer}>
        <Image
          source={require('../assets/avatar.png')}
          style={{width: 50, height: 50}}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Customer Name</Text>
      </View>
      <View>
        <Pressable
          style={styles.recordContainer}
          onPress={() => console.log('data')}>
          <Image
            source={require('../assets/icon.png')}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{fontWeight: 'bold'}}>Personal Information</Text>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.imgArrow}
          />
        </Pressable>
        <Pressable
          style={styles.recordContainer}
          onPress={() => console.log('data')}>
          <Image
            source={require('../assets/homeIcon.png')}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{fontWeight: 'bold'}}>Delivery Addresses</Text>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.imgArrow}
          />
        </Pressable>
        <Pressable
          style={styles.recordContainer}
          onPress={() => console.log('data')}>
          <Image
            source={require('../assets/activeOrder.png')}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{fontWeight: 'bold'}}>Active Orders/History</Text>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.imgArrow}
          />
        </Pressable>
        <Pressable
          style={styles.recordContainer}
          onPress={() => console.log('data')}>
          <Image
            source={require('../assets/payment.png')}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{fontWeight: 'bold'}}>Payment</Text>
          <View
            style={{
              marginLeft: 80,
            }}>
            <Image
              source={require('../assets/arrow.png')}
              style={styles.imgArrow}
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.recordContainer}
          onPress={() => navigation.navigate('SupportPage')}>
          <Image
            source={require('../assets/support.png')}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{fontWeight: 'bold'}}>Support</Text>
          <View
            style={{
              marginLeft: 80,
            }}>
            <Image
              source={require('../assets/arrow.png')}
              style={styles.imgArrow}
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.recordContainer}
          onPress={() => navigation.navigate('SignInScreen')}>
          <Image
            source={require('../assets/logout.png')}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{fontWeight: 'bold'}}>Log out</Text>
          <View
            style={{
              marginLeft: 80,
            }}>
            <Image
              source={require('../assets/arrow.png')}
              style={styles.imgArrow}
            />
          </View>
        </Pressable>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tinyLogo: {
    width: 80,
    height: 35,
    marginBottom: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: 18,
  },
  recordContainer: {
    flexDirection: 'row',
    margin: '2%',
    borderRadius: 10,
    backgroundColor: theme.colors.background_Light,
    padding: '4%',
  },
  imgArrow: {
    width: 20,
    height: 20,
    marginLeft: 120,
  },
});

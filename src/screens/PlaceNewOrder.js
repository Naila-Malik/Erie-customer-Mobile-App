import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {theme} from '../core/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native';

export default function PlaceNewOrder({navigation}) {
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
        <Text style={styles.title}>Cart</Text>
      </View>
      <View style={styles.body}>
        <Text>Your Cart is empty Select your favourite bottle</Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: theme.colors.error,
              textDecorationLine: 'underline',
            }}>
            free delivery
          </Text>
          <Text>is available</Text>
        </View>
      </View>
      <View style={{marginTop: hp('20%')}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('AllProducts')}>
          <Text style={styles.btnText}>Select Product </Text>
        </TouchableOpacity>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: 18,
  },
  tinyLogo: {
    width: 80,
    height: 35,
    marginBottom: 30,
  },
  body: {
    justifyContent: 'center',
    paddingHorizontal: 80,
    marginTop: hp('30%'),
  },
  btn: {
    marginTop: hp('5%'),
    marginBottom: hp('5%'),
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.error,
    borderRadius: 20,
  },
  btnText: {
    color: theme.colors.default,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

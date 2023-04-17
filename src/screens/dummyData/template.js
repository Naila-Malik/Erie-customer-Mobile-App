import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {theme} from '../core/theme';

export default function AddressConfirmation() {
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
    marginBottom: hp('5%'),
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: 18,
  },
});

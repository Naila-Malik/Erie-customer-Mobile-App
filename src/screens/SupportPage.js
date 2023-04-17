import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {theme} from '../core/theme';
import {Pressable} from 'react-native';

export default function SupportPage() {
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
        <Text style={styles.title}>Support</Text>
      </View>
      <View style={styles.card}>
        <Image
          source={require('../assets/supportPerson.png')}
          style={{width: 100, height: 100}}
        />
        <Text style={styles.title}>How we can help you</Text>
      </View>
      <View>
        <Pressable
          style={styles.recordContainer}
          onPress={() => console.log('data')}>
          <Image
            source={require('../assets/call.png')}
            style={{width: 25, height: 25, marginRight: 10}}
          />
          <Text style={{fontWeight: 'bold'}}>Call us : +92300-1111000</Text>
        </Pressable>
        <Pressable
          style={styles.recordContainer}
          onPress={() => console.log('data')}>
          <Image
            source={require('../assets/like.png')}
            style={{width: 30, height: 30, marginRight: 10}}
          />
          <Text style={{fontWeight: 'bold'}}>Rate us on play store</Text>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.imgArrow}
          />
        </Pressable>
        <Pressable
          style={styles.recordContainer}
          onPress={() => console.log('data')}>
          <Image
            source={require('../assets/support.png')}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{fontWeight: 'bold'}}>Feedback</Text>
          <Image
            source={require('../assets/arrow.png')}
            style={[styles.imgArrow, {marginLeft: '60%'}]}
          />
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
    marginBottom: hp('5%'),
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: 18,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('10%'),
    marginBottom: hp('5%'),
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
    marginLeft: 100,
  },
});

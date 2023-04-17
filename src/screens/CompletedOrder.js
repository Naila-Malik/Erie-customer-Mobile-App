import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {theme} from '../core/theme';
import MapView, {Marker} from 'react-native-maps';

export default function CompletedOrder() {
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
        <Text style={styles.title}>Completed</Text>
      </View>
      <View style={styles.body}>
        <Image
          source={require('../assets/rider.png')}
          style={{width: 240, height: 110}}
        />
        <View style={{marginTop: hp('5%'), alignItems: 'center'}}>
          <Text style={styles.title}>Thank You</Text>
          <Text style={styles.subtitle}>Your order has been received!</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Image
          source={require('../assets/location.png')}
          style={{width: 50, height: 50}}
        />
        <TouchableOpacity
          onPress={() => console.log('Click to add new address')}
          style={styles.btnTracking}>
          <Text style={{color: theme.colors.default, fontWeight: 'bold'}}>
            Track your delivery
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  width: '90%',
                  height: '50%',
                  borderRadius: 4,
                  borderColor: Colors.dim,
                }}>
                <MapView
                  style={styles.map}
                  region={{
                    latitude: 31.4805,
                    longitude: 74.3239,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: 31.4805,
                      longitude: 74.3239,
                    }}
                    image={require('../constants/Images/map-marker.png')}
                    style={{height: 35, width: 35}}
                    title="Model Town"
                    description="Model town near faisal hospital"
                  />
                </MapView>
              </View> */}
      {/* Map View on google map directly */}
      {/* <Pressable
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: '100%',
                  marginTop: '2%',
                  justifyContent: 'space-between',
                }}
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/maps/place/${block},+Punjab,+Pakistan/@`,
                  )
                }>
                <View
                  style={{
                    width: '30%',
                  }}>
                  <Image
                    source={require('../constants/Images/map.png')}
                    style={{
                      height: '50%',
                      width: '50%',
                    }}
                  />
                </View>
                <>
                  <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                    Choose from map{' '}
                  </Text>
                </>
              </Pressable> */}
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
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('15%'),
  },
  subtitle: {
    // fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: 16,
  },
  btnTracking: {
    flexDirection: 'row-reverse',
    backgroundColor: theme.colors.error,
    // marginRight: wp('55%'),
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  footer: {
    alignItems: 'center',
    marginTop: hp('15%'),
  },
});

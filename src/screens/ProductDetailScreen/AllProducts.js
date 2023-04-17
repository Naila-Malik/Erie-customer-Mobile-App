import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {theme} from '../../core/theme';
import {Searchbar} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Pressable} from 'react-native';

export default function AllProducts({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/logo.png')}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/heart.png')}
            style={{width: 25, height: 25}}
          />
          <Image
            source={require('../../assets/bell.png')}
            style={{width: 25, height: 25}}
          />
        </View>
      </View>
      <View style={styles.title}>
        <Text
          style={{
            fontWeight: 'bold',
            color: theme.colors.primary,
          }}>
          All Products
        </Text>
      </View>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search your product"
        icon={() => (
          <Image
            source={require('../../assets/search.png')}
            style={{width: 25, height: 25, marginLeft: 10}}
          />
        )}
      />
      <View>
        <Pressable onPress={() => navigation.navigate('SmallPack', {value: 4})}>
          <Image
            source={require('../../assets/Group2.png')}
            style={{
              width: wp('80%'),
              height: hp('20%'),
              marginLeft: 10,
              marginBottom: 10,
            }}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SmallPack', {value: 3})}>
          <Image
            source={require('../../assets/Group3.png')}
            style={{
              width: wp('80%'),
              height: hp('20%'),
              marginLeft: 10,
              marginBottom: 10,
            }}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SmallPack', {value: 2})}>
          <Image
            source={require('../../assets/Group1.png')}
            style={{
              width: wp('80%'),
              height: hp('20%'),
              marginLeft: 10,
              marginBottom: 10,
            }}
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
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 80,
    height: 35,
    marginBottom: 30,
  },
  searchBar: {
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 40,
  },
});

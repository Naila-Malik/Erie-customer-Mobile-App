import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {theme} from '../core/theme';

export default function Checkout({navigation, route}) {
  const {bottleName} = route.params;
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(120);
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
        <Text style={styles.title}>Checkout</Text>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.subTitle}>Address</Text>
        <Text>House 72, Street 11, Near High School New Town - Lahore</Text>
        <View style={styles.btnAdd}>
          <TouchableOpacity
            onPress={() => console.log('Click to add new address')}>
            <Text style={{color: theme.colors.default, fontWeight: 'bold'}}>
              Add New
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardContainerBottom}>
        <Image
          source={require('../assets/06ltr.png')}
          style={{width: 120, height: 120}}
        />
        <View>
          <Text style={styles.txt}>Erie</Text>
          <Text>{bottleName}</Text>
          <Text style={{fontWeight: 'bold', color: theme.colors.primary}}>
            {price} R.s{' '}
          </Text>
        </View>
        <View style={styles.accumulator}>
          <Pressable onPress={() => setCount(count - 1)}>
            <Image source={require('../assets/minus.png')} style={styles.img} />
          </Pressable>
          <Text style={{marginLeft: 15, marginRight: 15}}>1</Text>
          <Pressable onPress={() => setCount(count + 1)}>
            <Image source={require('../assets/plus.png')} style={styles.img} />
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomCard}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={styles.txt}>Subtotal :</Text>
          <Text style={styles.txt}>{price} PKR</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={styles.txt}>Discount :</Text>
          <Text style={styles.txt}>0.0 PKR</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text style={styles.txt}>Delivery :</Text>
          <Text style={[styles.txt, {color: theme.colors.error}]}>Free</Text>
        </View>
        <View style={styles.totalStyle}>
          <Text style={[styles.txt, {marginTop: 5}]}>Total : </Text>
          <Text style={[styles.txt, {marginTop: 5}]}>318 PKR </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('CompletedOrder')}>
        <Text style={styles.btnTxt}>Send Order</Text>
      </TouchableOpacity>
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
  subTitle: {
    color: theme.colors.darkGrey,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: theme.colors.background_Light,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  cardContainerBottom: {
    backgroundColor: theme.colors.background_Light,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: '7%',
    borderRadius: 10,
  },
  btnAdd: {
    flexDirection: 'row-reverse',
    backgroundColor: theme.colors.error,
    marginRight: wp('55%'),
    padding: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
  txt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accumulator: {
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: '25%',
    borderColor: theme.colors.primary,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 20,
    height: 20,
  },
  bottomCard: {
    marginTop: hp('5%'),
  },
  totalStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    marginTop: 10,
    borderTopColor: theme.colors.darkGrey,
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.error,
    borderRadius: 20,
    // margin: 30,
    margin: 50,
  },
  btnTxt: {
    color: theme.colors.default,
    fontSize: 18,
    fontWeight: 'bold',
  },
  txt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

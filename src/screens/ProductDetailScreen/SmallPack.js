import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {theme} from '../../core/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function SmallPack({navigation, route}) {
  const {value} = route.params;

  // console.log('value', value);

  {
    return value && value === 1 ? (
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/0.5ltrPack.png')}>
        <View style={styles.headingsContainer}>
          <Text style={styles.headingTitle}>Water "Erie"</Text>
          <Text style={styles.headingText}>500 ML</Text>
        </View>
        <View style={[styles.headingsContainer, {marginTop: 20}]}>
          <Text style={styles.headingTitle}>Price</Text>
          <Text style={styles.headingText}> 300 PKR</Text>
          <View style={styles.btnContainer}>
            <Pressable onPress={() => console.log('decremeted')}>
              <Image
                source={require('../../assets/minus.png')}
                style={styles.img}
              />
            </Pressable>
            <Text style={{marginLeft: 15, marginRight: 15}}>1</Text>
            <Pressable onPress={() => console.log('incremented')}>
              <Image
                source={require('../../assets/plus.png')}
                style={styles.img}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.txtContainer}>
          <Text styles={styles.txt}>
            {' '}
            Every bottle of Erie water Barand 100% Natural water is recyclable
            -even our refillable bottles. After they're returned to us, they're
            washed, sanitized and refilled more than 20 times before getting
            recycled
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('SelectedCartItems', {bottleName: '500 ML'})
          }>
          <Text style={styles.btnTxt}>Add to Cart</Text>
        </TouchableOpacity>
      </ImageBackground>
    ) : value === 2 ? (
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/1.5ltrPack.png')}>
        <View style={styles.headingsContainer}>
          <Text style={styles.headingTitle}>Water "Erie"</Text>
          <Text style={styles.headingText}>1.5 Liter</Text>
        </View>
        <View style={[styles.headingsContainer, {marginTop: 20}]}>
          <Text style={styles.headingTitle}>Price</Text>
          <Text style={styles.headingText}> 45 PKR</Text>
          <View style={styles.btnContainer}>
            <Pressable onPress={() => console.log('incremeted')}>
              <Image
                source={require('../../assets/minus.png')}
                style={styles.img}
              />
            </Pressable>
            <Text style={{marginLeft: 15, marginRight: 15}}>1</Text>
            <Pressable onPress={() => console.log('decremented')}>
              <Image
                source={require('../../assets/plus.png')}
                style={styles.img}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.txtContainer}>
          <Text styles={styles.txt}>
            {' '}
            Every bottle of Erie water Barand 100% Natural water is recyclable
            -even our refillable bottles. After they're returned to us, they're
            washed, sanitized and refilled more than 20 times before getting
            recycled
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('SelectedCartItems', {bottleName: '1.5 Liter'})
          }>
          <Text style={styles.btnTxt}>Add to Cart</Text>
        </TouchableOpacity>
      </ImageBackground>
    ) : value === 3 ? (
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/06ltrPack.png')}>
        <View style={styles.headingsContainer}>
          <Text style={styles.headingTitle}>Water "Erie"</Text>
          <Text style={styles.headingText}>06 Liter</Text>
        </View>
        <View style={[styles.headingsContainer, {marginTop: 20}]}>
          <Text style={styles.headingTitle}>Price</Text>
          <Text style={styles.headingText}> 99 PKR</Text>
          <View style={styles.btnContainer}>
            <Pressable onPress={() => console.log('incremeted')}>
              <Image
                source={require('../../assets/minus.png')}
                style={styles.img}
              />
            </Pressable>
            <Text style={{marginLeft: 15, marginRight: 15}}>1</Text>
            <Pressable onPress={() => console.log('decremented')}>
              <Image
                source={require('../../assets/plus.png')}
                style={styles.img}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.txtContainer}>
          <Text styles={styles.txt}>
            {' '}
            Every bottle of Erie water Barand 100% Natural water is recyclable
            -even our refillable bottles. After they're returned to us, they're
            washed, sanitized and refilled more than 20 times before getting
            recycled
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('SelectedCartItems', {bottleName: '06 Liter'})
          }>
          <Text style={styles.btnTxt}>Add to Cart</Text>
        </TouchableOpacity>
      </ImageBackground>
    ) : value === 4 ? (
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/19ltrPack.png')}>
        <View style={styles.headingsContainer}>
          <Text style={styles.headingTitle}>Water "Erie"</Text>
          <Text style={styles.headingText}>19 Liter</Text>
        </View>
        <View style={[styles.headingsContainer, {marginTop: 20}]}>
          <Text style={styles.headingTitle}>Price</Text>
          <Text style={styles.headingText}> 159 PKR</Text>
          <View style={styles.btnContainer}>
            <Pressable onPress={() => console.log('incremeted')}>
              <Image
                source={require('../../assets/minus.png')}
                style={styles.img}
              />
            </Pressable>
            <Text style={{marginLeft: 15, marginRight: 15}}>1</Text>
            <Pressable onPress={() => console.log('decremented')}>
              <Image
                source={require('../../assets/plus.png')}
                style={styles.img}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.txtContainer}>
          <Text styles={styles.txt}>
            {' '}
            Every bottle of Erie water Barand 100% Natural water is recyclable
            -even our refillable bottles. After they're returned to us, they're
            washed, sanitized and refilled more than 20 times before getting
            recycled
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('SelectedCartItems', {bottleName: '19 Liter'})
          }>
          <Text style={styles.btnTxt}>Add to Cart</Text>
        </TouchableOpacity>
      </ImageBackground>
    ) : (
      ''
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderBottomEndRadius: 80,
    borderBottomStartRadius: 80,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  headingsContainer: {
    marginTop: hp('40%'),
    padding: 20,
    flexDirection: 'row',
  },
  headingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginLeft: 4,
  },
  btnContainer: {
    marginLeft: wp('30%'),
    borderWidth: 1,
    paddingHorizontal: 15,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
  },
  img: {
    width: 20,
    height: 20,
  },
  txtContainer: {
    marginTop: hp('5%'),
    paddingHorizontal: 30,
    marginBottom: hp('5%'),
  },
  txt: {
    // color: theme.colors.lightGrey,
    color: theme.colors.dimGrey,
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.error,
    borderRadius: 20,
    margin: 30,
  },
  btnTxt: {
    color: theme.colors.default,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

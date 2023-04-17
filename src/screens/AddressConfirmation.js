import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {theme} from '../core/theme';
import {Calendar} from 'react-native-calendars';
import {TouchableOpacity} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import {TextInput} from 'react-native';

export default function AddressConfirmation({navigation, route}) {
  const {bottleName} = route.params;
  const [date, setDate] = useState();
  const data = [
    {id: 1, label: 'Cash on delivery'},
    {id: 2, label: 'Via JazzCash'},
    {id: 3, label: 'Monthly Subscription'},
  ];
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
      <View style={styles.cardContainer}>
        <Text style={styles.title}> Delivery</Text>
        <Text style={styles.subTitle}>Address</Text>
        <Text>House 72, Street 11, Near High School</Text>
        <Text>New Town - Lahore</Text>
        <View style={styles.section}>
          <Text style={styles.subTitle}>Date</Text>
          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 20,
            }}
            onPress={() => {
              return (
                <View>
                  <Calendar
                    style={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      height: 350,
                    }}
                    onDayPress={d => setDate(d)}
                  />
                </View>
              );
            }}>
            {date ? date : <Text> DD/MM/YY </Text>}
            <Image
              source={require('../assets/calender.png')}
              style={{width: 20, height: 20}}
            />
          </Pressable>
        </View>
        <View style={styles.section}>
          <Text style={styles.subTitle}>Payment</Text>
          <RadioButtonRN
            data={data}
            boxStyle={{backgroundColor: theme.colors.background_Light}}
            selectedBtn={e => console.log(e)}
            activeColor={theme.colors.primary}
            // style={{}}
            deactiveColor={theme.colors.dimGrey}
          />
          {/* <Text>Learn more...</Text> */}
        </View>
        <View
          style={{
            marginTop: 10,
            borderBottomWidth: 1,
            marginBottom: 5,
            borderBottomColor: theme.colors.lightGrey,
          }}>
          <Text style={styles.subTitle}>Your Comment</Text>
          <TextInput placeholder="write here.." />
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('Checkout', {bottleName: '06ltr'})
          }>
          <Text style={styles.btnText}> Check out </Text>
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
  tinyLogo: {
    width: 80,
    height: 35,
    marginBottom: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginBottom: hp('5%'),
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontSize: 18,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: theme.colors.background_Light,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 10,
    borderTopWidth: 1,
    marginBottom: 5,
    borderTopColor: theme.colors.lightGrey,
  },
  subTitle: {
    color: theme.colors.darkGrey,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    margin: hp('8%'),
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

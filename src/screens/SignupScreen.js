import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../components/Logo';
import {theme} from '../core/theme';
import {TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BackgroundImage} from 'react-native-elements/dist/config';

export default function SignupScreen({navigation}) {
  const [name, setName] = useState('');
  return (
    <ScrollView style={styles.container}>
      <View style={{paddingHorizontal: 30}}>
        <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
          <Logo />
        </View>
        <View style={styles.txt}>
          <Text
            style={{
              color: theme.colors.primary,
              fontWeight: 'bold',
              fontFamily: 'Roboto',
              fontSize: 24,
            }}>
            Sign up
          </Text>
        </View>
        <View>
          <Text style={styles.txtHeadings}>Enter your full name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={name}
              placeholder="john.ie"
              onChangeText={() => setName(name)}
            />
          </View>
          <Text style={styles.txtHeadings}>Enter your password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={name}
              placeholder="****"
              secureTextEntry
              onChangeText={() => setName(name)}
            />
          </View>
          <Text style={styles.txtHeadings}>Re-Enter your password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={name}
              placeholder="****"
              secureTextEntry
              onChangeText={() => setName(name)}
            />
          </View>
        </View>
        <Text style={styles.txtHeadings}>
          Remember phone no & password for login.{' '}
        </Text>
        <View style={{marginBottom: hp('30%')}}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Sing Up </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BackgroundImage
        source={require('../assets/LtoR.png')}
        style={{
          width: wp('100%'),
          height: hp('30%'),
          position: 'absolute',
          bottom: 0,
        }}
        imageStyle={{
          alignSelf: 'flex-end',
        }}>
        <View style={{flexDirection: 'row', marginBottom: hp('2%')}}>
          <Text style={styles.txtHeadings}> Already have an account ? </Text>
          <Text
            style={{
              color: theme.colors.error,
              fontSize: 16,
              marginLeft: 10,
              textDecorationLine: 'underline',
              textDecorationColor: theme.colors.error,
            }}
            onPress={() => navigation.navigate('SignInScreen')}>
            {' '}
            Sign in{' '}
          </Text>
        </View>
      </BackgroundImage>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    alignItems: 'center',
    marginBottom: 3,
    marginTop: -6,
  },
  txtHeadings: {
    color: theme.colors.primary,
    paddingHorizontal: 30,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: theme.colors.primary,
    paddingHorizontal: 30,
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

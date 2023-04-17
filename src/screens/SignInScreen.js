import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Keyboard,
  Image,
  ImageBackground,
} from 'react-native';
import {
  Badge,
  Dialog,
  Snackbar,
  Button,
  Paragraph,
  Portal,
} from 'react-native-paper';
import Logo from '../components/Logo';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import TextInput from '../components/TextInput';
import {memberIdValidator} from '../helpers/memberIdValidator';
import {phoneValidator} from '../helpers/phoneValidator';
import {otpValidator} from '../helpers/otpValidator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {theme} from './../core/theme';
import baseURL from '../core/URL';
import PushNotification from 'react-native-push-notification';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BackgroundImage} from 'react-native-elements/dist/config';
// import PhoneInput from "react-native-phone-number-input";

const SignInScreen = ({navigation}) => {
  const otpInput = useRef(null);
  const [phone, setPhone] = useState({value: '', error: ''});
  const [visible, setVisible] = useState(false);
  const [snack, setSnack] = useState(false);
  const [snackmsg, setSnackmsg] = useState('');

  const login = async () => {
    Keyboard.dismiss();

    const phoneError = phoneValidator(phone.value);
    if (phoneError) {
      setPhone({...phone, error: phoneError});
      return;
    }

    setVisible(true);
    axios
      .post(`${baseURL}send-otp`, {
        phone_no: phone.value,
      })
      .then(({data}) => {
        setVisible(false);
        console.log('test Otp', data);

        navigation.navigate('OtpVerify');
      })
      .catch(error => {
        setVisible(false);
        // console.error('catch', error)
        if (error.response.status == 404) {
          setSnack(true);
          setSnackmsg(error.response.data.message);
        }
      });
  };

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'placeOrder-channel',
      channelName: 'placeOrder',
    });
    PushNotification.createChannel({
      channelId: 'Pending',
      channelName: 'Pending',
    });
    PushNotification.createChannel({
      channelId: 'Out-for-Delivery',
      channelName: 'Out-for-Delivery',
    });
    PushNotification.createChannel({
      channelId: 'Delivered',
      channelName: 'Delivered',
    });
    PushNotification.createChannel({
      channelId: 'Canceled',
      channelName: 'Canceled',
    });
    PushNotification.createChannel({
      channelId: 'Invalid',
      channelName: 'Invalid',
    });
  };

  useEffect(() => {
    createChannels();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
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
          SignIn
        </Text>
      </View>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 12,
        }}>
        Enter your phone number
      </Text>
      <View style={{}}>
        <TextInput
          label="Phone Number"
          returnKeyType="done"
          keyboardType={'numeric'}
          // autoFocus
          onChangeText={text => setPhone({value: text, error: ''})}
          error={!!phone.error}
          errorText={phone.error}
        />
        <Text
          style={{color: theme.colors.primary, margin: '10%', fontSize: 14}}>
          Enter a Phone number to get a text message with a verification code
        </Text>
        {/* <TouchableOpacity style={styles.button} onPress={() => login()}> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OtpVerify')}>
          <Text style={styles.buttonText}>Send Code</Text>
        </TouchableOpacity>
      </View>
      <BackgroundImage
        source={require('../assets/RtoL.png')}
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
          <Text style={styles.txtHeadings}> I have not an account! </Text>
          <Text
            style={{
              color: theme.colors.error,
              fontSize: 16,
              marginLeft: 10,
              textDecorationLine: 'underline',
              textDecorationColor: theme.colors.error,
            }}
            onPress={() => navigation.navigate('Signup')}>
            {' '}
            Sign up{' '}
          </Text>
        </View>
      </BackgroundImage>
      <View>
        <Portal>
          <Dialog visible={visible}>
            <Dialog.Content>
              <Paragraph>Please wait</Paragraph>
            </Dialog.Content>
          </Dialog>
        </Portal>
        <Snackbar
          visible={snack}
          onDismiss={() => setSnack(false)}
          duration={1000}>
          {snackmsg}
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.default,
    paddingHorizontal: 30,
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  image: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.error,
    borderRadius: 20,
  },

  buttonText: {
    color: theme.colors.default,
    fontSize: 18,
    fontWeight: 'bold',
  },

  resendOtpText: {
    flex: 2.5,
    color: theme.colors.default,
    fontSize: 16,
    marginTop: 10,
  },
  resendText: {
    flex: 1,

    color: theme.colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  txt: {
    alignItems: 'center',
    // marginBottom: 3,
    // marginTop: -6,
  },
  txtHeadings: {
    color: theme.colors.primary,
    paddingHorizontal: 30,
  },
});

export default SignInScreen;

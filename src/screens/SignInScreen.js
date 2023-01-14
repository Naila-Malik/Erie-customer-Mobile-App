import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Keyboard,
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
import baseURL from './URL';
import PushNotification from 'react-native-push-notification';
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
  };

  useEffect(() => {
    createChannels();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Logo />
      </View>
      <View style={{flex: 1.5}}>
        <TextInput
          label="Phone Number"
          returnKeyType="done"
          keyboardType={'numeric'}
          autoFocus
          onChangeText={text => setPhone({value: text, error: ''})}
          error={!!phone.error}
          errorText={phone.error}
        />
        {/* <PhoneInput
                defaultCode="PK"
                layout="first"

                onChangeFormattedText={(text) => {
                  setPhone({ value: text, error: '' })
                }}
                withShadow
                autoFocus
                containerStyle={{ width: '100%', height: 80 }}

              /> */}
        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>

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
    marginTop: 30,
    height: 50,
    // width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.secondry,
    borderRadius: 5,
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
});

export default SignInScreen;

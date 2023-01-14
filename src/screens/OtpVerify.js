import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Keyboard} from 'react-native';
import {Badge, Dialog, Snackbar, Paragraph, Portal} from 'react-native-paper';
import Logo from '../components/Logo';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import TextInput from '../components/TextInput';
import {memberIdValidator} from '../helpers/memberIdValidator';
import {otpValidator} from '../helpers/otpValidator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {theme} from './../core/theme';
import baseURL from './URL';

const OtpVerify = ({navigation}) => {
  const otpInput = useRef(null);
  const [otp, setOtp] = useState({value: '', error: ''});
  const [memberId, setMemberId] = useState({value: '', error: ''});
  const [timerCount, setTimer] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snack, setSnack] = useState(false);
  const [snackmsg, setSnackmsg] = useState('');

  useEffect(() => {
    if (otpInput.current) {
      otpInput?.current?.focusField(0);
    }
    setTimer(30);
  }, []);

  if (timerCount > 0) {
    setTimeout(() => setTimer(timerCount - 1), 1000);
  }

  const verifyOtp = async () => {
    Keyboard.dismiss();

    const otpError = otpValidator(otp.value);
    if (otpError) {
      setOtp({...otp, error: otpError});
      return;
    }

    const memberIdError = memberIdValidator(memberId.value);
    if (memberIdError) {
      setMemberId({...memberId, error: memberIdError});
      return;
    }
    setVisible(true);
    axios
      .post(`${baseURL}verify-otp-auth`, {
        otp: otp.value,
        membership_no: memberId.value,
      })
      .then(async ({data}) => {
        setVisible(false);
        // console.log('test verify otp data', data);
        await AsyncStorage.removeItem('phone');
        console.log('Token generated', data.token);
        // console.log('Name', data.customer.name);
        // console.log('Id in Token generated', data.customer.id);
        // AsyncStorage.setItem('token', '' + data.data.token);

        AsyncStorage.setItem('token', String(data.token));
        AsyncStorage.setItem('userName', String(data.customer.name));

        navigation.navigate('UserHomePage');
      })
      .catch(error => {
        console.log('errorinfunc', error);
        setVisible(false);
        // console.error(error.response.data.message)
        setSnack(true);
        setSnackmsg(error.response.data.message);
      });
  };

  const resendOtp = async () => {
    const val = AsyncStorage.getItem('phone');
    console.log('resend otp phone ', val);
    setVisible(true);
    axios
      .post(`${baseURL}/send-otp`, {
        phone_no: val,
      })
      .then(({data}) => {
        setVisible(false);
        console.log('test resend otp', data);
      })
      .catch(error => {
        setVisible(false);
        // console.error(error.response.data.message)
        setSnack(true);
        setSnackmsg(error.response.data.message);
      });
  };

  // console.log('after', AsyncStorage.getItem('token'));

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Logo />
      </View>
      <View style={{flex: 2}}>
        <OTPInputView
          style={{width: '100%', height: 150}}
          ref={otpInput}
          editable={true}
          autoFocusOnLoad={false}
          pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged={code => setOtp({ value: code, error: '' })}
          // autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setOtp({value: code, error: ''});
            console.log(`Code is ${otp.value}, you are good to go!`);
          }}
        />

        <TextInput
          label="Member ID"
          returnKeyType="done"
          value={memberId.value}
          onChangeText={text => setMemberId({value: text, error: ''})}
          error={!!memberId.error}
          errorText={memberId.error}
        />
        {timerCount > 0 ? (
          <View style={{flexDirection: 'row', padding: 20}}>
            <Text style={{color: '#fff'}}>Resend OTP after </Text>
            <Badge>{timerCount} </Badge>
          </View>
        ) : (
          <View style={{flexDirection: 'row', marginVertical: 15}}>
            <Text style={styles.resendOtpText}>
              If still otp not received yet?{' '}
            </Text>
            <TouchableOpacity onPress={() => resendOtp()}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={() => verifyOtp()}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

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
    backgroundColor: theme.colors.primary,
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

export default OtpVerify;

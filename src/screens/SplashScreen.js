import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, StatusBar} from 'react-native';
import {theme} from '../core/theme';
import {BackgroundImage} from 'react-native-elements/dist/config';

const SplashScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [snack, setSnack] = useState(false);
  const [snackmsg, setSnackmsg] = useState();

  useEffect(() => {
    setTimeout(() => {
      // AsyncStorage.getItem('token').then((value) => {
      //   let val = JSON.parse(value)
      //   navigation.replace(
      //     val != null ? 'DrawerNavigatorRoutes' : 'Auth'
      //   )

      // })
      navigation.navigate('onboarding');
      // navigation.navigate('Auth');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <BackgroundImage
        style={{width: '100%', height: '100%'}}
        source={require('../assets/Splash_Screen.jpg')}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{}}>
            <Text style={styles.welcomeTxt}>Welcome to Erie water</Text>
          </View>
          {/* <View style={{}}>
            <Text style={styles.infoTxt}>111-101-107</Text>
            <Text style={styles.infoTxt}>www.erie.pk</Text>
          </View> */}
        </View>
      </BackgroundImage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  logo: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'flex-end',
    // margin: 10,
  },
  infoTxt: {
    color: '#018795',
    fontSize: 18,
  },
  welcomeTxt: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '90%',
  },
});

export default SplashScreen;

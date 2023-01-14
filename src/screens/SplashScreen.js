import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../core/theme'
import { Paragraph, Dialog, Portal } from 'react-native-paper';
import axios from 'axios';

const SplashScreen = ({ navigation }) => {
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
      navigation.navigate('Auth')
    }, 2000);
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <View style={styles.logo}>
        <View>
          <Image
            style={{ width: 230, height: 103 }}
            source={require('../assets/logo.png')}
          />
        </View>

        <View>
          <Text style={styles.welcomeTxt}>Welcome to Erie water</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoTxt}>111-101-107</Text>
        <Text style={styles.infoTxt}>www.erie.pk</Text>
      </View>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 10,
  },
  infoTxt: {
    color: '#fff',
    fontSize: 18,
  },
  welcomeTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '5%',
  },
});

export default SplashScreen;

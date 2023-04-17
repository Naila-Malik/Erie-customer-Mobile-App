import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function Logo() {
  return <Image source={require('../assets/bird.png')} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 90,
    marginBottom: 30,
  },
});

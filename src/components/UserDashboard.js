import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';

export default function UserDashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.innerBox}>
          <Text> Data </Text>
        </View>
        <View style={styles.innerBox}>
          <Text> Data</Text>
        </View>
        <Text> Data</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    width: '80%',
    height: 90,
    // borderWidth: 1,
    marginLeft: 20,
    flexDirection: 'row',
  },
  innerBox: {
    width: '35%',
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: Colors.dim,
  },
});

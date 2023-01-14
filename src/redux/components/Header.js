import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign';
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'


const Header = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        padding: 15,
        // paddingTop: 40,
        justifyContent: 'space-between',
      }}>
      <Text style={styles.header}>{props.name}</Text>

      <TouchableOpacity onPress={() => logOut()}>
        <MaterialCommunityIcons name="poweroff" color="#fff" size={20} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})

export default Header
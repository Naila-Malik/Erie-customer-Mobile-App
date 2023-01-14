import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform  } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
      // source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} behavior="padding">
      
        {children}
      </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#4B2598',
    // backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input} from 'react-native';
import {theme} from '../core/theme';

export default function TextInput({errorText, description, ...props}) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        // outlineColor="#fff"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 20,
  },
  input: {
    // backgroundColor: theme.colors.primary,
    zIndex: 0,
  },
  description: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingBottom: 8,
    margin: '2%',
  },
});

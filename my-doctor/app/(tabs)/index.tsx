import React, { useState, useCallback } from 'react';
import { Image, StyleSheet, View, Text, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [token, setToken] = useState('');

  const checkToken = async () => {
    const tokenValue = await AsyncStorage.getItem('accessToken');
    setToken(tokenValue ?? '');
  };

  // Runs checkToken every time the screen comes into focus.
  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [])
  );

  return (
    <ImageBackground source={require('../../assets/images/doc-bg.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Doctor's App</Text>
        <Text style={styles.text}>
          This app helps you book doctor appointments or manage your patients.
        </Text>
        {token ? (
          <>
            <Button title="Go to Appointments" onPress={() => router.replace('/explore')} />
            <Button type="clear" title="Profile" onPress={() => router.replace('/profile')}>
              <Text style={styles.labelButton}></Text>
            </Button>
          </>
        ) : (
          <>
            <Button title="Login" onPress={() => router.replace('../signin')} />
            <Button type="clear" title="Register" onPress={() => router.replace('/signup')}>
              <Text style={styles.labelButton}></Text>
            </Button>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  labelButton: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
});

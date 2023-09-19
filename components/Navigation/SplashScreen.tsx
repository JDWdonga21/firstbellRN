// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';



const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Main');
    }, 3000); // 3초 후에 메인 페이지로 이동
  }, [navigation]);

  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/app_icon.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
});

export default SplashScreen;

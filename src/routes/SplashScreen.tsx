// SplashScreen.js
import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type SplashScreenProps = {
  navigation: StackNavigationProp<any, 'Splash'>; // Replace 'any' with your ParamList if you have one
};
class SplashScreen extends Component<SplashScreenProps> {
  timeout = null as null | NodeJS.Timeout;
  
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.props.navigation.navigate('Main');
    }, 3000); // 3초 후에 메인 페이지로 이동
  }
  componentWillUnmount(): void {
    if(this.timeout != null){
      clearTimeout(this.timeout);
    }      
  }

  render() {
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
    return (
      <View style={styles.container}>        
        <Image style = {{width: windowWidth * 0.9, height: windowWidth * 0.9}} source={require('../../assets/app_icon.png')} />
      </View>
    );
  }
}

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
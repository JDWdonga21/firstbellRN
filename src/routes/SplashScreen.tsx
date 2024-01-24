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
    console.log("시작화면")
    this.timeout = setTimeout(() => {
      this.onNextScreen();
    }, 3000); // 3초 후에 메인 페이지로 이동
  }
  componentWillUnmount(): void {
    console.log("시작화면 끝")
    if(this.timeout != null){
      clearTimeout(this.timeout);
    }      
  }

  onNextScreen = () => {
    this.props.navigation.navigate('Main');
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
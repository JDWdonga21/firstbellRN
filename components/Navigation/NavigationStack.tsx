// NavigationStack.js
import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import App from '../../App'; // 위에서 주어진 메인 페이지 코드를 App.js라고 가정합니다.


const Stack = createNativeStackNavigator();

class NavigationStack extends Component {
  render(){
    return (
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={App} />
      </Stack.Navigator>
    );
  }
};

export default NavigationStack;

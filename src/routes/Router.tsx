// NavigationStack.js
import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import MainScreen from '../components/MainScreen'; // 위에서 주어진 메인 페이지 코드를 App.js라고 가정합니다.
import HealthList from '../components/body/healthList/HealthList'

import DrawerMenu from '../components/drawerMenu/DrawerMenu';


//const Stack = createDrawerNavigator();
const Stack = createNativeStackNavigator();


class Router extends Component {
  render(){
    return (
      <Stack.Navigator 
        initialRouteName={"Splash"} 
        screenOptions={{ 
          headerShown: false 
        }}
        //drawerContent={(props)=><DrawerMenu {...this.props} />}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="HealthList" component={HealthList} />
      </Stack.Navigator>
    );
  }
};

export default Router;

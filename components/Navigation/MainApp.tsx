// MainApp.js
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './NavigationStack'; // 이전에 생성한 NavigationStack 컴포넌트

class MainApp extends Component {
  render(){
    return (
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    );
  }  
};

export default MainApp;

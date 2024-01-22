// MainApp.js
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/routes/Router'; // 이전에 생성한 NavigationStack 컴포넌트

class MainApp extends Component {
  render(){
    return (
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    );
  }  
};

export default MainApp;
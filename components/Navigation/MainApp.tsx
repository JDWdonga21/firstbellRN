// MainApp.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './NavigationStack'; // 이전에 생성한 NavigationStack 컴포넌트

const MainApp = () => {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
};

export default MainApp;

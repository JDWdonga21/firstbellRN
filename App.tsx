import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import Header from './components/headers/Header';
import Body from './components/body/Body';
import Footer from './components/Footer';

type AppState = {
  isDarkMode: boolean,
  name: string,
};

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: '이춘자',
    };
  }

  showtoast = () => {
    const toast = Toast.show(`안녕하세요. ${this.state.name}`, {
      // ... same Toast configurations
    });
    setTimeout(() => {
      Toast.hide(toast);
    }, 2000);
  };

  render() {
    return (
      <RootSiblingParent>
        <SafeAreaView>
          <StatusBar />
          <ScrollView >
            <Header name={this.state.name} />
            <Body name={this.state.name} />
            <Footer />
          </ScrollView>
        </SafeAreaView>
      </RootSiblingParent>
    );
  }
}

const styles = StyleSheet.create({
  // ... same styles
});

export default App;
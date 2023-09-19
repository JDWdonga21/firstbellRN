import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import Header from './components/headers/Header';
import Body from './components/body/Body';
import Footer from './components/Footer';

type AppState = {
  name: string,
};

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: '이춘자',
    };
  }

  toastTimer = null as null | NodeJS.Timeout;

  showtoast = () => {
    const toast = Toast.show(`안녕하세요. ${this.state.name}`, {
      // ... same Toast configurations
    });

    // Clear any existing timer before setting a new one
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => {
      Toast.hide(toast);
    }, 2000);
  };

  // Clear the timer when the component unmounts
  componentWillUnmount() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
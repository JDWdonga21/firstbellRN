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
  address: string,
  temperatures: number,
  healthScore: number,
  todayDate: Date,
  conditionCode: number,
};

class App extends Component<{}, AppState> {
  timer = null as null |  NodeJS.Timeout;
  constructor(props: {}) {
    super(props);
    this.state = {
      name: '이춘자',
      address: '해운대구 수영강변대로',
      temperatures: 25,
      healthScore: 65,
      todayDate: new Date(),
      conditionCode: 1,
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

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }  
  // Clear the timer when the component unmounts
  componentWillUnmount() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  tick() {
    this.setState({
      todayDate: new Date(),
    });
  }

  render() {
    return (
      <RootSiblingParent>
        <SafeAreaView>
          <StatusBar />
          <ScrollView >
            <Header 
              name={this.state.name} 
              address={this.state.address}
              temperatures={this.state.temperatures}
            />
            <Body 
              name={this.state.name} 
              healthScore={this.state.healthScore}
              todayDate = {this.state.todayDate}
              conditionCode = {this.state.conditionCode}
            />
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
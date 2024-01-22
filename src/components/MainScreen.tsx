import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
//import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import Header from './headers/Header';
import Body from './body/Body';
import Footer from './footers/Footer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type AppState = {
  name: string,
  address: string,
  temperatures: number,
  healthScore: number,
  todayDate: Date,
  conditionCode: number,
  watchTVtime: number,
  onBedtime: Date,
  onWakeUptime: Date,
  onSleeptime: number,
  onSleeptimes: number,
  onSleepmins: number,
};

class MainScreen extends Component<{}, AppState> {
  timer = null as null |  NodeJS.Timeout;
  constructor(props: {}) {
    super(props);
    this.state = {
      // All
      name: '이춘자',
      //Header
      address: '해운대구 수영강변대로',
      temperatures: 25,
      //Situation1
      healthScore: 65,
      //Situation2
      todayDate: new Date(),
      conditionCode: 1,
      watchTVtime: 0,
      onBedtime: new Date(2023, 8, 21, 4, 0, 0),
      onWakeUptime: new Date(2023, 8, 21, 15, 0, 0),
      onSleeptime: 0,
      onSleeptimes: 0,
      onSleepmins: 0,      
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
    const newTime = new Date();
    //const sleepTime = this.state.onWakeUptime.getTime() - this.state.onBedtime.getTime();
    const sleepTime = this.state.todayDate.getTime() - this.state.onBedtime.getTime();
    const sleepHours = Math.floor(sleepTime / 3600000);
    const sleepMins = Math.floor((sleepTime % 3600000) / 60000);

    this.setState({
      todayDate: newTime,
      onSleeptime: sleepTime,
      onSleeptimes: sleepHours,
      onSleepmins: sleepMins,
    });    
  }

  render() {
    return (      
      <SafeAreaProvider style={{flex: 1}}>
          <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} />
          <View style={{flex: 1}}>
            <ScrollView >
              {/* <Text>{this.state.todayDate.toLocaleString()}</Text> */}
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
                onBedtime = {this.state.onBedtime}
                onWakeUptime = {this.state.onWakeUptime}
                onSleeptimes = {this.state.onSleeptimes}
                onSleepmins = {this.state.onSleepmins}
              />
              <Footer />
            </ScrollView>
          </View>          
        </SafeAreaProvider>
      
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

export default MainScreen;
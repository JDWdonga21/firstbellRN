import React, { Component } from 'react';
import {
  Button,
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
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type MainScreenProps = {
  navigation: StackNavigationProp<any, 'Main'> & DrawerNavigationProp<any, 'Main'>; // Replace 'any' with your ParamList if you have one
};
type StepArrayEntry = [number, Date, number, number, number, number];
type AppState = {
  name: string,
  age: number,
  male: number,
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

class MainScreen extends Component<MainScreenProps, AppState> {
  timer = null as null |  NodeJS.Timeout;
  isDataLoading = true as boolean;
  isCountSave = 0 as number;
  constructor(props: MainScreenProps) {
    super(props);
    this.state = {
      // All
      name: '이춘자',
      age: 73,
      male: 1,
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

  stepArrays : StepArrayEntry[] = [

  ]

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

  // async componentDidMount() {
  //   const storedWeek = await AsyncStorage.getItem('weekSteps');
  //   if(storedWeek !== null){
  //     this.stepWeek = JSON.parse(storedWeek);
  //   }
  //   const storedStepArray = await AsyncStorage.getItem('stepArrays');
  //   if(storedStepArray !== null){
  //     this.stepArrays = JSON.parse(storedStepArray);
  //   }
  //   this.todayStepArray();
  // }
  // async componentWillUnmount() {
  //   await AsyncStorage.setItem('weekSteps', JSON.stringify(this.stepWeek));
  // }
  async componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
    const storedStepArray = await AsyncStorage.getItem('stepArrays');
    if(storedStepArray !== null){
      this.stepArrays = JSON.parse(storedStepArray);
    }
    await this.todayStepArray();
  }  
  // Clear the timer when the component unmounts
  async componentWillUnmount() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
    await this.onSaveStepArray();
  }

  onSaveStepArray = () => {
    if(this.isDataLoading === false){
      console.log("걸음 수 배열 저장");
      AsyncStorage.setItem('stepArrays', JSON.stringify(this.stepArrays));
    }    
  }

  todayStepArray = () => {
    if(!(this.state.todayDate instanceof Date)) {
      console.error('todayDate is not a valid Date object');
      return;
    }
    const todayDate = this.state.todayDate;
    const todayDateString = todayDate.toISOString().split('T')[0]; //YYYY-MM-DD 형식
    console.log("todayDateString : ", todayDateString);

    if(this.stepArrays.length > 0){
      const lastEntry = this.stepArrays[this.stepArrays.length - 1];
      const lastDateString = new Date(lastEntry[1]).toISOString().split('T')[0];

      console.log("lastDateString : ", lastDateString);

      if (todayDateString !== lastDateString) {
        this.stepArrays.push([this.stepArrays.length, todayDate, todayDate.getDay(), 0, 0, todayDate.getDate()]);
      }
    } else{
      this.stepArrays.push([0, todayDate, todayDate.getDay(), 0, 0, todayDate.getDate()]);
    }
    this.isDataLoading = false;
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
    this.onSaveCount();
  }
  onSaveCount = () => {
    this.isCountSave = this.isCountSave + 1
    if(this.isCountSave >= 180){
      this.onSaveStepArray();
      this.isCountSave = 0;
    }    
  }
  barChartChk = () => {
    console.log('바차트 클릭');
    this.props.navigation.navigate('HealthList', {stepArrays:  this.stepArrays});
  }
  openDrawMenu = () => {
    this.props.navigation.openDrawer();
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
                openDrawerMenu={this.openDrawMenu}
              />
              {/* <Button title='ddd' onPress={this.barChartChk} /> */}
              <Body 
                name={this.state.name} 
                age={this.state.age}
                male={this.state.male}
                stepArrays={this.stepArrays}
                todayDate = {this.state.todayDate}
                onHealthList = {this.barChartChk}
                onBedtime = {this.state.onBedtime}
                onWakeUptime = {this.state.onWakeUptime}
                onSleeptimes = {this.state.onSleeptimes}
                onSleepmins = {this.state.onSleepmins}
                isDataLoading = {this.isDataLoading}
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
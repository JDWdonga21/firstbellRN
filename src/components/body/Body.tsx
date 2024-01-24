import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import Situation1 from './Situation1';
import Situation2 from './Situation2';
import HealthChart from './HealthChart';
import Location from './Location';
import RecLocation from './RecLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type BodyProps = {
  name: string;
  age: number
  male: number;
  todayDate: Date;
  onBedtime: Date,
  onWakeUptime: Date,
  onSleeptimes: number,
  onSleepmins: number,
  onHealthList: () => void,
};

class Body extends Component<BodyProps> {
  //7day step [날짜, 걸음수, 건강점수] 일~토
  stepWeek = [
    [0, 0, 0],
    [1, 0, 0],
    [2, 0, 0],
    [3, 0, 0],
    [4, 0, 0],
    [5, 0, 0],
    [6, 0, 0]
  ]
  async componentDidMount() {
    const storedWeek = await AsyncStorage.getItem('weekSteps');
    if(storedWeek !== null){
      this.stepWeek = JSON.parse(storedWeek);
    }
  }
  async componentWillUnmount() {
    await AsyncStorage.setItem('weekSteps', JSON.stringify(this.stepWeek));
  }

  render() {
    return(
      <View >
        <Situation1          
          age={this.props.age}
          male={this.props.male}   
          todayDate={this.props.todayDate}  
          stepWeek={this.stepWeek}
        />
        {/* <Situation2 
          name={this.props.name} 
          onBedtime = {this.props.onBedtime}
          onWakeUptime = {this.props.onWakeUptime}
          onSleeptimes = {this.props.onSleeptimes}
          onSleepmins = {this.props.onSleepmins}
        /> */}
        <HealthChart 
          male={this.props.male}
          todayDate={this.props.todayDate}
          stepWeek={this.stepWeek}
          onHealthList = {this.props.onHealthList}
        />
        {/* <Location /> */}
        {/* <RecLocation name={this.props.name} /> */}
      </View>
    );
  }  
}
export default Body
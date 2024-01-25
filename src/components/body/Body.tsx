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
type StepArrayEntry = [number, Date, number, number, number, number]
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
  //step Array [idx, 날짜, 요일, 걸음수, 건강점수, 일자]
  stepArrays : StepArrayEntry[] = [

  ]
  async componentDidMount() {
    const storedWeek = await AsyncStorage.getItem('weekSteps');
    if(storedWeek !== null){
      this.stepWeek = JSON.parse(storedWeek);
    }
    const storedStepArray = await AsyncStorage.getItem('stepArrays');
    if(storedStepArray !== null){
      this.stepArrays = JSON.parse(storedStepArray);
    }
    this.todayStepArray();
  }
  async componentWillUnmount() {
    await AsyncStorage.setItem('weekSteps', JSON.stringify(this.stepWeek));
  }

  todayStepArray = () => {
    if(!(this.props.todayDate instanceof Date)) {
      console.error('todayDate is not a valid Date object');
      return;
    }
    const todayDate = this.props.todayDate;
    const todayDateString = todayDate.toISOString().split('T')[0]; //YYYY-MM-DD 형식

    if(this.stepArrays.length > 0){
      const lastEntry = this.stepArrays[this.stepArrays.length - 1];
      const lastDateString = new Date(lastEntry[1]).toISOString().split('T')[0];

      if (todayDateString !== lastDateString) {
        this.stepArrays.push([this.stepArrays.length, todayDate, todayDate.getDay(), 0, 0, todayDate.getDate()]);
      } else{
        this.stepArrays.push([0, todayDate, todayDate.getDay(), 0, 0, todayDate.getDate()]);
      }
    }
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
          stepArrays={this.stepArrays}
          onHealthList = {this.props.onHealthList}
        />
        {/* <Location /> */}
        {/* <RecLocation name={this.props.name} /> */}
      </View>
    );
  }  
}
export default Body
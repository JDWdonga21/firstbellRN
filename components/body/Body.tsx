import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
} from 'react-native';

import Situation1 from './Situation1';
import Situation2 from './Situation2';
import HealthChart from './HealthChart';
import Location from './Location';
import RecLocation from './RecLocation';

type BodyProps = {
  name: string;
  healthScore: number;
  todayDate: Date;
  conditionCode: number;
};

class Body extends Component<BodyProps> {
  render() {
    return(
      <View >
        <Situation1          
          healthScore={this.props.healthScore}   
          todayDate={this.props.todayDate}  
          conditionCode={this.props.conditionCode}   
        />
        <Situation2 name={this.props.name} />
        <HealthChart />
        <Location />
        <RecLocation name={this.props.name} />
      </View>
    );
  }  
}
export default Body
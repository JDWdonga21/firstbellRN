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

class Body extends Component {
  render() {
    const { name } = this.props;
    return(
      <View >
        <Situation1 />
        <Situation2 name={name} />
        <HealthChart />
        <Location />
        <RecLocation name={name} />
      </View>
    );
  }  
}
export default Body
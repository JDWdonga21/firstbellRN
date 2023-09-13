import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
} from 'react-native';

import Situation1 from './Situation1';
import Situation2 from './Situation2';
import HealthChart from './HealthChart';

const Body = ({

}) => {
    return(
        <View >
            <Situation1 />
            <Situation2 />
            <HealthChart />
        </View>
  );
}
export default Body
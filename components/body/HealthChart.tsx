import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';


import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

const healthScore = [ 
  {value:50, label: "23일", frontColor: '#177AD5'}, 
  {value:80, label: "24일", frontColor: '#177AD5'}, 
  {value:90, label: "25일", frontColor: '#177AD5'}, 
  {value:70, label: "26일", frontColor: '#177AD5'}, 
  {value:60, label: "27일", frontColor: '#177AD5'}, 
  {value:40, label: "28일", frontColor: '#177AD5'}, 
  {value:30, label: "29일", frontColor: '#177AD5'} 
]
const amountActivity = [
  {value:62, text: "62%", color: '#ff6464', gradientCenterColor: '#ff6464'}, 
  {value:54, text: "54%", color: '#330086', gradientCenterColor: '#1b0046'},  
]
const renderDot = (color : string) => {
  return (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );
};
const amountActivityComponent = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#ff6464')}
          <Text style={{color: 'white'}}>실외활동량: 62%</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#330086')}
          <Text style={{color: 'white'}}>실내활동량: 54%</Text>
        </View>
      </View>
    </>
  );
};

class HealthChart extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>오늘의 건강점수는 80점으로 양호하며,</Text>
        <Text style={styles.textStyle}>70대 여성 평균 점수보다 10점 높습니다.</Text>
        <BarChart 
          data = {healthScore} 
          autoShiftLabels = {true}
          barWidth={25}
          barBorderRadius={4}
          spacing = {10}
        />
        <View style= {{margin: 20}} />
        <PieChart 
          data = {amountActivity}
          showText
          donut
          sectionAutoFocus
          radius={120}
          textSize={20}
          textColor= '#ffffff'
          fontWeight='900'
          labelsPosition='outward'
          textBackgroundRadius={26}
          innerCircleColor={'#cfd5ff'}
        />
        {amountActivityComponent()}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    flex: 1,
    backgroundColor: '#cfd5ff',
    marginRight: 30,
    marginLeft: 30,
    borderWidth: 1,
    borderColor: '#cfd5ff',
    borderRadius: 20,
  },
  graphStyle: {
    marginVertical: 0,
    borderRadius: 16,
    padding: 0,
    backgroundColor: '#f7f7f7',
  },
  textStyle: {
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center',
  },
});
export default HealthChart
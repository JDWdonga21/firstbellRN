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

type HealthChartProps = {
  
}
type thisHealthChart = {
  healthScore: number,
  ages: number,
  averageHealthScore: number,
  differenceValue: number | null,
  keywordCode: number,
}
class HealthChart extends Component <HealthChartProps, thisHealthChart> {
  constructor(props: HealthChartProps) {
    super(props);
    this.state = {
      healthScore: 85,
      ages: 70,
      averageHealthScore: 65,
      differenceValue: 0,
      keywordCode: 0
    };
  }
  doComparison = () => {
    if( this.state.healthScore > this.state.averageHealthScore ){
      this.setState({
        differenceValue: this.state.healthScore - this.state.averageHealthScore,
        keywordCode: 0
      })
    }
    else if( this.state.healthScore == this.state.averageHealthScore ){
      this.setState({
        differenceValue: null,
        keywordCode: 1
      })
    }
    else{
      this.setState({
        differenceValue: this.state.averageHealthScore - this.state.healthScore,
        keywordCode: 2
      })
    }
  }  
  componentDidMount(): void {
    this.doComparison()
  }
  render(){
    const healthClass = ['최상', '양호', '보통', '불안', '최악']
    const womanAverage = ['여성 평균 점수보다', '여성 평균점수', '남성 평균 점수', '남성 평균점수']
    const averageComparison = ["점 높습니다.", '와 같습니다.', '점 낮습니다.']
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>오늘의 건강점수는 {this.state.healthScore}점으로 {healthClass[2]}하며,</Text>
        <Text style={styles.textStyle}>{this.state.ages}대 {womanAverage[this.state.keywordCode]} {this.state.differenceValue}{averageComparison[this.state.keywordCode]}</Text>
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
          innerRadius={60}
          textSize={20}
          textColor= '#ffffff'
          fontWeight='900'
          labelsPosition='outward'
          textBackgroundRadius={26}
          innerCircleColor={'#cfd5ff'}
          showValuesAsLabels          
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
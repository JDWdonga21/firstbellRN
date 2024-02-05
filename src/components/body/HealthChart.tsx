import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import PlatformTouchable from 'react-native-platform-touchable';

import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";



const defhealthScore = [ 
  {value:10, label: "0일", frontColor: '#FE642E'}, 
  {value:20, label: "0일", frontColor: '#FE642E'}, 
  {value:30, label: "0일", frontColor: '#177AD5'}, 
  {value:40, label: "0일", frontColor: '#177AD5'}, 
  {value:50, label: "0일", frontColor: '#177AD5'}, 
  {value:60, label: "0일", frontColor: '#177AD5'}, 
  {value:70, label: "0일", frontColor: '#177AD5'} 
]
//날짜를 표시하는 함수
const getFormattedDate = (date : Date) => {
  return `${date.getDate()}일`;
}
//지난 일주일간의 날짜를 생성하는 함수
const getLastWeekDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 6; i >=0; i--){
    const day = new Date(today);
    day.setDate(day.getDate() - 1);
    dates.push(getFormattedDate(day));
  }
  return dates;
}
// 건강점수 배열을 생성
const lastWeekDates = getLastWeekDates();

type StepArrayEntry = [number, Date, number, number, number, number];
type HealthChartProps = {
  male: number,
  todayDate: Date,
  stepArrays: StepArrayEntry[],
  onHealthList: () => void,
}
type thisHealthChart = {
  healthScore: number,
  ages: number,
  male: number,
  averageHealthScore: number,
  differenceValue: number | null,
  keywordCode: number,
  healthScores: { value: number, label: string, frontColor: string }[] | any;
}
class HealthChart extends Component <HealthChartProps, thisHealthChart> {
  timer = null as null | NodeJS.Timeout;
  constructor(props: HealthChartProps) {
    super(props);
    this.state = {
      healthScore: 0,
      ages: 70,
      male: this.props.male,
      averageHealthScore: 65,
      differenceValue: 0,
      keywordCode: 0,
      healthScores: defhealthScore
    };
  };
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
  }; 
  makeIndex = (_index : number) => {
    const todayWeekday = this.props.todayDate.getDay();
    if(todayWeekday - (6 - _index) < 0){
      return 7 + (todayWeekday - (6 - _index));
    }else {
      return todayWeekday - (6 - _index);
    }
  };
  
  calculateHealthScores2 = (props: HealthChartProps) => {
    try{
      this.setState({
        healthScore : props.stepArrays[this.props.stepArrays.length-1][4],
      })
    }catch(err){
      console.log(err, props.stepArrays[this.props.stepArrays.length-1])
    }
    try{
      if(this.props.stepArrays.length <=7){
        return props.stepArrays.map((index :StepArrayEntry) => {
          if(index !== undefined){
            if(index[2] === 0 || index[2] === 6){
              return{
                value: index[4],
                label: index[5]+'일',
                frontColor: '#FE642E'
              }
            }else{
              return{
                value: index[4],
                label: index[5]+'일',
                frontColor: '#177AD5'
              }
            }
          }        
        });
      } else {
        //7개 이상
        return props.stepArrays.slice(-7).map((index :StepArrayEntry) => {
          if(index !== undefined){
            if(index[2] === 0 || index[2] === 6){
              return{
                value: index[4],
                label: index[5]+'일',
                frontColor: '#FE642E'
              }
            }else{
              return{
                value: index[4],
                label: index[5]+'일',
                frontColor: '#177AD5'
              }
            }            
          }        
        });
      }
    } catch(err){
      console.error("차트 에러", err);
    }    
  }
  componentDidMount(): void {
    this.timer = setInterval(() => this.chatUpdate(), 10000);
    const nowDay = this.props.todayDate.getDay();
    console.log(nowDay);
  };
  componentWillUnmount(): void {
    if(this.timer){
      clearInterval(this.timer);
    }
  };
  chatUpdate = () => {
    this.setState({
      healthScores: this.calculateHealthScores2(this.props),
    });
    this.doComparison();
  };
  barChartChk = () => {
    console.log('바차트 클릭');
    this.props.onHealthList();
  }
  render(){
    const healthClass = ['최상', '양호', '보통', '불안', '최악']
    const womanAverage = ['여성 평균 점수보다', '여성 평균점수', '남성 평균 점수', '남성 평균점수']
    const averageComparison = ["점 높습니다.", '와 같습니다.', '점 낮습니다.']
    return (
      <View style={styles.container}>
        <View
          style={{flex: 1, minHeight: 110, alignItems: 'center', justifyContent: 'center'}}
        >
          <Text style={styles.textStyle}>오늘의 건강점수는 {this.state.healthScore}점으로 {healthClass[2]}하며,</Text>
          <Text style={styles.textStyle}>{this.state.ages}대 {womanAverage[this.state.keywordCode]} {this.state.differenceValue}{averageComparison[this.state.keywordCode]}</Text>
        </View>
        <View
          style={{flex: 1, justifyContent: 'center'}}
        >
          <PlatformTouchable
            onPress={this.barChartChk}
            style={{flex: 1}}
            background={PlatformTouchable.Ripple('white')}
          >
            {
              this.state.healthScores !== null ?
              <BarChart 
                data = {this.state.healthScores} 
                autoShiftLabels = {true}
                barWidth={25}
                barBorderRadius={4}
                spacing = {10}
              />
              :
              <BarChart 
                data = {defhealthScore} 
                autoShiftLabels = {true}
                barWidth={25}
                barBorderRadius={4}
                spacing = {10}
              />
            }
          </PlatformTouchable>
        </View>
        
        
        
        
        <View style= {{margin: 20}} />
        {/* <PieChart 
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
        {amountActivityComponent()} */}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
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
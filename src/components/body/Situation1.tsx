import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import PlatformTouchable from 'react-native-platform-touchable';


// 만보기 기능 구현
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

import {
  isSensorWorking,
  isStepCountingSupported,
  parseStepData,
  startStepCounterUpdate,
  stopStepCounterUpdate,
  type ParsedStepCountData,
} from '@dongminyu/react-native-step-counter'
import { getBodySensorPermission, getStepCounterPermission } from './permission'

type SensorType<T = typeof Platform.OS> = T extends 'ios'
  ? 'CMPedometer'
  : T extends 'android'
  ? 'Step Counter' | 'Accelerometer'
  : 'NONE';

type SensorName = SensorType<Platform['OS']>;

const initState = {
  dailyGoal: '0/10000 steps',
  stepsString: '0 steps',
  calories: '0.0 kCal',
  distance: '0.0 m',
}

type AdditionalInfo = Partial<ParsedStepCountData>;

// 이미지 에셋
import Heart from '../../../assets/icons/heart.svg';
type StepArrayEntry = [number, Date, number, number, number, number];
type SituationProps = {
  age: number;
  male: number;
  //stepWeek: number[][];
  isDataLoading: boolean;
  stepArrays: StepArrayEntry[];
  todayDate: Date;
  //conditionCode: number;
}
type thisSituation = {
  healthScore: number,
  todayDate: Date,
  onSteps: number,
  //stepWeeks: number[][],
  stepCount: number,
  //
  loaded: boolean,
  supported: boolean,
  granted: boolean,
  sensorType: string,
  additionalInfo: any,
}
//평균 걸음수 (20대 ~ 70대)
const averNumStep = {
  20: [7230, 5564],
  30: [7381, 5662],
  40: [7546, 6091],
  50: [8105, 6700],
  60: [8803, 7459],
  70: [8546, 7766],
}


class Situation1 extends Component<SituationProps, thisSituation> {
  // 만보기 구현 상태 값
  stepCounter = {
    firstStep: false,
    mySteps: 0,
    backgroundStep: 0,
    HealthCheck: 0,
    conditionCode: 0,
  };
  resultCounter = {
    newSteps: 0,
    resultDate: '',
    resultDay: 0,
  };
  constructor(props: SituationProps) {
    super(props);
    this.state = {
      healthScore: 0,
      todayDate: this.props.todayDate,
      //stepWeeks: this.props.stepWeek,
      //오늘 걸음 수
      onSteps : 0,
      //
      stepCount : 0,
      loaded: false,
      supported: false,
      granted: false,
      sensorType: 'NONE',
      additionalInfo: initState,
    };
  }
  
  async componentDidMount() {
    //저장된 걸음수 데이터 가져오기
    const storedStepData = await AsyncStorage.getItem('stepCount');
    if (storedStepData !== null) {
      const storedStepCount = JSON.parse(storedStepData);
      console.log("불러온 시간날짜 : ", storedStepCount.resultDate)
      console.log("불러온 걸음 수 : ", storedStepCount.newSteps)
      //오늘 날짜랑 비교해서 날짜 다르면 걸음 수 => 0
      console.log("오늘 날짜 : ", this.dateStamp());
      if(this.dateStamp() !== storedStepCount.resultDate){
        console.log("새로운 하루가 시작되었다.");
        Toast.show("새로운 하루가 시작되었다.", 1);
        this.stepCounter.mySteps = 0;
        this.resultCounter.resultDate = this.dateStamp();
      }else{
        console.log("기존 걸음 수 : ", storedStepCount.newSteps);
        Toast.show(`기존 걸음 수 : ${storedStepCount.newSteps}`, 1);
        this.stepCounter.mySteps = parseInt((storedStepCount.newSteps), 10);
        this.resultCounter.resultDate = this.dateStamp();
      }
      this.setState({
        onSteps : parseInt((storedStepCount.newSteps), 10),
      })
    }
    await this.isPedometerSupported();
    this.dailyHealth();
  };
  async componentWillUnmount() {
    await this.stopStepCounter();
    console.log("저장되는 걸음 수 : ", this.resultCounter.newSteps);
    await AsyncStorage.setItem('stepCount', JSON.stringify(this.resultCounter));
    this.stepCounter.mySteps = 0;
    this.resultCounter.newSteps = 0;
    this.setState({
      onSteps: 0,
      stepCount: 0,
    })
  };

  isPedometerSupported = () => {
    isStepCountingSupported().then(result =>{
      this.setState({
        granted: result.granted === true,
        supported: result.supported === true,
      });
      if (result.granted === true && result.supported === true){
        this.startStepCounter();
      }
    });
  };

  startStepCounter = () => {
    startStepCounterUpdate(new Date(), data =>{
      const persedData = parseStepData(data);
      this.resultCounter.resultDate = this.dateStamp();
      if(persedData.steps === 0){
        console.log("parseData.steps는 0");
        this.resultCounter.newSteps = this.stepCounter.mySteps;
      } else{
        if(this.stepCounter.firstStep){
          console.log("parseData.steps는 ", persedData.steps);
          this.resultCounter.newSteps = this.stepCounter.mySteps + persedData.steps;
        }else{
          this.stepCounter.firstStep = true;
          this.resultCounter.newSteps = this.stepCounter.mySteps;
        }
      }
      this.setState({
        sensorType: data.counterType as SensorName,
        onSteps: persedData.steps,
        stepCount: this.resultCounter.newSteps,
        additionalInfo: {...persedData},
        loaded: true,
      });
      this.dailyHealth();
    });
  };
  stopStepCounter = () => {
    this.setState({
      additionalInfo: initState,
      loaded: false,
    });
    stopStepCounterUpdate();
  };

  forceUseAnotherSensor = () => {
    if (isSensorWorking) {
      this.stopStepCounter();
    } else {
      const permissionMethod = this.state.sensorType === 'Step Counter'
       ? getBodySensorPermission
       : getStepCounterPermission;

       permissionMethod().then(granted => {
        this.setState({ granted });
        this.startStepCounter();
       });
    }
  };
  //
  averageNumStep = (_age: number, _male: number) => {
    if(_age >= 20 && _age < 30){
      return averNumStep[20][_male]
    } else if(_age >= 30 && _age <40){
      return averNumStep[30][_male]
    } else if(_age >= 40 && _age <50){
      return averNumStep[40][_male]
    } else if(_age >= 50 && _age <60){
      return averNumStep[50][_male]
    } else if(_age >= 60 && _age <70){
      return averNumStep[60][_male]
    } else if(_age >= 70 && _age <80){
      return averNumStep[70][_male]
    }
  };
  dailyHealth = async () => {    
    // 활동량(걸음수) /나이대 평균 걸음수 * 100
    // 나이대 평균 걸음 수 [남성, 여성]
    console.log("건강점수")
    const averageStep = this.averageNumStep(this.props.age, this.props.male);
    if (averageStep !== undefined){
      const resultScr = await Math.floor((this.resultCounter.newSteps / averageStep) * 100);
      //
      // this.props.stepWeek[this.state.todayDate.getDay()][0] = this.state.todayDate.getDate();
      // this.props.stepWeek[this.state.todayDate.getDay()][1] = this.resultCounter.newSteps;
      // this.props.stepWeek[this.state.todayDate.getDay()][2] = resultScr;
      //
      if(this.props.isDataLoading !== true){
        this.props.stepArrays[this.props.stepArrays.length - 1][3] = this.resultCounter.newSteps;
        this.props.stepArrays[this.props.stepArrays.length - 1][4] = resultScr;
      }      
      this.setState({
        healthScore: resultScr
      })    
      if(resultScr >= 90){
        this.stepCounter.conditionCode = 0
      } else if (resultScr >= 80 && resultScr < 90) {
        this.stepCounter.conditionCode = 1
      } else if (resultScr >= 70 && resultScr < 80) {
        this.stepCounter.conditionCode = 2
      } else if (resultScr >= 60 && resultScr < 70) {
        this.stepCounter.conditionCode = 3
      } else {
        this.stepCounter.conditionCode = 4
      }
    }    
  };

  dateStamp = () => {
    const newTimes = this.props.todayDate.getFullYear().toString()+(this.props.todayDate.getMonth()+1).toString()+this.props.todayDate.getDate().toString();
    console.log("찍히는 시간", newTimes);
    return newTimes;
  };

  healthInfo = () => {
    // if(this.props.stepWeek){
    //   this.props.stepWeek.forEach(element => {
    //     console.log("---- - ---- - ----");
    //     console.log(element);
    //   });
    //   console.log("---- - ---- - ----");
    // }
  };

  render(){
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const todayCondition = ['최상의', '양호한', '피곤한', '불쾌한', '위험한']
    return(
      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'black'}}>지금 측정되는 걸음 수 : {this.state.onSteps}</Text>
          <Text style={{color: 'black'}}>총 걸음 수 : {this.state.stepCount}</Text>
        </View>
        <PlatformTouchable
          onPress={this.healthInfo}
          style={[styles.pinkBox]}
          background={PlatformTouchable.Ripple('white')}
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 6, justifyContent: 'center'}}>
              <Text style={styles.pinkBoxText1}>
                {this.state.todayDate.getMonth() + 1}월 
                {this.state.todayDate.getDate()}일 
                ({days[this.state.todayDate.getDay()]}) 오늘의 상태는
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={styles.pinkBoxText1Bold}>{todayCondition[this.stepCounter.conditionCode]}</Text>
                <Text style={styles.pinkBoxText1Bold}> 상태입니다.</Text>
              </View>
            </View>
            <View style={{flex: 2}}>
              <View style={{flex: 0.5}} />
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{position: 'absolute', flex: 1, top: 0, left: 0}}>
                  <Heart />
                </View>
                <View style={{flex: 1, flexDirection: 'row', top: 0, left: 0}}>
                  <View style={{flex: 0.2}} />
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 24, color: '#ff73a9', textAlign: 'center', fontWeight: 'bold'}}>{this.state.healthScore}</Text>
                  </View>
                  <View style={{flex: 1}} />
                </View>
              </View>
              <View style={{flex: 0.5}} />
            </View>
          </View>
        </PlatformTouchable>        
        {/* <PlatformTouchable style={styles.pinkBox2}>          
          <View style={{flex: 4, justifyContent: 'center'}}>
            <Text style={styles.pinkBoxText2}>말동무가 필요하신가요?</Text>
            <View style={{marginTop: 10}}>
              <Text style={styles.pinkBoxText2Bold}>대화 시작하기</Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
            <TouchableOpacity onPress={this.handlePress}>
              <Image source={require('../../assets/ai.png')} />
            </TouchableOpacity>
          </View>                    
        </PlatformTouchable>         */}
      </View>
    );
  }
  
}
const styles = StyleSheet.create({
  pinkBox: {
    marginTop: 25,
    paddingLeft: 20,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ff73a9',
    marginRight: 30,
    marginLeft: 30,
    height: 100,
    borderWidth: 1,
    borderColor: '#ff73a9',
    borderTopRightRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  pinkBox2: {
    marginTop: 10,
    paddingLeft: 20,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ff4385',
    marginRight: 30,
    marginLeft: 30,
    height: 100,
    borderWidth: 1,
    borderColor: '#ff4385',
    borderRadius: 20,
  },
  pinkBoxText1: {
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
  },
  pinkBoxText1Bold: {
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  pinkBoxText2: {
    fontSize: 18,
    color: 'white',
    textAlign: 'right',
  },
  pinkBoxText2Bold: {
    fontSize: 18,
    color: 'white',
    textAlign: 'right',
    fontWeight: 'bold',
  },
})
export default Situation1
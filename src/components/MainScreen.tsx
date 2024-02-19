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
import Accordion from 'react-native-collapsible/Accordion';

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
  activeSections: []
};

const SECTIONS = [
  {
    title: 'First',
    header: '탄핵소추의 의결을 받은 자는...',
    content: '탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다.\n 재산권의 행사는 공공복리에 적합하도록 하여야 한다.\n 명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가 재판의 전제가 된 경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다.\n 타인의 범죄행위로 인하여 생명·신체에 대한 피해를 받은 국민은 법률이 정하는 바에 의하여 국가로부터 구조를 받을 수 있다.\n 감사원의 조직·직무범위·감사위원의 자격·감사대상공무원의 범위 기타 필요한 사항은 법률로 정한다.'
  },
  {
    title: 'Second',
    header: '국토와 자원은 국가의 보호를...',
    content: '국토와 자원은 국가의 보호를 받으며, 국가는 그 균형있는 개발과 이용을 위하여 필요한 계획을 수립한다. 국가안전보장에 관련되는 대외정책·군사정책과 국내정책의 수립에 관하여 국무회의의 심의에 앞서 대통령의 자문에 응하기 위하여 국가안전보장회의를 둔다.'
  }
]
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
      //아코디언
      activeSections: [],
    };
  }

  _renderSectionTitle = (section : any) => {
    return (
      <View style={styles.content}>
        <Text style={{fontSize: 20, fontWeight : 'bold'}}>{section.title}</Text>
      </View>
    );
  };
  _renderHeader = (section : any, index: number, isActive: boolean) => {
    const previewLength = 20;
    const previewContent = section.content.substring(0, previewLength) + '...';
    return (
      <View style={styles.header}>
        <Text style={{fontWeight : 'bold'}}>{section.title}</Text>
        {!isActive && (
          <Text>{previewContent}</Text>
        )}
      </View>
    );
  };
  _renderContent = (section : any, _ : any,isActive : boolean) => {
    const previewLength = 50;
    const previewContent = section.content.substring(0, previewLength) + '...';
    return (
      <View style={styles.content}>
        <Text>
          {isActive ? section.content : previewContent}
        </Text>
      </View>
    );
  };
  _updateSections = (activeSections : any) => {
    this.setState({activeSections})
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
  // 오늘 날짜의 값이 있으면 pass, 없으면 오늘 날짜의 배열 삽입
  todayStepArray = () => {
    if(!(this.state.todayDate instanceof Date)) {
      console.error('todayDate is not a valid Date object');
      return;
    }
    const todayDate = this.state.todayDate;
    const todayDateString = todayDate.toISOString().split('T')[0]; //YYYY-MM-DD 형식
    console.log("오늘 날짜 스트링 : ", todayDateString);

    if(this.stepArrays.length > 0){
      // 중복검사
      const exists = this.stepArrays.some(entry => {
        const entryDate = new Date(entry[1]).toISOString().split('T')[0];
        return entryDate === todayDateString;
      });

      if (!exists){
        console.log("새로 생성 : ", todayDate);
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
              <View style={{alignItems: 'center'}}>
                <Accordion 
                  sections={SECTIONS}
                  activeSections={this.state.activeSections}
                  renderSectionTitle={this._renderSectionTitle}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  onChange={this._updateSections}
                />
              </View>              
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
  header: {
    backgroundColor: '#6D6A6A'
  },
  content: {
    backgroundColor: '#C3C1C1'
  }
});

export default MainScreen;
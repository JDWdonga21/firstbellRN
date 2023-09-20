import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

// 하트
import Heart from '../../assets/heart.svg';

type SituationProps = {
  healthScore: number;
  todayDate: Date;
  conditionCode: number;
}
type thisSituation = {
  healthScore: number,
  todayDate: Date,
  conditionCode: number,
}

class Situation1 extends Component<SituationProps, thisSituation> {
  constructor(props: SituationProps) {
    super(props);
    this.state = {
      healthScore: this.props.healthScore,
      todayDate: this.props.todayDate,
      conditionCode: this.props.conditionCode,
    };
  }
  handlePress = () => {
    Alert.alert('AI친구 입니다.', '이야기를 시작할까요?', [
        {
          text: '취소',
          onPress: () => console.log('취소하기'),
          style: 'cancel',
        },
        {text: '통화', onPress: () => console.log('AI 대화하기')},
    ]);
  }
  render(){
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const todayCondition = ['최상의', '양호한', '피곤한', '불쾌한', '위험한']
    return(
      <View>
        <View style={styles.pinkBox}>
          <View style={{flex: 4, justifyContent: 'center'}}>
            <Text style={styles.pinkBoxText1}>
              {this.state.todayDate.getMonth() + 1}월 
              {this.state.todayDate.getDate()}일 
              ({days[this.state.todayDate.getDay()]}) 오늘의 상태는
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={styles.pinkBoxText1Bold}>{todayCondition[this.state.conditionCode]}</Text>
              <Text style={styles.pinkBoxText1Bold}> 상태입니다.</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={{flex: 0.5}} />
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{position: 'absolute', flex: 1, top: 0, left: 0}}>
                <Heart />
              </View>
              <View style={{position: 'absolute', flex: 1, top: 0, left: 0}}>
                <Text style={{fontSize: 28, color: '#ff73a9', marginLeft: 10, textAlign: 'center', fontWeight: 'bold'}}>{this.state.healthScore}</Text>
              </View>
            </View>
            <View style={{flex: 0.5}} />
          </View>
        </View>        
        <View style={styles.pinkBox2}>          
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
        </View>        
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
    borderTopRightRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
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
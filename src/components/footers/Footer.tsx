import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

// 전화기
import Call from '../../../assets/call.svg';

class Footer extends Component {
  createTwoButtonAlert = () =>{
    Alert.alert('위급상황 통화입니다.', '통화를 걸까요?', [
        {
          text: '취소',
          onPress: () => console.log('취소하기'),
          style: 'cancel',
        },
        {text: '통화', onPress: () => console.log('긴급 전화걸기')},
    ]);
  }
    
  handlePress = () => {
    this.createTwoButtonAlert();
    console.log('위급상황 통화버튼 클릭');
  };
  
  render() {
    return(
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <View style={{flex: 10}}>
          <TouchableOpacity onPress={this.handlePress}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.oneLineRadius}>
                <View style={{flex: 1}} />
                <View style={{flex: 12}}>
                  <Text style={styles.footerText}>위급상황 통화하기</Text>
                </View>
                <View style={{flex: 1}} />
              </View>
              <View style={{flex: 1}}/>
              <Call width={60} height={60} style={{flex: 1}} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}} />
      </View>
    );
  }      
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30,
    padding: 30,
  },
  oneLineRadius: {
    flexDirection: 'row',
    flex: 12,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ff1515',
    borderRadius: 30,
  },
  footerText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#ff1515'
  },
});
export default Footer
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

// 전화기
import Call from '../assets/call.svg';

const Footer = ({

}) => {
  const createTwoButtonAlert = () =>
    Alert.alert('위급상황 통화입니다.', '통화를 걸까요?', [
      {
        text: '취소',
        onPress: () => console.log('취소하기'),
        style: 'cancel',
      },
      {text: '통화', onPress: () => console.log('긴급 전화걸기')},
  ]);  
  const handlePress = () => {
    // Your action here
    createTwoButtonAlert();
    console.log('위급상황 통화버튼 클릭');
  };

  return(
    <View style={{marginRight: 30, marginLeft: 30, margin: 20, padding: 30}}>
      <TouchableOpacity onPress={handlePress}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.oneLineRadius2}>
            <Text style={{fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#ff1515' }}>위급상황 통화하기</Text>
          </View>
          <Call />
        </View>
      </TouchableOpacity>
    </View>
  )    
}

const styles = StyleSheet.create({
  oneLineRadius2: {
    margin: 5,
    marginBottom: 5,
    padding: 2,
    paddingStart: 10,
    backgroundColor: 'white',
    width: '85%',
    borderWidth: 2,
    borderColor: '#ff1515',
    borderRadius: 30,
  },
});
export default Footer
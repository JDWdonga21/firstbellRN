import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
} from 'react-native';

// 하트
import Heart from '../../assets/heart.svg';

const Situation1 = ({

}) => {
    return(
        <View>
            <View style={styles.pinkBox}>
                <View style={{flex: 4, justifyContent: 'center'}}>
                <Text style={styles.pinkBoxText1}>8월 21일 (월) 오늘의 상태는</Text>
                <Text style={styles.pinkBoxText1}>양호한 상태입니다.</Text>
            </View>
            <View style={{flex: 1}}>
                <View style={{flex: 0.5}} />
                <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{position: 'absolute', flex: 1, top: 0, left: 0}}>
                    <Heart />
                </View>
                <View style={{position: 'absolute', flex: 1, top: 0, left: 0}}>
                    <Text style={{fontSize: 28, color: '#ff73a9', marginLeft: 10, textAlign: 'center', fontWeight: 'bold'}}>65</Text>
                </View>
                </View>
                <View style={{flex: 0.5}} />
            </View>
            </View>
            <View style={styles.pinkBox2}>
            <View style={{flex: 4, justifyContent: 'center'}}>
                <Text style={styles.pinkBoxText2}>말동무가 필요하신가요?</Text>
                <Text style={styles.pinkBoxText2}>대화 시작하기</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
                <Image source={require('../../assets/ai.png')} />
            </View>
            </View>
        </View>
  );
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
  pinkBoxText2: {
    fontSize: 18,
    color: 'white',
    textAlign: 'right',
  },
})
export default Situation1
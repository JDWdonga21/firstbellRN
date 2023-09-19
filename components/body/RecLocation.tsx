import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

type RecLocationProps = {
  name: string;
};

class RecLocation extends Component <RecLocationProps> {
  render(){
    return(
      <View style={styles.container}>
        <View>
          <Text style={{fontSize: 20, marginBottom: 10}}>
            {this.props.name}님의 활동 패턴을 기반
          </Text>
          <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 10}}>
            오늘의 추천 장소
          </Text>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <View style={styles.imgStyle}>
              <Image opacity={0.5} source={require('../../assets/place_1.png')} />
              <View style={styles.overlappingPicNtext}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 30, marginBottom: 10}}>
                  수영 사적공원
                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 5}}>
                  걷기 15분
                </Text>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                  난이도 중 ★★☆
                </Text>
              </View>
              <View style={styles.overlappingPicNtext2}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                  864m, 720걸음
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <View style={styles.imgStyle}>
              <Image opacity={0.5} source={require('../../assets/place_2.png')} />
              <View style={styles.overlappingPicNtext}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 30, marginBottom: 10}}>
                  망미 골목투어
                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 5}}>
                  걷기 20분
                </Text>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                  난이도 중 ★★☆
                </Text>
              </View>
              <View style={styles.overlappingPicNtext2}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                  564m, 340걸음
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginRight: 30,
    marginLeft: 30,
    margin: 20
  },
  imgStyle: {
    flex: 1, 
    backgroundColor: 'black',
    borderRadius: 20,
  },
  overlappingPicNtext: {
    position: 'absolute',
    flex: 1,
    top: 0, // Adjust these values to control the overlap
    left: 0,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  overlappingPicNtext2: {
    position: 'absolute',
    flex: 1,
    bottom: 15, // Adjust these values to control the overlap
    left: 15,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
});
export default RecLocation
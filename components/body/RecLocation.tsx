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
type ThisRecLocation = {
  reLoca1 : string,
  reLoca2 : string,
  reLoca1Min : number,
  reLoca2Min : number,
  reLoca1Meter : number,
  reLoca2Meter : number,
  reLoca1Step : number,
  reLoca2Step : number,
  reLoca1DiffStar : number,
  reLoca2DiffStar : number,
  thisDates : Date,
};

class RecLocation extends Component <RecLocationProps, ThisRecLocation> {
  constructor(props: RecLocationProps) {
    super(props);
    this.state = {      
      reLoca1 : '수영 사적공원',
      reLoca2 : '망미 골목투어',
      reLoca1Min : 15,
      reLoca2Min : 20,
      reLoca1Meter : 864,
      reLoca2Meter : 564,
      reLoca1Step : 700,
      reLoca2Step : 600,
      reLoca1DiffStar : 1,
      reLoca2DiffStar : 2,
      thisDates : new Date(),
    };
  }
  render(){
    const distanceDifficulty = ["★★★", "★★☆","★☆☆", "☆☆☆"]
    const distanceD1 = distanceDifficulty[this.state.reLoca1DiffStar]
    const distanceD2 = distanceDifficulty[this.state.reLoca2DiffStar]
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
                  {this.state.reLoca1}
                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 5}}>
                  걷기 {this.state.reLoca1Min}분
                </Text>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                  난이도 중 {distanceD1}
                </Text>
              </View>
              <View style={styles.overlappingPicNtext2}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                  {this.state.reLoca1Meter}m, {this.state.reLoca1Step}걸음
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <View style={styles.imgStyle}>
              <Image opacity={0.5} source={require('../../assets/place_2.png')} />
              <View style={styles.overlappingPicNtext}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 30, marginBottom: 10}}>
                  {this.state.reLoca2}
                </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 5}}>
                  걷기 {this.state.reLoca2Min}분
                </Text>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                  난이도 중 {distanceD2}
                </Text>
              </View>
              <View style={styles.overlappingPicNtext2}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                  {this.state.reLoca2Meter}m, {this.state.reLoca2Step}걸음
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
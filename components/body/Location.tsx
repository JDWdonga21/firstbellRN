import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type LocationProps = {
  
};
type thisLocation = {
  loca1 : string,
  loca2 : string,
  loca3 : string,
  loca1Num : number,
  loca2Num : number,
  loca3Num : number,
  thisDates : Date,
};

class Location extends Component <LocationProps, thisLocation> {
  constructor(props: LocationProps) {
    super(props);
    this.state = {      
      loca1 : '수영구 광안동',
      loca2 : '동래구 안락동',
      loca3 : '수영구 남천동',
      loca1Num : 25,
      loca2Num : 12,
      loca3Num : 9,
      thisDates : new Date(),
    };
  }
  render(){
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>실외 활동 정보</Text>
          <Text style={styles.titleTextBold}>내가 자주 방문하는 동네는,</Text>
        </View>
        <View style={styles.oneLineRadius}>
          <Text style={styles.textStyle}>1. {this.state.loca1} {this.state.loca1Num}회</Text>
        </View>
        <View style={styles.oneLineRadius}>
          <Text style={styles.textStyle}>2. {this.state.loca2} {this.state.loca2Num}회</Text>
        </View>
        <View style={styles.oneLineRadius}>
          <Text style={styles.textStyle}>3. {this.state.loca3} {this.state.loca3Num}회</Text>
        </View>
        <View>
          <Text>※{this.state.thisDates.toLocaleDateString('ko-KR', {year: 'numeric', month: 'long', day: undefined})}  기술</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 20,
    flex: 1,
    backgroundColor: '#c3aeff',
    marginRight: 30,
    marginLeft: 30,
    borderWidth: 1,
    borderColor: '#c3aeff',
    borderTopRightRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  oneLineRadius: {
    margin: 5,
    marginBottom: 5,
    padding: 2,
    paddingStart: 10,
    backgroundColor: 'white',
    width: '85%',
    borderWidth: 2,
    borderColor: '#6b15ff',
    borderRadius: 30,
  },
  titleText: {
    fontSize: 20, 
    marginBottom: 10,
  },
  titleTextBold: {
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: 'black',
  },
  textStyle: {
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
});
export default Location
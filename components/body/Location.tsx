import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Location = ({

}) => {
  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>실외 활동 정보</Text>
        <Text style={styles.titleTextBold}>내가 자주 방문하는 동네는,</Text>
      </View>
      <View style={styles.oneLineRadius}>
        <Text style={styles.textStyle}>1. 수영구 광안동 25회</Text>
      </View>
      <View style={styles.oneLineRadius}>
        <Text style={styles.textStyle}>2. 동래구 안락동 12회</Text>
      </View>
      <View style={styles.oneLineRadius}>
        <Text style={styles.textStyle}>3. 수영구 남천동 9회</Text>
      </View>
      <View>
        <Text>※2023년 6월 기술</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
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
    fontWeight: 'bold', 
    marginBottom: 10,
  },
  titleTextBold: {
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  textStyle: {
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default Location
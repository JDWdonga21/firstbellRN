import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
} from 'react-native';
//해더 이미지
import AppHeaders from '../assets/header_background.svg';
import Headerimg from '../assets/header_img.svg';

const Header = ({

}) => {
    return(
        <View style={{flexDirection: 'column', flex: 1}}>
          <AppHeaders />
          <View style={styles.overlappingSVG}>
            <Headerimg />
          </View>
          <View style={styles.overlappingTest}>
            <View style={{flexDirection: 'column', flex: 1}}>
              <View style={{flex: 1}}>
                <Text style={styles.nameText}>김광자님,</Text>
                <Text style={styles.sectionTitle}>오늘 기분은 어때요?</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', marginTop: 30}}>
                <View style={styles.location}>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={require('../assets/gps.png')} />
                    <Text style={styles.locationWeather}>해운대구 우동</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={require('../assets/rain.png')} />
                    <Text style={styles.locationWeather}>외출 시 우산 챙겨 가세요!</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.Weather}>
            <Text style={styles.locationWeather}>현재기온 12°</Text>
          </View>
        </View>
    )
}
const styles = StyleSheet.create({
  nameText: {
    fontSize: 30,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  locationWeather: {
    fontSize: 15,
    fontWeight: '900',
  },
  overlappingSVG: {
    position: 'absolute',
    flex: 1,
    top: 0, // Adjust these values to control the overlap
    left: 0,
  },
  overlappingTest: {
    position: 'absolute',
    bottom: 0, // Adjust these values to control the overlap
    left: 30,
    flexDirection: 'column',
    flex: 1,
  },
  location: {
    flex: 4,
    bottom: 0, // Adjust these values to control the overlap
    left: 0,
  },
  Weather: {
    position: 'absolute',
    flex: 1,
    bottom: 0, // Adjust these values to control the overlap
    right: 30,
  },
});
export default Header
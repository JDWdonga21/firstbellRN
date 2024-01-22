import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  StatusBar,
  ViewStyle,
  Platform,
} from 'react-native';
import PlatformTouchable from 'react-native-platform-touchable';
import Icons from '../common/Icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

//해더 이미지
import AppHeaders from '../../assets/old-man-walking/header_background.svg';
import Headerimg from '../../assets/old-man-walking/header_img.svg';
import Sunny from '../../assets/icons/weather/Sunny.svg';
import FewClouds from '../../assets/icons/weather/Few Cloudy.svg';
import ScatteredClouds from '../../assets/icons/weather/PartlyCloudy.svg';
import BrokeClouds from '../../assets/icons/weather/broken clouds.svg';
import ShowerRain from '../../assets/icons/weather/shower Rain.svg';
import Rain from '../../assets/icons/weather/Rainy.svg';
import Thunderstorm from '../../assets/icons/weather/RainThunder.svg';
import Snow from '../../assets/icons/weather/Snowy.svg';
import Mist from '../../assets/icons/weather/mist.svg';

//권한

//날씨 정보 받아오기(위치 가져오기)


type HeaderProps = {
  name: string;
  address: string
  temperatures: number;
};
type Headers = {
  weathersIdx: number;
  weather: {
    temp: number | string;
    condition: string;
    icons: string;
  }
}

class Header extends Component<HeaderProps, Headers> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      weathersIdx : 0,
      weather: {
        temp: '-',
        condition: '',
        icons: '',
      }
    }
  }
  render() {
    const weatherList = [
      {
        weathersIcon : <Sunny />,
        weathersText : "맑은 날"
      },
      {
        weathersIcon : <FewClouds />,
        weathersText : "약간 구름"
      },
      {
        weathersIcon : <ScatteredClouds />,
        weathersText : "조금 구름"
      },
      {
        weathersIcon : <BrokeClouds />,
        weathersText : "많은 구름"
      },
      {
        weathersIcon : <ShowerRain />,
        weathersText : "우산을 준비"
      },
      {
        weathersIcon : <Rain />,
        weathersText : "비 오는 날"
      },
      {
        weathersIcon : <Thunderstorm />,
        weathersText : "악천우 상황"
      },
      {
        weathersIcon : <Snow />,
        weathersText : "미끄럼 주의"
      },
      {
        weathersIcon : <Mist />,
        weathersText : "안개 발생"
      },
    ]
    return(
      <SafeAreaProvider style={{flexDirection: 'column', flex: 1}}>
        <StatusBar translucent={true} />
        {        

        }
        <SafeAreaProvider style={{flexDirection: 'column', flex: 1}}>
          <AppHeaders />
          <View style={styles.overlappingSVG}>
            <Headerimg />
          </View>
          <View style={[styles.overlappingMenuBar, {paddingTop: 30,}]}>
            <View style={[styles.Menuicon, {borderRadius: 20,}]}>
              <PlatformTouchable
                onPress={()=>{console.log("눌러")}}
                background={
                  PlatformTouchable.Ripple('gray', true)
                }
              >
                <Icons isClickable={false} type={'Ionicons'} name='menu' size={32} color={Colors.black}/>
              </PlatformTouchable>
            </View>
          </View>
            <View style={[styles.overlappingTest, {}]}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 30, color: 'black'}}>{this.props.name}님,</Text>
                  <Text style={{fontSize: 30, color: 'black', fontWeight: 'bold'}}>오늘 기분은 어때요?</Text>
                </View>
              <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                <View style={styles.location}>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 1}}>
                      {/* 현제위치 주소 */}
                    </View> 
                    <View>
                      <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'left'}}>{weatherList[this.state.weathersIdx].weathersText}</Text>
                    </View>                      
                  </View> 
                </View>        
              </View>
            </View>
          </View>
          <View style={styles.Weathericon}>
            {weatherList[this.state.weathersIdx].weathersIcon}
          </View>      
          <View style={styles.Weather}>
            <Text allowFontScaling={false} style={{fontSize: 30, fontWeight: 'bold'}}>{this.state.weather.temp}°</Text>
          </View>
        </SafeAreaProvider>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  overlappingSVG: {
    position: 'absolute',
    flex: 1,
    top: 0, // Adjust these values to control the overlap
    left: 0,
  },
  overlappingMenuBar: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    paddingTop: StatusBar.currentHeight,
  },
  overlappingTest: {
    position: 'absolute',
    bottom: 0, // Adjust these values to control the overlap
    left: 30,
    flexDirection: 'column',
    flex: 1,
  },
  location: {
    flex: 1,
    // bottom: 0, // Adjust these values to control the overlap
    // left: 0,
    flexDirection: 'row',
  },
  Weather: {
    position: 'absolute',
    flex: 1,
    bottom: 0, // Adjust these values to control the overlap
    right: 50,
  },
  Weathericon: {
    position: 'absolute',
    flex: 1,
    bottom: 5,
    right: 60,
  },
  Menuicon: {
    flex: 1,
    top: 15,
    left: 20,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }
});

export default Header;

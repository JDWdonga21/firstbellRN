import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  StatusBar,
  ViewStyle,
  Platform,
  Button,
} from 'react-native';
import PlatformTouchable from 'react-native-platform-touchable';
import Icons from '../common/Icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

//해더 이미지
import AppHeaders from '../../../assets/old-man-walking/header_background.svg';
import Headerimg from '../../../assets/old-man-walking/header_img.svg';
import Sunny from '../../../assets/icons/weather/Sunny.svg';
import FewClouds from '../../../assets/icons/weather/Few Cloudy.svg';
import ScatteredClouds from '../../../assets/icons/weather/PartlyCloudy.svg';
import BrokeClouds from '../../../assets/icons/weather/broken clouds.svg';
import ShowerRain from '../../../assets/icons/weather/shower Rain.svg';
import Rain from '../../../assets/icons/weather/Rainy.svg';
import Thunderstorm from '../../../assets/icons/weather/RainThunder.svg';
import Snow from '../../../assets/icons/weather/Snowy.svg';
import Mist from '../../../assets/icons/weather/mist.svg';

//권한
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

import Toast from 'react-native-simple-toast';

//날씨 정보 받아오기(위치 가져오기)
import GeoPosition from 'react-native-geolocation-service';
import axios from 'axios';

type HeaderProps = {
  name: string;
  address: string
  temperatures: number;
};
type Headers = {
  isLocaPermitted: boolean;

  latitude: null | number;
  longitude: null | number;
  weathersIdx: number;
  weather: {
    temp: number | string;
    condition: string;
    icons: string;
  }
}

class Header extends Component<HeaderProps, Headers> {
  chkLocation = null as null | NodeJS.Timeout;
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      isLocaPermitted: false,

      latitude : 0,
      longitude : 0,
      weathersIdx : 0,
      weather: {
        temp: '-',
        condition: '',
        icons: '',
      }
    }
  }

  permissionChk = () => {
  if (Platform.OS !== 'ios' && Platform.OS !== "android") {
    return;
  }
  const platformPermissions = 
    Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;

  const checkLocationPermission = async () => {
    const status = await check(platformPermissions);
    if (status === RESULTS.GRANTED) {
      this.setState({ isLocaPermitted: true });
    } else {
      requestLocationPermission();
    }
  };

  const requestLocationPermission = async () => {
    try {
      const result = await request(platformPermissions);
      if (result === RESULTS.GRANTED) {
        this.setState({ isLocaPermitted: true });
      } else {
        Toast.show("위치 권한을 허용해주세요.", 2);
      }
    } catch (err) {
      Toast.show("권한 요청에 문제가 발생했습니다.", 0.5);
      console.log("위치 권한 요청 에러: ", err);
    }
  };

  checkLocationPermission();
};


  componentDidMount(): void {
    /**
     * 권한 확인
     */    
    //위치
    this.permissionChk();
    /**
     * 위치, 날씨 가져오기
     */
    this.geoLocation();
    this.chkLocation = setInterval(() => {
     this.geoLocation();
    }, 600000);
  };

  componentWillUnmount(): void {
    if (this.chkLocation){
      clearInterval(this.chkLocation);
    }
  };
  geoLocation = () => {
    console.log("위치")
    GeoPosition.watchPosition (
      (position) => {
        const { latitude, longitude } = position.coords
        console.log(latitude + " / " + longitude)
        this.getWeather(latitude, longitude) 
      },
      error => { console.log(error.code, error.message); },
      {enableHighAccuracy:true,},
    )
    
  }
  getWeather = async (_lat : number ,_long : number) => {
    try {
      // 위치 가져오고 날씨 API 요청 보내기
      
      if(_lat !== null && _long !== null){
        console.log(_lat, ' ' ,_long)
        const API_KEY = "2ccb7733a7b5a5ec23c60ef1b9d6d6f6"
        const result = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${_lat}&lon=${_long}&appid=${API_KEY}&units=metric`
        );
        const betemp = result.data.main.temp;
        //소수점 1자리까지 표시
        const temp = parseFloat(betemp.toFixed(1));
        const condition = result.data.weather[0].main;
        const icons = result.data.weather[0].icon;
        console.log("----- - ------- - ----------")
        console.log(result.data.weather[0].icon)
        console.log("----- - ------- - ----------")
        console.log(temp);
        console.log(condition);
        this.changeWeather(icons);
        this.setState({
          weather: {temp, condition, icons},
        });
      }
    } catch(error) {
      console.log("날씨 실패 : ", error);
    }
  };

  changeWeather = (_weatherCode : string) => {
    if(_weatherCode === '01d' || _weatherCode === '01n'){
      this.setState({ weathersIdx: 0 })
    }else if(_weatherCode === '02d' || _weatherCode === '02n'){
      this.setState({ weathersIdx: 1 })
    }else if(_weatherCode === '03d' || _weatherCode === '03n'){
      this.setState({ weathersIdx: 2 })
    }else if(_weatherCode === '04d' || _weatherCode === '04n'){
      this.setState({ weathersIdx: 3 })
    }else if(_weatherCode === '09d' || _weatherCode === '09n'){
      this.setState({ weathersIdx: 4 })
    }else if(_weatherCode === '10d' || _weatherCode === '10n'){
      this.setState({ weathersIdx: 5 })
    }else if(_weatherCode === '11d' || _weatherCode === '11n'){
      this.setState({ weathersIdx: 6 })
    }else if(_weatherCode === '13d' || _weatherCode === '13n'){
      this.setState({ weathersIdx: 7 })
    }else if(_weatherCode === '50d' || _weatherCode === '50n'){
      this.setState({ weathersIdx: 8 })
    }else {
      console.log("날씨 코드 오류")
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
                onPress={this.geoLocation}
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
                      <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'left', color:'black'}}>{weatherList[this.state.weathersIdx].weathersText}</Text>
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
            <Text allowFontScaling={false} style={{fontSize: 30, fontWeight: 'bold', color:'black'}}>{this.state.weather.temp}°</Text>
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

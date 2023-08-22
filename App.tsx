/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

//이미지 엣셋
//해더 이미지
import AppHeaders from './assets/header_background.svg';
import Headerimg from './assets/header_img.svg';
// 본문 이이지
// 하트
import Heart from './assets/heart.svg';
// 전화기
import Call from './assets/call.svg';
// 달별
import Moonhalfs from './assets/moon_half.svg'

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  //차트 건강점수 데이터
  const healthScore = {
    labels: ["02/24", "02/25", "02/26", "02/27"],
    datasets: [
      {
        data: [80, 99, 43, 80],
      },
    ],
  };
  //차트 실내,외활동량 데이터
  const amountActivity = [
    {
      name: '실외활동량',
      population: 62,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#000000",
      legendFontSize: 15,
    },
    {
      name: '실내활동량',
      population: 54,
      color: "#ff0000",
      legendFontColor: "#000000",
      legendFontSize: 15,
    },
  ];

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* header */}
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
                    <Image source={require('./assets/gps.png')} />
                    <Text style={styles.locationWeather}>해운대구 우동</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={require('./assets/rain.png')} />
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
        {/* body */}
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
            <Image source={require('./assets/ai.png')} />
          </View>
        </View>
        <View style={styles.purpleBox}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>취침시간</Text>
            <Image source={require('./assets/half-moon.png')} />
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>22시10분</Text>
          </View>
          <View style={styles.diviLine} />
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>기상시간</Text>
            <Image source={require('./assets/cloud_sun.png')} />
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>6시30분</Text>
          </View>
          <View style={styles.diviLine} />
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>수면시간</Text>
            <Image source={require('./assets/bed.png')} />
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>8시간 20분</Text>
          </View>
        </View>
        <View style={styles.purpleBox2}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Image source={require('./assets/media_play.png')} />
            </View>
            <View style={{flex: 7}}>
              <Text style={styles.purpleBoxText}>김광자님은 오늘 하루</Text>
              <Text style={styles.purpleBoxText}>TV를 5시간 20분 시청하셨어요.</Text>
            </View>
          </View>
        </View>
        <View style={styles.pinkBox3}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Moonhalfs />
            </View>
            <View style={{flex: 7}}>
              <Text style={styles.purpleBoxText}>김광자님은 지난 밤 수면시간은</Text>
              <Text style={styles.purpleBoxText}>8시간 20분으로 매우 길어요.</Text>
            </View>
          </View>
        </View>
        <View style={styles.lightblueBox}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>오늘의 건강점수는 80점으로 양호하며,</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>70대 여성 평균 점수보다 10점 높습니다.</Text>
          <BarChart
            style={styles.graphStyle}
            data={healthScore}
            width={windowWidth * 0.75} // from react-native
            height={220}
            //yAxisLabel=""
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "1",
                strokeWidth: "1",
                stroke: "#ffa726"
              }
            }}
            verticalLabelRotation={10}
            barPercentage={0.5} // Adjust this value between 0 and 1
            barSpace={2} // Adjust this value based on your preference
          />
          <PieChart
            data={amountActivity}
            width={windowWidth * 0.75}
            height={300}
            chartConfig={{
              backgroundGradientFrom: "#1E2923",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#08130D",
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              strokeWidth: 3,
              barPercentage: 0.5,
              useShadowColorFromDataset: false,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={-10}
            center={[60, 20]}
            absolute
          />
        </View>
        <View style={styles.purpleBox3}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>실외 활동 정보</Text>
          <Text style={{fontSize: 20, marginTop: 10, marginBottom: 10}}>내가 자주 방문하는 동네는,</Text>
          <View style={styles.oneLineRadius}>
            <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 10}}>1. 수영구 광안동 25회</Text>
          </View>
          <View style={styles.oneLineRadius}>
            <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 10}}>2. 동래구 안락동 12회</Text>
          </View>
          <View style={styles.oneLineRadius}>
            <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 10}}>3. 수영구 남천동 9회</Text>
          </View>
          <Text>※2023년 6월 기술</Text>
        </View>
        <View style={{marginRight: 30, marginLeft: 30, margin: 20}}>
          <Text style={{fontSize: 18, marginBottom: 10}}>김광자님의 활동 패턴을 기반</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>오늘의 추천 장소</Text>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <View style={{flex: 1, backgroundColor: 'black'}}>
              <Image opacity={0.5} source={require('./assets/place_1.png')} />
              <View style={styles.overlappingPicNtext}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: 'white', marginTop: 30, marginBottom: 30}}>
                  수영 사적공원
                </Text>
                <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
                  걷기 15분
                </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  난이도 중 ★★☆
                </Text>
              </View>
              <View style={styles.overlappingPicNtext2}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                  864m, 720걸음
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <View style={{flex: 1, backgroundColor: 'black'}}>
              <Image opacity={0.5} source={require('./assets/place_2.png')} />
              <View style={styles.overlappingPicNtext}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: 'white', marginTop: 30, marginBottom: 30}}>망미 골목투어</Text>
                <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>걷기 20분</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>난이도 중 ★★☆</Text>
              </View>
              <View style={styles.overlappingPicNtext2}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>564m, 340걸음</Text>
              </View>
            </View>
          </View>
        </View>
        {/* footer */}
        <View style={{marginRight: 30, marginLeft: 30, margin: 20, padding: 30}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.oneLineRadius2}>
              <Text style={{fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#ff1515' }}>위급상황 통화하기</Text>
            </View>
            <Call />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  pinkBox3: {
    marginTop: 15,
    padding: 20,
    flex: 1,
    backgroundColor: '#ff4385',
    marginRight: 30,
    marginLeft: 30,
    borderWidth: 1,
    borderColor: '#ff4385',
    borderTopLeftRadius: 20,
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
  purpleBox: {
    marginTop: 25,
    padding: 20,
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ddd1ff',
    marginRight: 30,
    marginLeft: 30,
    borderWidth: 1,
    borderColor: '#ddd1ff',
    borderTopLeftRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  diviLine: {
    backgroundColor: 'white',
    width: 1,
    height: '100%',
  },
  purpleBox2: {
    marginTop: 25,
    padding: 20,
    flex: 1,
    backgroundColor: '#1f007a',
    marginRight: 30,
    marginLeft: 30,
    borderWidth: 1,
    borderColor: '#1f007a',
    borderTopRightRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  purpleBoxText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  lightblueBox: {
    marginTop: 25,
    padding: 20,
    flex: 1,
    backgroundColor: '#a2aeff',
    marginRight: 30,
    marginLeft: 30,
    borderWidth: 1,
    borderColor: '#a2aeff',
    borderRadius: 20,
  },
  purpleBox3: {
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
    bottom: 10, // Adjust these values to control the overlap
    left: 10,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  graphStyle: {
    marginVertical: 0,
    borderRadius: 16,
    padding: 0,
    backgroundColor: '#f7f7f7',
  },
});

export default App;

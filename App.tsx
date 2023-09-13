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

import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/body/Body';


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
        <Header />
        {/* body */}
        <Body />
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
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

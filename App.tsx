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
});

export default App;

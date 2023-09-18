import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
} from 'react-native';

// 달별
import Moonhalfs from '../../assets/moon_half.svg'

const Situation2 = ({
  name,
}) => {
  return(
    <View style={styles.container}>
      <View style={styles.purpleBox}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <Text style={styles.timeText}>취침시간</Text>
          </View>
          <View style={{flex: 1, marginBottom: 10}}/>
          <View style={{flex: 1}}>
            <Image source={require('../../assets/half-moon.png')} />
          </View>
          <View style={{flex: 1, marginTop: 10}}/>
          <View style={{flex: 1}}>
            <Text style={styles.timeTextBold}>22시10분</Text>
          </View>
        </View>
        <View style={styles.diviLine} />
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <Text style={styles.timeText}>기상시간</Text>
          </View>
          <View style={{flex: 1, marginBottom: 10}}/>
          <View style={{flex: 1}}>
            <Image source={require('../../assets/cloud_sun.png')} />
          </View>
          <View style={{flex: 1, marginBottom: 10}}/>
          <View style={{flex: 1}}>
            <Text style={styles.timeTextBold}>6시30분</Text>
          </View>
        </View>
        <View style={styles.diviLine} />
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <Text style={styles.timeText}>수면시간</Text>
          </View>
          <View style={{flex: 1, marginBottom: 10}}/>
          <View style={{flex: 1}}>
            <Image source={require('../../assets/bed.png')} />
          </View>
          <View style={{flex: 1, marginBottom: 10}}/>
          <View style={{flex: 1}}>
            <Text style={styles.timeTextBold}>8시간 20분</Text>
          </View>
        </View>
      </View>
      <View style={styles.purpleBox2}>
        <View style={{flex: 1, flexDirection: 'row', alignContent: 'center'}}>
          <View style={{flex: 2, marginTop: 5, alignItems: 'center'}}>
            <Image source={require('../../assets/media_play.png')} />
          </View>
          <View style={{flex: 1}}/>
          <View style={{flex: 20}}>
            <View style={{marginLeft: 4}}>
              <Text style={styles.purpleBoxText}>{name}님은 오늘 하루</Text>
              <Text style={styles.purpleBoxTextBold}>TV를 5시간 40분 시청하셨어요.</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.pinkBox3}>
        <View style={{flex: 1, flexDirection: 'row', alignContent: 'center'}}>
          <View style={{flex: 2, marginTop: 5, alignItems: 'center'}}>
            <Moonhalfs />
          </View>
          <View style={{flex: 1}} />
          <View style={{flex: 20}}>
            <View style={{marginLeft: 4}}>
              <Text style={styles.purpleBoxText}>{name}님은 지난 밤 수면시간은</Text>
              <Text style={styles.purpleBoxTextBold}>8시간 25분으로 매우 길어요.</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  purpleBox: {
    marginTop: 25,
    padding: 10,
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
    textAlign: 'left',
  },
  purpleBoxTextBold: {
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timeTextBold: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontWeight: 'bold',
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
})
export default Situation2
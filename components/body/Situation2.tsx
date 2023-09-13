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

}) => {
    return(
        <View>
            <View style={styles.purpleBox}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>취침시간</Text>
                    <Image source={require('../../assets/half-moon.png')} />
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>22시10분</Text>
                </View>
                <View style={styles.diviLine} />
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>기상시간</Text>
                    <Image source={require('../../assets/cloud_sun.png')} />
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>6시30분</Text>
                </View>
                <View style={styles.diviLine} />
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>수면시간</Text>
                    <Image source={require('../../assets/bed.png')} />
                    <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>8시간 20분</Text>
                </View>
            </View>
            <View style={styles.purpleBox2}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                    <Image source={require('../../assets/media_play.png')} />
                    </View>
                    <View style={{flex: 7}}>
                    <Text style={styles.purpleBoxText}>김광자님은 오늘 하루</Text>
                    <Text style={styles.purpleBoxText}>TV를 5시간 40분 시청하셨어요.</Text>
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
                    <Text style={styles.purpleBoxText}>8시간 25분으로 매우 길어요.</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
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
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const RecLocation = ({

}) => {
    return(
        <View style={styles.container}>
            <View>
                <Text style={{fontSize: 18, marginBottom: 10}}>김광자님의 활동 패턴을 기반</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>오늘의 추천 장소</Text>
                <View style={{marginTop: 10, marginBottom: 10}}>
                    <View style={{flex: 1, backgroundColor: 'black'}}>
                    <Image opacity={0.5} source={require('../../assets/place_1.png')} />
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
                    <Image opacity={0.5} source={require('../../assets/place_2.png')} />
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
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    marginRight: 30,
    marginLeft: 30,
    margin: 20
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
export default RecLocation
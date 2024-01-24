import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity, 
    SafeAreaView, 
    FlatList, 
    StatusBar, 
    Button
} from "react-native"
import * as Progress from 'react-native-progress';

const NUM_ITEMS = 15;

interface Props {}
type Data = {
  id: string,
  title: string,
  date: string,
  FinStepCount: number,
  FinHealthScr: number,
}
interface State {
  DataList : Data[]
}

class InfiniteScroll extends React.PureComponent<Props, State>{
    isLoading = false as boolean
    constructor(Props: any){
        super(Props)
        this.state = {
            DataList : [
                // {
                //     id: '0',
                //     title: 'First Item',
                //     date: '',
                //     FinStepCount: 10,
                //     FinHealthScr: 20,
                // },
                // {
                //     id: '1',
                //     title: 'Second Item',
                //     date: '',
                //     FinStepCount: 10,
                //     FinHealthScr: 30,
                // },
            ]
        };
    }
    componentDidMount(): void {
        // this.renderItem2(this.state.DataList);
    }
    renderItem2 = ({item} : any) => {
        const myId = item?.id;
        const categoryTitle = item?.title;
        const doneVideos = item.FinStepCount;
        const totalVideos = item.FinHealthScr;
        const rate = (doneVideos/ totalVideos) * 100;

        return (
            <View style={styles.item2}>
              <TouchableOpacity
                style={{}}
                activeOpacity={0.5}
                onPress={()=> {
        
                }}        
              >
                <Text style={{fontWeight: 'bold', color: '#2323dd'}}>
                  {myId} : {categoryTitle}
                </Text>
              </TouchableOpacity>
              <View style={{marginTop: 10}}>
                <Progress.Bar progress={rate / 100} width={null} height={10} color={'#FF0044'} />
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', color: '#2b2525'}}>
                  진행율 {rate.toFixed(2)} %
                </Text>
              </View>
            </View>
        );
    }
    onEndReached = () => {
        if (100 >= this.state.DataList.length && this.isLoading === false){
            this.isLoading = true;
            console.log("늘어나라 얍!")
            const idxs = this.state.DataList.length.toString();
            const doneVideo = this.state.DataList.length
            this.setState({
                DataList : [...this.state.DataList, {id: idxs, title: idxs + ' th Item', date: '여기타임스템프', FinStepCount: doneVideo, FinHealthScr: doneVideo + 100,}]
            })
            this.isLoading = false
        }
    }
    render() {
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <FlatList 
                        data={this.state.DataList}
                        renderItem={this.renderItem2}
                        keyExtractor={item => item.id}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={0.6}
                    />
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    flex: { flex: 1 },
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    item2: {
      backgroundColor: '#00f9f9',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
});
export default InfiniteScroll;
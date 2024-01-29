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
import { RouteProp } from "@react-navigation/native";

type HealthListParamList = {
  HealthList: {
    stepArrays: StepArrayEntry[]; // 이 부분은 전달하려는 데이터 타입에 따라 변경됩니다.
  };
};
const NUM_ITEMS = 15;
//step Array [idx, 날짜, 요일, 걸음수, 건강점수, 일자]
type StepArrayEntry = [number, Date, number, number, number, number]
type Data = {
  id: string,
  title: string,
  date: Date,
  FinStepCount: number,
  FinHealthScr: number,
}
interface State {
  DataList : Data[]
}
interface Props {
  //StepArrays : StepArrayEntry[],
  route: RouteProp<HealthListParamList, 'HealthList'>;
}

class InfiniteScroll extends React.PureComponent<Props, State>{
    isLoading = false as boolean
    constructor(Props: any){
        super(Props)
        this.state = {
            DataList : [
                {
                    id: '0',
                    title: 'First Item',
                    date: new Date(),
                    FinStepCount: 10,
                    FinHealthScr: 20,
                },
                {
                    id: '1',
                    title: 'Second Item',
                    date: new Date(),
                    FinStepCount: 10,
                    FinHealthScr: 30,
                },
                {
                    id: '2',
                    title: 'Second Item',
                    date: new Date(),
                    FinStepCount: 10,
                    FinHealthScr: 30,
                },
                {
                    id: '3',
                    title: 'Second Item',
                    date: new Date(),
                    FinStepCount: 10,
                    FinHealthScr: 30,
                },
                {
                    id: '4',
                    title: 'Second Item',
                    date: new Date(),
                    FinStepCount: 10,
                    FinHealthScr: 30,
                },
            ]
        };
    }
    componentDidMount(): void {
      if(this.props.route.params.stepArrays){
        this.onAddPropsData();
      }        
    }
    onAddPropsData = async () => {
      if(this.props.route.params.stepArrays){
        console.log("맴맴 : ", this.props.route.params.stepArrays)
        const addArr : Data[] = [];
        this.props.route.params.stepArrays.map((element :StepArrayEntry) =>{
          console.log("세부 : ", element);
          const idxs = (this.state.DataList.length + addArr.length).toString()
          const date = element[1]
          const stepCount = element[3]
          const healthScr = element[4]
          
          addArr.push({id: idxs, title: idxs + ' th Item', date: date, FinStepCount: stepCount, FinHealthScr: healthScr},)
        })
        this.setState({
          DataList : [...this.state.DataList, ...addArr]
        })
      }      
    }
    renderItem2 = ({item} : any) => {
        const myId = item?.id;
        const categoryTitle = item?.title;
        const itemsDate = item.date.toLocaleString();
        const doneVideos = item.FinStepCount;
        const totalVideos = item.FinHealthScr;
        const rate = (totalVideos/ 100) * 100;

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
              <Text style={{fontWeight: 'bold', color: 'black'}}>날짜 : {itemsDate} </Text>
              <Text style={{fontWeight: 'bold', color: 'black'}}>걸음 수 : {doneVideos}</Text>
              <Text style={{fontWeight: 'bold', color: 'black'}}>건강점수 : {totalVideos}</Text>
              <View style={{marginTop: 10}}>
                <Progress.Bar progress={rate / 100} width={null} height={10} color={'#FF0044'} />
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', color: '#2b2525'}}>
                  건강점수 달설률 {rate.toFixed(2)} %
                </Text>
              </View>
            </View>
        );
    }
    onEndReached = () => {
        if (100 >= this.state.DataList.length && this.isLoading === false){
            this.isLoading = true;
            console.log("늘어나라 얍!")
            const idxs = this.state.DataList.length.toString()
            const doneVideo = this.state.DataList.length
            this.setState({
                DataList : [...this.state.DataList, {id: idxs, title: idxs + ' th Item', date: new Date(), FinStepCount: doneVideo, FinHealthScr: doneVideo + 100,}]
            })
            this.isLoading = false
        }
    }
    render() {
        return(
            <SafeAreaView style={styles.container}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>지난 건강점수 데이터</Text>
                </View>
                <View style={{flex: 9}}>
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
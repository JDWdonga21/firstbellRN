import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
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
const HealthChart = ({

}) => {
    
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>오늘의 건강점수는 80점으로 양호하며,</Text>
            <Text style={styles.textStyle}>70대 여성 평균 점수보다 10점 높습니다.</Text>
            <BarChart
                style={styles.graphStyle}
                data={healthScore}
                width={windowWidth * 0.75} // from react-native
                height={220}
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
    )
}
const styles = StyleSheet.create({
  container: {
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
  graphStyle: {
    marginVertical: 0,
    borderRadius: 16,
    padding: 0,
    backgroundColor: '#f7f7f7',
  },
  textStyle: {
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center',
  },
});
export default HealthChart
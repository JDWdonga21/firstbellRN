/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import SegmentedControl from 'rn-segmented-control';
import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
  Dimensions,
  Button,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
// import SegmentedControl from './SegmentedControl';

import Header from './components/headers/Header';
import RadioBtn from './components/headers/RadioBtn';
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
  // 앱변수
  const [name, setName] = useState("이춘자");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [appDate, setAppDate] = useState("");
  const [appTime, setAppTime] = useState("");
  const [tabIndex, setTabIndex] = React.useState(0);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setAppDate(date.toLocaleDateString());
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm2 = (time) => {
    console.warn("A Time has been picked: ", time);
    setAppTime(time.toLocaleTimeString());
    hideTimePicker();
  };
  // Add a Toast on screen.
  const showtoast = () => {
   const toast = Toast.show(`안녕하세요. ${name}`, {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
          // calls on toast\`s appear animation start
      },
      onShown: () => {
          // calls on toast\`s appear animation end.
      },
      onHide: () => {
          // calls on toast\`s hide animation start.
      },
      onHidden: () => {
          // calls on toast\`s hide animation end.
      }
    });
    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
        Toast.hide(toast);
    }, 2000);
  };
  return (
    <RootSiblingParent>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />        
        
        {/* <View style={styles.container}>
              <View style={styles.box}>
                <SegmentedControl
                  containerMargin={16}
                  segments={['Label 1', 'Label 2']}
                  onChange={(index) => setTabIndex(index)}
                  currentIndex={tabIndex}
                />
              </View>
            </View> */}
        
        <ScrollView
          style={backgroundStyle}>
          {/* header */}
          <View style={{ zIndex: 1 }}>
            <RadioBtn />
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
            />
            <Button title="Show Date Picker" onPress={showDatePicker} />
            <Button title="Show Time Picker" onPress={showTimePicker} />
            <Button title="Show Toast" onPress={showtoast} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Text> {appDate} </Text>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirm2}
              onCancel={hideTimePicker}
            />
            <Text> {appTime} </Text>
          </View>
          <Header name={name}/>
          {/* body */}
          <Body name={name} />
          {/* footer */}
          <Footer />
        </ScrollView>
      </SafeAreaView>
    </RootSiblingParent>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;

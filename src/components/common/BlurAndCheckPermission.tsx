import React from "react";
import {ActivityIndicator, AppState, Platform, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Color} from "./Colors";
//import BellText from "./BellText";
import {openSettings} from "react-native-permissions";
import Icons from "./Icons";
import BlurView from "react-native-blur-effect";
import {Permissions, PermissionType} from "./Permissions";
import {SHADOW_MAIN_HOME_POPUP} from "./Shadow";
// import BellButton from "./BellButton";
import LottieView from "lottie-react-native";

interface Props {
  fullScreen?: boolean;
  permissionType: (keyof typeof PermissionType)[];
  callback?: (isPermitted: boolean) => void;
}
interface State {
  isLoading: boolean;
  isPermitted: boolean;
}

export default class BlurAndCheckPermission extends React.Component<Props, State> {

  appStateListener: any = null;
  state: State = {
    isLoading: false,
    isPermitted: false,
  };

  componentDidMount() {
    this.appStateListener = AppState.addEventListener("change", this.handleAppStateChange);
    this.startPermissionCheck();
  }

  componentWillUnmount() {
    this.appStateListener.remove();
  }

  handleAppStateChange = async (appState: any) => {
    if (appState === "active") {
      this.startPermissionCheck();
    }
  };

  isLocked = false;
  private startPermissionCheck =  () => {
    if (this.isLocked) {return;}
    this.isLocked = true;
    this.setState({
      isLoading: true,
    }, async () => {
      try {
        // 권한이 다 있음
        if (await this.checkPermission()) {
          this.props.callback && this.props.callback(true);
          return this.setState({isPermitted: true});
        }
        // 권한이 다 허용됨
        if (await this.requestPermission()) {
          this.props.callback && this.props.callback(true);
          return this.setState({isPermitted: true});
        }
      } catch (err) {
      } finally {
        this.isLocked = false;
        this.setState({isLoading: false});
      }
    });
  };

  private checkPermission = async(): Promise<boolean>  => {
    const {permissionType} = this.props;
    const res = await Permissions.checkMultiPermissions(permissionType);
    const notGranted = res.filter(i => i.result !== "GRANTED");
    return notGranted.length === 0;
  };

  private requestPermission = async(): Promise<boolean> => {
    const {permissionType} = this.props;
    const res = await Permissions.requestMultiPermissions(permissionType);
    const notGranted = res.filter(i => i.result !== "GRANTED");
    return notGranted.length === 0;
  };

  render() {
    const {permissionType, fullScreen} = this.props;
    const {isPermitted, isLoading} = this.state;
    if (isPermitted) {return null;}

    let needPermission = "";
    permissionType.forEach((i, idx) => {
      needPermission += PermissionType[i] + (permissionType.length - 1 === idx ? "" : ", ");
    });

    return (
      <View style={[styles.container, {paddingHorizontal: fullScreen ? 0 : 30}]}>
        <BlurView backgroundColor="rgba(255, 255, 255, 0.1)" blurRadius={5} borderRadius={20}/>
        <TouchableOpacity
          style={[styles.containerContent, SHADOW_MAIN_HOME_POPUP, {backgroundColor: Color.white, borderWidth: fullScreen ? 0 : 1, flex: fullScreen ? 1 : 0, paddingBottom: fullScreen ? 100 : 15}]}
          onPress={() => openSettings()}>
          {
            isLoading && <ActivityIndicator size="small" color={Color.primaryColor} />
          }
          {
            !isLoading &&
            <>
              {
                fullScreen &&
                <>
                  <LottieView
                    style={{width: 200}}
                    source={require("../../../assets/lottie/request-permission.json")}
                    autoPlay
                    loop
                  />
                  <View style={{height: 30}}/>
                </>
              }
              <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center", paddingHorizontal: 20}}>
                <Icons type={"Foundation"} name={"shield"} size={20}/>
                <View style={{ width: 8 }} />
                <Text style={{ textAlign: "center", fontSize: 16, color: "#333" }}>
                  <Text style={{color: Color.primaryColor, fontWeight: "bold"}}>{needPermission}</Text> 권한 설정이 필요합니다
                </Text>
              </View>
              <View style={{height: 3}}/>
              <Text style={{ textAlign: "center", fontSize: 16, color: Color.gray_777, paddingHorizontal: 20 }}>
                {
                  Platform.OS === "ios" ? `설정 > 개인 정보 보호 > ${needPermission} 서비스 > BELL(벨)` :
                    `설정 > 애플리케이션 > BELL(벨) > 권한 > ${needPermission}`
                }
              </Text>
              <View style={{height: 20}}/>
              <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>설정열기</Text>
            </>
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    zIndex: 10,
    left: 0,
    right: 0,
    top: -5,
    bottom: -5,
    justifyContent: "center",
  },
  containerContent: {
    borderColor: Color.black,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: Color.white + "AA",
  },
});

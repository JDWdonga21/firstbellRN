import {check, checkMultiple, openSettings, Permission, PERMISSIONS, requestMultiple} from "react-native-permissions";
import {Alert, Platform} from "react-native";
//import {PERMISSION_TYPE_BLOCKED, PERMISSION_TYPE_DENIED, PERMISSION_TYPE_GRANTED} from "../constants/permissionType";

const PERMISSION_TYPE_UNAVAILABLE = "UNAVAILABLE"; // 이 권한은 사용할 수 없음
const PERMISSION_TYPE_DENIED = "DENIED"; // 요청하지 않았고 요청할 수 있음
const PERMISSION_TYPE_GRANTED = "GRANTED"; // 승인 됐으나 제한적임
const PERMISSION_TYPE_BLOCKED = "BLOCKED"; // 이미 거부 됐고 권한 요청할 수 있음

// export type keyType = "location" | "camera" | "photo" | "microphone" | "bluetooth" | "speech_recognition";

export const PermissionType = {
  location: "위치",
  locationBackground: "위치",
  camera: "카메라",
  photo: "사진",
  microphone: "마이크",
  bluetooth: "블루투스",
  speech_recognition: "음성인식",
  motion: "모션사용권한",
};

const androidPermissions: {[key in string]: Permission} = {
  location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  locationBackground: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
  camera: PERMISSIONS.ANDROID.CAMERA,
  photo: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  microphone: PERMISSIONS.ANDROID.RECORD_AUDIO,
  bluetooth: PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
  motion: PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
};

const iosPermissions: {[key in string]: Permission} = {
  location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  locationBackground: PERMISSIONS.IOS.LOCATION_ALWAYS,
  camera: PERMISSIONS.IOS.CAMERA,
  photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
  microphone: PERMISSIONS.IOS.MICROPHONE,
  speech_recognition: PERMISSIONS.IOS.SPEECH_RECOGNITION,
  bluetooth: PERMISSIONS.IOS.BLUETOOTH,
  motion: PERMISSIONS.IOS.MOTION,
};

const permissions = Platform.OS === "ios" ? iosPermissions : androidPermissions;

/**
 * ex)
 * const result = await PermissionUtils.requestPermission('location');
 * if (result) {} // 권한 사용 가능
 * */

export class Permissions {

  static checkPermission = (permissionType: keyof typeof PermissionType) => {
    return check(permissions[permissionType]).then(result => {
      return result.toUpperCase();
    });
  };

  static checkMultiPermissions = async (permissionType: (keyof typeof PermissionType)[]) => {
    const tempPermissions = permissionType.map(i => {
      return {
        name: i,
        permission: permissions[i],
      };
    });
    const extract = tempPermissions.map(i => i.permission);
    const tempResult =  tempPermissions && await checkMultiple(extract);

    const result = tempPermissions.map((i) => {
      return {
        // ...i, result: tempResult[i.permission]
        ...i, result: tempResult[i.permission].toUpperCase(),
      };
    });
    return result;
  };

  static requestMultiPermissions = async (permissionType: (keyof typeof PermissionType)[]) => {
    const check = await Permissions.checkMultiPermissions(permissionType);
    let tempPermissions: any = [];
    let cnt: number = 0;
    check.map((i) => {
      if (i.result !== PERMISSION_TYPE_GRANTED && i.result !== PERMISSION_TYPE_BLOCKED) {
        tempPermissions.push(i.permission);
        cnt++;
      }
    });

    if (cnt === 0) {return check;}
    const result = await requestMultiple(tempPermissions);

    const result2 = check.map((i: any) => {
      let name: string = "";
      let isAvailable: boolean = true;

      if (i.result === PERMISSION_TYPE_BLOCKED || i.result === PERMISSION_TYPE_DENIED) {
        isAvailable = false;
        if (i.name === "location") {name += "위치, ";}
        if (i.name === "locationBackground") {name += "백그라운드 위치, ";}
        else if (i.name === "camera") {name += "카메라, ";}
        else if (i.name === "bluetooth") {name += "블루투스, ";}
        else if (i.name === "photo") {name += "사진첩, ";}
        else if (i.name === "microphone") {name += "마이크, ";}
        else if (i.name === "speech_recognition") {name += "음성인식, ";}
      }
      return {
        ...i,
        message: isAvailable ? "" : `서비스의 동작을 위해 '${name.slice(0, -2)}' 권한이 필요합니다. [설정 > 개인정보보호 > ${name.slice(0, -2)}]에서 BELL(벨)의 접근을 허용해주세요`,
        result: result[i.permission] ? result[i.permission].toUpperCase() : i.result,
      };
    });
    return result2;
  };

  static openAlertSetting = (msg: string) => {
    return (
      Alert.alert("", msg, [
        {text: "닫기"},
        {text: "설정", onPress: () => openSettings()},
      ])
    );
  };
}
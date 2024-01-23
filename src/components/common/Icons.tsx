import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import {IconProps} from "react-native-vector-icons/Icon";

import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import { Colors } from "react-native/Libraries/NewAppScreen";

const IconType = {
    EntypoIcon: EntypoIcon,
    Ionicons: Ionicons,
    Foundation: Foundation,
};

export type IconTypeKey = keyof typeof IconType;

const icon: { [key in IconTypeKey]: React.ComponentType<any> } = {} as any;

Object.keys(IconType).forEach((key) => {
    icon[key as IconTypeKey] = IconType[key as IconTypeKey];
});

type Props = {
    type: IconTypeKey;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    isClickable?: boolean;
    style?: ViewStyle;
} & IconProps;

type State = {}

export default class Icons extends React.Component<Props, State> {
    render() {
        const {isClickable, type, onPress, style} = this.props;
        const Icon = icon[type] as any;
        return(
            isClickable ? 
            <TouchableOpacity onPress={onPress} style={style}>
                <Icon color={Colors.black} {...this.props} />
            </TouchableOpacity> :
            <Icon color={Colors.black} {...this.props} />
        )
    }
}

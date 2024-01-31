import React, {Component} from "react";
import { View, Text } from "react-native";

type DrawerMenuProps = {

}

class DrawerMenu extends Component<DrawerMenuProps>{
    render() {
        return(
            <View>
                <Text>드로우 메뉴</Text>
            </View>
        )        
    }
}

export default DrawerMenu;
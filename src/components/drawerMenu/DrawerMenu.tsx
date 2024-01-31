import React, {Component} from "react";
import { View, Text } from "react-native";

type DrawerMenuProps = {

}

class DrawerMenu extends Component<DrawerMenuProps>{
    render() {
        return(
            <View style={{flex: 1, padding: 20, backgroundColor: 'gray'}}>
                <Text>드로우 메뉴</Text>
            </View>
        )        
    }
}

export default DrawerMenu;
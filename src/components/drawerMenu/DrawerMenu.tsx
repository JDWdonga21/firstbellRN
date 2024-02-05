import React, {Component} from "react";
import { View, Text, StyleSheet } from "react-native";
import PlatformTouchable from 'react-native-platform-touchable';

type DrawerMenuProps = {

}

class DrawerMenu extends Component<DrawerMenuProps>{
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titleText}>
                        메뉴
                    </Text>
                </View>
                <View style={styles.bodys}>    
                    <View style={{marginTop: 15}}>
                        <PlatformTouchable
                            onPress={() => {}}
                            background={
                                PlatformTouchable.Ripple('#ff0000', false)
                            }
                        >
                            <View style={{margin: 10, padding: 5}}>
                                <Text style={styles.bodyText}>
                                    메뉴 1
                                </Text>
                            </View>                        
                        </PlatformTouchable>
                    </View>    
                    <View style={{marginTop: 15}}>
                        <PlatformTouchable
                            onPress={() => {}}
                            background={
                                PlatformTouchable.Ripple('#00ff00', false)
                            }
                        >
                            <View style={{margin: 10, padding: 5}}>
                                <Text style={styles.bodyText}>
                                    메뉴 2
                                </Text>
                            </View>                        
                        </PlatformTouchable>
                    </View>
                    <View style={{marginTop: 15}}>
                        <PlatformTouchable
                            onPress={() => {}}
                            background={
                                PlatformTouchable.Ripple('#0000ff', false)
                            }
                        >
                            <View style={{margin: 10, padding: 5}}>
                                <Text style={styles.bodyText}>
                                    메뉴 3
                                </Text>
                            </View>                        
                        </PlatformTouchable>
                    </View> 
                </View>
                <View style={styles.footer}>
                    <View>
                        <Text style={styles.bodyText}>
                            하단 텍스트
                        </Text>
                    </View>
                </View>                
            </View>
        )        
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 30, 
        backgroundColor: 'gray'
    },
    //
    header: {
        flex: 1,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    //
    bodys: {
        flex: 6,
        margin: 20,        
        alignItems: 'center',
    },
    bodyText: {
        fontSize: 18,
        textAlign: 'center'
    },
    //
    footer: {
        flex: 1,
        margin: 20,
        alignItems: 'flex-end',
    },
    footerText: {
        fontSize: 12,
        textAlign: 'center',
    }
})

export default DrawerMenu;
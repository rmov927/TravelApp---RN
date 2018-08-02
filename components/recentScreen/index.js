import React, { Component } from 'react'
import * as Expo from "expo";
import { Actions } from 'react-native-router-flux'
import {
    View, Text, Modal,
    StyleSheet, Platform, Image, ScrollView, ListView,
    TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView
} from 'react-native'

import {
    Header, Body, Right,
    Left, Icon, Tab, Drawer,
    Tabs, ScrollableTab, FooterTab,
    Footer, Button, Container, Radio

} from 'native-base'; // 2.3.9
const dim = Dimensions.get('window')
import recent from '../forData/recentData'

class RecentScreen extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            //data:recent,
            isReady: false,
            dataSource:ds.cloneWithRows(recent),

        };
    }

    componentWillMount() {
        this.loadFonts();
    }

    async loadFonts() {
        await Expo.Font.loadAsync({
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
            FontAwesome: require("@expo/vector-icons/fonts/FontAwesome.ttf"),
            Entypo: require("@expo/vector-icons/fonts/Entypo.ttf"),
            'SanFrancisco':require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
            'SanFranciscoBold':require('../../assets/fonts/SF-Pro-Display-Bold.otf')

        });
        this.setState({ isReady: true });
    }

    renderRow(recent) {

        return (
            <View style={styles.ScrollItem}>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <View >
                            <Text style={styles.fromText}>{recent.fromcity}</Text>
                            <Text style={styles.mon}>{recent.fromdate}</Text>
                            <Text style={styles.eItem}>{recent.include}</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                        <Icon name='plane' style={[styles.icon,{transform: [
                                                            {rotateZ :Platform.OS ==='ios'?'0deg': '90deg'}
                                                          ]}]}/>
                        {   recent.todate==='Aug 11'
                        ?<Icon name='plane' style={[styles.icon, {transform: [
                                                                {rotateZ :Platform.OS ==='ios'? '180deg':'270deg'}
                                                            ]},{ marginTop:'-20%'}]}/>
                        :null}
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.fromText}>{recent.tocity}</Text>
                            <Text style={styles.mon}>{recent.todate}</Text>
                            <Text style={styles.eItem}>{recent.type}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View>
                        <TouchableOpacity>
                            <Icon name='ios-trash-outline' style={{ fontSize: 20, color: 'grey' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {

        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }
        return (
            <View style={styles.container}>
                <Header style={styles.headerStyle}>
                    <View>
                        <TouchableOpacity onPress={()=>Actions.pop({refresh: {'drawer':false}})} style={{width:50, marginLeft:5}}> 
                            <Icon name="ios-arrow-back-outline" />
                        </TouchableOpacity> 
                    </View>
                    <View><Text style={styles.bodyText}>Recent searches</Text></View>
                    <View>
                        <TouchableOpacity onPress={()=>Actions.mainScreen({'secondScreen':'notify','drawer':false})} style={{
                            marginRight:'1%',
                            alignItems:'flex-end',
                            width:50,
                            }}> 
                            <Icon name="ios-notifications-outline" />
                        </TouchableOpacity>
                    </View>
                </Header>
                <ListView
                    style={[styles.container2]}
                    enableEmptySections={true}
                    renderRow={this.renderRow.bind(this)}
                    dataSource={this.state.dataSource}
                />
            </View>

        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //paddingHorizontal: '3%'

    },
    container2: {
        marginLeft:10,
        marginRight:10,

    },
    headerStyle: {
        marginTop: Platform.OS === 'ios' ? '0%' : 24.5,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        color: '#afacad',
        paddingHorizontal: '2%',
        fontSize: 16,
    },
    fromText: {
        fontFamily:'SanFranciscoBold',
        fontSize: 16,
        //fontWeight: '600',
        color: 'black',
        marginBottom: 2
    },
    ScrollItem: {
        flexDirection: 'row',
        backgroundColor: '#fafafa',
        borderRadius: 3,
        padding: '2%',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    mon: {
        fontFamily:'SanFrancisco',
        fontSize: 14,
        color: 'black',
        marginBottom: 2
    },
    eItem: {
        fontFamily:'SanFrancisco',
        fontSize: 10,
        color: 'black',
        marginBottom: 2
    },
    bodyText: {
        fontFamily:'SanFranciscoBold',
        fontSize: 18,
        //fontWeight: '600',
      },

})

export default RecentScreen
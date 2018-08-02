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
const data = [
    {
        data: 'Fijian Doller ($)'
    },
    {
        data: 'Gambian Dalasi (D)'
    },
    {
        data: 'Georgian Lari (e)'
    },
    {
        data: 'Gibraltar Cedi (GHc)'
    },
    {
        data: 'Pound'
    },
    {
        data: 'Fijian Doller ($)'
    },
    {
        data: 'Gambian Dalasi (D)'
    },
    {
        data: 'Georgian Lari (e)'
    },
    {
        data: 'Gibraltar Cedi (GHc)'
    },
    {
        data: 'Pound'
    },

]




class CurrencyScreen extends Component {



    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            //data:recent,
            isReady: false,
            dataSource: ds.cloneWithRows(data),
            select: true,

        };
    }
    renderRow(data) {
        return (
            <View style={{
                // padding:'5%',
                paddingHorizontal: '2%',
                paddingVertical: '3%',

            }}>
                <Text style={{
                    fontSize: 14,
                    fontFamily:'SanFrancisco',
                }}>{data.data}</Text>
            </View>
        )
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


    render() {

        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }
        return (

            <View style={styles.container}>
                <Header style={styles.headerStyle} >
                    <View>

                        <TouchableOpacity onPress={() => Actions.pop()} style={{width:50, marginLeft:5}}>
                            <Icon name="ios-arrow-back-outline" />
                        </TouchableOpacity>

                    </View>
                    <View><Text style={styles.bodyText} >Select currency</Text></View>
                    <View>
                        <TouchableOpacity onPress={()=>Actions.mainScreen({'secondScreen':'notify','drawer':false})}style={{
                  //marginLeft:'15%',
                  marginRight:'1%',
                  alignItems:'flex-end',
                  //backgroundColor:'red',
                  width:50,
                }}>
                            <Icon name="ios-notifications-outline" />
                        </TouchableOpacity>
                    </View>
                </Header>


                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '5%',
                    marginBottom: 10,

                }}>

                    <TouchableOpacity style={this.state.select ? styles.select : styles.type} onPress={() => this.setState({ select: true })}>
                        <Text style={styles.cur}>Currency</Text>
                        <Text style={styles.euro}>Euro (€)</Text>

                    </TouchableOpacity>

                    {
                        this.state.select?
                        <View style={{
                            position:'absolute',
                            top:Platform.OS ==='ios'?'120%': '120%',
                            left:'10%',
                            
                            width: 0,
                            height: 0,
                            backgroundColor: 'transparent',
                            borderStyle: 'solid',
                            borderTopWidth:Platform.OS ==='ios'? 30:24,
                            borderRightWidth:Platform.OS ==='ios'? 15:12,
                            borderBottomWidth: 0,
                            zIndex:-1,
                            borderLeftWidth:Platform.OS ==='ios'? 15:12,
                            borderTopColor: '#f6f5f5',
                            borderRightColor: 'transparent',
                            borderBottomColor: 'transparent',
                            borderLeftColor: 'transparent',
                        }} />:null
                    }
                    

                    <TouchableOpacity style={!this.state.select ? styles.select : styles.type} onPress={() => this.setState({ select: false })}>
                        <Text style={styles.cur}>Contry of Sale</Text>
                        <Text style={styles.euro}>Czechia</Text>
                    </TouchableOpacity>
                    {
                        !this.state.select?
                        <View style={{
                            position:'absolute',
                            top:Platform.OS ==='ios'?'120%': '120%',
                            left:'65%',
                            borderWidth:0.5,
                            width: 0,
                            height: 0,
                            zIndex:-1,
                            backgroundColor: 'transparent',
                            borderStyle: 'solid',
                            borderTopWidth: Platform.OS ==='ios'? 30:24,
                            borderRightWidth:Platform.OS ==='ios'? 15:12,
                            borderBottomWidth: 0,
                            borderLeftWidth:Platform.OS ==='ios'? 15:12,
                            borderTopColor: '#f7f6f6',
                            borderRightColor: 'transparent',
                            borderBottomColor: 'transparent',
                            borderLeftColor: 'transparent',
                        }} />:null
                    }
                </View>
                
                

                <View style={{ paddingHorizontal: '5%' }}>
                    <View style={styles.searchBox}>
                        <Icon name='search' style={{ fontSize: 16, marginHorizontal: 5, color: 'grey' }} />
                        <TextInput
                            placeholder='Search'
                            style={{ flex: 1 }}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </View>

                <View style={{
                    paddingHorizontal: '2%',
                    paddingVertical: '2%',

                }}>
                    {
                        this.state.select ?
                            <Text style={{
                                fontFamily:'SanFranciscoBold',
                                fontSize: 16,
                                //fontWeight: '600',
                                color: '#67d2e4'
                            }}>

                                Euro ($)</Text>
                            :
                            <Text style={{
                                fontFamily:'SanFranciscoBold',
                                fontSize: 16,
                                //fontWeight: '600',
                                color: '#67d2e4'
                            }}>

                                Czechia ($)</Text>
                    }

                </View>


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
    headerStyle: {
        marginTop: Platform.OS === 'ios' ? 0 : 24.5,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    bodyText: {
        fontFamily:'SanFranciscoBold',
        fontSize: 18,
       // fontWeight: '800',
    },
    type: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Platform.OS === 'ios' ? 0.8 : 1,
        paddingVertical: Platform.OS === 'ios' ? '4%' : '5%',
        paddingHorizontal: '5%',
        borderRadius: 3
    },
    select: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Platform.OS === 'ios' ? 0.8 : 1,
        paddingVertical: Platform.OS === 'ios' ? '4%' : '5%',
        paddingHorizontal: '5%',
        borderRadius: 3,
        backgroundColor: '#f9f8f8',
    },
    searchBox: {
        borderWidth: Platform.OS === 'ios' ? 0.8 : 1,
        flexDirection: 'row',
        paddingVertical: Platform.OS === 'ios' ? '2%' : 4,
        borderRadius: Platform.OS === 'ios' ? 4 : 3,
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    euro: {
        fontFamily:'SanFranciscoBold',
        color: '#65a4cb',
        marginTop:'5%',
        fontSize: Platform.OS === 'ios' ? 16 : 16,
       // fontWeight:Platform.OS ==='ios'?'700': '600',
    },
    cur: {
        fontFamily:'SanFrancisco',
        color: 'black',
        textAlign:'center',
        fontSize: Platform.OS === 'ios' ? 16 : 16,
    },
})

export default CurrencyScreen
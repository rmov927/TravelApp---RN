import React from 'react';
import {Actions} from 'react-native-router-flux'
import {
         StyleSheet, Text, View ,
        ScrollView,
       TextInput,Platform,TouchableOpacity
       } from 'react-native';
import {
        Header,
        Icon,

      } from 'native-base'; // 2.3.9
import * as Expo from 'expo'

import AlertsCard from './cards/AlertsCard'
export default class Notifications extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
          };
    
      }
      componentWillMount() {
        this.loadFonts();
      }
      async loadFonts() {
        await Expo.Font.loadAsync({
          Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
          FontAwesome: require("@expo/vector-icons/fonts/FontAwesome.ttf"),
          'SanFrancisco':require('../assets/fonts/SF-Pro-Display-Regular.otf'),
          'SanFranciscoBold':require('../assets/fonts/SF-Pro-Display-Bold.otf')
    
        });
        this.setState({ isReady: true });
      }
  render(){
    if (!this.state.isReady) {
        return <Expo.AppLoading />;
      }
    return(
        
      <View style={{backgroundColor:'white'}}>
       <Header style={styles.headerStyle}> 
          <View>
                <TouchableOpacity onPress={()=>Actions.pop()} style={{width:50, marginLeft:5}}> 
                    <Icon name='ios-arrow-back-outline'/>
                </TouchableOpacity>
              </View>
          <View>

            <View style={{marginLeft:-35}}>
                <Text style={styles.bodyText}>Notifications</Text>
            </View>

          </View>
          <View>
              
          </View>
        </Header>

        <View style={styles.watchCon}>
        <View style={{flexDirection:'row',marginBottom:'3%'}}>
          
          <View style={{borderBottomColor:'#1976D2',borderBottomWidth:2,paddingVertical:'2%',}}>
          
            <Text style={styles.watchlistTitle}>Alerts</Text>
          
          </View>
        
          <View style={{borderBottomColor:'#eee',borderBottomWidth:2,flex:1,}}>
          <Text style={{ fontFamily:'SanFrancisco',color:'white'}}>Watchlist</Text>
          </View>
        </View>
          
          <ScrollView 
            style={{marginBottom:Platform.OS ==='ios'?'35%': '70%',paddingBottom:'10%'}}
            scrollEnabled={true}
            >
                <AlertsCard img='1' from='Prague' to='Paris' fromDate='14 Mar' toDate='28 Apr' prePrice='180 EUR' newPrice='180 EUR'/>
                <AlertsCard img='2' from='Dubai' to='Moscow' fromDate='18 Mar' toDate='20 Apr' prePrice='180 EUR' newPrice='160 EUR'/>
                <AlertsCard img='3' from='London' to='Paris' fromDate='20 Mar' toDate='5 Apr' prePrice='140 EUR' newPrice='130 EUR'/>
                <AlertsCard img='2' from='London' to='Berlin' fromDate='28 Apr' toDate='3 May' prePrice='220 EUR' newPrice='210 EUR'/>
                <AlertsCard img='3' from='Rome' to='Paris' fromDate='21 Mar' toDate='3 Apr' prePrice='200 EUR' newPrice='180 EUR'/>
                <AlertsCard img='1' from='Prague' to='Berlin' fromDate='14 Mar' toDate='28 Apr' prePrice='180 EUR' newPrice='180 EUR'/>
                
            </ScrollView>
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  headerStyleCon:{
    flexDirection:'row',
    //width:Platform.OS ==='ios'?null: '80%',
    borderWidth:Platform.OS === 'ios'?0.8:1,
    borderRadius:Platform.OS === 'ios'?5:5,
    borderColor:'#d2d2d2',
    width:'70%',
    marginLeft:'15%',
    justifyContent:'center',
    alignItems:'center',
    padding:Platform.OS ==='ios'? '2%':'0.5%',
    paddingLeft:Platform.OS === 'ios'?15:15,
    backgroundColor:Platform.OS === 'ios'? '#ffffff':null

  },
  watchCon:{
    padding:'5%'
  },
  watchlistTitle:{
    fontFamily:'SanFranciscoBold',
    fontSize:18,
    //fontWeight:'600',
  },
  bodyText: {
    fontFamily:'SanFranciscoBold',
    fontSize: 18,
    //fontWeight: '700',
  },
  forCards:{
    height:'100%',
    marginBottom:'40%',
    
  },
  headerStyle:{
    marginTop:Platform.OS === 'ios'? 0:24.5,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'space-between'
  },
});

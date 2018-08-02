import React from 'react';
import {
         StyleSheet, Text, View ,
        ScrollView,TouchableHighlight,
       TextInput,Platform
       } from 'react-native';
import {
        Header,Body,Right,Left,
        Icon,

      } from 'native-base'; // 2.3.9

import WatchlistCards from './cards/WatchlistCards'
import {Actions} from 'react-native-router-flux'
import ExploreScreen from './explore/'
export default class FavoriteScreen extends React.Component{

  constructor(props){
    super(props)
    this.state={
      drawerOpen: false,
      screenChild:'ex',
    }
    this.openDrawer=this.openDrawer.bind(this)
    this.closeDrawer=this.closeDrawer.bind(this)
    this.setScreenChild=this.setScreenChild.bind(this)
  }
  closeDrawer() {
    this.setState({
      drawerOpen: false
    })
    this.drawer._root.close()

  };
  setScreenChild(){
    this.setState({
      screenChild:'result'
    })
    console.log(this.state.screenChild);
    
  }
  openDrawer() {
    this.setState({
      drawerOpen: true
    })
    this.drawer._root.open()

  };
  componentWillMount() {
    this.loadFonts();
  }
 
  async loadFonts() {
    await Expo.Font.loadAsync({
      'SanFrancisco':require('../assets/fonts/SF-Pro-Display-Regular.otf'),
      'SanFranciscoBold':require('../assets/fonts/SF-Pro-Display-Bold.otf')
    });
    
  }

  render(){
  
    return(
      <View style={{marginBottom:'0%'}}> 

        <View style={styles.watchCon}>

          <View style={{flexDirection:'row',marginBottom:'3%'}}>
          
            <View style={{borderBottomColor:'#1976D2',borderBottomWidth:2,paddingVertical:'2%',}}>
            
              <Text style={styles.watchlistTitle}>Watchlist</Text>
            
            </View>
          
            <View style={{borderBottomColor:'#eee',borderBottomWidth:2,flex:1,}}>
            <Text style={{fontFamily:'SanFrancisco',color:'white'}}>Watchlist</Text>
            </View>
          </View>

          
          <View style={styles.forCards}>
          <ScrollView 
            style={{paddingBottom:'50%',width:'100%'}}
            scrollEnabled={true}>

            <WatchlistCards en={true} city="img1" from='Prague' to='Singapore' price='280 USD' date='20 Mar' date2='1 Apr' day='Thursday' day2='Sunday' screenChildClick={this.setScreenChild.bind(this)}/>
            <WatchlistCards en={true} city="img2" from='Prague' to='Tokyo' price='740 USD' date='30 Mar' date2='1 Apr' day='Thursday' day2='Sunday' screenChildClick={this.setScreenChild.bind(this) }/>
            <WatchlistCards en={true} city="img3" from='Rome' to='Berlin' price='175 USD'  date='25 Mar' date2='15 Apr' day='Thursday' day2='Sunday' screenChildClick={this.setScreenChild.bind(this)}/>

            </ScrollView>
          </View>
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
   // fontWeight:'700',
    borderBottomColor:'#1976D2',
  },
  forCards:{
    width:'100%',
    marginBottom:'40%',
    //margin:'5%',
    // paddingHorizontal:'10%'
  },
  headerStyle:{
    marginTop:Platform.OS === 'ios'?0:24.5,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'space-between'
  },
});

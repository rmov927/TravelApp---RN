import React from 'react';
import { Actions } from 'react-native-router-flux'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  StyleSheet, Text, View,
  ScrollView,
  TextInput, Platform, TouchableOpacity
} from 'react-native';
import {
  Header, Tab, Tabs,
  Icon,

} from 'native-base'; // 2.3.9
import * as Expo from 'expo'



let i = 0;

export default class ResultScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      select:true
    };



  }
  navigate(){
    Actions.mainScreen({refresh:{secondScreen:'result'}})
  }
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      FontAwesome: require("@expo/vector-icons/fonts/FontAwesome.ttf"),
      'SanFrancisco':require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
      'SanFranciscoBold':require('../../assets/fonts/SF-Pro-Display-Bold.otf')

    });
    this.setState({ isReady: true });
  }
  //for rendering the userlist

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (

      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header style={styles.headerStyle}>
          <View>
            <TouchableOpacity style={{width:50}} onPress={() => Actions.pop( )}>
              <Icon name='ios-arrow-back-outline' />
            </TouchableOpacity>
          </View>
          <View style={{
            flexDirection:'row',
            height:Platform.OS ==='ios'? '70%':'60%',
            //width:Platform.OS ==='ios'?null: '80%',
            borderWidth:Platform.OS === 'ios'?0.8:1,
            borderRadius:Platform.OS === 'ios'?5:5,
            borderColor:'#d2d2d2',
            // justifyContent:'center',
            alignItems:'center',
            paddingVertical:'3%',
            padding:Platform.OS ==='ios'? '2%':'2%',
            backgroundColor:Platform.OS === 'ios'? '#ffffff':null
          }}>
              <TouchableOpacity onPress={()=>Actions.mainScreen()} style={{flexDirection:'row'}}>
              <View style={styles.bookTitle}>
              <Icon name='search' style={{fontSize:18,marginHorizontal:5,color:'grey'}}/>
                  <Text style={styles.fromText}>PRAGUE</Text>
                    <Icon name='ios-plane' style={[styles.icon,{marginTop:'-2%'}]}/>
                    <Icon name='ios-plane' style={[styles.icon, {transform: [
                                                            {rotateZ : '180deg'}
                                                          ]},{marginLeft:Platform.OS ==='ios'? '-8%':'-7%',marginTop:Platform.OS ==='ios'?'4%':'5%',}]}/>
                     
                  <Text style={styles.toTitle}>PARIS</Text>
                  <Text style={{marginLeft:'2%',fontSize:8,fontFamily:'SanFrancisco'}}>14 Mar - 28 Apr</Text>
                </View>
              </TouchableOpacity>
          </View>
          
          <View>
            <TouchableOpacity onPress={() => Actions.mainScreen({ 'secondScreen': 'notify' })} style={{
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

        <View style={{ padding: '5%' ,backgroundColor:'#fafafa',flex:1,margin:'4%'}}>
          <View style={styles.depCon}>
            <Text style={styles.depTextStyle}>Departure</Text>
            <TouchableOpacity onPress={()=>this.setState({select:!this.state.select})}>
            <Icon name={this.state.select?'ios-heart-outline':'ios-heart'}  style={{ color: '#84c2f7' }}/>
            </TouchableOpacity>
          </View>

        
            <View style={{ flexDirection: 'row' ,justifyContent:'space-around'}}>
              <View>
                <Text style={styles.textStyle}>PRG</Text>
              </View>
              <View>
              <Text style={styles.textStyle}>16:10</Text>
            
              </View>
              <View>
              <Text style={styles.textStyle}>Prague</Text>
              </View>
              <View></View>
            </View>
          
            <View style={{ flexDirection: 'row' ,justifyContent:'space-around',marginTop:10}}>
              <View 
              style={{
                marginLeft:'11%',
                justifyContent:'center',
                alignItems:'center',
                borderRightWidth:1,
              }}
              />
              

              <View style={{marginLeft:'10%',width:'25%',paddingLeft:10}}>
                <Text style={{fontSize:10,fontFamily:'SanFrancisco'}}>14 Mar:Fri</Text>
                <Text style={{fontSize:10,fontFamily:'SanFrancisco', marginTop:10}}>1h20m</Text>
                
              </View>
              <View>
                <Text style={{fontSize:10}}>Vadav Hevel Airport</Text>
                <Text style={{fontSize:10,fontFamily:'SanFrancisco', marginTop:10}}>Ryanair - FR3033</Text>
              </View>
              <View></View>
            </View>
           
            <View style={{ flexDirection: 'row',width:'100%' ,marginLeft:'2%',justifyContent:'space-around',marginTop:10}}>
              <View>
              <Text style={[styles.textStyle,{marginLeft:'14%'}]}>CDG</Text>
              </View>
              <View style={{width:'26%'}}>
              <Text style={styles.textStyle}>16:10</Text>
              <Text style={{fontSize:10,paddingLeft:'10%',fontFamily:'SanFrancisco'}}>14 Mar:Fri</Text>
              </View>
              <View style={{width:'40%',marginLeft:'-1%'}}>
              <Text style={styles.textStyle}>Paris</Text>
              <Text style={{fontSize:10,paddingLeft:'5%',fontFamily:'SanFrancisco'}}>Vadav Hevel Airport</Text>
              </View>
              <View></View>
            </View>

            <View style={styles.retCon}>
              <Text style={styles.depTextStyle}>Return</Text>
            </View>
          
           
            <View style={{ flexDirection: 'row' ,justifyContent:'space-around'}}>
              <View>
                <Text style={styles.textStyle}>PRG</Text>
              </View>
              <View>
              <Text style={styles.textStyle}>16:10</Text>
            
              </View>
              <View>
              <Text style={styles.textStyle}>Prague</Text>
              </View>
              <View></View>
            </View>
          
            <View style={{ flexDirection: 'row' ,justifyContent:'space-around',marginTop:10}}>
              <View 
              style={{
                marginLeft:'11%',
                justifyContent:'center',
                alignItems:'center',
                borderRightWidth:1,
              }}
              />
              

              <View style={{marginLeft:'10%',width:'25%',paddingLeft:10}}>
              <Text style={{fontSize:10,fontFamily:'SanFrancisco'}}>14 Mar:Fri</Text>
                <Text style={{fontSize:10,fontFamily:'SanFrancisco', marginTop:10}}>1h20m</Text>
                
              </View>
              <View>
               <Text style={{fontSize:10}}>Vadav Hevel Airport</Text>
                <Text style={{fontSize:10,fontFamily:'SanFrancisco', marginTop:10}}>Ryanair - FR3033</Text>
              </View>
              <View></View>
            </View>
           
            <View style={{ flexDirection: 'row',width:'100%' ,marginLeft:'2%',justifyContent:'space-around',marginTop:10}}>
              <View>
              <Text style={[styles.textStyle,{marginLeft:'14%'}]}>CDG</Text>
              </View>
              <View style={{width:'26%'}}>
              <Text style={styles.textStyle}>16:10</Text>
              <Text style={{fontSize:10,paddingLeft:'10%',fontFamily:'SanFrancisco'}}>14 Mar:Fri</Text>
              </View>
              <View style={{width:'40%',marginLeft:'-1%'}}>
              <Text style={styles.textStyle}>Paris</Text>
              <Text style={{fontSize:10,paddingLeft:'5%',fontFamily:'SanFrancisco'}}>Vadav Hevel Airport</Text>
              </View>
              <View></View>
            </View>


            
            <View style={styles.thirdCon}>
              <Text style={styles.extraText}>RYANAIR</Text>
              <Text style={styles.extraText}>180 EUR</Text>
            </View>

            <View style={styles.fourthCon}>
              <TouchableOpacity style={styles.btn} onPress={()=>this.navigate()}>
                <Text style={styles.btnText}> Go to site</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  headerStyleCon: {
    flexDirection: 'row',
    //width:Platform.OS ==='ios'?null: '80%',
    borderWidth: Platform.OS === 'ios' ? 0.8 : 1,
    borderRadius: Platform.OS === 'ios' ? 5 : 5,
    borderColor: '#d2d2d2',
    width: '70%',
    marginLeft: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? '2%' : '0.5%',
    paddingLeft: Platform.OS === 'ios' ? 15 : 15,
    backgroundColor: Platform.OS === 'ios' ? '#ffffff' : null

  },
  watchCon: {
    padding: '5%'
  },
  watchlistTitle: {
    fontFamily:'SanFranciscoBold',
    fontSize: 18,
  //fontWeight:Platform.OS ==='ios'?'700': '600',
  },
  bodyText: {
    fontFamily:'SanFranciscoBold',
    fontSize: 18,
    //fontWeight:Platform.OS ==='ios'?'700': '600',
  },
  forCards: {
    height: '100%',
    marginBottom: '40%',

  },
  headerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 24.5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: '#ffffff'
  },
  tabBarBackColor: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: 'white',

  },
  tabTextStyle: {
    fontFamily:'SanFranciscoBold',
    color: 'black',
    fontSize: 20,
   // fontWeight:Platform.OS ==='ios'?'700': '600',
  },
  activeTabStyle: {
    borderWidth: 0,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#ffffff',
  },
  activeTextStyle: {
    fontFamily:'SanFranciscoBold',
    color: 'black',
    fontSize: 20,
   // fontWeight:Platform.OS ==='ios'?'700': '600',
  },
  depCon: {
    marginBottom:Platform.OS ==='ios'?'10%':'5%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  retCon:{
    marginBottom:Platform.OS ==='ios'?'10%':'5%',
    marginTop:'3%',
  },
  textStyle:{
    fontFamily:'SanFrancisco',
    fontSize:18,
    //fontWeight:Platform.OS ==='ios'?'700': '600',
  },
  textLowerStyle:{
    fontFamily:'SanFrancisco',
    fontSize:14,
  },
  depTextStyle:{
    fontFamily:'SanFranciscoBold',
    fontSize:18,
    fontWeight: 'bold',
    //fontWeight:Platform.OS ==='ios'?'700': '600',
  },
  thirdCon:{
     marginTop:Platform.OS ==='ios'?'8%':'6%',
    //marginBottom:Platform.OS ==='ios'?'5%':'3%',
    justifyContent:'space-between',
    flexDirection:'row',
    
  },
  fourthCon:{
    justifyContent:'flex-end',
    flex:1,
    alignItems:'flex-end',
    flexDirection:'row',
    width:'100%',
    
  },
  extraText:{
    fontFamily:'SanFranciscoBold',
    fontSize:20,
    //fontWeight:Platform.OS ==='ios'?'700': '600',
  },
  btn: {
    backgroundColor: '#ff4d4d',
    paddingVertical:Platform.OS ==='ios'? '3%':'3%',
    paddingHorizontal:Platform.OS ==='ios'? '6%':'6%',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnText: {
    fontFamily:'SanFranciscoBold',
    color: '#ffffff',
    fontSize:Platform.OS ==='ios'? 16:14,
   // fontWeight:'600',

  },
  bookTitle:{
    
   // padding:'0%',
  //  width:'78%',
    flexDirection:'row',
   // justifyContent:'flex-start',
    alignItems:'center',
    //borderWidth:1,
  },
  fromText:{
    //alignSelf:'flex-end',
    textAlign:'right',
    fontFamily:'SanFrancisco',
    fontSize:Platform.OS ==='ios'?15:13,
    //fontWeight:'800',
  },
  icon:{
    fontFamily:'SanFrancisco',
    paddingLeft:'2%',
    paddingRight:'2%',
    //padding:'2%',
    fontSize:Platform.OS ==='ios'?10:12,
  },
  toTitle:{
    fontFamily:'SanFrancisco',
    fontSize:Platform.OS ==='ios'?15:13,
   // fontWeight:'800',
  
  },
});

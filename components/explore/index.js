import React from 'react';
import {Actions} from 'react-native-router-flux'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
         StyleSheet, Text, View ,
        ScrollView,Alert,
       TextInput,Platform,TouchableOpacity,RefreshControl,Modal,Dimensions
       
       } from 'react-native';
import {
        Header, Tab, Tabs,
        Icon,

      } from 'native-base'; // 2.3.9
import * as Expo from 'expo'
import ExploreCard from '../cards/ExploreCard';
import UserCard from '../cards/UserCard';
import RusultScreen from './ResultScreen'
import RadioButton from '../Radiobutton';
import MaterialTabs from 'react-native-material-tabs';

export default class ExploreScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            snapToAlignment:'',
            filterPopUp:false,
            sortPopUp:false,
            value2:1,
            selectedTab :this.props.seeAll?1:0  
          };
          console.log('ok',this.props.men)
          //alert(this.props.men)
      }
      handleOnPress(value) {
        //alert('he')
        this.setState({ value2: value })
      }
      closeModalWhereTo() {
        this.setState({
          filterPopUp: false,
         
        });
      }
      closeModal() {
        this.setState({
          
          sortPopUp:false
        });
      }
      changeScreen(){
        this.setState({
          render:true
        })
      }
      componentWillReceiveProps(props){
        console.log('index',props);
        
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
      rendeRow(){
        
        var viewDyna =[]
        for(var i=0;i<5;i++){
          viewDyna.push(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:'10%'}} key={i}>
              <UserCard gap={5} img={require('../../assets/Users/111.png')} fromCity='Bangkok' toCity='Thailand' fromDate='28.3' toDate='30.4'/>

              <View style={{marginHorizontal:Platform.OS === 'ios'?'1%': '1%'}}/>
              <UserCard gap={5} img={require('../../assets/Users/123.png')}  fromCity='Washington' toCity='Springfield' fromDate='4.3' toDate='05.4'/>
              <View style={{marginHorizontal:Platform.OS === 'ios'?'1%': '1%'}}/>
              <UserCard gap={5} img={require('../../assets/Users/125.gif')}  fromCity='Franklin' toCity='Greenville' fromDate='28.4' toDate='23.5'/>
            </View>
          )
        }
        return viewDyna
      }
  render(){
    
    if (!this.state.isReady) {
        return <Expo.AppLoading />;
      }
    
    return(
        
      <View style={{flex:1,backgroundColor:'white'}}>
      
       <Header style={styles.headerStyle}> 
          <View>
              <TouchableOpacity activeOpacity={0} style={{width:48}} onPress={()=>
                  {
                      this.props.dis?Actions.mainScreen({'secondScreen':'notify'}):
                      Actions.mainScreen({refresh: {'secondScreen':'main'}})

                  }
                  }> 
                    <Icon name='ios-arrow-back-outline'/>
                </TouchableOpacity>
            </View>
            <View >
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
            </View>
          
          <View>
            <TouchableOpacity style={{width:50,marginRight:7,alignItems:'flex-end'}} onPress={()=>Actions.mainScreen({'secondScreen':'notify'})}>
                <Icon name="ios-notifications-outline" />
            </TouchableOpacity>
          </View>
        </Header>

      <View style={{flex:1,borderWidth:0,}}>
       
      <MaterialTabs
        barColor={'white'}
        indicatorColor='#1976D2'
        textStyle={styles.tabTextStyle}
        items={['Deals', 'Travelers',]}
        uppercase={false}
        selectedIndex={this.state.selectedTab}
        onChange={index => this.setState({ selectedTab: index })}
      />
      {
        
        this.state.selectedTab==0?
      <View style={{padding:'2%'}}>
        <ScrollView
        ref={(c) => {this.scroll = c}}
        >
          <ExploreCard like={true}/>
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <View style={{marginBottom:'10%',height:60}}/>
        </ScrollView>
        
        <View style={{alignSelf:'flex-end',position:'absolute',bottom:'12%',flexDirection:'row'}}>
        <TouchableOpacity style={styles.btn} onPress={()=>this.setState({filterPopUp:true})}>
          <Text  style={styles.btnText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.btn}  onPress={()=>this.setState({sortPopUp:true})}>
          <Text  style={styles.btnText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scrollupbtn} onPress={() => { this.scroll.scrollTo({x: 0, y: 0, animated: true})}}>
                <Icon name="ios-arrow-up-outline" style={styles.upicon} />
        </TouchableOpacity>
        </View> 
        <Modal
              visible={this.state.sortPopUp}
              animationType={'fade'}
              transparent={true}
              onRequestClose={() => this.closeModalWhereTo()}
              >
                <View style={{backgroundColor:'rgba(0, 0, 0,0.4)',height:'100%'}}>
                <View style={{height:'50%', top:'50%',backgroundColor:'white',borderTopWidth:2,borderTopColor:'grey',alignItems:'center',width:'100%',padding:'2%'}}>
                <View style={{borderBottomWidth:1,borderBottomColor:'grey',paddingBottom:10,flexDirection:'row',width:'100%',alignSelf:'center',justifyContent:'center'}}>
                  <Text style={{fontFamily:'SanFranciscoBold',fontSize:20,}}>SORT BY</Text>
                  <TouchableOpacity style={{marginLeft:'10%',padding:10,top:-7,position:'absolute',right:5}} onPress={()=>this.setState({sortPopUp:false})}>
                  <Text  style={{color:'grey',fontFamily:'SanFrancisco',textAlign:'center',fontSize:15}}>Close</Text>
                </TouchableOpacity>
                </View>
                <View>
                <View style={{marginTop:20}}>
                    <RadioButton currentValue={this.state.value2} value={1}  onPress={this.handleOnPress.bind(this)}>
                              <Text style={{fontFamily:'SanFranciscoBold',fontSize:18}}>Date</Text>
                    </RadioButton>
                </View>
               <View style={{marginTop:10}}>
                   <RadioButton currentValue={this.state.value2}  onPress={this.handleOnPress.bind(this)} >
                            <Text style={{fontFamily:'SanFranciscoBold',fontSize:18}}>Price</Text>
                  </RadioButton>
               </View>
                
                </View>
                
                </View>
                </View>
              </Modal>
              <Modal
              visible={this.state.filterPopUp}
              animationType={'fade'}
              transparent={true}
              
              onRequestClose={() => this.closeModal()}
              >
              <View style={{backgroundColor:'rgba(0, 0, 0,0.4)',height:'100%'}}>
                
                <View style={{height:'70%',top:'30%',backgroundColor:'white',borderTopWidth:2,borderTopColor:'grey',width:'100%',padding:'2%'}}>
                
                <View style={{justifyContent:'space-between', marginLeft:10, borderBottomWidth:1,borderBottomColor:'grey',paddingBottom:10,flexDirection:'row',width:'100%',alignSelf:'center'}}>
                <TouchableOpacity style={{left:10,padding:10,marginTop:-5}} onPress={()=>this.setState({filterPopUp:false})}>
                  <Text  style={{fontFamily:'SanFrancisco',color:'grey',textAlign:'center',fontSize:15}}>Reset</Text>
                </TouchableOpacity>
                  <Text style={{fontFamily:'SanFranciscoBold',fontSize:20}}>FILTER</Text>
                  <TouchableOpacity style={{right:10,padding:10,marginTop:-5}} onPress={()=>this.setState({filterPopUp:false})}>
                  <Text  style={{fontFamily:'SanFrancisco',color:'grey',textAlign:'center',fontSize:15}}>Apply</Text>
                </TouchableOpacity>
                </View>
               
                 <View>
                  <View style={{marginTop:10,marginLeft:10}}><Text style={{fontSize:18}}>Depart from</Text></View>
                <View style={{marginTop:20,flexDirection:'row',marginLeft:10}}>
                    <RadioButton currentValue={this.state.value2} value={1}  onPress={this.handleOnPress.bind(this)}>
                              <Text style={{fontFamily:'SanFranciscoBold',fontSize:20}}>PEG</Text>
                    </RadioButton>
                    <View style={{marginLeft:10}}>
                    <Text style={{fontFamily:'SanFrancisco',fontSize:14}}>Prague,Czech Reupblic</Text>
                    <Text style={{fontFamily:'SanFrancisco',fontSize:10}}>Vaclav I Lavel Airport</Text>
                    </View>
                  
                </View>
               <View style={{marginTop:10,flexDirection:'row',marginLeft:10}}>
                   <RadioButton currentValue={this.state.value2} value={1} onPress={this.handleOnPress.bind(this)} >
                            <Text style={{fontFamily:'SanFranciscoBold',fontSize:20}}>DRS</Text>
                  </RadioButton>
                  <View style={{marginLeft:10}}>
                    <Text style={{fontFamily:'SanFrancisco',fontSize:14}}>Dresden, Germany</Text>
                    <Text style={{fontFamily:'SanFrancisco',fontSize:10}}>Dresden Airport</Text>
                    </View>
               </View>
               <View style={{marginTop:10,flexDirection:'row',marginLeft:10}}>
                    <RadioButton currentValue={this.state.value2} value={1}  onPress={this.handleOnPress.bind(this)}>
                              <Text style={{fontFamily:'SanFranciscoBold',fontSize:20}}>KLV</Text>
                    </RadioButton>
                    <View style={{marginLeft:10}}>
                    <Text style={{fontFamily:'SanFrancisco',fontSize:14}}>Karlovy Vary, Czech Republic</Text>
                    <Text style={{fontFamily:'SanFrancisco',fontSize:10}}>karlovy vary Airport</Text>
                    </View>
                </View>
                <View>
                  
                </View>
                {/* <Text style={{fontSize:18}}>Stops</Text> */}
                <View style={{marginTop:10,marginLeft:10,borderBottomWidth:1,borderBottomColor:'grey',paddingBottom:10}}></View>

                <Text style={{fontSize:18,marginTop:10,marginLeft:10}}>Stops</Text>
                <View style={{marginTop:20,flexDirection:'row',marginLeft:10}}>
                    <RadioButton currentValue={this.state.value2} value={1}  onPress={this.handleOnPress.bind(this)}>
                              <Text style={{fontFamily:'SanFranciscoBold',fontSize:20,marginLeft:50}}>Any</Text>
                    </RadioButton>
                  
                </View>
               <View style={{marginTop:10,flexDirection:'row',marginLeft:10}}>
                   <RadioButton currentValue={this.state.value2}  onPress={this.handleOnPress.bind(this)} >
                            <Text style={{fontFamily:'SanFranciscoBold',fontSize:20,marginLeft:50}}>Direct Flights</Text>
                  </RadioButton>
                  
               </View>
                
                </View>
              
                </View>
                </View>
              </Modal>
              
      </View>
        :
        <View>
        <View style={{paddingHorizontal:'5%',paddingTop:'2%'}} 
          >
          <Text style={{
                  fontFamily:'SanFranciscoBold',
                  justifyContent:'flex-start',
                  fontSize:15,
                  color:'#3e4444',
                  //fontWeight:'600'
              }}>People travelling from Prague to Paris</Text>
          </View>
          <View style={{padding:'2%',marginBottom:'20%'}}>
              <ScrollView
             
              >
                {
                  this.rendeRow()
                }
              </ScrollView>
           
            </View>
            </View>
      }
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
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:'3%',
    padding:Platform.OS ==='ios'? '2%':'2%',
    backgroundColor:Platform.OS === 'ios'? '#ffffff':null

  },
  watchCon:{
    padding:'5%'
  },
  watchlistTitle:{
    fontFamily:'SanFranciscoBold',
    fontSize:18,
   // fontWeight:'600',
  },
  bodyText: {
    fontFamily:'SanFranciscoBold',
    fontSize: 18,
   // fontWeight: '700',
  },
  forCards:{
    height:'100%',
    marginBottom:'40%',
    
  },
  headerStyle:{
    marginTop:Platform.OS === 'ios'?0:24.5,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'space-between',
    borderWidth:0,
    borderColor:'#ffffff'
  },
  tabBarBackColor:{
    backgroundColor:'#ffffff',
    borderWidth:2,
    borderColor:'white',

  },
  tabTextStyle:{
    fontFamily:'SanFranciscoBold',
    color:'black',
    fontSize:20,
    //fontWeight:'700',
  },
  activeTabStyle:{
    borderWidth:0,
    borderWidth:2,
    borderColor:'white',
    backgroundColor:'#ffffff',
  },
  activeTextStyle:{
    fontFamily:'SanFranciscoBold',
    color:'black',
    fontSize:20,
   // fontWeight:'700',
  },
  btn:{
    marginLeft:'10%',
    paddingLeft:'8%',
    paddingRight:'8%',
    padding:10,
    borderWidth:1.5,
    borderColor:'grey',
    borderRadius:20,
    backgroundColor:'white',
  },
  btnText:{
    fontFamily:'SanFranciscoBold',
    textAlign:'center',
    color:'#ff5d58',
    fontSize:15,
   //fontWeight:'700'
  },
  scrollupbtn:{
    marginLeft:'10%',
    width:40,
    height:40,
    //padding:10,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    backgroundColor:'#ff5d58',

  },
  upicon:{
    color:'white',
    fontSize:20,
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

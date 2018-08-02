import React,{Component} from 'react'
import * as Expo from "expo";
import {Actions} from 'react-native-router-flux'
import {
            View,Text,Modal,
            StyleSheet,Platform,Image,ScrollView,
            TextInput,TouchableOpacity,Dimensions,KeyboardAvoidingView
        } from 'react-native'

import {
    Header,Body,Right,
    Left,Icon,Tab,Drawer,
    Tabs,ScrollableTab,FooterTab,
    Footer,Button,Container, Radio

    } from 'native-base'; // 2.3.9
const dim = Dimensions.get('window')
const logo =require('../../assets/logo.png')

import LoginScreenContainer from './LoginScreenContainer'
import SignupScreen from './SignupScreen';

class LoginScreen extends Component{

  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      renderScreenCurrently:true
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

  renderScreen(){

    if(this.state.renderScreenCurrently){
        return(
            <LoginScreenContainer />
        )
    } else {
        return(
            <SignupScreen/>
        )
    }
  }
  render(){
    if (!this.state.isReady) {
            return <Expo.AppLoading />;
          }
            return(

                <View style={{flex:1,backgroundColor:'white'}}>
                <ScrollView style={{paddingBottom:'3%',paddingTop:'3%'}}
                    showsVerticalScrollIndicator={false}
                >
                <View style={{flex:1,padding:'5%',backgroundColor:'white'}}>

                    <View style={styles.headerStyle}>
                        <TouchableOpacity onPress={()=>Actions.mainScreen({secondScreen:'home'})}>
                            <Icon name="close" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>

                            <Image source={logo}  style={styles.logoImage}/>

                        <View style={{flex:1,}}>
                            <View>
                                <View style={{backgroundColor:'white',flexDirection:'row',flex:0.3,justifyContent:'center',alignItems:'center',width:'100%',}}>
                                    <TouchableOpacity style={this.state.renderScreenCurrently? styles.btnSelect:styles.btn} onPress={()=>this.setState({renderScreenCurrently:true})}>
                                        <Text style={styles.btnText}>Login</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={this.state.renderScreenCurrently? styles.btn:styles.btnSelect} onPress={()=>this.setState({renderScreenCurrently:false})}>
                                        <Text style={styles.btnText}>Signup</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    {
                                        this.renderScreen()
                                    }
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
                </ScrollView>
                </View>
        )
    }

}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    headerStyle:{

        marginTop:Platform.OS === 'ios'?'0%':'6%',
        backgroundColor:'#ffffff',
        alignItems:'flex-end',
        justifyContent:'flex-end'
    },
    tabBarBackColor: {
        backgroundColor: '#ffffff',
      },
      activeTabStyle: {
        backgroundColor: '#ffffff',
      },
      activeTextStyle: {
        fontFamily:'SanFrancisco',
        color: 'black',
        fontSize: 20,
      },
      tabTextStyle: {
        fontFamily:'SanFrancisco',
        color: 'black',
        fontSize: 20,
      },
      iconContainer:{
          justifyContent:'center',
          alignItems:'center',
          height:'20%'
      },
      txtStyle:{
        width:250,
        //height:Platform.OS ==='ios'?'15%': '20%',
        //borderBottomWidth:Platform.OS ==='ios'?1.2: 1,
        fontFamily:'SanFrancisco',
        fontSize:14,
        textAlign:'center',
        paddingVertical:Platform.OS ==='ios'?'5%': '2%',
    },
    txtStyle2:{
        width:250,
        //paddingVertical:Platform.OS ==='ios'?'4%': '0%',
        //borderBottomWidth:Platform.OS ==='ios'?1.2: 1,
        marginBottom:'3%',
        borderBottomColor:'lightgrey',
        fontSize:14,
        fontFamily:'SanFrancisco',
        textAlign:'center'
        },
    btnStyle:{
        backgroundColor:'#ff5b5a',
        borderRadius:50,
        paddingVertical:'3.5%',
        paddingHorizontal:'30%',
        justifyContent:'center',
        alignItems:'center',

    },
    btnTextStyle:{
       // fontFamily:'SanFranciscoDisplay-Heavy',
        color:'white',
        fontWeight:'800',
        fontSize:16
    },
    btnForget:{
        width:240,
        padding:5,
    },
    btnForgetTextStyle:{

        textAlign:'right',
         fontFamily:'SanFranciscoBold',
       // fontWeight:Platform.OS ==='ios'? '500':'300',
    },
    iconCon:{
        height:50,
        width:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#093c82',
    },
    icon:{
        fontSize:50,
        color:'#093c82',
    },
    icon2:{
        fontSize:50,
        color:'#fa3c24',
    },
    icon3:{
        fontSize:50,
        color:'#0095a2',
    },
    icon4:{
        fontSize:50,
        color:'#005779',
    },
    logoImage:{
        // height:Platform.OS ==='ios'? dim.height/6.2:dim.height/6.2,
        // width: dim.width/3.5,
        height:100,
        width:100

    },
    orStyle:{
        marginVertical:'5%',
        justifyContent:'center',
        alignContent:'center'
    },
    orTextStyle:{
        fontFamily:'SanFrancisco',
        textAlign:'center',
        fontSize:16,
        color:'grey'
    },
    comments:{
        fontFamily:'SanFrancisco',
        color:'#d2d2d2',
        textAlign:'justify',
        fontSize:16,
    },
    txtContainer:{

        borderBottomWidth:Platform.OS ==='ios'?1.2: 1,
        marginBottom:Platform.OS ==='ios'? '4%':'2%',
        borderBottomColor:'lightgrey',
    },
    btnStyle2:{
        backgroundColor:'#ff5b5a',
        borderRadius:50,
        paddingVertical:'3.5%',
        paddingHorizontal:'30%',

    },
    btn:{
        padding:'5%',
        borderBottomWidth:1.5,
        borderBottomColor:'lightgrey',
        width:'45%',
        justifyContent:'center',
        alignItems:'center'
    },
    btnSelect:{
        padding:'5%',
        borderBottomWidth:1.5,
        borderBottomColor:'#1976D2',
        width:'45%',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        fontFamily:'SanFranciscoBold',
        fontSize:22,
       //fontWeight:'800',
    }

})

export default LoginScreen

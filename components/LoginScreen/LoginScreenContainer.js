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


class LoginScreenContainer extends Component{
    constructor(props){
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
            'SanFrancisco':require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
            'SanFranciscoBold':require('../../assets/fonts/SF-Pro-Display-Bold.otf')
        });
        
        this.setState({ isReady: true });
      }
    render(){
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
          }
        return(
            <View style={{alignItems:'center',marginTop:10,flex:1}}>
                <View style={styles.txtContainer}>
                    <TextInput 
                        placeholder='Email'
                        placeholderTextColor='black'
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        style={styles.txtStyle2}
                        onChangeText={(text)=> this.setState({})}
                    />
                </View>
                <View style={styles.txtContainer}>
                <TextInput 
                        placeholder='Password'
                        placeholderTextColor='black'
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        style={styles.txtStyle2}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.btnStyle} 
                    onPress={()=>Actions.mainScreen({refresh:{secondScreen:'home'}})}>
                        <Text style={styles.btnTextStyle}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    
                   
                }}>
                    <TouchableOpacity style={styles.btnForget}>
                        <Text style={styles.btnForgetTextStyle}>Forgot password ?</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={styles.orStyle}>
                        <Text style={styles.orTextStyle}>OR LOGIN WITH</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:dim.width/1.5}}>

                        <Icon name='facebook-with-circle' type='Entypo' style={styles.icon}/>
                        <Icon name='google--with-circle' type='Entypo' style={styles.icon2}/>
                        <Icon name='twitter-with-circle' type='Entypo' style={styles.icon3}/>
                        <Icon name='instagram-with-circle' type='Entypo' style={styles.icon4}/>
                    
                    </View>
                </View>

                <View style={{
                    marginTop:Platform.OS ==='ios'?'40%': '30%',
                    
                    
                }}>
                    
                </View>
               

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
        fontFamily:'SanFrancisco',
        width:250,
        //height:Platform.OS ==='ios'?'15%': '20%',
        //borderBottomWidth:Platform.OS ==='ios'?1.2: 1,
       
        fontSize:14,
        textAlign:'center',
        paddingVertical:Platform.OS ==='ios'?'5%': '2%',
    },
    txtStyle2:{
        fontFamily:'SanFrancisco',
        width:250,
        //paddingVertical:Platform.OS ==='ios'?'4%': '0%',
        //borderBottomWidth:Platform.OS ==='ios'?1.2: 1,
        marginBottom:'3%',
        borderBottomColor:'lightgrey',
        fontSize:14,
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
        fontFamily:'SanFranciscoBold',
        color:'white',
        //fontWeight:'800',
        fontSize:16
    },
    btnForget:{
        width:240,
        padding:5,
    },
    btnForgetTextStyle:{
        fontFamily:'SanFranciscoBold',
        textAlign:'right',
        //fontWeight:Platform.OS ==='ios'? '500':'300',
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
        height:dim.height/5,
        width:dim.width/3,
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
        fontFamily:'SanFrancisco',
        backgroundColor:'#ff5b5a',
        borderRadius:50,
        paddingVertical:'3.5%',
        paddingHorizontal:'30%',
        
    },
})

export default LoginScreenContainer
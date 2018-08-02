//import { Ionicons } from '@expo/vector-icons'; // 6.3.1
//import { Ionicons } from '@expo/vector-icons'; // 6.3.1
import * as Expo from "expo";
var RCTUIManager = require('NativeModules').UIManager;
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux'

import {
  StyleSheet, Text, View, TouchableOpacity,
  ScrollView, Image, Modal, ImageBackground,
  Dimensions,TextInputState,TouchableWithoutFeedback,
  TextInput, Switch, Slider, Platform,LayoutAnimation,
  KeyboardAvoidingView, Keyboard, Animated

} from 'react-native';
import {
  Header, Body, Right, Content,
  Left, Icon, Tab, Drawer,
  Tabs, ScrollableTab, FooterTab,
  Footer, Button, Container, Radio

} from 'native-base'; // 2.3.9
import MultiSlider from './lib/@ptomasroos/react-native-multi-slider';



import RadioButton from './components/Radiobutton/';
import RecentScreen from './components/recentScreen'
import CurrencyScreen from './components/currencyScreen'
import FavoriteScreen from './components/FavoriteScreen';
import ProfileScreen from './components/ProfileScreen/index.js'
import Notifications from './components/Notifications';
import TravelScreen from './components/TravelScreen';
import AdditionalScreen from './components/AdditionalScreen';
import CheckBox from './lib/checkBox/checkbox';
import UserCard from './components/cards/UserCard'

import ExploreScreen from './components/explore'
import ResultScreen from './components/explore/ResultScreen'

//
//Custom Tabs
//
import CustomTabs from './lib/customTabs'

//Drawer Screen
import SideBar from './components/drawer/SideBar'
import DealsCard from "./components/cards/DealsCard";


//import { CheckBox } from "react-native-elements";

//Image resource
const imgDeal = require('./assets/img2.jpeg');
const appLogo=require('./assets/appLogo.png')

//for animation header/scrool control
var value = 0, yPos
var show
var hide
var zanim
//for keyboard height dynamically
var kHeight

const btnWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const btnMonth = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
var month = new Date().getMonth()
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      whereToPopUp: false,
      whereTo: false,
      whenTo: this.props.when ? true : false,
      isReady: false,
      toggled: this.props.switchBtn!=null?this.props.switchBtn:false,
      value: 0,
      value2: 1,
      value3: 0,
      depart: [],
      return: [],
      month: [],
      weekClick: false,
      modalVisible: false,
      drawerOpen: false,
      second:this.props.secondScreen,
      whereAreYouSelect: '',
      whereToText: '',
      dayweek: false,
      whenText: '',
      monSelect: [],
      adult: 1,
      child: 0,
      infants: 0,
      scrollY: new Animated.Value(0),
      animatedStateSelect: true,
      sY:0,
      keyboardHeight:0,
      whereAreKeyboardHeight:0,
      tempText:'',
      kVisible:'20%',
      customTabBarValue:this.props.fromCal?this.props.fromCal: 'anytime',
      sliderOneChanging: false,
      sliderOneValue: [5],
      multiSliderValue: [1, 30],
      activekeyborad:false,
      isReady: false,
      weekbtn:true,
      weekbtn2:true,
      weekbtn3:true,
      weekbtn4:true,
      weekbtn5:true,
    };

    this.openDrawer = this.openDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    yPos = new Animated.Value(0)
    show=this.state.scrollY,
    hide=this.state.scrollY,
    zanim=this.state.scrollY
    sY2=Dimensions.get('window').height/2.8
   // console.log("%c hello",'color:green');
    kHeight=this.state.keyboardHeight
    this.scrollAuto=this.scrollAuto.bind(this)
    console.log(this.state.second)
    //this.changeStateFromChild=this.changeStateFromChild.bind(this)
  }

  scrollAuto(){




  }
  //additional screen operation........!!!
  additionalOperation(state, value) {
    switch (state) {
      case 'adult':
        this.setState({
          adult:this.state.adult==8?value<0? this.state.adult+value:this.state.adult :this.state.adult + value
        })
        break
      case 'child':
        this.setState({
          child:this.state.child==8?value<0? this.state.child+value:this.state.child :this.state.child + value
        })
        break
      case 'infants':
        this.setState({
          infants:this.state.infants==2?value<0? this.state.infants+value:this.state.infants :this.state.infants + value
        })
        break

    }

  }

  // clear when text entries
  clearWhenText() {
    this.setState({ whenText: '', toggled: false, monSelect: [] })
  }
  btnClickMon(index) {
    if (this.state.monSelect.indexOf(index) >= 0) {
      var del = this.state.monSelect.indexOf(index)
      if (del > -1) {
        var temp = this.state.monSelect
        temp.splice(del, 1)
        this.setState({
          monSelect: [...temp]
        })

      }

    } else {
      var temp = this.state.monSelect
      temp.push(index)
      this.setState({
        monSelect: temp
      })
    }

    this.setState({
      whenText: 'Flexible-Return ' + this.state.monSelect.toString()
    })


    console.log('================');
    console.log(this.state.monSelect);


  }
  handleOnPress(value) {
    //alert('he')
    this.setState({ value2: value })
  }


  _selectAll(checked) {


    checked
      ?
      this.setState({
        depart: [0, 1, 2, 3, 4, 5, 6]
      })
      :
      // this.state.depart.length >=7?this.setState({weekClick:!weekClick}):null

      this.setState({
        depart: []

      })

  }
  _selectAll2(checked) {


    checked
      ?
      this.setState({
        return: [0, 1, 2, 3, 4, 5, 6]
      })
      :
      // this.state.depart.length >=7?this.setState({weekClick:!weekClick}):null

      this.setState({
        return: []

      })

  }
  _btnMounthClick(index) {
    if (this.state.month.indexOf(index) >= 0) {
      var del = this.state.month.indexOf(index)
      if (del > -1) {
        var temp = this.state.month
        temp.splice(del, 1)
        this.setState({
          month: [...temp]
        })

      }

    } else {
      var temp = this.state.month
      temp.push(index)
      this.setState({
        month: temp
      })


    }
    console.log('------------ Month Range -------------');
    console.log(this.state.month);
    console.log(('------------------------------------------'));
  }

  closeDrawer() {
    this.setState({
      drawerOpen: false
    })
    this.drawer._root.close()


  };
  openDrawer() {
    this.setState({
      drawerOpen: true
    })
    this.drawer._root.open()

  };

  _btnReturnClick(index) {

    if (this.state.return.indexOf(index) >= 0) {
      var del = this.state.return.indexOf(index)
      if (del > -1) {
        var temp = this.state.return
        temp.splice(del, 1)
        this.setState({
          return: [...temp]
        })

      }

    } else {
      var temp = this.state.return
      temp.push(index)
      this.setState({
        return: temp
      })


    }
    console.log('------------ Return Range -------------');
    console.log(this.state.return);
    console.log(('------------------------------------------'));


    //var s=item.props.style
    //alert(s)

  }
  _btnDepClick(index) {

    //  this.setState({monClick:!this.state.monClick})

    //alert(index)

    if (this.state.depart.indexOf(index) >= 0) {
      var del = this.state.depart.indexOf(index)
      if (del > -1) {
        var temp = this.state.depart
        temp.splice(del, 1)
        this.setState({
          depart: [...temp]
        })

      }

    } else {
      var temp = this.state.depart
      temp.push(index)
      this.setState({
        depart: temp
      })


    }
    console.log('------------ Departure Range -------------');
    console.log(this.state.depart);
    console.log(('------------------------------------------'));


    //var s=item.props.style
    //alert(s)

  }
  navigate(title,ret,range,fromCal,switchbtn) {
    this.setState({ whenTo: false })
    //alert(title)

      console.log(title,ret,range);
      if(title=='Select dates' && range=='range' || range=='range2' )
      {
        console.log(ret);

        if(ret=='two'){
          Actions.depart({ 'title': title,'ret':'two','dep':'Departure Date','rat':' Return Date','fromCal':fromCal,'switchbtn':switchbtn})
        }else{
          Actions.depart({ 'title': title,'ret':'one','dep':'Earliest Return Date','rat':'Latest Return Date','fromCal':fromCal,'switchbtn':switchbtn})
        }
        if(ret=='two'&& range=='range2'){
          Actions.depart({ 'title': title,'ret':'two','dep':'Earliest Return Date','rat':'Latest Return Date','fromCal':fromCal,'switchbtn':switchbtn})
        }

      }else{
        if(title=='Select dates')
      {
        console.log(ret);

        if(ret=='two'){
          Actions.depart({ 'title': title,'ret':'two','dep':'Earliest Departure Date','rat':'Latest Departure Date','fromCal':fromCal,'switchbtn':switchbtn})
        }else{
          Actions.depart({ 'title': title,'ret':'one','dep':' Departure Date','rat':' Return Date','fromCal':fromCal,'switchbtn':switchbtn})
        }

      }
      }
   }

  change(value) {
    this.setState({
      value: parseFloat(value),
    });
  }
  componentDidMount() {
    this.setState({ second:this.props.secondScreen})
  }
  componentWillReceiveProps(props) {
    console.log(props);
    if (!props.drawer) {
      this.closeDrawer()
      console.log(props.drawer);

    }

    if (props.secondScreen == 'resultChild') {
      this.setState({
        secondScreen: 'resultChild'
      })
    }

    if (props.secondScreen == 'notify') {
      console.log('notify')

      this.setState({
        secondScreen: 'notify'
      })
    }
    if(props.when === true){
      this.setState({
        whenTo:true
      })
    }




  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  componentWillMount() {
    this.loadFonts();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));

    this.setState({ second:this.props.secondScreen})



  }
  _keyboardDidShow(e) {
     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    this.setState({

      keyboardHeight:Dimensions.get('window').height * 0.9 - e.endCoordinates.height,
      kVisible:'6%',
      activekeyborad:true

    })

  }

  _keyboardDidHide(e) {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      kVisible:'20%',
      activekeyborad:false

    })
    //console.log(Dimensions.get('window').height * 0.9 - e.endCoordinates.height);
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      FontAwesome: require("@expo/vector-icons/fonts/FontAwesome.ttf"),
      'SanFrancisco':require('./assets/fonts/SF-Pro-Display-Regular.otf'),
      'SanFranciscoBold':require('./assets/fonts/SF-Pro-Display-Bold.otf')

    });
    this.setState({ isReady: true });
  }
  openWhenModal() {
    this.setState({
      whenTo: true,
    });
  }
  closeWhenModal() {

    this.setState({
      whenTo: false,
    });

  }
  openModalWhereTo() {
    this.setState({
      whereTo: true,
    });
  }
  closeModalWhereTo() {
    Keyboard.dismiss()
    this.setState({
      whereTo: false,
    });

  }
  openModal() {
    this.setState({
      whereToPopUp: true,
    });


  }
  closeModal() {
    this.setState({
      whereToPopUp: false,
    });

  }
  additionalModal() {
    this.setState({
      modalVisible: true

    })
  }
  closeModalAdditional() {
    this.setState({
      modalVisible: false
    })
  }

  sideBarDemo() {
    alert('mainScreen')
  }

  _isContainInRect(rect, point){
    return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >=
    rect.y && point.y <= rect.y + rect.height;
}
  //for focus
  sliderOneValuesChangeStart = () => {
    this.setState({
      sliderOneChanging: true,
    });
  }


  sliderOneValuesChange = (values) => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({
      sliderOneValue: newValues,
    });
  }

  sliderOneValuesChangeFinish = () => {
    this.setState({
      sliderOneChanging: false,
    });
  }
  multiSliderValuesChange = (values) => {
    this.setState({
      multiSliderValue: values,
    });
  }

  //for toggling actions
  toggleActions() {
    if (this.state.toggled) {
      return (
        <View>
        <View style={styles.datePickerCon}>

          <View style={styles.sliderStyleCon}>
            {/* <Slider
              step={1}
              thumbTintColor='#008ae6'#006e8a
              maximumValue={100}
              onValueChange={(value) => this.setState({
                value: value
              })}
              value={value}
            /> */}


              {/* <Text style={{fontSize:18,zIndex:-2,paddingTop:-50,paddingVertical:20}}>{this.state.multiSliderValue[0] }{"-"}{ this.state.multiSliderValue[1]}</Text> */}


            <MultiSlider
            values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
            sliderLength={140}
            onValuesChange={this.multiSliderValuesChange}
            min={1}
            max={30}
            step={1}
           // thumbTintColor='#006e8a'

            snapped
          />

          </View>


          <View style={{marginTop:-8,flex:1}}>
            <View style={{marginTop:10,justifyContent:'center',height:40,flexDirection: 'row'}}>
              <Text style={styles.days}>Days</Text>
              <Text style={styles.days}>Weeks</Text>
            </View>
            <Switch
              onValueChange={(value) => !this.setState({ dayweek: value })}
              value={this.state.dayweek}
              style={[styles.switchStyle,{alignSelf:'center',marginTop:-20}]}
              onTintColor="#33acc4"
              thumbTintColor={this.state.dayweek?"#006e8a":'white'}
              thumbSize={20}
            />
          </View>


        </View>


         </View>
      )
    }
  }

  toggleActions2() {
    if (this.state.toggled) {
      return (
       <View style={{flex:1,marginTop:'-15%'}}>
        <View style={styles.datePickerCon}>

          <View style={[styles.sliderStyleCon,{marginLeft:5}]}>

            <MultiSlider
            values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
            sliderLength={140}
            onValuesChange={this.multiSliderValuesChange}
            min={1}
            max={30}
            step={1}
           // thumbTintColor='#006e8a'

            snapped
          />

          </View>

          <View style={{marginTop:10,flex:1}}>
            <View style={{marginTop:10,justifyContent:'center',height:40,flexDirection: 'row'}}>
              <Text style={styles.days}>Days</Text>
              <Text style={styles.days}>Weeks</Text>
            </View>

            <Switch
              onValueChange={(value) => !this.setState({ dayweek: value })}
              value={this.state.dayweek}
              style={[styles.switchStyle,{alignSelf:'center',marginTop:-20}]}
              onTintColor="#33acc4"
              thumbTintColor={this.state.dayweek?"#006e8a":'white'}
              thumbSize={20}
            />

          </View>


        </View>
        <View style={{marginTop:-20}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '0.5%' }}>
              <View style={{ flex: 2 }}>
                <Text style={[styles.drDepartureStyle,{fontSize:20}]}>Departure</Text>
              </View>
              <View style={{
                flexDirection: 'row', alignItems: 'center',
              }}>
             <TouchableOpacity style={{borderWidth:2,borderColor:'grey',paddingLeft:5,paddingRight:5,borderRadius:10}}
                onPress={()=>{this.setState({weekbtn:!this.state.weekbtn}),this._selectAll(this.state.weekbtn)}}>
                <Text style={{fontSize:8,padding:2}}>Select All</Text>
              </TouchableOpacity>
                {/* <CheckBox
                  label='Select All'
                  labelBefore={true}
                  onChange={(checked) => this._selectAll(checked)}
                  checkboxStyle={{ height: 15, width: 15 }}
                /> */}
              </View>
            </View>

            <View style={styles.weekDaysCon}>
              {
                btnWeek.map((item, index) => {

                  return (<TouchableOpacity style={this.state.depart.indexOf(index) >= 0 ? {backgroundColor:'#ff5e59', width:35,height:35,borderRadius:17,marginRight:10,justifyContent:'center'}: {borderWidth:2,borderColor:'grey',justifyContent:'center', width:35,height:35,borderRadius:17,marginRight:10}} key={index} onPress={() => this._btnDepClick(index)}>
                    <Text style={this.state.depart.indexOf(index) >= 0 ?{textAlign:'center',color:'white',fontWeight:'bold',fontSize:10}:{textAlign:'center',fontSize:10}}>{item.toUpperCase()}</Text>
                  </TouchableOpacity >)
                })
              }

            </View>

          </View>

          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.drDepartureStyle,{fontSize:20}]}>Return</Text>
              </View>
              <View style={{
                flexDirection: 'row', alignItems: 'center',
              }}>
              <TouchableOpacity style={{borderWidth:2,borderColor:'grey',paddingLeft:5,paddingRight:5,borderRadius:10}}
                onPress={()=>{this.setState({weekbtn2:!this.state.weekbtn2}),this._selectAll2(this.state.weekbtn2)}}>
                <Text style={{fontSize:8,padding:2}}>Select All</Text>
              </TouchableOpacity>
              </View>
            </View>

            <View style={styles.weekDaysCon}>
              {
                btnWeek.map((item, index) => {

                  return (<TouchableOpacity style={this.state.return.indexOf(index) >= 0 ? {backgroundColor:'#ff5e59', width:35,height:35,borderRadius:17,marginRight:10,justifyContent:'center'}: {borderWidth:2,borderColor:'grey',justifyContent:'center', width:35,height:35,borderRadius:17,marginRight:10}} key={index} onPress={() => this._btnReturnClick(index)}>
                    <Text style={this.state.return.indexOf(index) >= 0 ?{textAlign:'center',color:'white',fontSize:10}:{textAlign:'center',fontSize:10}}>{item}</Text>
                  </TouchableOpacity >)
                })
              }

            </View>
          </View>
        </View>
      )
    }
  }
  toogleButtonsSpecial() {
    if (this.state.toggled) {
      return (
        <View style={{ flex: Platform.OS ? 0.8 : 0.3, marginTop: '0%' }}>
          <View style={styles.drBtnCon}>
            <TouchableOpacity style={[styles.drBtn, { width:Platform.OS ==='ios'? '38%':'40%' }]} onPress={() => this.navigate('Select dates','two','range','specificdates',true)}>
              <Text style={styles.drBtnTextStyle}>DEPARTURE</Text>
              <Text style={styles.drBtnTextStyle}>DATE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.drBtn, { width:Platform.OS ==='ios'? '38%':'40%' }]} onPress={() => this.navigate('Select dates','two','range','specificdates',true)}>
              <Text style={styles.drBtnTextStyle}>RETURN</Text>
              <Text style={styles.drBtnTextStyle}>DATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{ flex: Platform.OS ? 0.8 : 0.5 }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: '2%',
            marginBottom: '5%',
            paddingHorizontal: '8%',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
            <TouchableOpacity style={[styles.drBtn]} onPress={() => this.navigate('Select dates','one',null,'specificdates',false)}>
              <Text style={{
                textAlign: 'center',
                fontSize:Platform.OS === 'ios' ? 12 : 10,
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: '800',
                color: '#006e8a',
              }}>DEPARTURE
                </Text>
                <Text style={{
                textAlign: 'center',
                fontSize:Platform.OS === 'ios' ? 12 : 10,
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: '800',
                color: '#006e8a',
              }}>DATE
                </Text>

            </TouchableOpacity>
          </View>
        </View>

      )
    }

  }
  toogleButtons() {
    if (this.state.toggled) {
      return (
        <View style={{ flex: 4,marginTop:'2%', marginBottom: '1%' }}>
          <View style={styles.drBtnCon}>
            <TouchableOpacity style={[styles.drBtn, {
              height:Platform.OS ==='ios'? 80:70,
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: 10,
              width:100,
              alignItems: 'center',
            }]} onPress={() => this.navigate('Select dates','two',null,'daterange',true)}>
              <Text style={styles.drBtnTextStyle}>DEPARTURE RANGE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.drBtn, {
              height:Platform.OS ==='ios'? 80:70,
              marginBottom: 10,
              width:100,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }]} onPress={() => this.navigate('Select dates','two','range2','daterange',true)}>
              <Text style={styles.drBtnTextStyle}>RETURN RANGE</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop:-15}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '0.5%' }}>
              <View style={{ flex: 2 }}>
                <Text style={[styles.drDepartureStyle,{fontSize:20}]}>Departure</Text>
              </View>
              <View style={{
                flexDirection: 'row', alignItems: 'center',
              }}>
             <TouchableOpacity style={{borderWidth:2,borderColor:'grey',paddingLeft:5,paddingRight:5,borderRadius:10}}
                onPress={()=>{this.setState({weekbtn3:!this.state.weekbtn3}),this._selectAll(this.state.weekbtn3)}}>
                <Text style={{fontSize:8,padding:2}}>Select All</Text>
              </TouchableOpacity>
                {/* <CheckBox
                  label='Select All'
                  labelBefore={true}
                  onChange={(checked) => this._selectAll(checked)}
                  checkboxStyle={{ height: 15, width: 15 }}
                /> */}
              </View>
            </View>

            <View style={styles.weekDaysCon}>
              {
                btnWeek.map((item, index) => {

                  return (<TouchableOpacity style={this.state.depart.indexOf(index) >= 0 ? {backgroundColor:'#ff5e59', width:35,height:35,borderRadius:17,marginRight:10,justifyContent:'center'}: {borderWidth:2,borderColor:'grey',justifyContent:'center', width:35,height:35,borderRadius:17,marginRight:10}} key={index} onPress={() => this._btnDepClick(index)}>
                    <Text style={this.state.depart.indexOf(index) >= 0 ?{textAlign:'center',color:'white',fontWeight:'bold',fontSize:10}:{textAlign:'center',fontSize:10}}>{item.toUpperCase()}</Text>
                  </TouchableOpacity >)
                })
              }

            </View>

          </View>

          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.drDepartureStyle,{fontSize:20}]}>Return</Text>
              </View>
              <View style={{
                flexDirection: 'row', alignItems: 'center',
              }}>
              <TouchableOpacity style={{borderWidth:2,borderColor:'grey',paddingLeft:5,paddingRight:5,borderRadius:10}}
                onPress={()=>{this.setState({weekbtn4:!this.state.weekbtn4}),this._selectAll2(this.state.weekbtn4)}}>
                <Text style={{fontSize:8,padding:2}}>Select All</Text>
              </TouchableOpacity>
                {/* <Text style={{fontSize:12}}>Select All</Text> */}
                {/* <CheckBox
                  label='Select All'
                  labelBefore={true}
                  onChange={(checked) => this._selectAll2(checked)}
                  checkboxStyle={{ height: 15, width: 15 }}
                /> */}
              </View>
            </View>

            <View style={styles.weekDaysCon}>
              {
                btnWeek.map((item, index) => {

                  return (<TouchableOpacity style={this.state.return.indexOf(index) >= 0 ? {backgroundColor:'#ff5e59', width:35,height:35,borderRadius:17,marginRight:10,justifyContent:'center'}: {borderWidth:2,borderColor:'grey',justifyContent:'center', width:35,height:35,borderRadius:17,marginRight:10}} key={index} onPress={() => this._btnReturnClick(index)}>
                    <Text style={this.state.return.indexOf(index) >= 0 ?{textAlign:'center',color:'white',fontSize:10}:{textAlign:'center',fontSize:10}}>{item}</Text>
                  </TouchableOpacity >)
                })
              }

            </View>


          </View>
        </View>
      )
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <View style={{
            flex: 1.5,
            flexDirection: 'row',
            marginTop: '2%',
            marginBottom: '5%',
            paddingHorizontal: '8%',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
            <TouchableOpacity style={[styles.drBtn, {
              height: 80,
              width:100,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }]} onPress={() => this.navigate('Select dates','two',null,'daterange',false)}>
              <Text style={{
                textAlign: 'center',
                fontSize:Platform.OS === 'ios' ? 12 : 10,

                fontWeight: '800',
                color: '#006e8a',
              }}>DEPARTURE RANGE
                </Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '0.5%' }}>
              <View style={{ flex: 2 }}>
                <Text style={[styles.drDepartureStyle,{fontSize:20}]}>Departure</Text>
              </View>
              <View style={{
                flexDirection: 'row', alignItems: 'center',
              }}>
             <TouchableOpacity style={{borderWidth:2,borderColor:'grey',paddingLeft:5,paddingRight:5,borderRadius:10}}
                onPress={()=>{this.setState({weekbtn5:!this.state.weekbtn5}),this._selectAll(this.state.weekbtn5)}}>
                <Text style={{fontSize:8,padding:2}}>Select All</Text>
              </TouchableOpacity>
                {/* <CheckBox
                  label='Select All'
                  labelBefore={true}
                  onChange={(checked) => this._selectAll(checked)}
                  checkboxStyle={{ height: 15, width: 15 }}
                /> */}
              </View>
            </View>

            <View style={styles.weekDaysCon}>
              {
                btnWeek.map((item, index) => {

                  return (<TouchableOpacity style={this.state.depart.indexOf(index) >= 0 ? {backgroundColor:'#ff5e59', width:35,height:35,borderRadius:17,marginRight:10,justifyContent:'center'}: {borderWidth:2,borderColor:'grey',justifyContent:'center', width:35,height:35,borderRadius:17,marginRight:10}} key={index} onPress={() => this._btnDepClick(index)}>
                    <Text style={this.state.depart.indexOf(index) >= 0 ?{textAlign:'center',color:'white',fontWeight:'bold',fontSize:10}:{textAlign:'center',fontSize:10}}>{item.toUpperCase()}</Text>
                  </TouchableOpacity >)
                })
              }

            </View>

          </View>

        </View>

      )
    }
  }
  changeStateFromChild=(current)=>{

      let temp=current
      //alert(current)
      this.setState({
           customTabBarValue:temp
         })


    // this.setState({
    //   page2:current
    // })


  }
  renderReturn(){


  }

  renderDeals() {
    if (this.state.animatedStateSelect) {
      return (

        <View style={{marginTop:0}}>
          <View style={{flex:1}}>
            <View style={{padding:0,marginVertical:'2%'}}>
              <Text style={styles.flight}>Flights from Prague, Czech Republic</Text>
            </View>

            <ScrollView
              horizontal
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps={"always"} >

                <DealsCard en={true} img={require('./assets/Cities/Singapore.jpg')} fromDate='11 May' toDate='14 jun' state='Ho Chi Mihn City' city='Vietnam' price='280 USD' from='Prague' to='Singapore' day='Thursday' day2='Sunday'/>
                <DealsCard en={true} img={require('./assets/Cities/Crete.jpg')} fromDate='28 Mar' toDate='15 Apr' state='California' city='San Diego' price='200 USD' from='Moscow' to='Dubai' day='Thursday' day2='Sunday'/>
                <DealsCard en={true} img={require('./assets/Cities/Rome.jpg')} fromDate='29 Mar' toDate='16 Apr' state='Chicago' city='Illinois' price='170 USD'  from='Rome' to='Berlin' day='Thursday' day2='Sunday'/>

            </ScrollView>
          </View>
          <View style={{flex:1}}>
          <View style={{padding:0,marginVertical:'2%'}}>
              <Text style={styles.flight}>Last minute getaways from Prague, Czech Republic</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
              keyboardShouldPersistTaps={"always"}>

                <DealsCard en={true} img={require('./assets/Cities/Rome.jpg')} fromDate='28 Mar' toDate='15 Apr' state='Tucson' city='Arizona' price='160 USD' from='Rome' to='Berlin' day='Thursday' day2='Sunday'/>
                <DealsCard en={true} img={require('./assets/Cities/London.jpg')} fromDate='28 Mar' toDate='15 Apr' state='Ho Chi Mihn City' city='Vietnam' price='175 USD' from='London' to='New York' day='Thursday' day2='Sunday'/>
                <DealsCard en={true} img={require('./assets/Cities/Tokyo.jpg')} fromDate='1 Apr' toDate='18 Apr' state='Montana' city='Butte' price='220 USD' from='Moscow' to='Dubai' day='Thursday' day2='Sunday'/>

            </ScrollView>
          </View>
          <View style={{flex:1}}>
          <View style={{padding:0,marginVertical:'2%'}}>
              <Text style={styles.flight}>Weekend deals from Prague, Czech Republic</Text>
            </View>

            <ScrollView
              horizontal
              scrollEnabled={true}
              keyboardShouldPersistTaps={"always"}
              showsHorizontalScrollIndicator={false}
            >
              <DealsCard en={true} img={require('./assets/Cities/Rio.jpg')} fromDate='29 Mar' toDate='22 Apr' state='Nashville' city='Tennessee' price='280 USD' from='Moscow' to='Dubai' day='Thursday' day2='Sunday'/>
              <DealsCard en={true} img={require('./assets/Cities/Rome.jpg')} fromDate='1 Apr' toDate='23 Apr' state='Texas' city='San Antonio' price='178 USD' from='Rome' to='Berlin' day='Thursday' day2='Sunday'/>
              <DealsCard en={true} img={require('./assets/Cities/NewYork.jpg')} fromDate='4 Apr' toDate='25 Apr' state='Buckeye' city='Arizona' price='167 USD' from='London' to='New York' day='Thursday' day2='Sunday'/>

            </ScrollView>
          </View>
        </View>

      )
    }
    else{

      return(
        <View>

          <Animated.View >
            <TravelScreen  />
            <View >
            <Animated.View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <UserCard gap={5} img={require('./assets/Users/113.jpg')} fromCity='Bristol' toCity='Clinton' fromDate='26.3' toDate='05.4'/>
                <View style={{marginHorizontal:Platform.OS === 'ios'?'1%': '1%'}}/>
                <UserCard gap={5} img={require('./assets/Users/126.jpg')} fromCity='Fairview' toCity='Salem' fromDate='28.3' toDate='05.4'/>
                <View style={{marginHorizontal:Platform.OS === 'ios'?'1%': '1%'}}/>
                <UserCard img={require('./assets/Users/126.png')} gap={5} fromCity='Madison' toCity='Georgetown' fromDate='23.3' toDate='05.4'/>
            </Animated.View>

            </View>

          </Animated.View>
            <Animated.View style={{flexDirection:'row',opacity:show,justifyContent:'center',alignItems:'center'}}>
                <UserCard img={require('./assets/Users/125.png')} gap={5} fromCity='Bristol' toCity='Clinton' fromDate='26.3' toDate='05.4'/>
                <View style={{marginHorizontal:Platform.OS === 'ios'?'1%': '1%'}}/>
                <UserCard img={require('./assets/Users/124.png')} gap={5} fromCity='Fairview' toCity='Salem' fromDate='28.3' toDate='05.4'/>
                <View style={{marginHorizontal:Platform.OS === 'ios'?'1%': '1%'}}/>
                <UserCard img={require('./assets/Users/129.png')} gap={5} fromCity='Madison' toCity='Georgetown' fromDate='23.3' toDate='05.4'/>

            </Animated.View>

            <Animated.View style={{flexDirection:'row',opacity:show,justifyContent:'center', alignItems:'center'}}>
                <UserCard img={require('./assets/Users/123.png')} gap={5} fromCity='Houston' toCity='Philadelphia' fromDate='28.3' toDate='05.4'/>
                <View style={{marginHorizontal:Platform.OS === 'ios'?'1%': '1%'}}/>
                <UserCard img={require('./assets/Users/111.png')} gap={5} fromCity='San Antonio' toCity='San Jose' fromDate='28.3' toDate='05.4'/>
                <View style={{marginHorizontal:Platform.OS === 'ios'?'1%': '1%'}}/>
                <UserCard img={require('./assets/Users/125.gif')} gap={5} fromCity='Austin' toCity='Jacksonville' fromDate='28.3' toDate='05.4'/>
            </Animated.View>
        </View>
      )
    }

  }
  _scrollToEnd(){
    //this.refs.mainScrollView.scrollToEnd()
    Actions.mainScreen({'secondScreen':'result'})
    //console.log('scroll')

  }

  _curentPage() {
    switch (this.state.page) {
      case 'home':

        if (this.state.second == 'recent') {

          return (

            <RecentScreen />
          )
        }

        if (this.state.second == 'currency') {

          return (

            <CurrencyScreen />
          )
        }
        if (this.state.second == 'notify') {

          return (

            <Notifications dis={this.props.dis}/>
          )
        }
        if (this.state.second == 'result') {

          return (

            <ExploreScreen seeAll={this.props.seeAll}/>
          )
        }
        if (this.state.second == 'resultChild') {
          console.log('Result' + this.state.second);

          return (

            <ResultScreen />
          )
        }


        let Opacity = this.state.scrollY.interpolate({
          inputRange: [ Math.abs(sY2)-5, Math.abs(sY2), Math.abs(sY2)+10],
          outputRange: [0,0,1],
          extrapolate: 'clamp'
        })

        show=this.state.scrollY.interpolate({
          inputRange: [200, 230],
          outputRange: [0, 1],
          extrapolate: 'clamp'
        })
        hide=this.state.scrollY.interpolate({
          inputRange: [200, 230],
          outputRange: [1, 0],
          extrapolate: 'clamp'
        })
        zanim=this.state.scrollY.interpolate({
          inputRange: [200, 230],
          outputRange: [-1, 10],
          extrapolate: 'clamp'
        })
        return (

          <View style={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
            <Header style={styles.headerStyle}>
              <View>
                {
                  this.state.drawerOpen ?
                  <TouchableOpacity onPress={this.closeDrawer}
                    style={{
                     // backgroundColor:'red',
                      width:50,
                      marginLeft:5,
                    }}
                  >
                    <Icon name="md-close" />
                  </TouchableOpacity>

                    : <TouchableOpacity onPress={this.openDrawer}
                    style={{
                      //backgroundColor:'red',
                      width:50,
                      marginLeft:5,
                    }}
                    >
                      <Icon name="menu" />
                    </TouchableOpacity>
                }

              </View>

              <View>
                    <Animated.View
                      style={{
                        opacity:hide,
                        position:'absolute',
                        top:2,
                        left:Platform.OS ==='ios'? '20%':'25%',
                        justifyContent:'center',
                        alignItems:'center',
                      }}

                    >
                    <Image source={appLogo} style={{height:40,width:120}}/>
                    </Animated.View>

                  <Animated.View style={{
                                flexDirection:'row',
                                borderWidth:1,
                                opacity:show,
                                borderRadius:5,
                                left:Platform.OS ==='ios'? '15%':'10%',
                                padding:5,
                                borderColor:'lightgrey',
                                paddingVertical:'3%',
                                alignItems:'center',
                                justifyContent:'space-around'
                              }}>
                      <TouchableOpacity style={{
                                flexDirection:'row',
                                }} onPress={()=>Actions.mainScreen({'secondScreen':'main'})}>
                        <View style={{flexDirection:'row',alignItems:'center',}}>
                          <Icon name='search' style={{fontSize:14,marginHorizontal:5,color:'black'}}/>
                          <Text style={{color:'black',fontFamily:'SanFrancisco',}} >Search</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Icon name='navigate' style={{fontSize:14,marginHorizontal:5,color:'black'}}/>
                          <Text style={{color:'black',fontFamily:'SanFrancisco',}}>Anywhere</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <MaterialCommunityIcons name='calendar-blank' style={{fontSize:14,marginHorizontal:5,color:'black'}}/>
                          <Text style={{color:'black',fontFamily:'SanFrancisco'}}>Anytime</Text>
                        </View>
                    </TouchableOpacity>
                  </Animated.View>
              </View>
              <View>
                <TouchableOpacity onPress={() => Actions.mainScreen({ 'secondScreen': 'notify' })}
                  style={{
                 // marginLeft:'15%',
                  marginRight:'2%',
                  alignItems:'flex-end',
                 //backgroundColor:'red',
                  width:50,
                  }}
                >
                  <Icon name="ios-notifications-outline" />
                </TouchableOpacity>
              </View>
            </Header>

            <Drawer
              ref={(ref) => { this.drawer = ref; }}
              content={<SideBar />}
              onClose={() => this.closeDrawer()} >
              <Animated.View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                //padding:10,
                height: 50,
                //padding: 5,
                backgroundColor: 'white',
                opacity: this.state.scrollY < 0 ? 0 : Opacity,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                zIndex: zanim,
                //borderBottomWidth:2,borderBottomColor:'lightgrey',

              }}>
                <TouchableOpacity onPress={() => this.setState({ animatedStateSelect: true })} style={{
                  borderBottomWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '50%',
                  borderColor:this.state.animatedStateSelect?'#1976D2':'#eee',
                  height: '100%',
                }}>
                  <Text style={{
                    fontSize: 20,
                    fontFamily: 'SanFranciscoBold',
                   // fontFamily:this.state.animatedStateSelect ? 'SanFrancisco' : 'SanFranciscoBold',
                  }}>Deals</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ animatedStateSelect: false })} style={{
                  borderBottomWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '50%',
                  borderColor:this.state.animatedStateSelect ? '#eee':'#1976D2',
                  height: '100%',
                }}>
                  <Text style={{
                    fontSize: 20,
                    fontFamily: 'SanFranciscoBold',
                    //fontFamily:this.state.animatedStateSelect ? 'SanFrancisco' : 'SanFranciscoBold',
                  }}>Travelers</Text>
                </TouchableOpacity>

              </Animated.View>

              <Animated.ScrollView
                ref={(ref) => { this.scrollView = ref; }}
                useNativeDriver={true}
                keyboardDismissMode="none"
                scrollEventThrottle={16}
                keyboardShouldPersistTaps={"always"}
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: { contentOffset: { y: this.state.scrollY } },

                    },
                  ],
                  {
                    useNativeDriver: Platform.OS === 'ios' ? false : false,
                  }) }
              >
                <View style={styles.containerBox}>


                  <Modal
                    visible={this.state.whereToPopUp}
                    animationType={'fade'}
                    transparent={true}
                    onRequestClose={() => this.closeModal()}
                    >
                    <View style={[styles.modalContainer,{paddingTop:Platform.OS=='ios'?'25%':'20%'}]} keyboardShouldPersistTaps="always" >


                      <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="none">


                        <TouchableOpacity activeOpacity={1} style={styles.mainViewModal2}

                          onPress={(e)=>{
                            let res
                            let a = e.nativeEvent;
                            let point = { x: 1000, y: 1000 };
                            this.where.measure((fx, fy, width, height, px, py) => {
                                let rect = { x: px, y: py, width, height }
                                if (!this._isContainInRect(rect, point)) {
                                    res=this._isContainInRect(rect,point)
                                }
                                console.log(res);


                            });
                          }}
                        >

                          <Text style={styles.largeText}>Where are you?</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: -10,


                            }}>


                            <TextInput
                              ref={(ref)=>this.where=ref}
                              style={[styles.smallText, { flex: 1 }]}
                              autoFocus={true}
                              onChangeText={(text)=>this.setState({whereAreYouSelect:text})}
                              scrollEnabled={false} // the view itself doesn't scroll up/down (only if all fields fit into the screen)
                              keyboardShouldPersistTaps={"always"} // make keyboard not disappear when tapping outside of input
                              enableAutoAutomaticScroll={false} // turn off auto scrolling to the field behaviour, which is unfortunately buggy when autocomplete suggestions disappear from the keyboard as displayed in the gif above
                              underlineColorAndroid='transparent'
                              placeholder="City,place,airport or country"
                              value={this.state.whereAreYouSelect}
                             // onBlur={()=>this.where.focus()}
                            />


                            <TouchableOpacity onPress={() => this.setState({
                              whereAreYouSelect: ''
                            })}>
                              <Icon name="close" />
                            </TouchableOpacity>
                          </View>

                        </TouchableOpacity>

                        <ScrollView style={[styles.mainViewSelectCity]} keyboardShouldPersistTaps="always" keyboardDismissMode="none">
                          <Tabs
                            locked={true}
                            keyboardShouldPersistTaps="always"
                            tabBarUnderlineStyle={{ backgroundColor: '#1976D2' }}
                            style={{ backgroundColor: 'white' }}>

                            <Tab
                              keyboardShouldPersistTaps={"always"}
                              heading="All"
                              tabStyle={styles.tabModal}
                              textStyle={styles.activeTextStyleModal}
                              activeTabStyle={styles.activeTabStyleModal}
                              activeTextStyle={styles.activeTextStyleModal}>

                              <TouchableOpacity  style={styles.containerView} onPress={() => {

                                    this.setState({
                                        whereAreYouSelect: 'Prague, Czechia',
                                        whereToPopUp:false
                                      })
                                      Keyboard.dismiss()
                                    }
                                  }>

                                <Icon name="navigate" style={{ fontSize: 18 }} />
                                <Text style={{fontFamily:'SanFrancisco'}}> Use my location</Text>

                              </TouchableOpacity>

                              <View
                                style={{
                                  borderBottomWidth: 1,
                                  borderColor: '#d2d2d2',
                                }}
                              />

                               <ScrollView style={{height:Dimensions.get('window').height/2}} scrollEnabled={true} keyboardShouldPersistTaps="always" keyboardDismissMode="none">

                                  <TouchableOpacity onPress={() => {

                                    this.setState({
                                        whereAreYouSelect: 'Prague, Czechia',
                                        whereToPopUp:false
                                      })
                                      Keyboard.dismiss()
                                    }
                                  }
                                    >

                                      <Text style={{fontFamily:'SanFrancisco'}}>Prague, Czechia</Text>

                                  </TouchableOpacity>
                              </ScrollView>

                              <View  style={{ flex: 1, position:'absolute',
                              top:this.state.activekeyborad==true?'10%':'80%',
                            }}>
                                <TouchableOpacity onPress={()=>this.closeModal()}>

                                  <Icon
                                      name="md-close-circle"
                                      style={{
                                        justifyContent: 'flex-end',
                                         color: '#66ccff',
                                        fontSize: 40,
                                        marginLeft: Platform.OS === 'ios' ? '90%' : '90%',
                                    }}
                                  />
                                </TouchableOpacity>
                              </View>

                            </Tab>

                            <Tab

                              heading="Cities"
                              tabStyle={styles.tabModal}
                              textStyle={styles.activeTextStyleModal}
                              activeTabStyle={styles.activeTabStyleModal}
                              activeTextStyle={styles.activeTextStyleModal}>

                             <TouchableOpacity  style={styles.containerView} onPress={() => {

                                    this.setState({
                                        whereAreYouSelect: 'Prague, Czechia',
                                        whereToPopUp:false
                                      })
                                      Keyboard.dismiss()
                                    }
                                  }>

                                <Icon name="navigate" style={{ fontSize: 18 }} />
                                <Text style={{fontFamily:'SanFrancisco'}}> Use my location</Text>

                              </TouchableOpacity>

                              <View
                                style={{
                                  borderBottomWidth: 1,
                                  borderColor: '#d2d2d2',
                                }}
                              />
                             <ScrollView style={{height:Dimensions.get('window').height/2}} scrollEnabled={true} keyboardShouldPersistTaps="always" >
                                  <TouchableOpacity onPress={() => {
                                    this.setState({ whereAreYouSelect: 'Prague, Czechia', whereToPopUp:false})
                                    Keyboard.dismiss()}}>


                                      <Text style={{fontFamily:'SanFrancisco'}}>Prague, Czechia</Text>
                                  </TouchableOpacity>
                              </ScrollView>
                              <View  style={{ flex: 1, position:'absolute',top:this.state.activekeyborad==true?'20%':'80%'}}>
                                <TouchableOpacity onPress={() => this.closeModal()}>
                                  <Icon
                                    name="md-close-circle"
                                    style={{
                                      justifyContent: 'flex-end',
                                      color: '#66ccff',
                                      fontSize: 40,
                                      marginLeft: Platform.OS === 'ios' ? '90%' : '90%',
                                    }}
                                  />
                                </TouchableOpacity>

                              </View>

                            </Tab>
                            <Tab
                              heading="Airports"
                              tabStyle={styles.tabModal}
                              textStyle={styles.activeTextStyleModal}
                              activeTabStyle={styles.activeTabStyleModal}
                              activeTextStyle={styles.activeTextStyleModal}>
                             <TouchableOpacity  style={styles.containerView} onPress={() => {

                                    this.setState({
                                        whereAreYouSelect: 'Prague, Czechia',
                                        whereToPopUp:false
                                      })
                                      Keyboard.dismiss()
                                    }
                                  }>

                                <Icon name="navigate" style={{ fontSize: 18 }} />
                                <Text style={{fontFamily:'SanFrancisco'}}> Use my location</Text>

                              </TouchableOpacity>

                              <View
                                style={{
                                  borderBottomWidth: 1,
                                  borderColor: '#d2d2d2',
                                }}
                              />
                              <ScrollView style={{height:Dimensions.get('window').height/2}} scrollEnabled={true} keyboardShouldPersistTaps="always" >
                                  <TouchableOpacity onPress={() => {
                                    this.setState({ whereAreYouSelect: 'Prague, Czechia', whereToPopUp:false})
                                    Keyboard.dismiss()}}>

                                      <Text style={{fontFamily:'SanFrancisco'}}>Prague, Czechia</Text>
                                  </TouchableOpacity>
                              </ScrollView>
                              <View  style={{ flex: 1, position:'absolute',top:this.state.activekeyborad==true?'20%':'80%' }}>
                                <TouchableOpacity onPress={() => this.closeModal()}>
                                  <Icon
                                    name="md-close-circle"
                                    style={{
                                      justifyContent: 'flex-end',
                                      color: '#66ccff',
                                      fontSize: 40,
                                      marginLeft: Platform.OS === 'ios' ? '90%' : '90%',
                                    }}
                                  />
                                </TouchableOpacity>
                              </View>
                            </Tab>
                            <Tab
                              heading="Countries"
                              tabStyle={styles.tabModal}
                              textStyle={styles.activeTextStyleModal}
                              activeTabStyle={styles.activeTabStyleModal}
                              activeTextStyle={styles.activeTextStyleModal}>
                             <TouchableOpacity  style={styles.containerView} onPress={() => {

                                    this.setState({
                                        whereAreYouSelect: 'Prague, Czechia',
                                        whereToPopUp:false
                                      })
                                      Keyboard.dismiss()
                                    }
                                  }>

                                <Icon name="navigate" style={{ fontSize: 18 }} />
                                <Text style={{fontFamily:'SanFrancisco'}}> Use my location</Text>

                              </TouchableOpacity>

                              <View
                                style={{
                                  borderBottomWidth: 1,
                                  borderColor: '#d2d2d2',
                                }}
                              />

                              <ScrollView style={{height:Dimensions.get('window').height/2}} scrollEnabled={true} keyboardShouldPersistTaps="always" >
                                  <TouchableOpacity onPress={() => {
                                      this.setState({ whereAreYouSelect: 'Prague, Czechia', whereToPopUp:false})
                                      Keyboard.dismiss()}}>

                                      <Text style={{fontFamily:'SanFrancisco'}}>Prague, Czechia</Text>
                                  </TouchableOpacity>
                              </ScrollView>

                              <View  style={{ flex: 1, position:'absolute',top:this.state.activekeyborad==true?'20%':'80%' }}>
                                <TouchableOpacity onPress={() => this.closeModal()}>
                                  <Icon
                                    name="md-close-circle"
                                    style={{
                                      justifyContent: 'flex-end',
                                      color: '#66ccff',
                                      fontSize: 40,
                                      marginLeft: Platform.OS === 'ios' ? '90%' : '90%',
                                    }}
                                  />
                                </TouchableOpacity>

                              </View>

                            </Tab>
                          </Tabs>
                        </ScrollView>
                       </ScrollView>
                    </View>
                  </Modal>


                  <Modal
                    visible={this.state.whereTo}
                    animationType={'fade'}
                    transparent={true}
                    onRequestClose={() => this.closeModalWhereTo()}>

                    <ScrollView style={[styles.modalContainer,{paddingTop:Platform.OS==='android'?this.state.kVisible:'14%'}]}
                      ref='scrollViewUp'
                      keyboardShouldPersistTaps="always"
                    >
                      {/* <ScrollView > */}
                      <TouchableOpacity style={[styles.mainViewModal2, { backgroundColor: 'lightgrey', marginBottom:10, marginTop:this.state.activekeyborad?'14%':null}]}
                        onPress={() => this.setState({
                          whereTo: false,
                          whereToPopUp: true
                        })}
                      >
                         <Text style={styles.largeText}>Where are you?</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: -10,

                            }}>

                            <TextInput
                            ref="whereAreYouTextInput"
                            style={[styles.smallText, { flex: 1 }]}
                            underlineColorAndroid='transparent'
                            placeholder="City,place,airport or country"
                            value={this.state.whereAreYouSelect}
                            editable={false}
                          />

                            <TouchableOpacity onPress={() => {
                              this.setState({whereAreYouSelect: ''})
                              this.refs.whereAreYouTextInput.focus()
                            }}>
                              <Icon name="close" />
                            </TouchableOpacity>

                        </View>

                      </TouchableOpacity>
                      <View style={[styles.mainViewModal2]}>

                        <Text style={styles.largeText}>Where To?</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop:-10,

                          }}>

                          <TextInput
                            autoFocus={true}
                            style={[styles.smallText, { flex: 1 }]}
                            underlineColorAndroid='transparent'
                            placeholder="ANYWHERE or choose a city,place or airport"
                            onChangeText={(txt)=>
                              this.setState({whereToText:txt})
                              }
                            value={this.state.whereToText}

                          />

                          <TouchableOpacity onPress={() => this.setState({
                            whereToText: ''
                          })}>
                            <Icon name="close" />
                          </TouchableOpacity>
                        </View>

                      </View>

                      <View style={[styles.mainViewSelectCity]}>
                        <Tabs
                          tabBarUnderlineStyle={{ backgroundColor: '#1976D2' }}
                          style={{ backgroundColor: 'white' }}>

                          <Tab
                            heading="All"
                            tabStyle={styles.tabModal}
                            textStyle={styles.activeTextStyleModal}
                            activeTabStyle={styles.activeTabStyleModal}
                            activeTextStyle={styles.activeTextStyleModal}>
                            <TouchableOpacity  style={styles.containerView} onPress={() => {

                                    this.setState({
                                      whereToText: 'Prague, Czechia',
                                        whereTo:false
                                      })
                                      Keyboard.dismiss()
                                    }
                                  }>
                               <Icon name="navigate" style={{ fontSize: 18 }} />
                              <Text style={{fontFamily:'SanFrancisco'}}> Anywhere</Text>

                              </TouchableOpacity>


                            <View
                              style={{
                                borderBottomWidth: 1,
                                borderColor: '#d2d2d2',
                              }}
                            />
                            <ScrollView style={{height:Dimensions.get('window').height/2.6}} scrollEnabled={true} keyboardShouldPersistTaps={'always'}>
                                <TouchableOpacity onPress={() => {

                                   this.setState({ whereToText: 'Prague, Czechia',whereTo:false})
                                   Keyboard.dismiss()
                                    }
                                    }>
                                      <Text style={{fontFamily:'SanFrancisco'}}>Prague, Czechia</Text>
                                  </TouchableOpacity>
                              </ScrollView>
                            <View style={{ flex: 1, position:'absolute',top:this.state.activekeyborad==true?'18%':'80%'}}>
                              <TouchableOpacity onPress={() => this.closeModalWhereTo()}>
                                <Icon
                                  name="md-close-circle"
                                  style={{
                                    justifyContent: 'flex-end',
                                    color: '#66ccff',
                                    fontSize: 40,
                                    marginLeft: Platform.OS === 'ios' ? '90%' : '90%',
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </Tab>
                          <Tab
                            heading="Cities"
                            tabStyle={styles.tabModal}
                            textStyle={styles.activeTextStyleModal}
                            activeTabStyle={styles.activeTabStyleModal}
                            activeTextStyle={styles.activeTextStyleModal}>

                           <TouchableOpacity  style={styles.containerView} onPress={() => {

                                    this.setState({
                                      whereToText: 'Prague, Czechia',
                                        whereTo:false
                                      })
                                      Keyboard.dismiss()
                                    }
                                  }>
                               <Icon name="navigate" style={{ fontSize: 18 }} />
                              <Text style={{fontFamily:'SanFrancisco'}}> Anywhere</Text>

                              </TouchableOpacity>
                            <View
                              style={{
                                borderBottomWidth: 1,
                                borderColor: '#d2d2d2',
                              }}
                            />
                            <ScrollView style={{height:Dimensions.get('window').height/2.6}} scrollEnabled={true} keyboardShouldPersistTaps={'always'}>
                                  <TouchableOpacity onPress={() => {
                                    this.setState({ whereToText: 'Prague, Czechia',whereTo:false})
                                    Keyboard.dismiss()
                                    }
                                    }>
                                      <Text style={{fontFamily:'SanFrancisco'}}>Prague, Czechia</Text>
                                  </TouchableOpacity>
                              </ScrollView>
                            <View style={{ flex: 1, position:'absolute',top:this.state.activekeyborad==true?'18%':'80%'}}>
                              <TouchableOpacity onPress={() => this.closeModalWhereTo()}>
                                <Icon
                                  name="md-close-circle"
                                  style={{
                                    justifyContent: 'flex-end',
                                    color: '#66ccff',
                                    fontSize: 40,
                                    marginLeft: Platform.OS === 'ios' ? '90%' : '90%',
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </Tab>
                          <Tab
                            heading="Airports"
                            tabStyle={styles.tabModal}
                            textStyle={styles.activeTextStyleModal}
                            activeTabStyle={styles.activeTabStyleModal}
                            activeTextStyle={styles.activeTextStyleModal}>

                            <TouchableOpacity  style={styles.containerView} onPress={() => {

                                    this.setState({
                                      whereToText: 'Prague, Czechia',
                                        whereTo:false
                                      })
                                      Keyboard.dismiss()
                                    }
                                  }>
                               <Icon name="navigate" style={{ fontSize: 18 }} />
                              <Text style={{fontFamily:'SanFrancisco'}}> Anywhere</Text>

                              </TouchableOpacity>

                            <View
                              style={{
                                borderBottomWidth: 1,
                                borderColor: '#d2d2d2',
                              }}
                            />
                            <ScrollView style={{height:Dimensions.get('window').height/2.6}} scrollEnabled={true} keyboardShouldPersistTaps={'always'}>
                                  <TouchableOpacity onPress={() => {
                                    this.setState({ whereToText: 'Prague, Czechia',whereTo:false})
                                    Keyboard.dismiss()
                                    }
                                    }>
                                      <Text style={{fontFamily:'SanFrancisco'}}>Prague, Czechia</Text>
                                  </TouchableOpacity>
                              </ScrollView>
                            <View style={{ flex: 1, position:'absolute',top:this.state.activekeyborad==true?'18%':'80%'}}>
                              <TouchableOpacity onPress={() => this.closeModalWhereTo()}>
                                <Icon
                                  name="md-close-circle"
                                  style={{
                                    justifyContent: 'flex-end',
                                    color: '#66ccff',
                                    fontSize: 40,
                                    marginLeft: Platform.OS === 'ios' ? '90%' : '90%',
                                  }}
                                />
                              </TouchableOpacity>
                            </View>

                          </Tab>
                          <Tab
                            heading="Countries"
                            tabStyle={styles.tabModal}
                            textStyle={styles.activeTextStyleModal}
                            activeTabStyle={styles.activeTabStyleModal}
                            activeTextStyle={styles.activeTextStyleModal}>
                            <TouchableOpacity  style={styles.containerView} onPress={() => {

                                    this.setState({
                                      whereToText: 'Prague, Czechia',
                                        whereTo:false
                                      })
                                      Keyboard.dismiss()
                                    }
                                  }>
                               <Icon name="navigate" style={{ fontSize: 18 }} />
                              <Text style={{fontFamily:'SanFrancisco'}}> Anywhere</Text>

                              </TouchableOpacity>

                            <View
                              style={{
                                borderBottomWidth: 1,
                                borderColor: '#d2d2d2',
                              }}
                            />
                            <ScrollView style={{height:Dimensions.get('window').height/2.6}} scrollEnabled={true} keyboardShouldPersistTaps={'always'}>
                                  <TouchableOpacity onPress={() => {
                                   this.setState({ whereToText: 'Prague, Czechia',whereTo:false})
                                   Keyboard.dismiss()
                                    }
                                    }>
                                      <Text style={{fontFamily:'SanFrancisco'}}>Prague, Czechia</Text>
                                  </TouchableOpacity>
                              </ScrollView>
                            <View style={{ flex: 1, position:'absolute',top:this.state.activekeyborad?'18%':'80%'}}>
                              <TouchableOpacity onPress={() => this.closeModalWhereTo()}>
                                <Icon
                                  name="md-close-circle"
                                  style={{
                                    justifyContent: 'flex-end',
                                    color: '#66ccff',
                                    fontSize: 40,
                                    marginLeft: Platform.OS === 'ios' ? '90%' : '90%',
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </Tab>
                        </Tabs>

                      </View>
                      {/* </ScrollView> */}
                    </ScrollView>

                  </Modal>

                  <Modal
                    visible={this.state.whenTo}
                    animationType={'fade'}
                    transparent={true}
                    onRequestClose={() => this.closeWhenModal()}>

                    <View style={styles.modalContainer}>
                      <View style={styles.mainViewModal}>

                        <Text style={styles.largeText}>When?</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>

                          <TextInput
                            editable={false}
                            style={[styles.smallText, { flex: 1 }]}
                            underlineColorAndroid='transparent'
                            placeholder=" ANYTIME - Return"
                            value={this.state.whenText}
                          />

                          <TouchableOpacity onPress={() => this.clearWhenText()} >
                            <Icon name="close" />
                          </TouchableOpacity>
                        </View>

                      </View>
                      <View style={styles.mainViewWhen}>
                        <CustomTabs changeStateFromChild={this.changeStateFromChild}
                                    currentlySelected={this.state.customTabBarValue}
                        />
                        <View style={styles.mainViewWhen}>
                          {
                            this.state.customTabBarValue==='anytime'?

                              <View style={{
                                flex:1
                              }}>
                              <View style={styles.containerWhenModal}>
                              <View style={styles.whenOneWayConStyle}>
                              <Text style={styles.whenOneWayTextStyle}>
                                One way
                              </Text>
                              </View>
                              <View style={styles.switchStyle}>

                              <Switch
                                onValueChange={(value) => {
                                  !this.setState({ toggled: value },
                                    this.setState({ whenText: this.state.whenText + ' Flexible-Return' })
                                  )
                                }}
                                value={this.state.toggled}
                                style={styles.whenSwitchStyle}
                                onTintColor="#33acc4"
                                buttonSize={40}
                                thumbTintColor={this.state.toggled?"#006e8a":'white'}
                              />

                              </View>
                              <View style={styles.whenReturnWhenStyle}>
                              <Text style={styles.whenReturnTextStyle}>
                                Return
                              </Text>
                              </View>
                              </View>

                              <View style={styles.btnCancelApply}>

                              <TouchableOpacity style={styles.btnCancel}
                              onPress={() => this.closeWhenModal()}>
                              <Text style={styles.btnCancelText}>CANCEL</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.btnApply}
                              onPress={() => this.closeWhenModal()}>
                              <Text style={styles.btnApplyText}>APPLY</Text>
                              </TouchableOpacity>
                              </View>
                              </View>
                              :
                              this.state.customTabBarValue==='flexible'?

                              <View
                              style={{
                                flex: 1,

                              }}>
                                <ScrollView>
                              <View style={styles.containerWhenModal}>
                                <View style={styles.whenOneWayConStyle}>

                                  <Text style={styles.whenOneWayTextStyle}>
                                    One way
                              </Text>
                                </View>
                                <View style={styles.switchStyle}>

                                  <Switch
                                    onValueChange={(value) => !this.setState({ toggled: value })}
                                    value={this.state.toggled}
                                    style={styles.whenSwitchStyle}
                                    onTintColor="#33acc4"
                                    thumbTintColor={this.state.toggled?"#006e8a":'white'}
                                  />

                                </View>
                                <View style={styles.whenReturnWhenStyle}>
                                  <Text style={styles.whenReturnTextStyle}>
                                    Return
                              </Text>
                                </View>
                              </View>

                              <View style={styles.flexibleCon}>


                                <View style={styles.monthRow}>

                                  <TouchableOpacity style={this.state.monSelect.indexOf('MAY') > -1 ? styles.monthColSelect : btnMonth.indexOf('MAY') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[4])} disabled={btnMonth.indexOf('MAY') >= month ? false: false}>
                                    <Text style={styles.monthText}>MAY</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={this.state.monSelect.indexOf('JUN') > -1 ? styles.monthColSelect : btnMonth.indexOf('JUN') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[5])} disabled={btnMonth.indexOf('JUN') >= month ? false : true}>
                                    <Text style={styles.monthText}>JUN</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={this.state.monSelect.indexOf('JUL') > -1 ? styles.monthColSelect : btnMonth.indexOf('JUL') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[6])} disabled={btnMonth.indexOf('JUL') >= month ? false : true}>
                                    <Text style={styles.monthText}>JUL</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={this.state.monSelect.indexOf('AUG') > -1 ? styles.monthColSelect : btnMonth.indexOf('AUG') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[7])} disabled={btnMonth.indexOf('AUG') >= month ? false : true}>
                                    <Text style={styles.monthText}>AUG</Text>
                                  </TouchableOpacity>
                                </View>

                                <View style={styles.monthRow}>



                                  <TouchableOpacity style={this.state.monSelect.indexOf('SEP') > -1 ? styles.monthColSelect : btnMonth.indexOf('SEP') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[8])} disabled={btnMonth.indexOf('SEP') >= month ? false : true}>
                                    <Text style={styles.monthText}>SEP</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={this.state.monSelect.indexOf('OCT') > -1 ? styles.monthColSelect : btnMonth.indexOf('OCT') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[9])} disabled={btnMonth.indexOf('OCT') >= month ? false : true}>
                                    <Text style={styles.monthText}>OCT</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={this.state.monSelect.indexOf('NOV') > -1 ? styles.monthColSelect : btnMonth.indexOf('NOV') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[10])} disabled={btnMonth.indexOf('NOV') >= month ? false : true}>
                                    <Text style={styles.monthText}>NOV</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={this.state.monSelect.indexOf('DEC') > -1 ? styles.monthColSelect : btnMonth.indexOf('DEC') >= month ? styles.monthCol : styles.monthColDis} onPress={() => this.btnClickMon(btnMonth[11])} disabled={btnMonth.indexOf('DEC') >= month ? false : true}>
                                    <Text style={styles.monthText}>DEC</Text>
                                  </TouchableOpacity>
                                </View>

                                <View style={styles.monthRow}>



                                  <TouchableOpacity style={this.state.monSelect.indexOf('JAN') > -1 ? styles.monthColSelect : btnMonth.indexOf('JAN') >= month ? styles.monthCol : styles.monthCol} onPress={() => this.btnClickMon(btnMonth[0])} disabled={btnMonth.indexOf('JAN') >= month ? false : false}>
                                    <Text style={styles.monthText}>JAN</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={this.state.monSelect.indexOf('FEB') > -1 ? styles.monthColSelect : btnMonth.indexOf('FEB') >= month ? styles.monthCol : styles.monthCol} onPress={() => this.btnClickMon(btnMonth[1])} disabled={btnMonth.indexOf('FEB') >= month ? false : false}>
                                    <Text style={styles.monthText}>FEB</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={this.state.monSelect.indexOf('MAR') > -1 ? styles.monthColSelect : btnMonth.indexOf('MAR') >= month ? styles.monthCol : styles.monthCol} onPress={() => this.btnClickMon(btnMonth[2])} >
                                    <Text style={styles.monthText}>MAR</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={this.state.monSelect.indexOf('APR') > -1 ? styles.monthColSelect : btnMonth.indexOf('APR') >= month ? styles.monthCol : styles.monthCol} onPress={() => this.btnClickMon(btnMonth[3])} disabled={btnMonth.indexOf('APR') >= month ? false : false}>
                                    <Text style={styles.monthText}>APR</Text>
                                  </TouchableOpacity>
                                </View>

                              </View>

                              {
                                this.toggleActions2()
                              }


                              <View style={styles.hr} />

                              <View style={[styles.btnCancelApply,{marginTop:this.state.toggled?'5%':'34%'}]}>

                                <TouchableOpacity style={styles.btnCancel}
                                  onPress={() => this.closeWhenModal()}>
                                  <Text style={styles.btnCancelText}>CANCEL</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.btnApply}
                                  onPress={() => this.closeWhenModal()}>
                                  <Text style={styles.btnApplyText}>APPLY</Text>
                                </TouchableOpacity>
                              </View>
                              </ScrollView>
                            </View>
                              :
                              this.state.customTabBarValue==='daterange'?
                              <View
                              style={{
                                flex: 1,
                                margin: 0,
                              }}>
                              <View style={styles.containerWhenModal}>
                                <View style={styles.whenOneWayConStyle}>
                                  <Text style={styles.whenOneWayTextStyle}>
                                    One way
                              </Text>
                                </View>
                                <View style={styles.switchStyle}>

                                  <Switch
                                    onValueChange={(value) => !this.setState({ toggled: value })}
                                    value={this.state.toggled}
                                    style={styles.whenSwitchStyle}
                                    onTintColor="#33acc4"
                                    thumbTintColor={this.state.toggled?"#006e8a":'white'}
                                    thumbSize={10}

                                  />

                                </View>
                                <View style={styles.whenReturnWhenStyle}>
                                  <Text style={styles.whenReturnTextStyle}>
                                    Return
                              </Text>
                                </View>
                              </View>


                              {this.toggleActions()}

                              {this.toogleButtons()}


                              <View style={styles.hr} />

                              <View style={styles.btnCancelApply}>

                                <TouchableOpacity style={styles.btnCancel}
                                  onPress={() => this.closeWhenModal()}>
                                  <Text style={styles.btnCancelText}>CANCEL</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.btnApply}
                                  onPress={() => this.closeWhenModal()}>
                                  <Text style={styles.btnApplyText}>APPLY</Text>
                                </TouchableOpacity>
                              </View>
                            </View>


                              :

                              <View
                              style={{
                                flex: 1,
                                margin: 0,
                              }}>
                              <View style={styles.containerWhenModal}>
                                <View style={styles.whenOneWayConStyle}>
                                  <Text style={styles.whenOneWayTextStyle}>
                                    One way
                              </Text>
                                </View>
                                <View style={styles.switchStyle}>

                                  <Switch
                                    onValueChange={(value) => !this.setState({ toggled: value })}
                                    value={this.state.toggled}
                                    style={styles.whenSwitchStyle}
                                    onTintColor="#33acc4"
                                    thumbTintColor={this.state.toggled?"#006e8a":'white'}
                                    thumbSize={10}

                                  />

                                </View>
                                <View style={styles.whenReturnWhenStyle}>
                                  <Text style={styles.whenReturnTextStyle}>
                                    Return
                              </Text>
                                </View>
                              </View>

                              {
                                this.toogleButtonsSpecial()
                              }


                              <View style={styles.hr} />

                              <View style={styles.btnCancelApply}>

                                <TouchableOpacity style={styles.btnCancel}
                                  onPress={() => this.closeWhenModal()}>
                                  <Text style={styles.btnCancelText}>CANCEL</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.btnApply}
                                  onPress={() => this.closeWhenModal()}>
                                  <Text style={styles.btnApplyText}>APPLY</Text>
                                </TouchableOpacity>
                              </View>
                            </View>



                          }
                        </View>
                      </View>
                    </View>

                  </Modal>

                  <TouchableOpacity
                    style={styles.mainView}
                    onPress={() => this.openModal()}>

                    <Text style={styles.largeText}>Where are you?</Text>
                    <Text style={styles.smallText}>
                      CITY,PLACE,AIRPORT OR COUNTRY
                </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.mainView}
                    onPress={() => this.openModalWhereTo()}>
                    <Text style={styles.largeText}>Where To?</Text>
                    <Text style={styles.smallText}>
                      {' '}ANYWHERE OR CITY,PLACE, AIRPORT OR COUNTRY
                </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.mainView}
                    onPress={() => this.openWhenModal()}>
                    <Text style={styles.largeText}>When?</Text>
                    <Text style={styles.smallText}>ANYTIME OR SELECT DATES</Text>
                  </TouchableOpacity>

                  <View style={styles.actionCon}>

                    <Modal
                      visible={this.state.modalVisible}
                      animationType={'fade'}
                      transparent={true}
                      onRequestClose={() => this.closeModalAdditional()}>

                      <View style={styles.containerAdditionalMain}>
                        <View style={styles.containerAdditionalChild}>
                          <View style={styles.data}>
                            <Text style={styles.passengerStyle}>Passenger information</Text>
                          </View>

                          <View style={styles.catContainer}>

                            <View style={styles.childContainer}>
                              <View style={styles.catCon}>

                                <View >
                                  <Text style={styles.adultStyle}>Adults</Text>
                                  <Text style={styles.minYear}>12+years</Text>
                                </View>
                                <View>
                                  <View style={styles.select}>
                                    <TouchableOpacity onPress={() => this.additionalOperation('adult', -1)} disabled={this.state.adult === 1 ? true : false}>
                                      <Icon type="FontAwesome" name='minus-circle' style={{ color: this.state.adult === 1 ? '#d2d2d2' : 'grey' }} />
                                    </TouchableOpacity>
                                    <Text style={styles.oneStyle}>{this.state.adult}</Text>
                                    <TouchableOpacity onPress={() => this.additionalOperation('adult', +1)} disabled={this.state.adult === 8 ? true : false}>
                                      <Icon type="FontAwesome" name='plus-circle' style={this.state.adult==8?{color:'#275d8c'}: { color: '#337ab7' }} />
                                    </TouchableOpacity>

                                  </View>
                                </View>
                              </View>

                              <View style={styles.catCon}>

                                <View >
                                  <Text style={styles.adultStyle}>Children</Text>
                                  <Text style={styles.minYear}>2-12 years</Text>
                                </View>
                                <View>
                                  <View style={styles.select}>
                                    <TouchableOpacity onPress={() => this.additionalOperation('child', -1)} disabled={this.state.child === 0 ? true : false}>
                                      <Icon type="FontAwesome" name='minus-circle' style={{ color: this.state.child === 0 ? '#d2d2d2' : 'grey' }} />
                                    </TouchableOpacity>
                                    <Text style={styles.oneStyle}>{this.state.child}</Text>
                                    <TouchableOpacity onPress={() => this.additionalOperation('child', +1)} disabled={this.state.child === 8 ? true : false}>
                                      <Icon type="FontAwesome" name='plus-circle' style={this.state.child==8?{color:'#275d8c'}: { color: '#337ab7' }} />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>

                              <View style={styles.catCon}>

                                <View >
                                  <Text style={styles.adultStyle}>Infants</Text>
                                  <Text style={styles.minYear}>Under 2 years</Text>
                                </View>
                                <View>
                                  <View style={styles.select}>
                                    <TouchableOpacity onPress={() => this.additionalOperation('infants', -1)} disabled={this.state.infants === 0 ? true : false}>
                                      <Icon type="FontAwesome" name='minus-circle' style={{ color: this.state.infants === 0 ? '#d2d2d2' : 'grey' }} />
                                    </TouchableOpacity>
                                    <Text style={styles.oneStyle}>{this.state.infants}</Text>
                                    <TouchableOpacity onPress={() => this.additionalOperation('infants', +1)} disabled={this.state.infants === 2 ? true : false}>
                                      <Icon type="FontAwesome" name='plus-circle' style={this.state.infants==2?{color:'#275d8c'}: { color: '#337ab7' }} />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>

                            </View>

                          </View>

                          <View style={{ flexDirection: 'row', padding: '5%', paddingHorizontal: '4%', justifyContent: 'space-between' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                              <RadioButton currentValue={this.state.value2} value={1} onPress={this.handleOnPress.bind(this)}>
                                <Text style={styles.eco}>ECONOMY</Text>
                              </RadioButton>

                            </View>
                            <View >
                              <RadioButton   currentValue={this.state.value2} value={0} onPress={this.handleOnPress.bind(this)}>
                                <Text style={styles.eco}>BUSINESS</Text>
                              </RadioButton>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row',justifyContent: 'space-between', marginTop: '10%',marginBottom:'5%' }}>
                            <TouchableOpacity style={styles.btnCancel}
                              onPress={() => this.closeModalAdditional()}>
                              <Text style={styles.btnCancelText}>CANCEL</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnApply}
                              onPress={() => this.closeModalAdditional()}>
                              <Text style={styles.btnApplyText}>APPLY</Text>
                            </TouchableOpacity>
                          </View>


                        </View>
                      </View>

                    </Modal>

                    <TouchableOpacity style={styles.actionIcon} onPress={() => this.additionalModal()}>
                      <Icon name="ios-add" style={styles.iconPlus} />
                    </TouchableOpacity>

                    <View style={styles.actionBtn}>
                      <TouchableOpacity style={styles.btn} onPress={() => Actions.mainScreen({ 'secondScreen': 'result' })}>
                        <Text style={styles.btnText}>Explore</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <Animated.View
                onLayout={({nativeEvent}) => {
                 this.setState({
                   sY:nativeEvent.layout.y
                 })

                }}
                >
                <View
                  ref="Marker"



                 style={{flexDirection:'row',height:50,justifyContent:'center',alignItems:'center',padding:10,}}>
                  <TouchableOpacity onPress={() => this.setState({ animatedStateSelect: true })} style={{
                    borderBottomWidth: 2,
                    borderColor:this.state.animatedStateSelect ? '#1976D2':'#eee',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40%',
                    height: '100%',
                    //marginRight:10,
                  }}
                  >
                    <Text style={{
                      fontSize: 20,
                      fontFamily: 'SanFranciscoBold',
                    }}>Deals</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.setState({ animatedStateSelect: false })} style={{
                    borderBottomWidth: 2,
                    justifyContent: 'center',
                    borderColor:this.state.animatedStateSelect ? '#eee':'#1976D2',
                    alignItems: 'center',
                    width: '40%',
                    height: '100%',
                  }}>
                    <Text style={{
                      fontSize: 20,
                      fontFamily:'SanFranciscoBold' ,
                    }}>Travelers</Text>
                  </TouchableOpacity>
                  </View>
                  <View style={{padding:'2%'}}>
                  {
                    this.renderDeals()

                  }
                  </View>
                </Animated.View>
              </Animated.ScrollView>
            </Drawer>
          </View>
        );

      case 'earth':

      case 'briefcase':

      case 'favorite':

        return (
          <View style={{ flex: 1 }}>
            <Header style={styles.headerStyle}>
              <View>
                {

                  this.state.drawerOpen ?
                  <TouchableOpacity onPress={this.closeDrawer}
                  style={{
                    width:50,
                    marginLeft:5,
                  }}
                  >
                    <Icon name="md-close" />
                  </TouchableOpacity>

                    :
                    <TouchableOpacity onPress={this.openDrawer}
                    style={{
                      width:50,
                      marginLeft:5,

                    }}
                    >
                      <Icon name="menu" />
                    </TouchableOpacity>
                }

              </View>
              {/* <View > */}
              <View style={{
                                  borderWidth:1,
                                  borderRadius:5,
                                  left:Platform.OS ==='ios'? '15%':'10%',
                                  borderColor:'lightgrey',
                                  paddingVertical:'2%',
                                  width: '60%'
                                }}>
                        <View style={{flexDirection:'row',alignItems:'flex-start', /*borderWidth:1, borderColor:'red',*/ width:'30%'}}>
                          <Icon name='search' style={{fontSize:14,marginHorizontal:5}}/>
                          <Text style={{fontFamily:'SanFrancisco',}}>Search</Text>
                        </View>
              </View>
              {/* </View> */}
              <View>
                <TouchableOpacity onPress={() => Actions.mainScreen({ 'secondScreen': 'notify' })}
                style={{
                  //marginLeft:'15%',
                  marginRight:'2%',
                  alignItems:'flex-end',
                  //backgroundColor:'red',
                  width:50,
                }}>
                  <Icon name="ios-notifications-outline" />
                </TouchableOpacity>
              </View>
            </Header>
            <Drawer
              ref={(ref) => { this.drawer = ref; }}
              content={<SideBar />}
              onClose={() => this.closeDrawer()} >

              <FavoriteScreen />

            </Drawer>
          </View>
        )

      case 'person':
      return (
        <View style={{ flex: 1 }}>
          <Header style={styles.headerStyle}>
            <View style={{width: '15%'}}>
              {

                this.state.drawerOpen ?
                <TouchableOpacity onPress={this.closeDrawer}
                style={{
                  width:50,
                  marginLeft:5,
                }}
                >
                  <Icon name="md-close" />
                </TouchableOpacity>

                  :
                  <TouchableOpacity onPress={this.openDrawer}
                  style={{
                    width:50,
                    marginLeft:5,

                  }}
                  >
                    <Icon name="menu" />
                  </TouchableOpacity>
              }

            </View>

            <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={() => Actions.mainScreen({ 'secondScreen': 'notify' })}
              style={{
                //marginLeft:'15%',
                // marginRight:'2%',
                alignItems:'flex-end',
                //backgroundColor:'red',
                width:40,
              }}>
                <Icon name="ios-notifications-outline" />
              </TouchableOpacity>
            </View>
          </Header>
          <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<SideBar />}
            onClose={() => this.closeDrawer()} >

            <ProfileScreen />

          </Drawer>
        </View>
      )
    }
  }
  render() {


    const { value } = this.state;
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (

      <Container style={styles.container} keyboardShouldPersistTaps={'always'}>

        <View style={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
          {this._curentPage()}
        </View>

        <Footer style={{ borderWidth: 0 }}>
          <FooterTab
            style={{
              backgroundColor: '#fafafa',
              borderWidth: 0,
              borderColor: '#fafafa',
            }}>
            <Button onPress={() => this.setState({ page: 'home',scrollY:new Animated.Value(0) })}>
              <Icon name="ios-compass-outline" style={this.state.page=='home'? styles.selected:styles.footerIcon} />
            </Button>


            <Button onPress={() => {this.setState({ page: 'earth'}),Actions.loginScreen()} }>
             <Icon name="md-globe" style={this.state.page=='earth'?styles.selected:styles.footerIcon} />
            </Button>

            <Button onPress={() => {this.setState({ page: 'briefcase'})
                                  this.closeDrawer
                                  Actions.loginScreen()}}>
              <Icon name="md-briefcase" style={this.state.page=='briefcase'? styles.selected:styles.footerIcon} />
            </Button>

            <Button onPress={() => this.setState({ page: 'favorite' })}>
              <Icon name="md-heart-outline" style={this.state.page=='favorite'? styles.selected:styles.footerIcon} />
            </Button>

            <Button onPress={() => this.setState({ page: 'person' })}>
                <Icon name="person" style={this.state.page=='person'? styles.selected:styles.footerIcon} />
            </Button>

          </FooterTab>
        </Footer>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyText: {
    fontFamily:'SanFranciscoBold',
    fontSize: 18,
    //fontWeight: '800',
  },
  containerBox: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingVertical: '5%',
  },

  mainView: {
    padding: '2%',
    marginVertical: '0.5%',
    borderRadius: 5,
    backgroundColor: '#F2F3F4',
  },
  largeText: {
    fontFamily:'SanFranciscoBold',
    fontSize: Platform.OS === 'ios' ? 16 : 19,
    marginBottom: '1%',
   // fontWeight: Platform.OS === 'ios' ? '800' : '600',
  },
  smallText: {
    fontFamily:'SanFrancisco',
    fontSize: 12,

  },
  actionIcon: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    height: 40,
    width: 40,
    shadowOpacity: 1.0,
    elevation: 1,
    borderRadius: 40 / 2,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1
  },
  iconPlus: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 40,

  },
  btn: {
    backgroundColor: '#ff4d4d',
    //padding: '10% 12%',
    paddingVertical: '10%',
    paddingHorizontal: '12%',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnText: {
    fontFamily:'SanFrancisco',
    color: '#ffffff',
  },
  actionCon: {
    marginVertical: '0.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabsCon: {
    flex: Platform.OS === 'ios' ? 1.5 : 1.2,
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
  dealsCon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
  },
  img: {
    margin: 10,
    height: Platform.OS === 'ios' ? '100%' : '90%',
    width: Platform.OS === 'ios' ? 300 : 250,
  },
  footerIcon: {
    color: '#a3a3a3',
    fontSize: 30
  },
  selected: {
    fontFamily:'SanFrancisco',
    color: 'black',
    fontSize: 30
  },
  modalContainer: {
    flex: 1,
    paddingTop: '20%',
    //justifyContent: 'center',
    backgroundColor: '#rgba(0,0,0,0.5)',
    height:'100%'
  },
  mainViewSelectCity: {
    backgroundColor: 'white',
    padding: '2%',
    paddingTop: 0,
    //paddingBottom: '10%',
    flex:2,
    height: Platform.OS === 'ios' ? kHeight :'100%',
    marginHorizontal: '2%',
    borderRadius: 5,
  },
  mainViewSelectWhere: {
    backgroundColor: 'blue',
    padding: '2%',
    height: Platform.OS === 'ios' ? '70%' : '55%',
    marginHorizontal: '2%',
    borderRadius: 5,
  },
  textStyleModal: {
    fontFamily:'SanFrancisco',
    fontSize: Platform.OS === 'ios' ? 14 : 12,
  },
  activeTextStyleModal: {
    fontFamily:'SanFrancisco',
    fontSize: Platform.OS === 'ios' ? 14 : 12,
    color: 'black',
  },
  textStyleWhenModal: {
    fontFamily:'SanFrancisco',
    fontSize: Platform.OS === 'ios' ? 10 : 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  activeTextStyleWhenModal: {
    fontFamily:'SanFrancisco',
    fontSize:Platform.OS ==='ios' ?11:10,
    color: 'black',
    backgroundColor: 'white',
  },
  tabModal: {

    backgroundColor: 'white',

    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTabStyleModal: {
    //color: 'black',
    backgroundColor: 'white',
  },
  mainViewModal: {
    padding: '2%',
    marginVertical: '0.5%',
    marginHorizontal: '10%',
    borderRadius: 5,
    marginTop: Platform.OS === 'ios' ? '15%' : '3%',
    backgroundColor: '#FAFAFA',
  },
  mainViewModal2: {
    padding: '1%',
    marginVertical: '0.3%',
    marginHorizontal: '10%',
    borderRadius: 5,
    //    marginTop:'2%',
    backgroundColor: '#FAFAFA',

  },
  mainViewModalDis: {
    padding: '2%',
    marginVertical: '0.5%',
    marginHorizontal: '10%',
    borderRadius: 5,
    backgroundColor: '#d2d2d2',
  },
  containerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    paddingVertical: '3%',
  },
  mainViewWhen: {
    backgroundColor: 'white',
    padding: '2%',
    flex: 1,
    marginHorizontal: '2%',
    borderRadius: 5,
  },

  // When Modal Style
  containerWhenModal: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: Platform.OS === 'ios' ? '5%' : '2.5%',
  },
  switchStyle: {
    transform: [{ scaleX: .8 }, { scaleY: .8 }],
    marginHorizontal: '5%',
  },
  whenOneWayConStyle: {},
  whenOneWayTextStyle: {
    fontFamily:'SanFranciscoBold',
    fontSize: 18,
    color: '#737373',
    //fontWeight: '800',
  },
  whenReturnTextStyle: {
    fontFamily:'SanFranciscoBold',
    fontSize: 18,
    color: '#737373',
   // fontWeight: '800',
  },
  hr: {
    // borderBottomWidth: Platform.OS === 'ios'? 1.5:1,
    // marginHorizontal: '2%',
    // borderColor: '#eee',
    // alignItems: 'flex-end',
    // width: '100%',
  },
  btnCancelApply: {
    flexDirection: 'row',
    marginBottom: '1%',
    flex: 1,
    justifyContent:'space-between',
    alignItems: 'flex-end',
  },
  btnCancel: {

    backgroundColor: '#006e8a',
    paddingVertical: '5%',
    paddingHorizontal: '7%',
    borderRadius:7,
    marginLeft:'3%',
    marginRight: '10%',
    marginBottom:'1%'
  },
  btnCancelText: {
    fontFamily:'SanFranciscoBold',
    color: 'white',
   // fontWeight: '800',
  },

  btnApply: {
    backgroundColor: '#ff5d58',
    paddingVertical: '5%',
    paddingHorizontal: '8%',
    borderRadius:7,
    marginRight: '3%',
    marginBottom:'1%',

  },

  btnApplyText: {
    fontFamily:'SanFranciscoBold',
    color: 'white',
    //fontWeight: '800',
  },
  flexibleCon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthRow: {
    flexDirection: 'row',
  },
  monthColDis: {
    borderRadius:5,
    margin: '1%',
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3.5%',
    backgroundColor: '#d2d2d2',
  },
  monthCol: {
    borderRadius:5,
    margin: '1%',
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3.5%',
   // backgroundColor: '#75a9f9',
   backgroundColor: '#d2d2d2',
  },
  monthColSelect: {
    margin: '1%',
    borderRadius:5,
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3.5%',
    backgroundColor: '#ff4d4d',
  },
  monthText: {
    fontFamily:'SanFranciscoBold',
    color: 'white',
    //fontWeight: '800',
  },
  activeTabStyleWhenModal: {
    backgroundColor: 'white',

  },
  activeTextStyleWhenModal: {
    fontFamily:'SanFrancisco',
    color: 'black'
  },
  datePickerCon: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? '6%' : '4%',
    justifyContent: 'center',
  },
  sliderStyleCon: {
    paddingTop:Platform.OS==='ios'? '20%':'20%',

    width:100,

    flex: 1
  },
  dayWeekCon: {
    flex: 1,
    padding: '4%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerStyle: {
    marginTop: Platform.OS === 'ios' ? 0 : 24,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  days: {
    fontFamily:'SanFrancisco',
    fontSize: 14,
    margin: 5,

  },
  drBtnCon: {
    flex: 0.9,
    flexDirection: 'row',
    marginBottom: '0%',
    paddingHorizontal: Platform.OS === 'ios' ? '8%' : '10%',
    justifyContent: 'space-between',
  },
  drBtn: {
    borderWidth: Platform.OS === 'ios' ? 1.5 : 1,
    borderColor: 'blue',
    padding: Platform.OS === 'ios' ? '5%' : '6%',
    borderColor: '#006e8a',
    paddingVertical: Platform.OS === 'ios' ? '5%' : '10%',
    borderRadius: Platform.OS === 'ios' ? 5 : 5,
    width: Platform.OS === 'ios' ? '40%' : '35%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drBtnTextStyle: {
    fontFamily:'SanFranciscoBold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize:Platform.OS === 'ios' ? 10 : 10,
   // fontWeight: '800',
    color: '#006e8a',
  },
  whenSwitchStyle: {

  },
  drDepartureStyle: {
    fontFamily:'SanFranciscoBold',
    fontSize:Platform.OS === 'ios' ? 10 : 10,
   //fontWeight: '800',
    color: '#747474',
  },
  weekDaysCon: {
    marginBottom: '1%',
    flexDirection: 'row',
  },
  weekDaysBtn: {
    margin: Platform.OS === 'ios' ? '0.2%' : '0.1%',
    width: '14%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3%',
    backgroundColor: '#75a9f9',
  },
  weekDaysBtnClick: {
    margin: Platform.OS === 'ios' ? '0.1%' : '0.1%',
    width: '14%',
    height:32,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#ff4d4d',
    borderWidth: Platform.OS === 'ios' ? 1 : 1,
  },
  weekDaysBtnTextStyle: {
    fontFamily:'SanFrancisco',
    color: 'white',
    fontSize: 12
  },
  containerAdditionalMain: {
    flex: 1,
    //      paddingTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#rgba(0,0,0,0.5)',
  },
  containerAdditionalChild: {
    backgroundColor: 'white',
    borderRadius: 5,

    width: '90%',
    paddingTop: '5%',

    paddingHorizontal: '2%'
  },
  data: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  catContainer: {
    flexDirection: 'row',

  },
  childContainer: {
    flex: 1,
  },
  catCon: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    justifyContent: 'space-between'
  },
  adultStyle: {
    fontFamily:'SanFranciscoBold',
    //fontWeight: '800',
    fontSize: 14,
    color: '#706968'
  },
  minYear: {
    fontFamily:'SanFrancisco',
    fontSize: 10
  },
  select: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width:'50%',
    justifyContent: 'space-between',

  },
  oneStyle: {
    fontFamily:'SanFranciscoBold',
    paddingHorizontal: '5%',
    //fontWeight: '800',
    fontSize: 18,
    width: '20%',
    marginHorizontal: '5%',
  },
  passengerStyle: {
    fontFamily:'SanFranciscoBold',
    //fontWeight: '800',
    color: '#706968',
  },
  eco: {
    fontFamily:'SanFranciscoBold',
   // fontWeight: '600',
    color: 'grey'
  },
  flight: {
    fontFamily:'SanFrancisco',
    justifyContent: 'flex-start',
    marginHorizontal: '3%',
    fontSize:Platform.OS ==='ios'?14: 14,
    flex:1,
    color: '#2196f3'
  },


});

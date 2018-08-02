import React from 'react';
import {Actions} from 'react-native-router-flux'
import {
         StyleSheet, Text, View ,
         TouchableHighlight,Platform,
         ImageBackground,Dimensions,TouchableOpacity
       } from 'react-native';
import {
        Icon,
      } from 'native-base'; // 2.3.9
import { MaterialIcons } from '@expo/vector-icons';

const cardImage = require('../../assets/Cities/Rome.jpg')
const cardImage2 = require('../../assets/Cities/Tokyo.jpg')
const cardImage3 = require('../../assets/Cities/Singapore.jpg')

class WatchlistCards extends React.Component{
  constructor(props){
    super(props)
    this.state={
      select:true,
      en:this.props.en
    }
    this.next=this.next.bind(this)
  }
  next(){
   // console.log('from chld');
   Actions.mainScreen({ 'secondScreen': 'result' })
   // this.props.screenChildClick()

  }
  componentWillMount() {
    this.loadFonts();
  }
 
  async loadFonts() {
    await Expo.Font.loadAsync({
      'SanFrancisco':require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
      'SanFranciscoBold':require('../../assets/fonts/SF-Pro-Display-Bold.otf')
    });
  }
  render(){
    return(
      <TouchableHighlight style={{marginVertical:'3%',borderRadius:5}} onPress={this.next}>
      <View style={{borderRadius:5,borderColor:'red'}}> 
        <ImageBackground source={
            this.props.city=='img1'?cardImage:
            this.props.city=='img2'?cardImage2:cardImage3}

            style={{width:'100%',borderRadius:5,overflow:'hidden'}}>

            <View style={{marginHorizontal:'2%',padding:'2%'}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:'15%',}}>

                  <TouchableHighlight>
                    <Icon name='ios-trash-outline' style={{fontSize:20,color:'white', shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 3}}/>
                  </TouchableHighlight>

                  <TouchableOpacity onPress={()=>this.setState({select:!this.state.select})}>
                    <MaterialIcons name={this.state.select ?'notifications-none':'notifications-active'} style={{color:'white',fontSize:21,marginLeft:5, shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.0,
    shadowRadius: 3,}}/>
                  </TouchableOpacity>
                  

              </View>

              <View style={styles.bookCon}>

                <View style={styles.bookTitle}>
                  <Text style={[styles.fromText,{width:'45%'}]}>{this.props.from}</Text>
                    <Icon name='ios-plane' style={styles.icon}/>
                    { this.state.en ===true
                      ?<Icon name='ios-plane' style={[styles.icon, {transform: [
                                                            {rotateZ : '180deg'}
                                                          ]},{marginLeft:Platform.OS ==='ios'? -20:-22,marginTop:20,}]}/>
                      :null}
                  <Text style={[styles.toTitle,{width:'45%'}]}>{this.props.to}</Text>
                </View>
                <View style={styles.date}>
                    <View style={{width:'45%',justifyContent:'flex-end',}}>
                      <Text style={[styles.dateTitle,{textAlign:'right',justifyContent:'flex-start',}]}>{this.props.date}</Text>
                      <Text style={[styles.dayTitle,{textAlign:'right',justifyContent:'flex-start',}]}>{this.props.day}</Text>
                    </View>
                    <View style={{width:'44%'}}>
                      <Text style={[styles.dateTitle,{textAlign:'left'}]}>{this.props.date2}</Text>
                      <Text style={[styles.dayTitle,{textAlign:'left'}]}>{this.props.day2}</Text>
                    </View>
                </View>
              </View>

              <View style={styles.notifycon}>
                  <View style={styles.priceView}>
                    <Text style={styles.reminderText}>{this.props.price}</Text>
                  </View>
              </View>
            </View>
        </ImageBackground>
        </View>
      </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  bookCon:{
    // borderColor:'red',
    // borderWidth:1, 
    marginHorizontal:'0%',
    marginVertical:'1%',
    borderRadius:5,
    //padding:'3% 2%',
    paddingHorizontal:'5%',
    paddingVertical:'3%',
    backgroundColor:'#rgba(0,5,0,0.5)',
    marginBottom:'10%'
  },
  bookTitle:{
   
    //padding:'0% 0%',
    flexDirection:'row',
    //justifyContent:'space-between',
    alignItems:'center',
  },
  fromText:{
    //alignSelf:'flex-end',
    textAlign:'right',
    fontFamily:'SanFranciscoBold',
    fontSize:22,
    //fontWeight:'800',
    color:'white'
  },
  icon:{
    fontFamily:'SanFrancisco',
    color:'white',
    paddingLeft:'2%',
    paddingRight:'2%',
    //padding:'2%',
    fontSize:18,
  },
  toTitle:{
    fontFamily:'SanFranciscoBold',
    fontSize:22,
   // fontWeight:'800',
    color:'white'
  },
  dateCon:{
    justifyContent:'center',
    alignItems:'center',
  },
  dateTitle:{
    fontFamily:'SanFranciscoBold',
    fontSize:18,
    //fontWeight:'800',
    color:'white'
  },
  dayTitle:{
    fontFamily:'SanFrancisco',
    fontSize:18,
    //fontWeight:'800',
    color:'white'
  },
  notifycon:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    //paddingHorizontal:'1%',
  },
  reminderText:{
    fontFamily:'SanFranciscoBold',
    color:'white',
    fontSize:14,
   // fontWeight:'800',
  },
   btn:{
    backgroundColor:'#ff4d4d',
    paddingHorizontal:'10%',
    paddingVertical:'1%',
    alignItems:'center',
    borderRadius:2,
    justifyContent:'center',
  },
  btnText:{
    fontFamily:'SanFrancisco',
    color:'#ffffff',
    fontSize:10
  },
  priceView:{
    backgroundColor:'red',
    padding:'2%',
    borderRadius:7
  },
  date:{
    // marginHorizontal:'5%',
    // marginRight:'5%',
    justifyContent:'space-between',
    flexDirection:'row'
  }
});
export default WatchlistCards
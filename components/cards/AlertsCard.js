import React from 'react';
import {
         StyleSheet, Text, View ,
         TouchableOpacity,TouchableHighlight,
         ImageBackground,Image,Platform,TouchableWithoutFeedback
       } from 'react-native';
import {
        Icon,
      } from 'native-base'; // 2.3.9
import {Actions} from 'react-native-router-flux'

const cardImage = require('../../assets/img1.jpeg')
const cardImage2 = require('../../assets/img2.jpeg')
const cardImage3 = require('../../assets/img3.jpeg')


class AlertsCard extends React.Component{
    componentWillMount() {
        this.loadFonts();
      }
     
      async loadFonts() {
        await Expo.Font.loadAsync({
            'SanFrancisco':require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
            'SanFranciscoBold':require('../../assets/fonts/SF-Pro-Display-Bold.otf')
        });
      }
  press(){

    Actions.mainScreen({'secondScreen':'result','dis':'notify'})
  }
  render(){
    return(
      <TouchableWithoutFeedback onPress={()=>this.press()} style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,marginBottom:10,flex:1,}}> 
          <View style={{flex:1,flexDirection:'row',marginTop:10}}>
          
              <Image source={
                  this.props.img=='1'?cardImage:
                  this.props.img=='2'?cardImage2:cardImage3} style={styles.img}/>
        
          <View style={styles.con2}>
              <Text style={styles.headText}>Price change</Text>
              <Text style={styles.text}>{this.props.from} - {this.props.to}</Text>
              <Text style={styles.text}>{this.props.fromDate} - {this.props.toDate}</Text>
          </View>
          <View style={styles.con3}>
                <Text style={styles.text2}><Text style={styles.t1}>{this.props.prePrice}</Text> > <Text style={styles.t2}>{this.props.newPrice}</Text></Text>
          </View>
          </View>
      </TouchableWithoutFeedback>
    )
  }
}
const styles = StyleSheet.create({

        headText:{
            fontFamily:'SanFranciscoBold',
            fontSize:Platform.OS === 'ios'? 16:16,
           // fontWeight:Platform.OS === 'ios'? '700':'500',
        },
        text:{
            fontFamily:'SanFrancisco',
            fontSize:Platform.OS === 'ios'? 14:14,
            marginTop:4,
            color:'grey',
        },
        text2:{
            fontFamily:'SanFrancisco',
            fontSize:Platform.OS === 'ios'? 12:12,
        },
        con3:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        },
        con2:{
            marginLeft:15,
            flex:1
            //justifyContent:'space-between'
        },
        img:{
            height:Platform.OS === 'ios'?'100%':'100%',
            width:Platform.OS === 'ios'? '25%':'30%',
        },
        t1:{
            fontFamily:'SanFrancisco',
            color:'#034f84',
        },
        t2:{
            fontFamily:'SanFrancisco',
            color:'red',
        },
});
export default AlertsCard
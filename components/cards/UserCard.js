import React from 'react';
import {
         StyleSheet, Text, View ,
         TouchableOpacity,
         ImageBackground,Image,Platform
       } from 'react-native';
import {
        Icon,
      } from 'native-base'; // 2.3.9
import {Actions} from 'react-native-router-flux'


const cardImage = require('../../assets/img1.jpeg')
const user1 = require('../../assets/user2.png')
const user2 = require('../../assets/user3.png')
const user3 = require('../../assets/user1.png')
class UserCard extends React.Component{
constructor(props){
    super(props)
    this.state={
        select:false
    }
    console.log(this.props.img);
    
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
      <TouchableOpacity activeOpacity={0.9} onPress={()=>Actions.loginScreen()} style={{justifyContent:'center',alignItems:'center',padding:15,marginHorizontal:Platform.OS ==='ios'?this.props.gap === 'undefine' ?20:this.props.gap: 15}}> 
          <View>
              <Image source={this.props.img} style={{height:Platform.OS==='ios'? 80:60,width:Platform.OS==='ios'? 80:60}}/>
          </View>
          <View>
              <Text style={styles.text}>{this.props.fromCity}</Text></View>
          <View>
              <Text style={styles.text}>{this.props.toCity}</Text>
          </View>
          <View>
                <Text style={styles.text}>{this.props.fromDate}-{this.props.toDate}</Text>
          </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({

        text:{
           fontFamily:'SanFrancisco',
            fontSize:12,
            marginTop:2,
            color:'grey',
        },
});
export default UserCard
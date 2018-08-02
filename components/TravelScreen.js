import React from 'react';
import {
         StyleSheet, Text, View ,
        ScrollView,TouchableOpacity,
       TextInput,Platform,Image
       } from 'react-native';
import {
        Header,Body,Right,Left,
        Icon,Button

      } from 'native-base'; // 2.3.9


import UserCard from './cards/UserCard'
import { Router, Scene, Actions } from 'react-native-router-flux'

export default class TravelScreen extends React.Component{
constructor(props){
    super(props)
    this.state={

    }


}
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
      <View style={{
          padding:10,

      }}>
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
              <Text style={{
                  fontFamily:'SanFrancisco',
                  justifyContent:'flex-start',
                  fontSize:14,
                  color:'#2196f3'
              }}>People travelling from Prague, Czech Republic</Text>
              <TouchableOpacity style={{}}
                onPress={()=> Actions.mainScreen({ 'secondScreen': 'result','seeAll':true })}
              >
                  <Text style={{
                      fontFamily:'SanFrancisco',
                  color:'grey'
              }}>See all</Text>
              </TouchableOpacity>
          </View>



      </View>
    )
  }
}

const styles = StyleSheet.create({


});

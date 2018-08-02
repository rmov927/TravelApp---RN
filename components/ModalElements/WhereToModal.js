import React from 'react';
import {
         StyleSheet, Text, View ,
       } from 'react-native';
import {Icon,} from 'native-base'; // 2.3.9

class WhereToModal extends React.Component{
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
      <View>
       <View style={styles.containerView}>
        <Icon name='navigate' style={{fontSize:18}}/>
        <Text style={{ fontFamily:'SanFranciscoBold',}}> Use my location</Text>
      </View>
      
      <View style={{borderBottomWidth:1,borderColor:'#d2d2d2'}}
      ></View>
      <Text  style={{ fontFamily:'SanFrancisco',}}>Prague, Czechia</Text>
    </View>
    
    )
  }
}
const styles = StyleSheet.create({
  containerView:{
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:'2%',
    paddingVertical:'3%',
  },
});
export default WhereToModal
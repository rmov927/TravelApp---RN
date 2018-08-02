import React from 'react';
import * as Expo from 'expo'
import {Actions} from 'react-native-router-flux'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
         StyleSheet, Text, View ,
         TouchableOpacity,
         ImageBackground,Image,Platform
       } from 'react-native';
import {
        Icon,
      } from 'native-base'; // 2.3.9
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const info = require('../../assets/info.png')
const restore = require('../../assets/restore.png')
class SideBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          
            isReady: false,
           
      
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
       
      }
  render(){

    
    // if (!this.state.isReady) {
    //     return <Expo.AppLoading />;
    //   }
    return(
      <View style={styles.container}> 
        
        <View style={{width:'75%'}}>
            <View>
                <TouchableOpacity style={styles.child} onPress={()=>Actions.loginScreen()}>
                <MaterialIcons name='person' style={styles.icon}/>
                    <Text style={styles.childTextStyle}>Login / Signup</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.child} onPress={()=>Actions.mainScreen({'secondScreen':'recent'})}>
                    <MaterialIcons name='restore' style={styles.icon}/>
                        <Text style={styles.childTextStyle}>Recent searches</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={[styles.child,{flexDirection:'row'}]}  onPress={()=>Actions.mainScreen({'secondScreen':'currency'})}>
                <MaterialIcons name='flag' style={styles.icon}/>
                    <View >
                        <Text style={styles.childTextStyle}>Currency / </Text>
                        <Text style={styles.childTextStyleChild}>Euro </Text>
                    </View><View >
                        <Text style={styles.childTextStyle}>Country </Text>
                        <Text style={styles.childTextStyleChild}>Czechia </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity style={[styles.child,{flexDirection:'row',alignItems:'center'}]} >
                <MaterialIcons name='announcement' style={styles.icon}/>
                <Text style={styles.childTextStyle}>About</Text>
                </TouchableOpacity>
            </View>
        
        </View>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
        container:{
            backgroundColor:'white',
            flex:1,
            
            padding:'5%',
            paddingLeft:'5%',
            paddingTop:'10%'
        },
        childTextStyleChild:{
            fontSize:12,
            color:'black',
            fontFamily:'SanFrancisco',
        },
        childTextStyle:{
            fontFamily:'SanFrancisco',
            fontSize:18,
            justifyContent:'space-between',
            color:'black'
        },
        child:{
            flexDirection:'row',
            alignItems:'center',
            marginBottom:'5%',
        },
        icon:{
            width:'20%',
            justifyContent:'center',
            alignItems:'center',
            alignSelf:'center',
            color:'black',
            fontSize:25,
        },
        text:{
            fontFamily:'SanFrancisco',
            fontSize:12,
            marginTop:2,
            color:'#929292',
        },
});
export default SideBar
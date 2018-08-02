import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
 
import Tabs from 'react-native-tabs';
 
class CustomTabs extends Component {
  constructor(props){
    super(props);
    this.state = {page:this.props.currentlySelected};
  }
  render() {
    var self = this;
    return (
      <View style={styles.container}>
        <Tabs selected={this.state.page}
              selectedStyle={{color:'black',fontWeight:Platform.OS ==='ios'?'800': '600',borderBottomColor: '#1976D2',borderBottomWidth:Platform.OS ==='ios'?3: 3,}} onSelect={el=>{  
                  this.setState({page:el.props.name})
                  this.props.changeStateFromChild(el.props.name)
                  }}
                  >
            <Text name="anytime" style={[styles.txt,{ borderBottomWidth:2,borderColor: '#d2d2d2'}]}>Anytime</Text>
            <Text name="flexible" style={[styles.txt,{ borderBottomWidth:2,borderColor: '#d2d2d2'}]}>Flexible</Text>
            <Text name="daterange" style={[styles.txt,{ borderBottomWidth:2,borderColor: '#d2d2d2'}]}>Date Range</Text>
            <Text name="specificdates" style={[styles.txt,{ borderBottomWidth:3,borderColor: '#d2d2d2'}]}>Specific Dates</Text>
        </Tabs>
        
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop: '13%',
  },
  txt:{
    paddingTop:10,
    height:Platform.OS ==='ios'?'50%': '70%',
    fontSize:Platform.OS ==='ios'?11: 11,
    width:'100%',
    textAlign:'center',
    justifyContent:'center',
    //alignItems: 'center',
    
  },
});

export default CustomTabs
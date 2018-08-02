import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

export default class RadioButton extends Component{

    render(){
    return(
            <TouchableWithoutFeedback onPress={() => this.props.onPress(this.props.value)}>
            <View style={{flexDirection:'row',alignItems:'center',}}>
            <View style={[{
            height: this.props.outerCircleSize || 18,
            width: this.props.outerCircleSize || 18,
            borderRadius: this.props.outerCircleSize/2 || 9,
            borderWidth: this.props.outerCircleWidth || 1.5,
            borderColor: this.props.outerCircleColor || '#006e8a',
            alignItems: 'center',
            justifyContent: 'center',
            }]}>
            {
            this.props.value===this.props.currentValue ?
            <View style={{
              height: this.props.innerCircleSize || 10,
              width: this.props.innerCircleSize || 10,
              borderRadius: this.props.innerCircleSize/2 || 5,
              backgroundColor: this.props.innerCircleColor || '#006e8a',
            }}/>
            : null
            }
            </View>
            <View style={{marginLeft:10}}>
            {this.props.children}
            </View>
            </View>
            </TouchableWithoutFeedback>
    );
}

}

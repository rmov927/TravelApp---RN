import React,{Component} from 'react'
import {
        TouchableOpacity,Text,StyleSheet,Animated,
        Slider,View,PanResponder,Dimensions,
       } from 'react-native'

class CustomSlider extends Component{
    constructor(props){
        super(props)
        this.state={
            marginLeft:'0'
        }
    }
    componentWillMount(){
        this.animation=new Animated.ValueXY({x:0,y:0})
        
        this.animation2=new Animated.ValueXY({x:0,y:0})

        this.panResponder=PanResponder.create({
            onMoveShouldSetPanResponder:()=>true,

            onPanResponderGrant:(evt,gestState)=>{
                this.animation.extractOffset()
            },
            onPanResponderMove:(evt,gestState)=>{
                if(gestState.dx>=0)
                {
                    this.animation.setValue({x:gestState.dx,y:0})
                    this.setState({
                        marginLeft:gestState.dx.toString().slice(0,2)>=0?gestState.dx.toString().slice(0,2):0
                        
                    })
                }
            
            },
            onPanResponderRelease:(evt,gestState)=>{
                
            }

        })
        this.panResponder2=PanResponder.create({
            onMoveShouldSetPanResponder:()=>true,
            
            onPanResponderGrant:(evt,gestState)=>{
                this.animation2.extractOffset()
            },
            onPanResponderMove:(evt,gestState)=>{
                this.animation2.setValue({x:-gestState.dx,y:0})
                console.log(gestState.dx);
                
            },
            onPanResponderRelease:(evt,gestState)=>{

            }

        })
        this.loadFonts();
    }
    async loadFonts() {
        await Expo.Font.loadAsync({
            'SanFrancisco':require('../../assets/fonts/SF-Pro-Display-Regular.otf'),
            'SanFranciscoBold':require('../../assets/fonts/SF-Pro-Display-Bold.otf')
       
        });
        
      }
    render(){
        const anim={
            transform:this.animation.getTranslateTransform()
        }
        const offSet=this.animation.x.interpolate({
            inputRange:[10,Dimensions.get('window').width-10],
            outputRange:[0,Dimensions.get('window').width-10],
            extrapolate:'clamp'

        })
        const offSet2=this.animation2.x.interpolate({
            inputRange:[0,Dimensions.get('window').width-10],
            outputRange:[Dimensions.get('window').width-40,0],
            extrapolate:'clamp'

        })
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',
                          flexDirection:'row',}}>
                <Animated.View style={[{width:'100%'}]}
                                        
                >
                    <Animated.View  style={{left:offSet,top:-40,position:'absolute',paddingLeft: 10,}}>
                        <Text style={[{fontFamily:'SanFrancisco',width:20,fontSize:20}]} >{this.state.marginLeft}</Text>
                    </Animated.View>
                    
                    <Animated.View  style={{left:offSet2,top:-40,position:'absolute',justifyContent:'center',paddingLeft: 12,}}>
                        <Text style={[{fontFamily:'SanFrancisco',width:20,fontSize:20}]} >2</Text>
                    </Animated.View>
                       
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={{
                            left:offSet,
                            height:40,
                            width:40,
                            borderRadius:20,
                            backgroundColor:'blue',
                            marginTop: -18,
                            zIndex:10,
                            position:'absolute',
                        }}>
                        
                        </Animated.View>
                            <View
                                style={{
                                    width:'100%',
                                    borderBottomColor:'red',
                                    borderBottomWidth:5,
                                }}
                            />
                        <Animated.View
                        {...this.panResponder2.panHandlers}
                        style={{
                            left:offSet2,
                            right:0,
                            height:40,
                            width:40,
                            borderRadius:20,
                            backgroundColor:'green',
                            marginTop: -18,
                            zIndex:10,
                            position:'absolute',

                        }}>
                        
                        </Animated.View>
                   
                </Animated.View>
                {/* <Slider
                    style={{width:'50%',transform: [
                                        {rotateZ : '180deg'}],
                    }}
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor='#1fb28a'
                    maximumTrackTintColor='#d3d3d3'
                    thumbTintColor='#1a9274'
                /> */}
            </View> 
        )
    }
}

export default CustomSlider
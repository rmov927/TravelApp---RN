import React from 'react';
import { Actions } from 'react-native-router-flux'
import {
    StyleSheet, Text, View,
    TouchableWithoutFeedback, Platform,
    ImageBackground, Dimensions
} from 'react-native';
import {
    Icon,
} from 'native-base'; // 2.3.9
import { MaterialIcons } from '@expo/vector-icons'
const cardImage = require('../../assets/img1.jpeg')
const cardImage2 = require('../../assets/img2.jpeg')
const cardImage3 = require('../../assets/img3.jpg')

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
class DealsCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            select: true,
            en: this.props.en
        }
        this.next = this.next.bind(this)
      //  console.log(Dimensions.get('window').height/3);
        
        
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
    next() {
        Actions.mainScreen({'secondScreen':'result'})
    }
    render() {
        return (
            <TouchableWithoutFeedback style={{marginBottom:'3%'}} onPress={this.next} >
              
            <ImageBackground source={this.props.img}  style={styles.img}>
               
                    <View style={styles.bookCon} >
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
                                <Text style={[styles.dateTitle,{textAlign:'right',justifyContent:'flex-start',}]}>{this.props.fromDate}</Text>
                                <Text style={[styles.dayTitle,{textAlign:'right',justifyContent:'flex-start',}]}>{this.props.day}</Text>
                                </View>
                                <View style={{width:'44%'}}>
                                <Text style={[styles.dateTitle,{textAlign:'left'}]}>{this.props.toDate}</Text>
                                <Text style={[styles.dayTitle,{textAlign:'left'}]}>{this.props.day2}</Text>
                                </View>
                        </View>
                                                                         
                    </View>
                    <View style={styles.notifycon}>
                         <View style={styles.priceView}>
                            <Text style={styles.reminderText}>{this.props.price}</Text>
                        </View>
                    </View>  
               
                </ImageBackground>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    ho:{
        fontFamily:'SanFrancisco',
        color:'white',
        fontSize:18,
        
        justifyContent:'flex-end',
        alignItems:'flex-end',
        fontWeight:'600'
      },
      from180:{
        fontFamily:'SanFranciscoBold',
        color:'white',
        //fontWeight:Platform.OS ==='ios'?'800':'600',
      },
      vietnam:{
        fontFamily:'SanFrancisco',
        fontSize:Platform.OS ==='ios'? 14:10,
      },
      toFromDeals:{
        fontFamily:'SanFranciscoBold',
        fontSize:Platform.OS ==='ios'? 22:18,
        color:'white',
        //fontWeight:Platform.OS ==='ios'?'800':'600',
      },
      dealsView:{
        justifyContent:'center',  
        alignItems:'center',
        backgroundColor:'#rgba(0,5,0,0.5)',
        borderRadius:5,
        marginHorizontal: Platform.OS ==='ios'? '15%':'10%',
        height:Platform.OS ==='ios'? '40%':'40%',
        padding:'2%',
        marginTop:Platform.OS ==='ios'?'15%':'25%',
      },
      img: {
        marginHorizontal: 5,
        marginBottom:'2%',
        height:Platform.OS ==='ios'? parseInt(SCREEN_HEIGHT)/3:parseInt(SCREEN_HEIGHT)/2.8,
        width:Platform.OS ==='ios'? SCREEN_WIDTH-50:SCREEN_WIDTH-60,
        borderRadius:5,
        overflow:'hidden'
      },
      bookTitle:{
   
        //padding:'0% 0%',
        flexDirection:'row',
        //justifyContent:'space-between',
        alignItems:'center',
      },
      romText:{
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
      fromText:{
        //alignSelf:'flex-end',
        textAlign:'right',
        fontFamily:'SanFranciscoBold',
        fontSize:23,
        //fontWeight:'800',
        color:'white'
      },
      toTitle:{
        fontFamily:'SanFranciscoBold',
        fontSize:22,
       // fontWeight:'800',
        color:'white'
      },
      dateTitle:{
        fontFamily:'SanFranciscoBold',
        fontSize:18,
        //fontWeight:'800',
        color:'white'
      },
      dayTitle:{
        fontFamily:'SanFrancisco',
        fontSize:16,
        //fontWeight:'800',
        color:'white'
      },
      date:{
        // marginHorizontal:'5%',
        // marginRight:'5%',
        justifyContent:'space-between',
        flexDirection:'row'
      },
      bookCon:{
          marginTop:'20%',
        // borderColor:'red',
        // borderWidth:1, 
        marginHorizontal:'5%',
        //marginVertical:'5%',
        borderRadius:5,
        //padding:'3% 2%',
        paddingHorizontal:'5%',
        paddingVertical:'3%',
        backgroundColor:'#rgba(0,5,0,0.5)',
      },
      notifycon:{
       // flexDirection:'row',
       marginTop:'5%',
       marginRight:'5%',
        justifyContent:'flex-end',
       alignItems:'flex-end',
        //paddingHorizontal:'1%',
      },
      reminderText:{
        fontFamily:'SanFranciscoBold',
        color:'white',
        fontSize:14,
       // fontWeight:'800',
      },
      priceView:{
        backgroundColor:'#ff5d55',
        padding:'2%',
        borderRadius:7
      },
});
export default DealsCard
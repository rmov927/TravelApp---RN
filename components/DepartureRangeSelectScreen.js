import * as Expo from "expo";
import React from 'react';
import {
  StyleSheet,Text,View,TouchableOpacity,
  ScrollView,Image,Modal,AsyncStorage,
  TextInput,Switch,Slider,Platform,
} from 'react-native';
import {
  Header,Body,Right,
  Left,Icon,Tab,
  Tabs,ScrollableTab,FooterTab,
  Footer,Button,Container, 
  CheckBox
} from 'native-base'; // 2.3.9
import { Calendar,CalendarList} from '../lib/calendar';
import {Actions} from 'react-native-router-flux'
let sDate='2018-03-17'
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
var MarkerDate={};
class DepartureRangeSelectScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          isReady: false,
          day:'',
          month:'',
          date:'',
          sDate:'',
          eDate:'',
          returnMonth:'',
          returnDate:'',
          returnDay:'',
          clickOne:false,
          MarkerDate:{},
          sdateSelect:false
        };
        
        
      //  this.getValues();
     

      }
      //retrive the list of date between to date
       getDates = function(startDate, endDate) {
        var arr = new Array();
        var dt = startDate;
        var enddt=endDate
        while (dt <= enddt) {
            arr.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
       
      };
      

    //
    //retrive the values from the AsyncStorage
    //And stored into the Starting/Ending Dates.
    //
      async getValues(){
          console.log("------Async Calls-------");
          
        try {
            const sDate = await AsyncStorage.getItem('@startDate');
            const eDate = await AsyncStorage.getItem('@endDate');
            


            if (sDate !== null || eDate !== null){
              // We have data!!
              //console.log("__Start-Date__\n"+sDate);
              const arrStored=sDate.split(",")
              const arrStored2=eDate.split(",")
              
              console.log(arrStored);
              
              this.setState({
            
                day:arrStored[1],
                month:arrStored[2],
                date:arrStored[0],
                sDate:arrStored[3],

                returnDay:arrStored2[1],
                returnMonth:arrStored2[2],
                returnDate:arrStored2[0],
                eDate:arrStored2[3]

             })
              
              console.log("----> "+this.state.sDate);

                

            }
          } catch (error) {
            // Error retrieving data
            console.log(error);
          }

          console.log("------Async Ends-------");
      }
      //stored in asyncStorage 
      async SetStarDateToAsync(sDate){
        
        try {
            await AsyncStorage.setItem('@startDate',sDate.toString())
           

          } catch (error) {
            // Error saving data
            console.log("start date  : "+error);
            
          }
        
      }
      async SetEndDateToAsync(eDate){
        
        try {
            await AsyncStorage.setItem('@endDate',eDate)
           
          } catch (error) {
            // Error saving data
            console.log("end date  :"+error);
            
          }
        
      }
      clearText(){
          this.setState({
              month:'',
              date:'',
              day:'',
              eDate:'',
              sDate:'',
              returnDate:'',
              returnMonth:'',
              returnDay:'',
              sdateSelect:false
          })
      }
      selectOperation =(day)=>{

        var date=new Date(day.dateString)
       
        let dy=day.day
        if(!this.state.click)
        {
            
            this.setState({
                click:true,
                sDate:day.dateString,
                day:dy,
                month:months[ day.month-1],
                date:days[date.getDay()]
            })

            let sDate=[this.state.date,this.state.day,this.state.month,this.state.sDate]
            this.SetStarDateToAsync(sDate.toString())
        }else
        {
            if(this.props.ret=='one'){
                this.setState({
                    click:true,
                    sDate:day.dateString,
                    day:dy,
                    month:months[ day.month-1],
                    date:days[date.getDay()]
                })
                let sDate=[this.state.date,this.state.day,this.state.month,this.state.sDate]
                this.SetStarDateToAsync(sDate.toString())
            }
            this.setState({
                click:false,
                returnDay:dy,
                eDate:day.dateString,
                //returnDay:dy,
                returnMonth:months[ day.month-1],
                returnDate:days[date.getDay()]
            })
          
         
            let eDate=[this.state.returnDate,this.state.returnDay,this.state.returnMonth,this.state.eDate]
            this.SetEndDateToAsync(eDate.toString())
        }
    
        sDate=this.state.sDate.toString()
    
        
      }
      
      componentWillMount() {
        this.loadFonts();
      }
      async loadFonts() {
        await Expo.Font.loadAsync({
          Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
          'SanFrancisco':require('../assets/fonts/SF-Pro-Display-Regular.otf'),
          'SanFranciscoBold':require('../assets/fonts/SF-Pro-Display-Bold.otf')
        });
        this.setState({ isReady: true });
      }

      MarkerDate(sdate,edate){
        sdate2=sdate
        edate2=edate
        console.log('sdate :',sdate);
        console.log('edate :',edate);
         sdate=sdate.split('-')
         edate=edate.split('-')
       let data=this.getDates(new Date(sdate[0],sdate[1]-1,sdate[2]), new Date(edate[0],edate[1]-1,edate[2]))
        
      
       mdate={}
       m=0,d=0
       date=''
       //console.log('ret:',this.props.ret)
       if(sdate[1]=='12' && edate[1]=='01'){
            //console.log(sdate[0]+'-12-31')
            mdate[sdate[0]+'-12-31']={color: '#AED6F1' ,textColor: 'white' ,borderTopRightRadius:50,borderWidth:1,}
        }
       if(this.props.ret=='one'){
        mdate[sdate2]={startingDay: true, color: '#3d8af7' ,textColor: 'white' ,borderTopRightRadius:50,borderWidth:1,}
       }
       else{
        mdate[sdate2]={startingDay: true, color: '#3d8af7' ,textColor: 'white' ,borderTopRightRadius:50,borderWidth:1,}

        data.forEach(element => {
            //console.log('element :',element)
            date=element.getFullYear()+"-"+m+"-"+d
            if(element.getMonth()<9){
                m='0'+(Number(element.getMonth())+1)
            }
            else{
              m=(Number(element.getMonth())+1)
             // console.log('month',m)
            }
            if(element.getDate()<10){
              d='0'+element.getDate()
          }
          else{
              d=element.getDate()
          }
          //console.log('date',date,'edate',edate2)
          if(date==sdate2){
              console.log('match')
              mdate[edate2]={startingDay: true, color: '#3d8af7' ,textColor: 'white' ,borderTopRightRadius:50,borderWidth:1,}
          }
          else{
              mdate[date]={color: '#AED6F1' ,textColor: 'white' ,borderTopRightRadius:50,borderWidth:1,}
          }
        });
       console.log('mdate :',mdate)
     
       }
       MarkerDate=mdate

      }

    render(){
        //console.log('sdate',this.state.sDate,'edate',this.state.eDate)
        this.MarkerDate(this.state.sDate,this.state.eDate) 
       // console.log('markare date',MarkerDate)
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
          }
         /// console.log(this.getDates(new Date(2013,10,22), new Date(2013,10,25)))
        return(
            
            <View style={{flex:1}}>
                <Header style={styles.headerStyle}>
                <View style={{justifyContent:'center',alignItems:'center',flex:0.5}}>
                    <TouchableOpacity onPress={()=>Actions.mainScreen({'when':true,'fromCal':this.props.fromCal})} style={{width:'100%',height:'100%',justifyContent:'center'}}>
                    {/* <TouchableOpacity onPress={()=>Actions.pop({'when':'true'})} style={{width:'100%',height:'100%',justifyContent:'center'}}> */}
                        <Icon name="ios-arrow-back-outline" />
                    </TouchableOpacity>
                </View>
                
                <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                    <Text style={styles.bodyText}>{this.props.title}</Text>
                </View>
                
                <View style={{justifyContent:'center',alignItems:'center',flex:0.5}}>
                    <Text style={{color:'transparent'}}>ok</Text>
                </View>
                </Header>
                {
                    this.props.ret==='two'
                    ?
                    <View style={styles.btnCon}>
                    <TouchableOpacity style={styles.btnStyle}>
                        <View style={styles.btnViewStyle}>
                            <Text style={styles.earliStyle}>{this.props.dep}</Text>
                            <View style={styles.monDateCon}>
                                <View style={styles.monCon}>
                                    <Text style={styles.monTextStyle}>{this.state.month}</Text>
                                    <Text style={styles.weekTextStyle}>{this.state.date}</Text>
                                </View>
                                <View style={styles.dateCon}>
                                    <Text style={styles.dateTextStyle}>{this.state.day}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>    

                    <TouchableOpacity style={styles.btnStyle}>
                        <View style={styles.btnViewStyle}>
                            <Text style={styles.earliStyle}>{this.props.rat}</Text>
                            <View style={styles.monDateCon}>
                                <View style={styles.monCon}>
                                    <Text style={styles.monTextStyle}>{this.state.returnMonth}</Text>
                                    <Text style={styles.weekTextStyle}>{this.state.returnDate}</Text>
                                </View>
                                <View style={styles.dateCon}>
                                    <Text style={styles.dateTextStyle}>{this.state.returnDay}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>    
                </View>
                    :
                    <View style={styles.btnCon}>
                    <TouchableOpacity style={styles.btnStyle}>
                        <View style={styles.btnViewStyle}>
                            <Text style={styles.earliStyle}>{this.props.dep}</Text>
                            <View style={styles.monDateCon}>
                                <View style={styles.monCon}>
                                    <Text style={styles.monTextStyle}>{this.state.month}</Text>
                                    <Text style={styles.weekTextStyle}>{this.state.date}</Text>
                                </View>
                                <View style={styles.dateCon}>
                                    <Text style={styles.dateTextStyle}>{this.state.day}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>    
                </View>
                }
                
                <View style={{
                        flex:1,
                    }}>
                <CalendarList
                    ref='cal'
                    style={{
                    }}
                    
                    markedDates={MarkerDate}

        
                    // Date marking style [simple/period/multi-dot]. Default = 'simple'
                    markingType={'period'}
                    // Callback which gets executed when visible months change in scroll view. Default = undefined
                    //onVisibleMonthsChange={(months) => console.log(months)}
                    
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={0}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={14}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Enable or disable vertical scroll indicator. Default = false
                    showScrollIndicator={false}
                    onDayPress={this.selectOperation}
                    hideArrows={false}
                    hideExtraDays={false}
                    />
                    
                </View>

                <View style={styles.btnCancelApply}>

                    <TouchableOpacity style={styles.btnClear} onPress={()=>this.clearText()}>
                        <Text style={styles.btnCancelText}>CLEAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnCancel}
                        onPress={()=>Actions.mainScreen({'when':true,'fromCal':this.props.fromCal,switchBtn:this.props.switchbtn})} 
                        >
                        <Text style={styles.btnApplyText}>CANCEL</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.btnApply}
                                      onPress={()=>Actions.mainScreen({'when':true,'fromCal':this.props.fromCal,switchBtn:this.props.switchbtn})} 
                    >
                    <Text style={styles.btnApplyText}>APPLY</Text>
                 </TouchableOpacity>
                </View>

                        
            </View>
        )
    }
}
const styles = StyleSheet.create({
    
    dateCon:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    monTextStyle:{
        fontFamily:'SanFranciscoBold',
        color:'#5989bd',
        fontSize:18,
       // fontWeight:'bold',
    },
    earliStyle:{
        fontFamily:'SanFranciscoBold',
        color:'#d2d2d2',
        fontSize:14,
        //fontWeight:'800'
    },
    weekTextStyle:{
        fontFamily:'SanFranciscoBold',
        fontSize:12,
        color:'#a6bde5',
       // fontWeight:'800'
    },
    dateTextStyle:{
        fontFamily:'SanFranciscoBold',
        fontSize:24,
        color:'#245b7d',
        //fontWeight:'800'
    },
    btnCon:{
        paddingVertical:'2%',
        paddingHorizontal:Platform.OS === 'ios'?'20%':'10%',
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    btnStyle:{
        
        borderRadius:5,
        margin:'3%',
        borderWidth:1,
        width:Platform.OS ==='ios'? '70%':'50%',
        height:85,
        borderColor:'#6c9fca',
    },
    monDateCon:{
        flexDirection:'row'
    },
    btnViewStyle:{
        padding:'5%',
    },
    bodyText: {
        fontFamily:'SanFranciscoBold',
        fontSize: 18,
       // fontWeight: 'bold',
      },
    headerStyle:{
      marginTop:Platform.OS === 'ios'?0:24.5,
      backgroundColor:'#ffffff',
      justifyContent:'space-between',
      borderWidth:0,
      borderColor:'white',
      elevation:0,
    },
   btnCancelApply: {
    zIndex:10,
    padding:'2%',
    flexDirection: 'row',
    paddingHorizontal:'5%',
    marginBottom: '1%',
    backgroundColor:'#ffffff',
    alignItems: 'flex-end',
    justifyContent:'space-between',
  },
  btnCancel: {
    backgroundColor: 'lightgrey',
    paddingVertical: '4%',
    paddingHorizontal: '7%',
    borderRadius:3,
    
  },
  btnCancelText: {
    fontFamily:'SanFranciscoBold',
    color: 'white',
  // fontWeight:'bold'
  },
  btnClear: {
    borderRadius:3,
    backgroundColor: '#ff6f43',
    paddingVertical: '4%',
    paddingHorizontal: '9%',
    
  },
  btnClearText: {
    fontFamily:'SanFranciscoBold',
    color: 'white',
    //fontWeight:'bold'
  },
  btnApply: {
      borderRadius:3,
    backgroundColor: '#3d8af7',
    paddingVertical: '4%',
    paddingHorizontal: '9%',
    
  },

  btnApplyText: {
    fontFamily:'SanFranciscoBold',
    color: 'white',
   // fontWeight: 'bold',
  },
  });
export default DepartureRangeSelectScreen
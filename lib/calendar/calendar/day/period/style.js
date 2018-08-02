import {StyleSheet} from 'react-native';
import * as defaultStyle from '../../../style';
import {Platform} from 'react-native'

const STYLESHEET_ID = 'stylesheet.day.period';

const FILLER_HEIGHT = 34;

export default function styleConstructor(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    wrapper: {
      flex:1,
      alignItems: 'center',
      alignSelf: 'stretch',
      marginLeft: -1,
      borderWidth:Platform.OS ==='ios'?1.2:1,
      borderColor:'#e9e9eb',
    },
    base: {
      //changed
      // borderWidth:Platform.OS ==='ios'?1.5:1,
      // borderColor:'grey',
      
      
      width: 36,
      height: FILLER_HEIGHT,
      alignItems: 'center'
    },
    fillers: {
      position: 'absolute',
      height: FILLER_HEIGHT,
      flexDirection: 'row',
      left: 0,
      right: 0
    },
    leftFiller: {
      height: FILLER_HEIGHT,
      flex: 1
    },
    rightFiller: {
      height: FILLER_HEIGHT,
      flex: 1
    },
    text: {
      marginTop: 7,
      fontSize: appStyle.textDayFontSize,
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: '300',
      color: appStyle.dayTextColor || '#2d4150',
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    todayText: {
      fontWeight: '800',
      color: theme.todayTextColor || appStyle.dayTextColor,
      //color: appStyle.textLinkColor
    },
    disabledText: {
      color: appStyle.textDisabledColor
    },
    quickAction: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#c1e4fe'
    },
    quickActionText: {
      marginTop:Platform.OS ==='ios'?8: 6,
      color: appStyle.textColor
    },
    firstQuickAction: {
      backgroundColor: appStyle.textLinkColor
    },
    firstQuickActionText: {
      color: 'white'
    },
    naText: {
      color: '#b6c1cd'
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}

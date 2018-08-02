import {StyleSheet,Platform} from 'react-native';
import * as defaultStyle from '../style';


const STYLESHEET_ID = 'stylesheet.calendar-list.main';

export default function getStyle(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      backgroundColor: appStyle.calendarBackground,
      // marginTop:100,
    },
    placeholder: {

      backgroundColor: appStyle.calendarBackground,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    placeholderText: {

      fontSize: 30,
      fontWeight: '200',
      color: appStyle.dayTextColor
      
    },
    calendar: {

      height:Platform.OS ==='ios'? '5.5%':280,
      paddingLeft: 15,
      paddingRight: 15,
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}

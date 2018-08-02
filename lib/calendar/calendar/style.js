import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';

const STYLESHEET_ID = 'stylesheet.calendar.main';

export default function getStyle(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      paddingLeft: 5,
      paddingRight: 5,
      //backgroundColor: appStyle.calendarBackground,
      backgroundColor:'#f5f5f7'

    },
    week: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      //borderWidth:1,
      //borderColor:'red',
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}

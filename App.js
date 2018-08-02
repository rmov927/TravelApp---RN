import * as Expo from "expo";
import React from 'react';
import { Router, Scene } from 'react-native-router-flux'
import './ReactotronConfig'
import ResultScreen from './components/explore/ResultScreen'
import ExploreScreen from './components/explore';
import Notifications from './components/Notifications';
import DepartureRangeSelectScreen from './components/DepartureRangeSelectScreen';
import MainScreen from './MainScreen';
import LoginScreen from './components/LoginScreen';
import RecentScreen from './components/recentScreen';
import CurrencyScreen from './components/currencyScreen';
import CustomSlider from './components/slider/CustomSlider';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">

          <Scene
            key="mainScreen" component={MainScreen} panHandlers={null} hideNavBar hideTabBar headerMode='none'  initial/>

          <Scene
            key="depart" component={DepartureRangeSelectScreen} panHandlers={null} hideNavBar hideTabBar headerMode='none' direction="vertical"/>

          <Scene
            key="loginScreen" component={LoginScreen} panHandlers={null} hideNavBar hideTabBar headerMode='none' />

          <Scene
            key="recentScreen" component={RecentScreen} panHandlers={null}  hideNavBar hideTabBar headerMode='none' />

          <Scene
            key="currencyScreen" component={CurrencyScreen} panHandlers={null} hideNavBar hideTabBar headerMode='none' />

          <Scene
            key="notificationsScreen" component={Notifications} panHandlers={null} hideNavBar hideTabBar headerMode='none' />

          <Scene key="exploreScreen" component={ExploreScreen} panHandlers={null} hideNavBar hideTabBar headerMode='none' />

          <Scene key="resultScreen" component={ResultScreen} panHandlers={null} hideNavBar hideTabBar headerMode='none' />

          <Scene
            key="slider" component={CustomSlider} panHandlers={null} hideNavBar hideTabBar headerMode='none' />

        </Scene>
      </Router>
    )
  }
}
export default App

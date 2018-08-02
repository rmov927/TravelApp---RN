import React from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity,
    ImageBackground, Image, Platform
} from 'react-native';
import {
    Icon,
} from 'native-base'; // 2.3.9
import { Actions } from 'react-native-router-flux'
import ResultScreen from '../explore/ResultScreen'
import ExploreScreen from '../explore/index'

class ExploreCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            select: false,
            ren: false,

        }
    }
    pass() {
       Actions.resultScreen()
        
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
    render() {

        return (
            <TouchableOpacity  activeOpacity={0.9} style={styles.mainView} onPress={() => this.pass()}>
                <View>
                    <View style={styles.outterView}>
                        <View style={styles.innerView}>
                            <View>
                                <Text style={styles.upperText}>Prague</Text>
                                <Text style={styles.lowerText}>PRG</Text>
                            </View>
                            <View>
                                <Text style={styles.upperText}>14 Mar</Text>
                                <Text style={styles.lowerText}>16:10</Text>
                            </View>
                            <View>
                                <Text style={styles.upperText}>1h20m</Text>
                                <View style={{ marginTop: '25%', borderBottomWidth: 1 }} />
                            </View>
                            <View>
                                <Text style={styles.upperText}>14 Mar</Text>
                                <Text style={styles.lowerText}>17:30</Text>
                            </View>
                            <View>
                                <Text style={styles.upperText}>Paris</Text>
                                <Text style={styles.lowerText}>CDG</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>this.setState({select:!this.state.select})}>
                                 <Icon name={this.state.select?'md-heart':'md-heart-outline'} style={{ color: '#84c2f7' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.outterView}>
                        <View style={styles.innerView}>
                            <View>
                                <Text style={styles.upperText}>Paris</Text>
                                <Text style={styles.lowerText}>CDG</Text>
                            </View>
                            <View>
                                <Text style={styles.upperText}>14 Mar</Text>
                                <Text style={styles.lowerText}>14:00</Text>
                            </View>
                            <View>
                                <Text style={styles.upperText}>1h30m</Text>
                                <View style={{ marginTop: '25%', borderBottomWidth: 1 }} />
                            </View>
                            <View>
                                <Text style={styles.upperText}>28 Apr</Text>
                                <Text style={styles.lowerText}>17:30</Text>
                            </View>
                            <View>
                                <Text style={styles.upperText}>Prague</Text>
                                <Text style={styles.lowerText}>PRG</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.eurCon}>
                    <Text style={styles.eurTextStyle}>180 EUR</Text>
                </View>
                
            </TouchableOpacity>
               
            
        )

    }
}
const styles = StyleSheet.create({

    mainView: {
        backgroundColor: '#fafafa',
        padding: '1%',
        marginTop: '3%',
    },
    headText: {
        fontFamily:'SanFranciscoBold',
        fontSize: Platform.OS === 'ios' ? 16 : 16,
       // fontWeight: Platform.OS === 'ios' ? '700' : '500',
    },

    innerView: {
        padding: '2%',
        width: '85%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    outterView: {
        padding: '2%',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    eurCon: {
        justifyContent: 'flex-end',
        width: '100%',
        paddingHorizontal: '2%'
    },
    eurTextStyle: {
        fontFamily:'SanFranciscoBold',
        textAlign: 'right',
        fontSize: 20,
        color: '#3e4444',
        //fontWeight: '700',
    },
    upperText: {
        fontFamily:'SanFrancisco',
        fontSize: 12,
        color: '#3e4444',
    },
    lowerText: {
        fontFamily:'SanFranciscoBold',
       // fontWeight: '700',
        fontSize: 18,
        color: '#3e4444',
    },
});
export default ExploreCard
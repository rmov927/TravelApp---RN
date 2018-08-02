import React,{Component} from 'react'
import {
            View,Text,Modal,

        
        } from 'react-native'

import{
        Button
      }from 'native-base'

class AdditionalScreen extends Component{


    constructor(props){
        super(props)
        this.state={
            modalVisible:this.props.modalVisible
        }

    }
    componentDidUpdate(){
       
        if(this.props.modalVisible != this.state.modalVisible){
            this.setState({
                modalVisible:!this.state.modalVisible
            })
        }
        alert("did"+this.state.modalVisible)
    }
    closeModal(){
        alert("additional",this.state.modalVisible)
        //this.props.modalVisible=false
        this.setState({
            modalVisible:!this.state.modalVisible
        })
    }
    render(){
        if(this.state.modalVisible){
            return(
            
                <Modal
                   visible={true}
                   animationType={'fade'}
                   transparent={true}
                   onRequestClose={() => this.closeModal()}>
   
                   <View style={{flex:1,justifyContent:'center'}}>
   
                       <Text>Additional Screen</Text>
                       <Button onPress={()=>this.closeModal()}>
                           <Text>Close</Text>
                       </Button>
                   
                   </View>
   
               </Modal>
   
           )    
        }else{
            return(
                <Modal
                visible={false}
                animationType={'fade'}
                transparent={true}
                onRequestClose={() => this.closeModal()}>

                <View style={{flex:1,justifyContent:'center'}}>

                    <Text>Additional Screen</Text>
                    <Button onPress={()=>this.closeModal()}>
                        <Text>Close</Text>
                    </Button>
                
                </View>

            </Modal>
            )
        }
        
    }
}

export default AdditionalScreen
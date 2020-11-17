import React, {Component} from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';

import { VideoControl } from './VideoControl';


export class VideoPage extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props.route.params);
  }

  componentDidMount(props) {
    console.log("cduuuu");
    console.log(this.props);
    this.props.navigation.setOptions({
      // headerTitleStyle: {textAlign: 'center'},
      title: this.props.route.params.title
    });
  }

  render(){
    return (
      <View style={{flex: 1, flexDirection: "column"}}>
        <VideoControl uri={this.props.route.params.url} />
      </View>

    );  
  }
  
  // }
}

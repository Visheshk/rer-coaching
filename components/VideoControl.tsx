import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { AsyncStorage } from 'react-native';
import { Audio, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export class VideoControl extends React.Component {
  constructor (props) {
    super(props);
    this.playButton = React.createRef();
    console.log("props props props");
    console.log(props);
    this.video = null;
    this.state = {
      "vidPlaying": true,
      "playOpacity": 1,
      "playbackObject": null

    }
    
  }

  componentDidUpdate(props) {
    // console.log(props);

  }

  // const [vidPlaying, setVidPlaying] = React.useState(false);
  // const [playOpacity, setPlayOpacity] = React.useState(1);
  // let vidUri = 
  // let playbackObject;
  
  _handleVideoRef = component => {
    this.video = component; 
  }

  _playState = playStatus => {
    // console.log(playStatus);
    if (playStatus.isPlaying == true && this.state.vidPlaying == false) {
      console.log("playing is ");
      activateKeepAwake();
      // this.setState({"vidPlaying": true});
      // console.log(this.state.vidPlaying);
      // console.log(playStatus);
    }
    else if (playStatus.isPlaying == false && this.state.vidPlaying == true) {
      // console.log("paused");
      deactivateKeepAwake();
      this.setState({"vidPlaying": false});
      // console.log(this.state.vidPlaying);
      // console.log(playStatus);
      // if (playStatus)
    }
    // console.log(this.state.vidPlaying);
  }

  playVideo = async () => {
    if (this.video !== null) {
      var stat = await this.video.getStatusAsync();
      if (stat.isPlaying == true) {
        console.log("playing")
        this.video.pauseAsync(); 
      }
      else {
        console.log("not playing")
        if (stat.positionMillis == stat.playableDurationMillis) {
          this.video.replayAsync();
        }
        else {
          this.video.playAsync();
        }
      }
    }
    return true;
  }
  render(){
  return(
    <View>

        <Video
          source={{ uri: this.props.uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          useNativeControls={true}
          shouldPlay={false}
          isLooping={false}
          style={{ height: this.props.height }}
          ref={this._handleVideoRef}
          onPlaybackStatusUpdate={this._playState}
        />
        
        <View style={{ 
          alignSelf: "center",
          flex:1,
          flexDirection: "row",
          height: "100%", 
          width: "100%", 
          justifyContent: "space-around", 
          alignItems: "center", 
          flex: 1, 
          position: "absolute"}}>
          <TouchableOpacity 
            ref={this.playButton}
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.4)',
              width: 80,
              height: 80,
              borderRadius:80,
              justifyContent: "space-around",
              opacity: this.state.vidPlaying? 1:0,
              alignItems: "center"
            }}
            underlayColor="#111" delayPressIn={0} delayPressOut={10} onPress={this.playVideo}>
            <Ionicons name="ios-play" 
                style={{
                    textShadowColor: '#333',
                    textShadowOffset: {width: -1, height: 1},
                    textShadowRadius: 10}} 
                size={54} 
                color="white" />
              
          </TouchableOpacity>

        </View>
        

      </View>
  )
}
}
import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { AsyncStorage } from 'react-native';
import { Audio, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export class VideoControl extends React.Component {
  constructor (props) {
    super(props);
    this.playButton = React.createRef();
    console.log("props props props");
    this.video = null;
    this.state = {
      "vidPlaying": true,
      "playOpacity": 1,
      "playbackObject": null

    }
    activateKeepAwake();
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
    // console.log(playStatus["isPlaying"]);
    if (playStatus.isPlaying == true) {
      console.log("playing is ");
      this.setState({"playOpacity": 1, "vidPlaying": true});
      console.log(this.state.vidPlaying);
    }
    else if (playStatus.isPlaying == false && this.state.vidPlaying == true) {
      console.log("paused");
      this.setState({"playOpacity": 0, "vidPlaying": false});
      console.log(this.state.vidPlaying);
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
          style={{ height: 400 }}
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
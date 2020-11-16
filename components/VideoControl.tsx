import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { AsyncStorage } from 'react-native';
import { Audio, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export class VideoControl extends React.Component {
  constructor (props) {
    super(props);
    console.log("props props props");
    
    this.state = {
      vidPlaying: false,
      playOpacity: 1

    }
    activateKeepAwake();
  }

  componentDidUpdate(props) {
    console.log(props);
  }

  // const [vidPlaying, setVidPlaying] = React.useState(false);
  // const [playOpacity, setPlayOpacity] = React.useState(1);
  // let vidUri = 
  // let playbackObject;
  
  _handleVideoRef = component => {
    const playbackObject = component;
  }

  _playState = playStatus => {
    console.log("play state change");
    if (playStatus.isPlaying) {
      this.state.vidPlaying = true;
      this.state.playOpacity = 1;
    }
    else {
      console.log("paused");
      this.state.vidPlaying = false;
      this.state.playOpacity = 0;
    }
  }

  async playVideo() {
    var stat = await playbackObject.getStatusAsync();
    console.log(stat);
    if (stat.isPlaying == true) {
      this.playbackObject.pauseAsync(); 
    }
    else {
      console.log("not playing")
      if (stat.positionMillis == stat.playableDurationMillis) {
        this.playbackObject.replayAsync();
      }
      else {
        this.playbackObject.playAsync();
      }
    }
    
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
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.4)',
              width: 80,
              height: 80,
              borderRadius:80,
              justifyContent: "space-around",
              opacity: this.state.playOpacity,
              alignItems: "center"
            }}

            underlayColor="#111" delayPressIn={0} delayPressOut={10} onPress={() => this.playVideo()}>
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